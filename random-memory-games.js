// ============================================
// RANDOM MEMORY GAMES - NEW MODES
// ============================================

// --- 1. RANDOM NUMBER MEMORY GAME ---
function startNumberMemoryGame() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="binary-config-screen">
            <div class="binary-config-title">🔢 NUMBERS MEMORY 🔢</div>
            
            <div class="config-option">
                <div class="config-label">Số lượng chữ số (Tùy chọn):</div>
                <input type="number" id="num-digits" class="config-input" value="100" min="10" max="10000" step="10">
            </div>
            
            <div class="config-option">
                <div class="config-label">Thời gian Ghi nhớ (phút):</div>
                <input type="number" id="num-memo-time" class="config-input" value="5" min="1" max="60" step="1">
            </div>
            
            <div class="config-option">
                <div class="config-label">Thời gian Hồi tưởng (phút):</div>
                <input type="number" id="num-recall-time" class="config-input" value="10" min="1" max="120" step="1">
            </div>
            
            <div class="config-buttons">
                <button class="binary-btn binary-btn-secondary" onclick="showHomepage()">⬅ BACK</button>
                <button class="binary-btn binary-btn-primary" onclick="startNumberMemorization()">▶ START</button>
            </div>
        </div>
    `;
}

window.startNumberMemorization = function () {
    const totalDigits = parseInt(document.getElementById('num-digits').value) || 100;
    const memoMins = parseFloat(document.getElementById('num-memo-time').value) || 5;
    const recallMins = parseFloat(document.getElementById('num-recall-time').value) || 10;

    const cols = 20; // 20 digits per row
    const rows = Math.ceil(totalDigits / cols);
    const grid = [];
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
            if (r * cols + c < totalDigits) {
                row.push(Math.floor(Math.random() * 10));
            }
        }
        grid.push(row);
    }

    window.numberGameState = {
        grid: grid,
        rows: rows,
        cols: cols,
        totalDigits: totalDigits,
        memoTime: Math.floor(memoMins * 60),
        recallTime: Math.floor(recallMins * 60),
        memoStartTime: Date.now(),
        phase: 'memorization'
    };

    startTimer(Math.floor(memoMins * 60), () => {
        window.finishNumberMemorization();
    });

    renderNumberMemorizationPhase();
}

function renderNumberMemorizationPhase() {
    const { grid, rows, cols, totalDigits } = window.numberGameState;
    const container = document.getElementById('game-container');

    let html = `
        <div class="binary-game-container">
            <div class="binary-game-header">
                <div>
                    <div class="binary-stage-title">NUMBERS MEMORY (${totalDigits} digits)</div>
                    <div style="color: #10b981; font-weight: 600; margin-top: 0.5rem;">MEMORIZATION STAGE</div>
                </div>
                <div class="binary-timer" id="binary-display-timer">--:--</div>
            </div>
            <div class="binary-table-wrapper" style="font-family: monospace; font-size: 1.5rem; letter-spacing: 5px; text-align: center; padding: 2rem;">
    `;

    for (let r = 0; r < rows; r++) {
        html += `<div style="margin-bottom: 1rem; color: #fff;">`;
        for (let c = 0; c < grid[r].length; c++) {
            html += `<span style="display:inline-block; width: 25px;">${grid[r][c]}</span>`;
            if ((c + 1) % 5 === 0 && c < grid[r].length - 1) html += `<span style="margin-right: 15px;"></span>`;
        }
        html += `</div>`;
    }

    html += `
            </div>
            
            <div class="binary-action-buttons">
                <button class="binary-btn binary-btn-secondary" onclick="showHomepage()">BACK</button>
                <button class="binary-btn binary-btn-primary" onclick="finishNumberMemorization()">FINISH MEMO</button>
            </div>
        </div>
    `;
    container.innerHTML = html;
}

window.finishNumberMemorization = function () {
    window.numberGameState.memoTimeUsed = (Date.now() - window.numberGameState.memoStartTime) / 1000;
    window.numberGameState.recallStartTime = Date.now();
    window.numberGameState.phase = 'recall';

    startTimer(window.numberGameState.recallTime, () => {
        window.submitNumberRecall();
    });

    renderNumberRecallPhase();
}

function renderNumberRecallPhase() {
    const { rows, grid } = window.numberGameState;
    const container = document.getElementById('game-container');

    let html = `
        <div class="binary-game-container">
            <div class="binary-game-header">
                <div>
                    <div class="binary-stage-title">NUMBERS MEMORY</div>
                    <div style="color: #f59e0b; font-weight: 600; margin-top: 0.5rem;">RECALL STAGE</div>
                </div>
                <div class="binary-timer" id="binary-display-timer">--:--</div>
            </div>
            <div class="binary-table-wrapper" style="text-align: center; padding: 2rem;">
    `;

    for (let r = 0; r < rows; r++) {
        html += `<div style="margin-bottom: 1rem;">`;
        for (let c = 0; c < grid[r].length; c++) {
            const isFirst = (r === 0 && c === 0);
            html += `
                <input type="text" 
                    class="binary-cell-input" 
                    data-row="${r}" 
                    data-col="${c}"
                    maxlength="1"
                    style="width: 30px; height: 40px; text-align: center; font-size: 1.2rem; margin: 2px;"
                    ${isFirst ? 'id="num-first-input"' : ''}
                    oninput="handleNumInput(this, ${r}, ${c}, ${grid[r].length})"
                    onkeydown="handleNumNav(event, ${r}, ${c}, ${grid[r].length})">
            `;
            if ((c + 1) % 5 === 0 && c < grid[r].length - 1) html += `<span style="margin-right: 15px;"></span>`;
        }
        html += `</div>`;
    }

    html += `
            </div>
            <div class="binary-action-buttons">
                <button class="binary-btn binary-btn-secondary" onclick="showHomepage()">BACK</button>
                <button class="binary-btn binary-btn-primary" onclick="submitNumberRecall()">FINISH</button>
            </div>
        </div>
    `;
    container.innerHTML = html;

    setTimeout(() => {
        const first = document.getElementById('num-first-input');
        if (first) first.focus();
    }, 100);
}

window.handleNumInput = function (input, r, c, maxCol) {
    const val = input.value;
    if (!/^[0-9]$/.test(val) && val !== '') {
        input.value = '';
        return;
    }
    if (val !== '') {
        const { rows } = window.numberGameState;
        let nextC = c + 1;
        let nextR = r;
        if (nextC >= maxCol) {
            nextC = 0;
            nextR = r + 1;
        }
        if (nextR < rows) {
            const next = document.querySelector(`.binary-cell-input[data-row="${nextR}"][data-col="${nextC}"]`);
            if (next) setTimeout(() => next.focus(), 10);
        }
    }
}

window.handleNumNav = function (event, r, c, maxCol) {
    const { rows } = window.numberGameState;
    if (event.key === 'ArrowRight') {
        const next = document.querySelector(`.binary-cell-input[data-row="${r}"][data-col="${c + 1}"]`);
        if (next) next.focus();
    } else if (event.key === 'ArrowLeft') {
        const prev = document.querySelector(`.binary-cell-input[data-row="${r}"][data-col="${c - 1}"]`);
        if (prev) prev.focus();
    } else if (event.key === 'ArrowDown') {
        const down = document.querySelector(`.binary-cell-input[data-row="${r + 1}"][data-col="${c}"]`);
        if (down) down.focus();
    } else if (event.key === 'ArrowUp') {
        const up = document.querySelector(`.binary-cell-input[data-row="${r - 1}"][data-col="${c}"]`);
        if (up) up.focus();
    } else if (event.key === 'Backspace' && event.target.value === '') {
        const prev = document.querySelector(`.binary-cell-input[data-row="${r}"][data-col="${c - 1}"]`);
        if (prev) {
            prev.focus();
            prev.value = '';
        }
    }
}

window.submitNumberRecall = function () {
    stopGame();
    window.numberGameState.recallTimeUsed = (Date.now() - window.numberGameState.recallStartTime) / 1000;

    const { grid, rows } = window.numberGameState;
    const inputs = document.querySelectorAll('.binary-cell-input');
    const userAnswers = [];
    inputs.forEach(input => {
        const r = parseInt(input.dataset.row);
        const c = parseInt(input.dataset.col);
        if (!userAnswers[r]) userAnswers[r] = [];
        userAnswers[r][c] = input.value;
    });

    let correct = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c].toString() === (userAnswers[r] && userAnswers[r][c] ? userAnswers[r][c] : '')) {
                correct++;
            }
        }
    }

    window.numberGameState.score = correct;
    window.numberGameState.userAnswers = userAnswers;
    renderNumberResults();
}

function renderNumberResults() {
    const { grid, rows, score, totalDigits, memoTimeUsed, recallTimeUsed, userAnswers } = window.numberGameState;
    const container = document.getElementById('game-container');

    let html = `
        <div class="binary-results-screen">
            <div class="binary-score-display">
                <div class="binary-score-label">SCORE</div>
                <div class="binary-score-value">${score} / ${totalDigits}</div>
                <div class="binary-time-stats">
                    <div class="binary-time-stat">
                        <div class="binary-time-label">Memo Time (s)</div>
                        <div class="binary-time-value">${memoTimeUsed.toFixed(1)}</div>
                    </div>
                    <div class="binary-time-stat">
                        <div class="binary-time-label">Recall Time (s)</div>
                        <div class="binary-time-value">${recallTimeUsed.toFixed(1)}</div>
                    </div>
                </div>
            </div>
            
            <div class="binary-game-container">
                <div class="binary-table-wrapper" style="text-align: center; padding: 2rem;">
    `;

    for (let r = 0; r < rows; r++) {
        html += `<div style="margin-bottom: 1rem;">`;
        for (let c = 0; c < grid[r].length; c++) {
            const correctVal = grid[r][c].toString();
            const userVal = (userAnswers[r] && userAnswers[r][c]) || '';
            const isCorrect = correctVal === userVal;
            const bg = isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)';
            const border = isCorrect ? '#10b981' : '#ef4444';

            html += `<span style="display:inline-block; width: 30px; height: 30px; line-height: 30px; margin: 2px; border: 1px solid ${border}; background: ${bg}; color: #fff;" title="Đúng: ${correctVal}">${userVal || '_'}</span>`;
            if ((c + 1) % 5 === 0 && c < grid[r].length - 1) html += `<span style="margin-right: 15px;"></span>`;
        }
        html += `</div>`;
    }

    html += `
                </div>
            </div>
            
            <div class="binary-action-buttons">
                <button class="binary-btn binary-btn-primary" onclick="showHomepage()">FINISH</button>
            </div>
        </div>
    `;
    container.innerHTML = html;

    if (score > 0) {
        gameScore = score;
        updateGameStats();
    }
}


// --- 2. RANDOM WORDS MEMORY GAME ---
const VNI_WORDS = ["Bảng", "Sách", "Bút", "Ghế", "Bàn", "Tủ", "Đèn", "Cửa", "Chó", "Mèo", "Chim", "Lợn", "Gà", "Vịt", "Ngựa", "Trâu", "Bò", "Gió", "Mưa", "Mây", "Nắng", "Trời", "Đất", "Nước", "Lửa", "Cây", "Hoa", "Lá", "Quả", "Rễ", "Đá", "Trăng", "Sao", "Bóng", "Gương", "Kính", "Xe", "Tàu", "Thuyền", "Máy", "Áo", "Quần", "Mũ", "Giày", "Dép", "Kiếm", "Súng", "Cung", "Tên", "Điện", "Chuột", "Bàn phím", "Màn hình", "Nhà", "Sân", "Đường", "Phố", "Chợ", "Trường", "Lớp", "Đồng", "Giấy", "Ví", "Tiền", "Thẻ", "Chữ", "Hình", "Âm", "Nhạc", "Bút chì", "Bơm", "Hộp", "Bao", "Túi", "Cốc", "Chén", "Đũa", "Thìa", "Bát", "Đĩa", "Nồi", "Chảo", "Kéo", "Dao", "Cưa", "Búa", "Kìm", "Chổi", "Rác", "Hố", "Núi", "Biển", "Sông", "Hồ", "Suối", "Rừng", "Vườn", "Ruộng", "Rơm", "Cỏ"];

function startRandomWordsGame() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="binary-config-screen">
            <div class="binary-config-title">📝 RANDOM WORDS 📝</div>
            
            <div class="config-option">
                <div class="config-label">Số lượng từ:</div>
                <input type="number" id="words-count" class="config-input" value="20" min="5" max="200" step="5">
            </div>
            
            <div class="config-option">
                <div class="config-label">Thời gian Ghi nhớ (phút):</div>
                <input type="number" id="words-memo-time" class="config-input" value="5" min="1" step="1">
            </div>
            
            <div class="config-option">
                <div class="config-label">Thời gian Hồi tưởng (phút):</div>
                <input type="number" id="words-recall-time" class="config-input" value="10" min="1" step="1">
            </div>
            
            <div class="config-buttons">
                <button class="binary-btn binary-btn-secondary" onclick="showHomepage()">⬅ BACK</button>
                <button class="binary-btn binary-btn-primary" onclick="startWordsMemorization()">▶ START</button>
            </div>
        </div>
    `;
}

