// ==========================================
// THỬ THÁCH HÀNG NGÀY - VÔ HẠN LEVEL
// Streak chỉ cần hoàn thành Level 3 mỗi ngày
// ==========================================

const SUPABASE_URL = 'https://xifjqsgmdihexrmndcmf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8IgwB0T4FpgU50beXt9qoA_E_Dk1cRh';

// Cấu hình game
const STREAK_THRESHOLD_LEVEL = 3; // Phải đạt level này mỗi ngày để được tính streak
const MAX_HEARTS = 3;              // Số tim mỗi ván
const BASE_DIGITS = 3;             // Số chữ số bắt đầu ở level 1

let supabaseClient = null;
let currentSession = null;
let currentStreakData = {
    current_streak: 0,
    max_streak: 0,
    best_level: 0,
    last_played_date: null
};

// Trạng thái game
let dailyTargetNumber = "";
let dailyTimer = null;
let currentLevel = 1;
let currentHearts = MAX_HEARTS;
let streakEarnedThisSession = false;

// ==========================================
// KHỞI TẠO SUPABASE
// ==========================================
if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    checkAuthSession();
} else {
    console.warn("Supabase CDN not loaded. Chạy offline mode.");
}

async function checkAuthSession() {
    if (!supabaseClient) return;
    const { data } = await supabaseClient.auth.getSession();
    if (data.session) {
        currentSession = data.session;
        onUserLoggedIn();
    }
}

function onUserLoggedIn() {
    setDisplay('auth-forms', 'none');
    setDisplay('auth-logged-bar', 'flex');
    setDisplay('daily-game-intro', 'block');
    loadStreakData();
}

// ==========================================
// AUTH
// ==========================================
async function signUpUser() {
    const email = getVal('streak-email');
    const password = getVal('streak-password');
    if (!email || !password) { alert("Vui lòng nhập Email và Mật khẩu"); return; }
    const { error } = await supabaseClient.auth.signUp({ email, password });
    alert(error ? "Lỗi: " + error.message : "Đăng ký thành công! Hãy đăng nhập.");
}

async function signInUser() {
    const email = getVal('streak-email');
    const password = getVal('streak-password');
    if (!email || !password) { alert("Vui lòng nhập Email và Mật khẩu"); return; }
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) { alert("Lỗi: " + error.message); return; }
    currentSession = data.session;
    onUserLoggedIn();
}

async function signOutUser() {
    await supabaseClient.auth.signOut();
    currentSession = null;
    setDisplay('auth-forms', 'block');
    setDisplay('auth-logged-bar', 'none');
    setDisplay('daily-game-intro', 'none');
    showScreen('intro');
    currentStreakData = { current_streak: 0, max_streak: 0, best_level: 0, last_played_date: null };
    updateDashboardUI();
}

// ==========================================
// DỮ LIỆU STREAK - SUPABASE
// ==========================================
async function loadStreakData() {
    if (!currentSession) return;
    const { data, error } = await supabaseClient
        .from('user_streaks').select('*')
        .eq('user_id', currentSession.user.id).single();

    if (error && error.code !== 'PGRST116') { console.error(error); return; }

    if (data) {
        currentStreakData = data;
        checkIfStreakBroken();
    } else {
        // Tạo record mới
        const newData = { user_id: currentSession.user.id, current_streak: 0, max_streak: 0, best_level: 0, last_played_date: null };
        await supabaseClient.from('user_streaks').insert([newData]);
        currentStreakData = newData;
    }
    updateDashboardUI();
}

function checkIfStreakBroken() {
    if (!currentStreakData.last_played_date) return;
    const lastPlayed = new Date(currentStreakData.last_played_date);
    const today = new Date();
    lastPlayed.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    const diffDays = Math.round((today - lastPlayed) / (1000 * 60 * 60 * 24));
    if (diffDays > 1) {
        currentStreakData.current_streak = 0;
        saveStreakData();
    }
}

async function saveStreakData() {
    if (!currentSession) return;
    await supabaseClient.from('user_streaks').update({
        current_streak: currentStreakData.current_streak,
        max_streak: currentStreakData.max_streak,
        best_level: currentStreakData.best_level,
        last_played_date: currentStreakData.last_played_date
    }).eq('user_id', currentSession.user.id);
    updateDashboardUI();
}

