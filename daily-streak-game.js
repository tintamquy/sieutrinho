// ==========================================
// THỬ THÁCH HÀNG NGÀY & SUPABASE STREAK
// DUOLINGO STYLE
// ==========================================

// 1. Cấu hình Supabase
// Đăng ký tại: https://supabase.com/
const SUPABASE_URL = 'https://xifjqsgmdihexrmndcmf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8IgwB0T4FpgU50beXt9qoA_E_Dk1cRh';

let supabaseClient = null;
let currentSession = null;
let currentStreakData = {
    current_streak: 0,
    max_streak: 0,
    last_played_date: null
};

// Khởi tạo Supabase
if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    checkAuthSession();
} else {
    console.warn("Supabase CDN not loaded.");
}

async function checkAuthSession() {
    if (!supabaseClient) return;
    const { data, error } = await supabaseClient.auth.getSession();
    if (data.session) {
        currentSession = data.session;
        document.getElementById('auth-status').innerText = "Đã đăng nhập";
        document.getElementById('auth-status').style.color = "#58cc02";
        document.getElementById('auth-forms').style.display = "none";
        document.getElementById('auth-logout-btn').style.display = "inline-block";
        loadStreakData();
    }
}

async function signUpUser() {
    const email = document.getElementById('streak-email').value;
    const password = document.getElementById('streak-password').value;
    if (!email || !password) {
        alert("Vui lòng nhập Email và Mật khẩu");
        return;
    }
    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
    });
    if (error) {
        alert("Lỗi đăng ký: " + error.message);
    } else {
        alert("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận (nếu có), hoặc đăng nhập ngay.");
    }
}

async function signInUser() {
    const email = document.getElementById('streak-email').value;
    const password = document.getElementById('streak-password').value;
    if (!email || !password) {
        alert("Vui lòng nhập Email và Mật khẩu");
        return;
    }
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) {
        alert("Lỗi đăng nhập: " + error.message);
    } else {
        currentSession = data.session;
        alert("Đăng nhập thành công!");
        checkAuthSession();
    }
}

async function signOutUser() {
    const { error } = await supabaseClient.auth.signOut();
    currentSession = null;
    document.getElementById('auth-status').innerText = "Chưa đăng nhập";
    document.getElementById('auth-status').style.color = "#ef4444";
    document.getElementById('auth-forms').style.display = "block";
    document.getElementById('auth-logout-btn').style.display = "none";
    document.getElementById('streak-count').innerText = "0";
    currentStreakData = { current_streak: 0, max_streak: 0, last_played_date: null };
}

// ==========================================
// LOGIC STREAK
// ==========================================

async function loadStreakData() {
    if (!currentSession) return;
    
    const { data, error } = await supabaseClient
        .from('user_streaks')
        .select('*')
        .eq('user_id', currentSession.user.id)
        .single();
        
    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
        console.error("Lỗi tải streak:", error);
        return;
    }

    if (data) {
        currentStreakData = data;
        checkStreakStatus();
    } else {
        // Chưa có dữ liệu, tạo mới
        const newData = {
            user_id: currentSession.user.id,
            current_streak: 0,
            max_streak: 0,
            last_played_date: null
        };
        const { error: insertError } = await supabaseClient.from('user_streaks').insert([newData]);
        if (!insertError) {
            currentStreakData = newData;
        }
    }
    updateStreakUI();
}

function checkStreakStatus() {
    if (!currentStreakData.last_played_date) return;

    const lastPlayed = new Date(currentStreakData.last_played_date);
    const today = new Date();
    
    // Reset thời gian về 00:00:00 để so sánh ngày
    lastPlayed.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    const diffTime = Math.abs(today - lastPlayed);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays > 1) {
        // Mất streak do không chơi ngày hôm qua
        currentStreakData.current_streak = 0;
        updateStreakDB(currentStreakData.current_streak, currentStreakData.max_streak, currentStreakData.last_played_date);
    }
}

async function updateStreakDB(currentStreak, maxStreak, lastPlayed) {
    if (!currentSession) return;
    
    const { error } = await supabaseClient
        .from('user_streaks')
        .update({
            current_streak: currentStreak,
            max_streak: maxStreak,
            last_played_date: lastPlayed
        })
        .eq('user_id', currentSession.user.id);
        
    if (error) console.error("Lỗi cập nhật streak:", error);
    updateStreakUI();
}

function updateStreakUI() {
    document.getElementById('streak-count').innerText = currentStreakData.current_streak;
    const badge = document.getElementById('daily-status-badge');
    if (!badge) return;
    
    if (!currentStreakData.last_played_date) {
        badge.innerText = "Chưa hoàn thành hôm nay";
        badge.style.background = "#e5e5e5";
        badge.style.color = "#777";
        return;
    }
    
    const lastPlayed = new Date(currentStreakData.last_played_date);
    const today = new Date();
    if (lastPlayed.toDateString() === today.toDateString()) {
        badge.innerText = "Đã hoàn thành hôm nay! 🎉";
        badge.style.background = "#58cc02";
        badge.style.color = "white";
        document.getElementById('start-daily-game-btn').disabled = true;
        document.getElementById('start-daily-game-btn').innerText = "Hẹn gặp lại ngày mai!";
        document.getElementById('start-daily-game-btn').style.background = "#e5e5e5";
        document.getElementById('start-daily-game-btn').style.borderColor = "#e5e5e5";
        document.getElementById('start-daily-game-btn').style.color = "#afafaf";
    } else {
        badge.innerText = "Chưa hoàn thành hôm nay";
        badge.style.background = "#e5e5e5";
        badge.style.color = "#777";
        document.getElementById('start-daily-game-btn').disabled = false;
        document.getElementById('start-daily-game-btn').innerText = "BẮT ĐẦU CHƠI NGAY";
        document.getElementById('start-daily-game-btn').style.background = "#58cc02";
        document.getElementById('start-daily-game-btn').style.borderColor = "#58a700";
        document.getElementById('start-daily-game-btn').style.color = "#fff";
    }
}