window.startWordsMemorization = function () {
    const count = parseInt(document.getElementById('words-count').value) || 20;
    const memoMins = parseFloat(document.getElementById('words-memo-time').value) || 5;
    const recallMins = parseFloat(document.getElementById('words-recall-time').value) || 10;

    const words = [];
    const pool = [...VNI_WORDS];
    for (let i = 0; i < count; i++) {
        if (pool.length === 0) pool.push(...VNI_WORDS);
        const randIdx = Math.floor(Math.random() * pool.length);
        words.push(pool.splice(randIdx, 1)[0]);
    }

    window.wordsGameState = {
        words: words,
        count: count,
        memoTime: Math.floor(memoMins * 60),
        recallTime: Math.floor(recallMins * 60),
        memoStartTime: Date.now(),
        phase: 'memorization'
    };

    startTimer(Math.floor(memoMins * 60), () => window.finishWordsMemorization());
    renderWordsMemorizationPhase();
}

function renderWordsMemorizationPhase() {
    const { words } = window.wordsGameState;
    const container = document.getElementById('game-container');

    let wordsHtml = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem; text-align: left; padding: 2rem;">`;
    words.forEach((w, i) => {
        wordsHtml += `<div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 8px; font-size: 1.2rem; color: #fff;">
            <span style="color: #f9ca24; font-weight: bold; margin-right: 10px;">${i + 1}.</span>${w}
        </div>`;
    });
    wordsHtml += `</div>`;

    container.innerHTML = `
        <div class="binary-game-container">
            <div class="binary-game-header">
                <div>
                    <div class="binary-stage-title">RANDOM WORDS</div>
                    <div style="color: #10b981; font-weight: 600;">MEMORIZATION STAGE</div>
                </div>
                <div class="binary-timer" id="binary-display-timer">--:--</div>
            </div>
            <div class="binary-table-wrapper">
                ${wordsHtml}
            </div>
            <div class="binary-action-buttons">
                <button class="binary-btn binary-btn-secondary" onclick="showHomepage()">BACK</button>
                <button class="binary-btn binary-btn-primary" onclick="finishWordsMemorization()">FINISH MEMO</button>
            </div>
        </div>
    `;
}

