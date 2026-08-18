// ==========================================
// THỬ THÁCH HÀNG NGÀY & SUPABASE STREAK
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
        document.getElementById('auth-status').style.color = "#10b981";
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
        
    if (error && error.code !== 'PGRST116') { // PGRST116 là lỗi không tìm thấy record (chưa có)
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
        badge.style.background = "#ef4444";
        return;
    }
    
    const lastPlayed = new Date(currentStreakData.last_played_date);
    const today = new Date();
    if (lastPlayed.toDateString() === today.toDateString()) {
        badge.innerText = "Đã hoàn thành hôm nay!";
        badge.style.background = "#10b981";
        document.getElementById('start-daily-game-btn').disabled = true;
        document.getElementById('start-daily-game-btn').innerText = "Hẹn gặp lại ngày mai!";
    } else {
        badge.innerText = "Chưa hoàn thành hôm nay";
        badge.style.background = "#ef4444";
        document.getElementById('start-daily-game-btn').disabled = false;
        document.getElementById('start-daily-game-btn').innerText = "Chơi Ngay Màn Hôm Nay";
    }
}

function completeDailyChallenge() {
    if (!currentSession) {
        alert("Vui lòng đăng nhập để lưu Streak!");
        return;
    }
    
    const today = new Date();
    currentStreakData.current_streak += 1;
    if (currentStreakData.current_streak > currentStreakData.max_streak) {
        currentStreakData.max_streak = currentStreakData.current_streak;
    }
    currentStreakData.last_played_date = today.toISOString();
    
    updateStreakDB(currentStreakData.current_streak, currentStreakData.max_streak, currentStreakData.last_played_date);
    alert("Tuyệt vời! Bạn đã hoàn thành thử thách hôm nay. 🔥 Streak +1");
    
    document.getElementById('daily-game-area').style.display = "none";
    document.getElementById('daily-game-intro').style.display = "block";
}

// ==========================================
// GAME SIÊU TRÍ NHỚ (NHỚ SỐ NGẪU NHIÊN)
// ==========================================

let dailyTargetNumber = "";
let dailyTimer = null;

function startDailyMemoryGame() {
    if (!currentSession) {
        alert("Bạn cần Đăng Nhập để tham gia Thử Thách Hằng Ngày!");
        return;
    }
    
    document.getElementById('daily-game-intro').style.display = "none";
    document.getElementById('daily-game-area').style.display = "block";
    document.getElementById('daily-input').value = "";
    document.getElementById('daily-input-area').style.display = "none";
    
    // Logic: Số chữ số tăng dần theo streak. Mặc định là 5.
    let digitsCount = 5 + Math.floor(currentStreakData.current_streak / 3);
    if (digitsCount > 20) digitsCount = 20; // Max 20 số
    
    dailyTargetNumber = "";
    for(let i = 0; i < digitsCount; i++){
        dailyTargetNumber += Math.floor(Math.random() * 10);
    }
    
    const displayElement = document.getElementById('daily-number-display');
    displayElement.innerText = dailyTargetNumber;
    displayElement.style.display = "block";
    
    let timeToRemember = 3 + (digitsCount * 0.5); // Thời gian nhớ
    const countdownEl = document.getElementById('daily-timer');
    countdownEl.innerText = `Bạn có ${Math.ceil(timeToRemember)} giây để nhớ!`;
    
    dailyTimer = setInterval(() => {
        timeToRemember -= 1;
        countdownEl.innerText = `Bạn có ${Math.ceil(timeToRemember)} giây để nhớ!`;
        if(timeToRemember <= 0) {
            clearInterval(dailyTimer);
            displayElement.style.display = "none";
            countdownEl.innerText = "Đã hết thời gian! Hãy nhập số bạn nhớ được.";
            document.getElementById('daily-input-area').style.display = "block";
            document.getElementById('daily-input').focus();
        }
    }, 1000);
}

function checkDailyAnswer() {
    const userAnswer = document.getElementById('daily-input').value.trim();
    if (userAnswer === dailyTargetNumber) {
        completeDailyChallenge();
    } else {
        alert(`Rất tiếc! Số đúng là: ${dailyTargetNumber}. Hãy thử lại vào ngày mai nhé (hoặc bạn có thể 'ăn gian' thử lại luôn 😉).`);
        document.getElementById('daily-game-area').style.display = "none";
        document.getElementById('daily-game-intro').style.display = "block";
    }
}

// UI Functions
function openStreakModal() {
    document.getElementById('streak-modal').style.display = 'flex';
    if(currentSession) updateStreakUI();
}

function closeStreakModal() {
    document.getElementById('streak-modal').style.display = 'none';
}