function completeDailyChallenge() {
    if (!currentSession) return;
    
    const today = new Date();
    currentStreakData.current_streak += 1;
    if (currentStreakData.current_streak > currentStreakData.max_streak) {
        currentStreakData.max_streak = currentStreakData.current_streak;
    }
    currentStreakData.last_played_date = today.toISOString();
    
    updateStreakDB(currentStreakData.current_streak, currentStreakData.max_streak, currentStreakData.last_played_date);
    
    // Show success screen
    document.getElementById('daily-game-area').style.display = "none";
    document.getElementById('daily-result-area').style.display = "block";
}

function returnToDailyIntro() {
    document.getElementById('daily-result-area').style.display = "none";
    document.getElementById('daily-game-intro').style.display = "block";
    updateStreakUI();
}

// ==========================================
// GAME SIÊU TRÍ NHỚ DUOLINGO (3 VÒNG)
// ==========================================

let dailyTargetNumber = "";
let dailyTimer = null;
const TOTAL_ROUNDS = 3;
let currentRound = 1;
let currentHearts = 3;

function startDailyMemoryGame() {
    if (!currentSession) {
        alert("Bạn cần Đăng Nhập để tham gia Thử Thách Hằng Ngày!");
        return;
    }
    
    currentRound = 1;
    currentHearts = 3;
    updateHeartsDisplay();
    updateProgressDisplay();
    
    document.getElementById('daily-game-intro').style.display = "none";
    document.getElementById('daily-result-area').style.display = "none";
    document.getElementById('daily-game-area').style.display = "block";
    
    startRound();
}

function startRound() {
    document.getElementById('daily-input').value = "";
    document.getElementById('daily-input-area').style.display = "none";
    document.getElementById('daily-input').style.borderColor = "#e5e5e5";
    
    // Tính độ khó: Phụ thuộc vào streak và vòng hiện tại.
    // Ví dụ streak=0 -> vòng 1 nhớ 3 số, vòng 2 nhớ 4 số, vòng 3 nhớ 5 số
    let baseDigits = 3 + Math.floor(currentStreakData.current_streak / 5);
    let digitsCount = baseDigits + (currentRound - 1);
    if (digitsCount > 20) digitsCount = 20;
    
    dailyTargetNumber = "";
    for(let i = 0; i < digitsCount; i++){
        dailyTargetNumber += Math.floor(Math.random() * 10);
    }
    
    const displayElement = document.getElementById('daily-number-display');
    displayElement.innerText = dailyTargetNumber;
    displayElement.style.display = "block";
    displayElement.style.color = "#1cb0f6"; // Blue
    
    let timeToRemember = 3 + (digitsCount * 0.5);
    const countdownText = document.getElementById('duo-timer-text');
    countdownText.innerText = Math.ceil(timeToRemember);
    document.getElementById('daily-timer').style.display = "flex";
    
    dailyTimer = setInterval(() => {
        timeToRemember -= 1;
        countdownText.innerText = Math.ceil(timeToRemember);
        if(timeToRemember <= 0) {
            clearInterval(dailyTimer);
            displayElement.style.display = "none";
            document.getElementById('daily-timer').style.display = "none";
            
            document.getElementById('daily-input-area').style.display = "block";
            document.getElementById('daily-input').focus();
        }
    }, 1000);
}

function checkDailyAnswer() {
    const userAnswer = document.getElementById('daily-input').value.trim();
    if (userAnswer === dailyTargetNumber) {
        // Đúng
        document.getElementById('daily-input').style.borderColor = "#58cc02";
        setTimeout(() => {
            currentRound++;
            updateProgressDisplay();
            if (currentRound > TOTAL_ROUNDS) {
                completeDailyChallenge();
            } else {
                startRound();
            }
        }, 500); // Đợi nửa giây rồi qua vòng
    } else {
        // Sai
        document.getElementById('daily-input').style.borderColor = "#ff4b4b";
        document.getElementById('daily-input').classList.add('shake');
        
        // Remove shake class after animation
        setTimeout(() => {
            document.getElementById('daily-input').classList.remove('shake');
        }, 400);

        currentHearts--;
        updateHeartsDisplay();
        
        if (currentHearts <= 0) {
            setTimeout(() => {
                alert(`Hết tim rồi! Số đúng là: ${dailyTargetNumber}. Hãy thử lại nhé!`);
                document.getElementById('daily-game-area').style.display = "none";
                document.getElementById('daily-game-intro').style.display = "block";
            }, 500);
        } else {
            // Cho thử lại số khác hoặc vòng lại vòng này
            setTimeout(() => {
                alert(`Sai rồi! Số đúng là: ${dailyTargetNumber}. Cẩn thận hơn nhé, bạn mất 1 tim!`);
                startRound();
            }, 500);
        }
    }
}

function updateProgressDisplay() {
    const progress = ((currentRound - 1) / TOTAL_ROUNDS) * 100;
    document.getElementById('duo-progress').style.width = progress + '%';
}

function updateHeartsDisplay() {
    let heartsHtml = "❤️ " + currentHearts;
    document.getElementById('duo-hearts-display').innerText = heartsHtml;
}

// Thêm CSS Shake trực tiếp qua JS nếu chưa có
const style = document.createElement('style');
style.innerHTML = `
    .shake {
        animation: shake 0.4s;
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