window.finishWordsMemorization = function () {
    window.wordsGameState.memoTimeUsed = (Date.now() - window.wordsGameState.memoStartTime) / 1000;
    window.wordsGameState.recallStartTime = Date.now();
    startTimer(window.wordsGameState.recallTime, () => window.submitWordsRecall());
    renderWordsRecallPhase();
}

function renderWordsRecallPhase() {
    const { count } = window.wordsGameState;
    const container = document.getElementById('game-container');

    let wordsHtml = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; text-align: left; padding: 2rem;">`;
    for (let i = 0; i < count; i++) {
        wordsHtml += `
            <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px;">
                <span style="color: #f9ca24; font-weight: bold; margin-right: 5px;">${i + 1}.</span>
                <input type="text" class="word-input" data-idx="${i}" style="width: 130px; padding: 5px; border-radius: 4px; border: none; outline: none; background: rgba(255,255,255,0.9);" />
            </div>
        `;
    }
    wordsHtml += `</div>`;

    container.innerHTML = `
        <div class="binary-game-container">
             <div class="binary-game-header">
                <div>
                    <div class="binary-stage-title">RANDOM WORDS</div>
                    <div style="color: #f59e0b; font-weight: 600;">RECALL STAGE</div>
                </div>
                <div class="binary-timer" id="binary-display-timer">--:--</div>
            </div>
            <div class="binary-table-wrapper">
                ${wordsHtml}
            </div>
            <div class="binary-action-buttons">
                <button class="binary-btn binary-btn-secondary" onclick="showHomepage()">BACK</button>
                <button class="binary-btn binary-btn-primary" onclick="submitWordsRecall()">FINISH</button>
            </div>
        </div>
    `;
}