function updateDashboardUI() {
    // Cập nhật cả 2 nơi hiển thị streak
    const streakVal = currentStreakData.current_streak;
    setText('streak-count', streakVal);
    setText('streak-count-big', streakVal);
    setText('max-streak-display', currentStreakData.max_streak || 0);
    setText('best-level-display', currentStreakData.best_level || 0);

    const badge = document.getElementById('daily-status-badge');
    const btn = document.getElementById('start-daily-game-btn');
    if (!badge || !btn) return;

    const completedToday = isTodayCompleted();
    if (completedToday) {
        badge.textContent = '🔥 Streak hôm nay đã tính! ' + streakVal + ' ngày';
        badge.className = 'duo-badge duo-badge-done';
        btn.textContent = 'CHƠI THÊM ĐỂ PHÁ KỶ LỤC';
        btn.className = 'duo-btn duo-btn-blue';
        btn.disabled = false;
    } else {
        badge.textContent = '⏰ Chưa hoàn thành hôm nay';
        badge.className = 'duo-badge duo-badge-undone';
        btn.textContent = 'BẮT ĐẦU CHƠI';
        btn.className = 'duo-btn';
        btn.disabled = false;
    }
}

function isTodayCompleted() {
    if (!currentStreakData.last_played_date) return false;
    const lastPlayed = new Date(currentStreakData.last_played_date);
    return lastPlayed.toDateString() === new Date().toDateString();
}

// ==========================================
// LOGIC GAME VÔ HẠN LEVEL
// ==========================================

function startDailyMemoryGame() {
    currentLevel = 1;
    currentHearts = MAX_HEARTS;
    streakEarnedThisSession = false;
    showScreen('game');
    startLevel();
}

function restartGame() {
    startDailyMemoryGame();
}

function startLevel() {
    if (dailyTimer) clearInterval(dailyTimer);

    // Cập nhật UI header
    setText('current-level-display', currentLevel);
    updateHeartsDisplay();
    updateProgressBar(0);

    // Ẩn tất cả phases
    showPhase('memorize');

    // Sinh số: Level 1 = 3 chữ số, Level 2 = 4 chữ số, Level 3 = 5 chữ số, ...
    const digitsCount = Math.min(BASE_DIGITS + (currentLevel - 1), 20);
    dailyTargetNumber = "";
    for (let i = 0; i < digitsCount; i++) {
        dailyTargetNumber += Math.floor(Math.random() * 10);
    }

    // Hiển thị số
    setText('daily-number-display', dailyTargetNumber);

    // Thời gian nhớ: 2s mỗi chữ số, tối thiểu 3s
    let timeLeft = Math.max(3, digitsCount * 1.5);
    setText('duo-timer-text', Math.ceil(timeLeft));
    updateProgressBar(100); // Thanh tiến trình = full khi đang nhớ

    dailyTimer = setInterval(() => {
        timeLeft -= 0.1;
        const pct = Math.max(0, (timeLeft / Math.max(3, digitsCount * 1.5)) * 100);
        // Cập nhật timer bar mới
        const timerFill = document.getElementById('duo-timer-fill');
        if (timerFill) timerFill.style.width = pct + '%';
        setText('duo-timer-text', Math.ceil(Math.max(0, timeLeft)));

        if (timeLeft <= 0) {
            clearInterval(dailyTimer);
            showPhase('answer');
            const input = document.getElementById('daily-input');
            if (input) { input.value = ''; input.focus(); }
        }
    }, 100);
}

function checkDailyAnswer() {
    const userAnswer = (document.getElementById('daily-input').value || '').trim();
    if (!userAnswer) return;

    if (userAnswer === dailyTargetNumber) {
        // ĐÚNG!
        updateProgressBar(100);
        showScreen('game');
        showPhase('correct');

        // Kiểm tra có phải milestone cần Level Up không
        // Tự động lên màn Level Up sau khi bấm "Tiếp tục"
    } else {
        // SAI
        document.getElementById('correct-answer-display').textContent = dailyTargetNumber;
        currentHearts--;
        updateHeartsDisplay();

        if (currentHearts <= 0) {
            // Hết tim → Game Over
            document.getElementById('gameover-level-display').textContent = currentLevel;
            document.getElementById('gameover-answer-display').textContent = dailyTargetNumber;
            showPhase('gameover');
        } else {
            // Còn tim → hiện màn sai, cho thử lại
            showPhase('wrong');
        }
    }
}

