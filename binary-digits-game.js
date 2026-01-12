// ============================================
// BINARY DIGITS GAME - MEMORAD STYLE
// Complete implementation matching Memorad interface
// ============================================

function startBinaryDigitsGame() {
    // Show config screen first
    showBinaryConfigScreen();
}

function showBinaryConfigScreen() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="binary-config-screen">
            <div class="binary-config-title">⚡ BINARY DIGITS ⚡</div>
            
            <div class="config-option">
                <div class="config-label">Số hàng (Rows):</div>
                <input type="number" id="binary-rows" class="config-input" value="25" min="5" max="50">
            </div>
            
            <div class="config-option">
                <div class="config-label">Thời gian Ghi nhớ (phút):</div>
                <input type="number" id="binary-memo-time" class="config-input" value="5" min="1" max="30">
            </div>
            
            <div class="config-option">
                <div class="config-label">Thời gian Hồi tưởng (phút):</div>
                <input type="number" id="binary-recall-time" class="config-input" value="15" min="5" max="60">
            </div>
            
            <div class="config-buttons">
                <button class="binary-btn binary-btn-secondary" onclick="showHomepage()">⬅ BACK</button>
                <button class="binary-btn binary-btn-primary" onclick="startBinaryMemorization()">▶ START</button>
            </div>
        </div>
    `;
}

window.startBinaryMemorization = function () {
    // Get config values
    const rows = parseInt(document.getElementById('binary-rows').value) || 25;
    const memoMins = parseInt(document.getElementById('binary-memo-time').value) || 5;
    const recallMins = parseInt(document.getElementById('binary-recall-time').value) || 15;

    // Generate binary grid (25 rows x 30 columns)
    const cols = 30; // Fixed 30 columns (5 pages x 6 cols)
    const grid = [];
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
            row.push(Math.random() > 0.5 ? 1 : 0);
        }
        grid.push(row);
    }

    // Store game state globally
    window.binaryGameState = {
        grid: grid,
        rows: rows,
        cols: cols,
        memoTime: memoMins * 60,
        recallTime: recallMins * 60,
        memoStartTime: Date.now(),
        recallStartTime: null,
        phase: 'memorization',
        currentRow: 0,
        currentCol: 0
    };

    // Start memo timer
    startTimer(memoMins * 60, () => {
        window.finishBinaryMemorization();
    });

    renderBinaryMemorizationPhase();
}

function renderBinaryMemorizationPhase() {
    const { grid, rows, cols } = window.binaryGameState;
    const container = document.getElementById('game-container');

    let html = `
        <div class="binary-game-container">
            <div class="binary-game-header">
                <div>
                    <div class="binary-stage-title">BINARY DIGITS</div>
                    <div style="color: #10b981; font-weight: 600; margin-top: 0.5rem;">MEMORIZATION STAGE</div>
                </div>
                <div class="binary-timer" id="binary-display-timer">--:--</div>
            </div>
            
            <div class="binary-table-wrapper">
                <table class="binary-table">
                    <thead>
                        <tr class="binary-page-header">
                            <th class="row-num-header"></th>
                            <th colspan="6">Page 1</th>
                            <th colspan="6">Page 2</th>
                            <th colspan="6">Page 3</th>
                            <th colspan="6">Page 4</th>
                            <th colspan="6">Page 5</th>
                        </tr>
                        <tr class="binary-col-header">
                            <th></th>
                            ${generateColumnHeaders()}
                        </tr>
                    </thead>
                    <tbody>
    `;

    for (let r = 0; r < rows; r++) {
        html += `<tr>`;
        html += `<td class="binary-row-num">${r + 1}</td>`;

        for (let c = 0; c < cols; c++) {
            const val = grid[r][c];
            html += `<td><div class="binary-cell-content ${val === 1 ? 'one' : 'zero'}">${val}</div></td>`;
        }
        html += `</tr>`;
    }

    html += `
                    </tbody>
                </table>
            </div>
            
            <div class="binary-action-buttons">
                <button class="binary-btn binary-btn-secondary" onclick="showHomepage()">BACK</button>
                <button class="binary-btn binary-btn-primary" onclick="finishBinaryMemorization()">FINISH MEMO</button>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

function generateColumnHeaders() {
    let headers = '';
    for (let page = 0; page < 5; page++) {
        for (let col = 1; col <= 6; col++) {
            headers += `<th>${col}</th>`;
        }
    }
    return headers;
}