window.submitWordsRecall = function () {
    stopGame();
    window.wordsGameState.recallTimeUsed = (Date.now() - window.wordsGameState.recallStartTime) / 1000;
    const { words } = window.wordsGameState;
    const inputs = document.querySelectorAll('.word-input');
    let correct = 0;
    const userAnswers = [];

    inputs.forEach(input => {
        const idx = parseInt(input.dataset.idx);
        const ans = input.value.trim();
        userAnswers[idx] = ans;
        if (ans.toLowerCase() === words[idx].toLowerCase()) {
            correct++;
        }
    });

    window.wordsGameState.score = correct;
    window.wordsGameState.userAnswers = userAnswers;
    renderWordsResults();
}

function renderWordsResults() {
    const { words, count, score, memoTimeUsed, recallTimeUsed, userAnswers } = window.wordsGameState;
    const container = document.getElementById('game-container');

    let wordsHtml = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; text-align: left; padding: 2rem;">`;
    words.forEach((w, i) => {
        const isCorrect = userAnswers[i].toLowerCase() === w.toLowerCase();
        const color = isCorrect ? '#10b981' : '#ef4444';
        wordsHtml += `
            <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 8px; border-left: 4px solid ${color}; color: #fff;">
                <span style="color: #f9ca24; font-weight: bold; margin-right: 5px;">${i + 1}.</span>
                <s>${userAnswers[i] || 'Blank'}</s> <strong style="color: #a5b4fc;">${w}</strong>
            </div>
        `;
    });
    wordsHtml += `</div>`;

    container.innerHTML = `
        <div class="binary-results-screen">
             <div class="binary-score-display">
                <div class="binary-score-label">SCORE</div>
                <div class="binary-score-value">${score} / ${count}</div>
            </div>
            <div class="binary-game-container">
                <div class="binary-table-wrapper">
                    ${wordsHtml}
                </div>
            </div>
            <div class="binary-action-buttons">
                <button class="binary-btn binary-btn-primary" onclick="showHomepage()">FINISH</button>
            </div>
        </div>
    `;
    if (score > 0) {
        gameScore = score * 5;
        updateGameStats();
    }
}

// --- 3. HISTORICAL EVENTS MEMORY GAME ---
const HISTORICAL_EVENTS = [
    { year: 248, event: "Khởi nghĩa Bà Triệu" },
    { year: 544, event: "Lý Bí lên ngôi, lập nước Vạn Xuân" },
    { year: 938, event: "Trận Bạch Đằng, Ngô Quyền đánh tan quân Nam Hán" },
    { year: 968, event: "Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, lập nước Đại Cồ Việt" },
    { year: 981, event: "Lê Hoàn đánh bại quân Tống" },
    { year: 1010, event: "Lý Thái Tổ dời đô về Thăng Long" },
    { year: 1077, event: "Kháng chiến chống Tống thắng lợi trên sông Như Nguyệt" },
    { year: 1226, event: "Nhà Trần được thành lập" },
    { year: 1288, event: "Trận Bạch Đằng, đánh tan quân Nguyên Mông lần 3" },
    { year: 1400, event: "Hồ Quý Ly lên ngôi, lập nước Đại Ngu" },
    { year: 1427, event: "Khởi nghĩa Lam Sơn thắng lợi" },
    { year: 1789, event: "Trận Ngọc Hồi - Đống Đa, Quang Trung đại phá quân Thanh" },
    { year: 1858, event: "Pháp nổ súng đánh Đà Nẵng, mở đầu cuộc xâm lược" },
    { year: 1930, event: "Thành lập Đảng Cộng sản Việt Nam" },
    { year: 1945, event: "Bác Hồ đọc Tuyên ngôn Độc lập, khai sinh nước VNDCCH" },
    { year: 1954, event: "Chiến thắng Điện Biên Phủ" },
    { year: 1975, event: "Giải phóng miền Nam, thống nhất đất nước" },
    { year: 1986, event: "Đại hội VI của Đảng đề ra đường lối đổi mới" },
    { year: 1070, event: "Văn Miếu được xây dựng" },
    { year: 1258, event: "Kháng chiến chống Mông Cổ lần 1" }
];