// Nhấn "Tiếp tục" sau khi đúng → Lên Level
function goNextLevel() {
    const prevLevel = currentLevel;
    currentLevel++;

    // Cập nhật best_level
    if (currentLevel > (currentStreakData.best_level || 0)) {
        currentStreakData.best_level = currentLevel - 1; // level vừa vượt qua
    }

    // Kiểm tra có đạt ngưỡng streak không (hoàn thành Level STREAK_THRESHOLD_LEVEL)
    const justUnlockedStreak = (prevLevel >= STREAK_THRESHOLD_LEVEL) && !streakEarnedThisSession && !isTodayCompleted();
    if (justUnlockedStreak) {
        streakEarnedThisSession = true;
        currentStreakData.current_streak += 1;
        if (currentStreakData.current_streak > (currentStreakData.max_streak || 0)) {
            currentStreakData.max_streak = currentStreakData.current_streak;
        }
        currentStreakData.last_played_date = new Date().toISOString();
        saveStreakData();
    }

    // Hiện màn Level Up mỗi level
    setText('levelup-new-level', currentLevel);
    document.getElementById('streak-earned-msg').textContent = justUnlockedStreak
        ? "🔥 Streak hôm nay đã được tính! +" + currentStreakData.current_streak
        : (isTodayCompleted() ? "✅ Streak hôm nay đã được tính rồi!" : "");
    showScreen('levelup');
}

// Nhấn "Chơi tiếp" trên màn Level Up
function continueNextLevel() {
    showScreen('game');
    startLevel();
}

// Nhấn "Thử lại" khi còn tim
function retryLevel() {
    startLevel(); // Chơi lại cùng level (số mới nhưng cùng độ khó)
}

// Nhấn "Về trang chủ" / "Dừng lại"
function endGame() {
    // Lưu best_level nếu cần
    if (currentLevel - 1 > (currentStreakData.best_level || 0)) {
        currentStreakData.best_level = currentLevel - 1;
        saveStreakData();
    }
    showScreen('intro');
    updateDashboardUI();
}

// ==========================================
// UI HELPERS
// ==========================================

function onUserLoggedIn() {
    setDisplay('auth-logged-bar', 'block');
    setDisplay('auth-forms', 'none');
    showScreen('intro');
}

function showScreen(screen) {
    setDisplay('daily-game-intro', screen === 'intro' ? 'block' : 'none');
    setDisplay('daily-game-area', screen === 'game' ? 'block' : 'none');
    setDisplay('daily-levelup-area', screen === 'levelup' ? 'block' : 'none');
}

function showPhase(phase) {
    ['memorize', 'answer', 'correct', 'wrong', 'gameover'].forEach(p => {
        setDisplay('game-phase-' + p, p === phase ? 'block' : 'none');
    });
}

function updateHeartsDisplay() {
    let hearts = '';
    for (let i = 0; i < MAX_HEARTS; i++) {
        hearts += i < currentHearts ? '❤️' : '🖤';
    }
    setText('duo-hearts-display', hearts);
}

function updateProgressBar(pct) {
    const el = document.getElementById('duo-progress');
    if (el) el.style.width = pct + '%';
}

// Tiny helpers
function setDisplay(id, val) { const el = document.getElementById(id); if (el) el.style.display = val; }
function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
function setElement(id, text, color) { const el = document.getElementById(id); if (el) { el.textContent = text; if (color) el.style.color = color; } }
function getVal(id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; }

// Thêm CSS cần thiết
const styleTag = document.createElement('style');
styleTag.innerHTML = `
    .duo-stat-card {
        background: #f7f7f7;
        border: 2px solid #e5e5e5;
        border-radius: 16px;
        padding: 1rem 1.5rem;
        min-width: 90px;
        text-align: center;
        flex: 1;
    }
    .duo-stat-icon { font-size: 1.8rem; margin-bottom: 4px; }
    .duo-stat-value { font-size: 2rem; font-weight: 900; color: #4b4b4b; }
    .duo-stat-label { font-size: 0.75rem; color: #999; text-transform: uppercase; font-weight: 700; margin-top: 2px; }
    .duo-level-badge {
        background: #1cb0f6;
        color: white;
        padding: 6px 16px;
        border-radius: 30px;
        font-weight: 900;
        font-size: 0.9rem;
        letter-spacing: 1px;
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-8px); }
        75% { transform: translateX(8px); }
    }
`;
document.head.appendChild(styleTag);