window.finishBinaryMemorization = function () {
    // Record memo time
    const memoTimeSpent = (Date.now() - window.binaryGameState.memoStartTime) / 1000;
    window.binaryGameState.memoTimeUsed = memoTimeSpent;
    window.binaryGameState.recallStartTime = Date.now();
    window.binaryGameState.phase = 'recall';

    // Start recall timer
    const recallMins = window.binaryGameState.recallTime / 60;
    startTimer(window.binaryGameState.recallTime, () => {
        window.submitBinaryRecall();
    });

    renderBinaryRecallPhase();
}

function renderBinaryRecallPhase() {
    const { rows, cols } = window.binaryGameState;
    const container = document.getElementById('game-container');

    let html = `
        <div class="binary-game-container">
            <div class="binary-game-header">
                <div>
                    <div class="binary-stage-title">BINARY DIGITS</div>
                    <div style="color: #f59e0b; font-weight: 600; margin-top: 0.5rem;">RECALL STAGE</div>
                </div>
                <div class="binary-timer" id="binary-display-timer">--:--</div>
            </div>
            
            <div class="binary-table-wrapper">
                <table class="binary-table">
                    <thead>
                        <tr class="binary-page-header">
                            <th class="row-num-header"></th>
                            <th colspan="6">Page 1</th>
                            <th colspan="6">Page 2</th>
                            <th colspan="6">Page 3</th>
                            <th colspan="6">Page 4</th>
                            <th colspan="6">Page 5</th>
                        </tr>
                        <tr class="binary-col-header">
                            <th></th>
                            ${generateColumnHeaders()}
                        </tr>
                    </thead>
                    <tbody>
    `;

    for (let r = 0; r < rows; r++) {
        html += `<tr>`;
        html += `<td class="binary-row-num">${r + 1}</td>`;

        for (let c = 0; c < cols; c++) {
            const isFirst = (r === 0 && c === 0);
            html += `
                <td>
                    <input type="text" 
                        class="binary-cell-input" 
                        data-row="${r}" 
                        data-col="${c}"
                        maxlength="1"
                        ${isFirst ? 'id="binary-first-input"' : ''}
                        oninput="handleBinaryInputMemorad(this, ${r}, ${c})"
                        onkeydown="handleBinaryNavMemorad(event, ${r}, ${c})">
                </td>
            `;
        }
        html += `</tr>`;
    }

    html += `
                    </tbody>
                </table>
            </div>
            
            <div class="binary-action-buttons">
                <button class="binary-btn binary-btn-secondary" onclick="showHomepage()">BACK</button>
                <button class="binary-btn binary-btn-primary" onclick="submitBinaryRecall()">FINISH</button>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Focus first input
    setTimeout(() => {
        const firstInput = document.getElementById('binary-first-input');
        if (firstInput) firstInput.focus();
    }, 100);
}

window.handleBinaryInputMemorad = function (input, r, c) {
    const val = input.value.toLowerCase();

    // Only allow 0 or 1
    if (val !== '0' && val !== '1' && val !== '') {
        input.value = '';
        return;
    }

    // Auto-advance to next cell
    if (val === '0' || val === '1') {
        const { rows, cols } = window.binaryGameState;
        let nextR = r;
        let nextC = c + 1;

        if (nextC >= cols) {
            nextC = 0;
            nextR = r + 1;
        }

        if (nextR < rows) {
            const nextInput = document.querySelector(`.binary-cell-input[data-row="${nextR}"][data-col="${nextC}"]`);
            if (nextInput) {
                setTimeout(() => nextInput.focus(), 10);
            }
        }
    }
}

window.handleBinaryNavMemorad = function (event, r, c) {
    const { rows, cols } = window.binaryGameState;

    if (event.key === 'ArrowRight') {
        event.preventDefault();
        const next = document.querySelector(`.binary-cell-input[data-row="${r}"][data-col="${c + 1}"]`);
        if (next) next.focus();
    } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        const prev = document.querySelector(`.binary-cell-input[data-row="${r}"][data-col="${c - 1}"]`);
        if (prev) prev.focus();
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        const down = document.querySelector(`.binary-cell-input[data-row="${r + 1}"][data-col="${c}"]`);
        if (down) down.focus();
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        const up = document.querySelector(`.binary-cell-input[data-row="${r - 1}"][data-col="${c}"]`);
        if (up) up.focus();
    } else if (event.key === 'Backspace' && event.target.value === '') {
        event.preventDefault();
        const prev = document.querySelector(`.binary-cell-input[data-row="${r}"][data-col="${c - 1}"]`);
        if (prev) {
            prev.focus();
            prev.value = '';
        }
    }
}

window.submitBinaryRecall = function () {
    stopGame(); // Stop timer

    // Calculate time used
    const recallTimeSpent = (Date.now() - window.binaryGameState.recallStartTime) / 1000;
    window.binaryGameState.recallTimeUsed = recallTimeSpent;

    // Collect answers
    const { grid, rows, cols } = window.binaryGameState;
    const inputs = document.querySelectorAll('.binary-cell-input');
    const userAnswers = [];

    inputs.forEach(input => {
        const r = parseInt(input.dataset.row);
        const c = parseInt(input.dataset.col);
        if (!userAnswers[r]) userAnswers[r] = [];
        userAnswers[r][c] = input.value;
    });

    // Calculate score
    let correct = 0;
    let total = rows * cols;
    let correctRows = 0;

    for (let r = 0; r < rows; r++) {
        let rowPerfect = true;
        for (let c = 0; c < cols; c++) {
            const correctVal = grid[r][c].toString();
            const userVal = (userAnswers[r] && userAnswers[r][c]) || '';
            if (correctVal === userVal) {
                correct++;
            } else {
                rowPerfect = false;
            }
        }
        if (rowPerfect) correctRows++;
    }

    window.binaryGameState.score = correct;
    window.binaryGameState.correctRows = correctRows;
    window.binaryGameState.userAnswers = userAnswers;

    renderBinaryResults();
}

function renderBinaryResults() {
    const { grid, rows, cols, score, correctRows, memoTimeUsed, recallTimeUsed, userAnswers } = window.binaryGameState;
    const container = document.getElementById('game-container');
    const total = rows * cols;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    let html = `
        <div class="binary-results-screen">
            <div class="binary-score-display">
                <div class="binary-score-label">SCORE</div>
                <div class="binary-score-value">${score}</div>
                <div class="binary-time-stats">
                    <div class="binary-time-stat">
                        <div class="binary-time-label">Memorization Time (sec.)</div>
                        <div class="binary-time-value">${memoTimeUsed.toFixed(2)}</div>
                    </div>
                    <div class="binary-time-stat">
                        <div class="binary-time-label">Recall Time (sec.)</div>
                        <div class="binary-time-value">${recallTimeUsed.toFixed(2)}</div>
                    </div>
                </div>
            </div>
            
            <div class="binary-game-container">
                <div class="binary-table-wrapper">
                    <table class="binary-table">
                        <thead>
                            <tr class="binary-page-header">
                                <th class="row-num-header"></th>
                                <th colspan="6">Page 1</th>
                                <th colspan="6">Page 2</th>
                                <th colspan="6">Page 3</th>
                                <th colspan="6">Page 4</th>
                                <th colspan="6">Page 5</th>
                            </tr>
                            <tr class="binary-col-header">
                                <th></th>
                                ${generateColumnHeaders()}
                            </tr>
                        </thead>
                        <tbody>
    `;

    for (let r = 0; r < rows; r++) {
        html += `<tr>`;
        html += `<td class="binary-row-num">${r + 1}</td>`;

        for (let c = 0; c < cols; c++) {
            const correctVal = grid[r][c].toString();
            const userVal = (userAnswers[r] && userAnswers[r][c]) || '';
            const isCorrect = correctVal === userVal;
            const cellClass = isCorrect ? 'binary-cell-correct' : (userVal === '' ? 'binary-cell-empty-wrong' : 'binary-cell-wrong');
            const displayVal = userVal || '_';

            html += `<td><div class="${cellClass}" title="Đúng: ${correctVal}">${displayVal}</div></td>`;
        }
        html += `</tr>`;
    }

    html += `
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="binary-action-buttons">
                <button class="binary-btn binary-btn-primary" onclick="showHomepage()">FINISH</button>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Save score
    if (score > 0) {
        gameScore = score;
        updateGameStats();
        saveScore('binary-digits', score);
    }
}