function startHistoricalEventsGame() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="binary-config-screen">
            <div class="binary-config-title">🏛️ HISTORICAL EVENTS 🏛️</div>
            
            <div class="config-option">
                <div class="config-label">Số lượng sự kiện:</div>
                <input type="number" id="events-count" class="config-input" value="10" min="5" max="100" step="5">
            </div>
            
            <div class="config-option">
                <div class="config-label">Thời gian Ghi nhớ (phút):</div>
                <input type="number" id="events-memo-time" class="config-input" value="5" min="1" step="1">
            </div>
            
            <div class="config-option">
                <div class="config-label">Thời gian Hồi tưởng (phút):</div>
                <input type="number" id="events-recall-time" class="config-input" value="5" min="1" step="1">
            </div>
            
            <div class="config-buttons">
                <button class="binary-btn binary-btn-secondary" onclick="showHomepage()">⬅ BACK</button>
                <button class="binary-btn binary-btn-primary" onclick="startEventsMemorization()">▶ START</button>
            </div>
        </div>
    `;
}

window.startEventsMemorization = function () {
    const count = parseInt(document.getElementById('events-count').value) || 10;
    const memoMins = parseFloat(document.getElementById('events-memo-time').value) || 5;
    const recallMins = parseFloat(document.getElementById('events-recall-time').value) || 5;

    const events = [];
    const pool = [...HISTORICAL_EVENTS];
    for (let i = 0; i < count; i++) {
        if (pool.length === 0) pool.push(...HISTORICAL_EVENTS);
        const randIdx = Math.floor(Math.random() * pool.length);
        events.push(pool.splice(randIdx, 1)[0]);
    }

    window.eventsGameState = {
        events: events,
        count: count,
        memoTime: Math.floor(memoMins * 60),
        recallTime: Math.floor(recallMins * 60),
        memoStartTime: Date.now(),
        phase: 'memorization'
    };

    startTimer(Math.floor(memoMins * 60), () => window.finishEventsMemorization());
    renderEventsMemorizationPhase();
}

function renderEventsMemorizationPhase() {
    const { events } = window.eventsGameState;
    const container = document.getElementById('game-container');

    let html = `<div style="max-width: 800px; margin: 0 auto; text-align: left; padding: 2rem;">`;
    events.forEach((ev, i) => {
        html += `<div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; font-size: 1.2rem; color: #fff; margin-bottom: 10px; display: flex;">
            <div style="flex: 0 0 80px; color: #f9ca24; font-weight: bold; font-size: 1.4rem;">${ev.year}</div>
            <div style="flex: 1;">${ev.event}</div>
        </div>`;
    });
    html += `</div>`;

    container.innerHTML = `
        <div class="binary-game-container">
            <div class="binary-game-header">
                <div>
                    <div class="binary-stage-title">HISTORICAL EVENTS</div>
                    <div style="color: #10b981; font-weight: 600;">MEMORIZATION STAGE</div>
                </div>
                <div class="binary-timer" id="binary-display-timer">--:--</div>
            </div>
            <div class="binary-table-wrapper">
                ${html}
            </div>
            <div class="binary-action-buttons">
                <button class="binary-btn binary-btn-secondary" onclick="showHomepage()">BACK</button>
                <button class="binary-btn binary-btn-primary" onclick="finishEventsMemorization()">FINISH MEMO</button>
            </div>
        </div>
    `;
}

window.finishEventsMemorization = function () {
    window.eventsGameState.memoTimeUsed = (Date.now() - window.eventsGameState.memoStartTime) / 1000;
    window.eventsGameState.recallStartTime = Date.now();
    startTimer(window.eventsGameState.recallTime, () => window.submitEventsRecall());

    window.eventsGameState.shuffledEvents = [...window.eventsGameState.events].sort(() => 0.5 - Math.random());

    renderEventsRecallPhase();
}

function renderEventsRecallPhase() {
    const { shuffledEvents } = window.eventsGameState;
    const container = document.getElementById('game-container');

    let html = `<div style="max-width: 800px; margin: 0 auto; text-align: left; padding: 2rem;">
        <p style="color: #a5b4fc; margin-bottom: 20px; text-align: center;">Nhập năm diễn ra sự kiện (Bỏ trống nếu không nhớ).</p>
    `;
    shuffledEvents.forEach((ev, i) => {
        html += `<div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 10px; display: flex; align-items: center;">
            <div style="flex: 0 0 100px;">
                <input type="number" class="event-input" data-idx="${i}" style="width: 80px; padding: 8px; border-radius: 4px; border: none; outline: none; font-size: 1.2rem; text-align: center; font-weight: bold; color: #333;" placeholder="Năm" />
            </div>
            <div style="flex: 1; color: #fff; font-size: 1.2rem;">${ev.event}</div>
        </div>`;
    });
    html += `</div>`;

    container.innerHTML = `
        <div class="binary-game-container">
             <div class="binary-game-header">
                <div>
                    <div class="binary-stage-title">HISTORICAL EVENTS</div>
                    <div style="color: #f59e0b; font-weight: 600;">RECALL STAGE</div>
                </div>
                <div class="binary-timer" id="binary-display-timer">--:--</div>
            </div>
            <div class="binary-table-wrapper">
                ${html}
            </div>
            <div class="binary-action-buttons">
                <button class="binary-btn binary-btn-secondary" onclick="showHomepage()">BACK</button>
                <button class="binary-btn binary-btn-primary" onclick="submitEventsRecall()">FINISH</button>
            </div>
        </div>
    `;
}

window.submitEventsRecall = function () {
    stopGame();
    window.eventsGameState.recallTimeUsed = (Date.now() - window.eventsGameState.recallStartTime) / 1000;
    const { shuffledEvents } = window.eventsGameState;
    const inputs = document.querySelectorAll('.event-input');
    let correct = 0;
    const userAnswers = [];

    inputs.forEach((input, i) => {
        const val = parseInt(input.value);
        userAnswers[i] = val;
        if (val === shuffledEvents[i].year) {
            correct++;
        }
    });

    window.eventsGameState.score = correct;
    window.eventsGameState.userAnswers = userAnswers;
    renderEventsResults();
}

function renderEventsResults() {
    const { shuffledEvents, count, score, userAnswers } = window.eventsGameState;
    const container = document.getElementById('game-container');

    let html = `<div style="max-width: 800px; margin: 0 auto; text-align: left; padding: 2rem;">`;
    shuffledEvents.forEach((ev, i) => {
        const isCorrect = userAnswers[i] === ev.year;
        const color = isCorrect ? '#10b981' : '#ef4444';
        html += `<div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; border-left: 5px solid ${color}; margin-bottom: 10px; display: flex; flex-direction: column;">
            <div style="color: #fff; font-size: 1.2rem; margin-bottom: 5px;">${ev.event}</div>
            <div style="display: flex; gap: 20px;">
                <div style="color: #fca5a5;">Bạn trả lời: <strong style="font-size: 1.2rem; text-decoration: ${isCorrect ? 'none' : 'line-through'};">${isNaN(userAnswers[i]) ? 'Trống' : userAnswers[i]}</strong></div>
                ${!isCorrect ? '<div style="color: #6ee7b7;">Đáp án: <strong style="font-size: 1.2rem;">' + ev.year + '</strong></div>' : ''}
            </div>
        </div>`;
    });
    html += `</div>`;

    container.innerHTML = `
        <div class="binary-results-screen">
             <div class="binary-score-display">
                <div class="binary-score-label">SCORE</div>
                <div class="binary-score-value">${score} / ${count}</div>
            </div>
            <div class="binary-game-container">
                <div class="binary-table-wrapper">
                    ${html}
                </div>
            </div>
            <div class="binary-action-buttons">
                <button class="binary-btn binary-btn-primary" onclick="showHomepage()">FINISH</button>
            </div>
        </div>
    `;
    if (score > 0) {
        gameScore = score * 10;
        updateGameStats();
    }
}

// --- 4. RANDOM POETRY MEMORY GAME ---
const POEMS = [
    {
        title: "Nam Quốc Sơn Hà",
        lines: [
            "Nam quốc sơn hà Nam đế cư",
            "Tiệt nhiên định phận tại thiên thư",
            "Như hà nghịch lỗ lai xâm phạm",
            "Nhữ đẳng hành khan thủ bại hư."
        ]
    },
    {
        title: "Qua Đèo Ngang",
        lines: [
            "Bước tới Đèo Ngang, bóng xế tà",
            "Cỏ cây chen đá, lá chen hoa",
            "Lom khom dưới núi, tiều vài chú",
            "Lác đác bên sông, chợ mấy nhà",
            "Nhớ nước đau lòng, con quốc quốc",
            "Thương nhà mỏi miệng, cái gia gia",
            "Dừng chân đứng lại, trời, non, nước",
            "Một mảnh tình riêng, ta với ta."
        ]
    },
    {
        title: "Sóng (Xuân Quỳnh) - Trích",
        lines: [
            "Dữ dội và dịu êm",
            "Ồn ào và lặng lẽ",
            "Sông không hiểu nổi mình",
            "Sóng tìm ra tận bể",
            "Ôi con sóng ngày xưa",
            "Và ngày sau vẫn thế",
            "Nỗi khát vọng tình yêu",
            "Bồi hồi trong ngực trẻ"
        ]
    }
];

function startRandomPoetryGame() {
    const container = document.getElementById('game-container');
    let options = POEMS.map((p, i) => '<option value="' + i + '">' + p.title + '</option>').join('');
    options += '<option value="random" selected>Ngẫu nhiên</option>';

    container.innerHTML = `
        <div class="binary-config-screen">
            <div class="binary-config-title">📜 POETRY MEMORY 📜</div>
            
            <div class="config-option">
                <div class="config-label">Chọn bài thơ:</div>
                <select id="poem-select" class="config-input">
                    ${options}
                </select>
            </div>
            
            <div class="config-option">
                <div class="config-label">Thời gian Ghi nhớ (phút):</div>
                <input type="number" id="poetry-memo-time" class="config-input" value="3" min="1" step="1">
            </div>
            
            <div class="config-option">
                <div class="config-label">Thời gian Hồi tưởng (phút):</div>
                <input type="number" id="poetry-recall-time" class="config-input" value="5" min="1" step="1">
            </div>
            
            <div class="config-buttons">
                <button class="binary-btn binary-btn-secondary" onclick="showHomepage()">⬅ BACK</button>
                <button class="binary-btn binary-btn-primary" onclick="startPoetryMemorization()">▶ START</button>
            </div>
        </div>
    `;
}

window.startPoetryMemorization = function () {
    let titleIdx = document.getElementById('poem-select').value;
    if (titleIdx === 'random') {
        titleIdx = Math.floor(Math.random() * POEMS.length);
    }
    const poem = POEMS[titleIdx];
    const memoMins = parseFloat(document.getElementById('poetry-memo-time').value) || 3;
    const recallMins = parseFloat(document.getElementById('poetry-recall-time').value) || 5;

    window.poetryGameState = {
        poem: poem,
        memoTime: Math.floor(memoMins * 60),
        recallTime: Math.floor(recallMins * 60),
        memoStartTime: Date.now(),
        phase: 'memorization'
    };

    startTimer(Math.floor(memoMins * 60), () => window.finishPoetryMemorization());
    renderPoetryMemorizationPhase();
}

function renderPoetryMemorizationPhase() {
    const { poem } = window.poetryGameState;
    const container = document.getElementById('game-container');

    let html = '<div style="max-width: 600px; margin: 0 auto; text-align: center; padding: 2rem;">' +
        '<h2 style="color: #f9ca24; margin-bottom: 2rem; font-size: 2rem; text-transform: uppercase;">' + poem.title + '</h2>';
    poem.lines.forEach(line => {
        html += '<p style="color: #fff; font-size: 1.5rem; margin-bottom: 10px; line-height: 1.6;">' + line + '</p>';
    });
    html += '</div>';

    container.innerHTML = `
        <div class="binary-game-container">
            <div class="binary-game-header">
                <div>
                    <div class="binary-stage-title">POETRY MEMORY</div>
                    <div style="color: #10b981; font-weight: 600;">MEMORIZATION STAGE</div>
                </div>
                <div class="binary-timer" id="binary-display-timer">--:--</div>
            </div>
            <div class="binary-table-wrapper" style="background: rgba(0,0,0,0.3); border-radius: 10px; margin: 20px;">
                ${html}
            </div>
            <div class="binary-action-buttons">
                <button class="binary-btn binary-btn-secondary" onclick="showHomepage()">BACK</button>
                <button class="binary-btn binary-btn-primary" onclick="finishPoetryMemorization()">FINISH MEMO</button>
            </div>
        </div>
    `;
}

window.finishPoetryMemorization = function () {
    window.poetryGameState.memoTimeUsed = (Date.now() - window.poetryGameState.memoStartTime) / 1000;
    window.poetryGameState.recallStartTime = Date.now();

    // Prepare blanked lines
    const blankedLines = [];
    const { poem } = window.poetryGameState;
    let totalBlanks = 0;

    poem.lines.forEach(line => {
        const words = line.split(' ');
        const numBlanks = Math.max(1, Math.floor(words.length / 3));
        let blankIndices = [];
        while (blankIndices.length < numBlanks) {
            let r = Math.floor(Math.random() * words.length);
            if (!blankIndices.includes(r)) blankIndices.push(r);
        }

        let newLineHtml = [];
        words.forEach((w, i) => {
            if (blankIndices.includes(i)) {
                // remove trailing punctuation for answer
                const cleanWord = w.replace(/[.,;!?:()]/g, '');
                const punct = w.substring(cleanWord.length);
                newLineHtml.push('<input type="text" class="poetry-input" data-ans="' + cleanWord.toLowerCase() + '" style="width: ' + (cleanWord.length * 15 + 20) + 'px; border-bottom: 2px solid #ccc; border-top: none; border-left: none; border-right: none; background: transparent; color: #f9ca24; font-size: 1.4rem; font-weight: bold; text-align: center; margin: 0 5px;" />' + punct);
                totalBlanks++;
            } else {
                newLineHtml.push(w);
            }
        });
        blankedLines.push(newLineHtml.join(' '));
    });

    window.poetryGameState.blankedLines = blankedLines;
    window.poetryGameState.totalBlanks = totalBlanks;

    startTimer(window.poetryGameState.recallTime, () => window.submitPoetryRecall());
    renderPoetryRecallPhase();
}

function renderPoetryRecallPhase() {
    const { poem, blankedLines } = window.poetryGameState;
    const container = document.getElementById('game-container');

    let html = '<div style="max-width: 800px; margin: 0 auto; text-align: center; padding: 2rem;">' +
        '<h2 style="color: #f59e0b; margin-bottom: 2rem; font-size: 2rem; text-transform: uppercase;">' + poem.title + '</h2>';
    blankedLines.forEach(lineHtml => {
        html += '<p style="color: #fff; font-size: 1.5rem; margin-bottom: 20px; line-height: 2;">' + lineHtml + '</p>';
    });
    html += '</div>';

    container.innerHTML = `
        <div class="binary-game-container">
             <div class="binary-game-header">
                <div>
                    <div class="binary-stage-title">POETRY MEMORY</div>
                    <div style="color: #f59e0b; font-weight: 600;">RECALL STAGE</div>
                </div>
                <div class="binary-timer" id="binary-display-timer">--:--</div>
            </div>
            <div class="binary-table-wrapper" style="background: rgba(0,0,0,0.3); border-radius: 10px; margin: 20px;">
                ${html}
            </div>
            <div class="binary-action-buttons">
                <button class="binary-btn binary-btn-secondary" onclick="showHomepage()">BACK</button>
                <button class="binary-btn binary-btn-primary" onclick="submitPoetryRecall()">FINISH</button>
            </div>
        </div>
    `;
}

window.submitPoetryRecall = function () {
    stopGame();
    window.poetryGameState.recallTimeUsed = (Date.now() - window.poetryGameState.recallStartTime) / 1000;
    const inputs = document.querySelectorAll('.poetry-input');
    let correct = 0;

    inputs.forEach(input => {
        const val = input.value.trim().toLowerCase();
        const ans = input.dataset.ans.toLowerCase();

        // Remove accents for lenient comparison
        const removeAccents = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (removeAccents(val) === removeAccents(ans)) {
            correct++;
            input.dataset.status = 'correct';
            input.dataset.userVal = input.value;
        } else {
            input.dataset.status = 'wrong';
            input.dataset.userVal = input.value;
        }
    });

    window.poetryGameState.score = correct;
    renderPoetryResults();
}

function renderPoetryResults() {
    const { poem, totalBlanks, score, memoTimeUsed, recallTimeUsed } = window.poetryGameState;
    const container = document.getElementById('game-container');

    // Create new copy of blanked lines but populated with answers
    const inputs = document.querySelectorAll('.poetry-input');
    let inputIdx = 0;
    let html = '<div style="max-width: 800px; margin: 0 auto; text-align: center; padding: 2rem;">' +
        '<h2 style="color: #10b981; margin-bottom: 2rem; font-size: 2rem; text-transform: uppercase;">' + poem.title + '</h2>';
    const blankedLines = [...window.poetryGameState.blankedLines];

    window.poetryGameState.poem.lines.forEach(line => {
        let finalLineHtml = "";
        const words = line.split(' ');
        words.forEach(w => {
            const cleanWord = w.replace(/[.,;!?:()]/g, '');
            const punct = w.substring(cleanWord.length);

            if (inputIdx < inputs.length && inputs[inputIdx].dataset.ans.toLowerCase() === cleanWord.toLowerCase()) {
                const inp = inputs[inputIdx];
                const isCorrect = inp.dataset.status === 'correct';
                const userVal = inp.dataset.userVal || '(Trống)';
                if (isCorrect) {
                    finalLineHtml += '<span style="color:#10b981; font-weight:bold; border-bottom: 2px solid #10b981; margin: 0 4px;">' + w + '</span> ';
                } else {
                    finalLineHtml += '<span style="color:#ef4444; text-decoration:line-through; margin: 0 2px;">' + userVal + '</span><span style="color:#f59e0b; font-weight:bold; margin: 0 2px;">' + w + '</span> ';
                }
                inputIdx++;
            } else {
                finalLineHtml += w + " ";
            }
        });
        html += '<p style="color: #fff; font-size: 1.5rem; margin-bottom: 15px; line-height: 1.8;">' + finalLineHtml + '</p>';
    });
    html += '</div>';

    container.innerHTML = `
        <div class="binary-results-screen">
             <div class="binary-score-display">
                <div class="binary-score-label">SCORE</div>
                <div class="binary-score-value">${score} / ${totalBlanks}</div>
            </div>
            <div class="binary-game-container">
                <div class="binary-table-wrapper" style="background: rgba(0,0,0,0.3); border-radius: 10px; margin: 20px;">
                    ${html}
                </div>
            </div>
            <div class="binary-action-buttons">
                <button class="binary-btn binary-btn-primary" onclick="showHomepage()">FINISH</button>
            </div>
        </div>
    `;

    if (score > 0) {
        gameScore = score * 5;
        updateGameStats();
    }
}
