// 🧠 Siêu Trí Nhớ - Game Implementations (Optimized)

let currentQuestion = null;
let gameInterval = null;

// ==========================================
// 1. BEGINNER GAMES
// ==========================================

// Game 1: Image to Number
function startImageToNumberGame() {
    gameResults = { correct: [], wrong: [], questions: [] };

    // Difficulty adjustments
    let timeLimit = 120;
    if (gameSettings.difficulty === 'hard') timeLimit = 60;
    if (gameSettings.difficulty === 'easy') timeLimit = 300;

    startTimer(timeLimit, () => {
        stopGame();
    });
    nextImageToNumberQuestion();
}

// Game 30: Loci Castle (New)
function startLociCastleGame() {
    gameResults = { correct: [], wrong: [], questions: [] };

    const castleImage = 'memory_palace_castle_interior.png'; // Generated artifact

    // Define 5 loci points based on the image description (approximate coordinates for now)
    // In a real app, we'd need a tool to define these precise coords. 
    // Here we simulate clicking on zones.
    const lociPoints = [
        { id: 1, name: 'Cầu Thang', x: 20, y: 60, width: 20, height: 30 },
        { id: 2, name: 'Ngai Vàng', x: 50, y: 50, width: 15, height: 20 },
        { id: 3, name: 'Lò Sưởi', x: 80, y: 60, width: 15, height: 25 },
        { id: 4, name: 'Bàn Ăn', x: 50, y: 80, width: 30, height: 15 },
        { id: 5, name: 'Cửa Sổ', x: 20, y: 30, width: 15, height: 25 }
    ];

    // For this demo, let's make it a "memorize the sequence" game using these locations
    // Or simpler: Show a number on a location, user has to recall it.

    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="questions-container">
            <div class="question-label">Ghi nhớ vị trí các số trong Lâu Đài</div>
            <div style="position: relative; width: 100%; max-width: 800px; margin: 0 auto;">
                <img src="${castleImage}" style="width: 100%; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
                <div id="loci-overlay" style="position: absolute; top:0; left:0; width:100%; height:100%;">
                    <!-- Numbers will appear here -->
                </div>
            </div>
            <div id="loci-controls" style="text-align: center; margin-top: 1rem;">
                <button class="submit-btn" onclick="startLociPhase1()">Bắt Đầu Ghi Nhớ</button>
            </div>
        </div>
    `;

    // Store for game logic
    currentGameData = { points: lociPoints, step: 0, sequence: [] };
}

window.startLociPhase1 = function () {
    const overlay = document.getElementById('loci-overlay');
    const controls = document.getElementById('loci-controls');
    controls.innerHTML = '<div style="color: #f9ca24; font-size: 1.2rem;">Hãy nhớ các số xuất hiện...</div>';

    // Generate random numbers for each point
    currentGameData.sequence = currentGameData.points.map(p => ({
        ...p,
        number: Math.floor(Math.random() * 100)
    }));

    // Show numbers one by one
    let i = 0;
    const showNext = () => {
        if (i >= currentGameData.sequence.length) {
            setTimeout(startLociRecall, 1000);
            return;
        }

        const item = currentGameData.sequence[i];
        overlay.innerHTML = `
            <div style="
                position: absolute; 
                left: ${item.x}%; top: ${item.y}%; 
                background: #f9ca24; color: black;
                width: 50px; height: 50px;
                border-radius: 50%;
                display: flex; justify-content: center; align-items: center;
                font-weight: 900; font-size: 1.5rem;
                box-shadow: 0 0 20px #f9ca24;
                animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            ">${item.number}</div>
        `;

        const duration = gameSettings.difficulty === 'hard' ? 1500 : 3000;

        setTimeout(() => {
            i++;
            showNext();
        }, duration);
    };

    showNext();
};

window.startLociRecall = function () {
    const overlay = document.getElementById('loci-overlay');
    overlay.innerHTML = ''; // Clear numbers

    const controls = document.getElementById('loci-controls');
    controls.innerHTML = `
        <div class="question-label">Điền số tương ứng vào vị trí đang nhấp nháy</div>
        <input type="number" id="loci-input" class="input-field" style="max-width: 150px; display:inline-block;">
        <button class="submit-btn" onclick="checkLociAnswer()">Kiểm tra</button>
        <div id="loci-feedback" style="margin-top:0.5rem; height: 1.5rem;"></div>
    `;

    currentGameData.step = 0;
    highlightLociPoint(0);
};

function highlightLociPoint(index) {
    if (index >= currentGameData.sequence.length) {
        finishLociGame();
        return;
    }

    const item = currentGameData.sequence[index];
    const overlay = document.getElementById('loci-overlay');
    overlay.innerHTML = `
        <div style="
            position: absolute; 
            left: ${item.x}%; top: ${item.y}%; 
            width: 50px; height: 50px;
            border: 3px solid #f9ca24;
            border-radius: 50%;
            background: rgba(249, 202, 36, 0.3);
            animation: pulse 1s infinite;
        "></div>
    `;

    const input = document.getElementById('loci-input');
    input.value = '';
    input.focus();
}

window.checkLociAnswer = function () {
    const input = document.getElementById('loci-input');
    const feedback = document.getElementById('loci-feedback');
    const userNum = parseInt(input.value);
    const correctNum = currentGameData.sequence[currentGameData.step].number;

    if (userNum === correctNum) {
        feedback.textContent = '✅ Chính xác!';
        feedback.style.color = '#10b981';
        handleCorrect(20);
        currentGameData.step++;
        setTimeout(() => highlightLociPoint(currentGameData.step), 500);
    } else {
        feedback.textContent = `❌ Sai rồi! Là số ${correctNum}`;
        feedback.style.color = '#ef4444';
        handleWrong();
        currentGameData.step++;
        setTimeout(() => highlightLociPoint(currentGameData.step), 1500);
    }
};

function finishLociGame() {
    document.getElementById('game-container').innerHTML = `
        <div style="text-align: center; margin-top: 2rem;">
            <h2>🎉 Hoàn Thành!</h2>
            <p>Bạn đã hoàn thành lượt ghi nhớ Lâu Đài.</p>
            <button class="submit-btn" onclick="startLociCastleGame()">Chơi Lại</button>
        </div>
    `;
    gameScore += 50; // Bonus
    updateGameStats();
}

function nextImageToNumberQuestion() {
    const correctNum = getRandomNumber();
    const options = getRandomOptions(correctNum, 4);
    const imagePath = getImagePath(correctNum);

    currentQuestion = { correct: correctNum, type: 'image-to-number' };

    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="question-container">
            <div class="question-label">Hình ảnh này tương ứng với số nào?</div>
            <img src="${imagePath}" alt="${getName(correctNum)}" class="question-image">
        </div>
        <div class="answers-grid">
            ${options.map(num => `
                <div class="answer-option" data-answer="${num}">
                    <div class="answer-number">${num}</div>
                </div>
            `).join('')}
        </div>
    `;

    container.querySelectorAll('.answer-option').forEach(option => {
        option.addEventListener('click', function () {
            if (this.dataset.answer === correctNum) {
                this.classList.add('correct');
                handleCorrect(10);
                setTimeout(() => nextImageToNumberQuestion(), 1500);
            } else {
                this.classList.add('wrong');
                const imagePath = getImagePath(correctNum);
                handleWrong(`Hình ảnh này là số nào?`, this.dataset.answer, correctNum, imagePath);
                setTimeout(() => nextImageToNumberQuestion(), 1500);
            }
        });
    });
}

// Game 16: Basic Review 00-99
function startBasicReviewGame() {
    startTimer(300, () => {
        stopGame();
    });
    nextBasicReviewQuestion();
}

function nextBasicReviewQuestion() {
    const correctNum = getRandomNumber();
    const options = getRandomOptions(correctNum, 4);
    const imagePath = getImagePath(correctNum);

    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="question-container">
            <div class="question-label">Ôn tập cơ bản: Hình ảnh này là số nào? (00-99)</div>
            <img src="${imagePath}" alt="${getName(correctNum)}" class="question-image">
        </div>
        <div class="answers-grid">
            ${options.map(num => `
                <div class="answer-option" data-answer="${num}" data-correct="${num === correctNum}">
                    <div class="answer-number">${num}</div>
                    <div style="font-size: 1.2rem; margin-top: 0.5rem; opacity: 0.9;">${getName(num)}</div>
                </div>
            `).join('')}
        </div>
    `;

    container.querySelectorAll('.answer-option').forEach(option => {
        option.addEventListener('click', function () {
            const isCorrect = this.dataset.correct === 'true';
            if (isCorrect) {
                this.classList.add('correct');
                handleCorrect(10);
                setTimeout(() => nextBasicReviewQuestion(), 1500);
            } else {
                this.classList.add('wrong');
                handleWrong();
                setTimeout(() => nextBasicReviewQuestion(), 1500);
            }
        });
    });
}

// Basic stubs for missing games (to be implemented)
function startNumberToImageGame() { alert('Game đang bảo trì! Vui lòng quay lại sau.'); showHomepage(); }
function startFlashcardGame() { alert('Game đang bảo trì! Vui lòng quay lại sau.'); showHomepage(); }


// ==========================================
// 2. INTERMEDIATE GAMES
// ==========================================

// Game 19: Type Number from Image
function startTypeNumberGame() {
    let timeLimit = 180;
    if (gameSettings.difficulty === 'hard') timeLimit = 90;
    if (gameSettings.difficulty === 'easy') timeLimit = 360;

    startTimer(timeLimit, () => {
        stopGame();
    });
    nextTypeNumberQuestion();
}

function nextTypeNumberQuestion() {
    const correctNum = getRandomNumber();
    const imagePath = getImagePath(correctNum);

    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="question-container">
            <div class="question-label">Gõ số tương ứng với hình ảnh này (00-99)</div>
            <img src="${imagePath}" alt="${getName(correctNum)}" class="question-image">
        </div>
        <div class="input-game-container">
            <input type="text" id="number-input" class="input-field" placeholder="Nhập số (ví dụ: 00)" maxlength="2" autofocus>
            <button class="submit-btn" onclick="checkTypeNumber('${correctNum}')">Kiểm tra</button>
        </div>
        <div id="type-number-feedback" style="text-align: center; margin-top: 1rem; font-size: 1.5rem; font-weight: bold;"></div>
    `;

    const input = document.getElementById('number-input');
    if (input) {
        // Auto-focus logic
        setTimeout(() => input.focus(), 100);

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkTypeNumber(correctNum);
            }
        });

        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
        });
    }
}

window.checkTypeNumber = function (correctNum) {
    const input = document.getElementById('number-input');
    const feedback = document.getElementById('type-number-feedback');
    if (!input || !feedback) return;

    const userAnswer = input.value.padStart(2, '0');

    if (userAnswer === correctNum) {
        feedback.textContent = '✅ Đúng rồi!';
        feedback.style.color = '#10b981';
        handleCorrect(12);
        input.disabled = true;
        setTimeout(() => {
            nextTypeNumberQuestion();
        }, 1500);
    } else {
        feedback.textContent = `❌ Sai rồi! Đáp án đúng là: ${correctNum}`;
        feedback.style.color = '#ef4444';
        handleWrong();
        input.value = '';
        input.focus();
    }
};

// Game 20: Type Name from Number
function startTypeNameGame() {
    let timeLimit = 180;
    if (gameSettings.difficulty === 'hard') timeLimit = 90;
    if (gameSettings.difficulty === 'easy') timeLimit = 360;

    startTimer(timeLimit, () => {
        stopGame();
    });
    nextTypeNameQuestion();
}

function nextTypeNameQuestion() {
    const correctNum = getRandomNumber();
    const correctName = getName(correctNum);

    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="question-container">
            <div class="question-label">Gõ tên tương ứng với số này (không dấu)</div>
            <div class="question-text">${correctNum}</div>
        </div>
        <div class="input-game-container">
            <input type="text" id="name-input" class="input-field" placeholder="Nhập tên (ví dụ: Con Cho)" autofocus>
            <button class="submit-btn" onclick="checkTypeName('${correctName}', '${correctNum}')">Kiểm tra</button>
        </div>
        <div id="type-name-feedback" style="text-align: center; margin-top: 1rem; font-size: 1.5rem; font-weight: bold;"></div>
    `;

    const input = document.getElementById('name-input');
    if (input) {
        // Auto-focus logic
        setTimeout(() => input.focus(), 100);

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkTypeName(correctName, correctNum);
            }
        });
    }
}

window.checkTypeName = function (correctName, correctNum) {
    const input = document.getElementById('name-input');
    const feedback = document.getElementById('type-name-feedback');
    if (!input || !feedback) return;

    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = correctName.toLowerCase();

    // Remove Vietnamese accents for comparison
    const normalize = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normalizedUser = normalize(userAnswer);
    const normalizedCorrect = normalize(correctAnswer);

    if (normalizedUser === normalizedCorrect) {
        feedback.textContent = '✅ Đúng rồi!';
        feedback.style.color = '#10b981';
        handleCorrect(15);
        input.disabled = true;
        setTimeout(() => {
            nextTypeNameQuestion();
        }, 1500);
    } else {
        feedback.textContent = `❌ Sai rồi! Đáp án đúng là: ${correctName}`;
        feedback.style.color = '#ef4444';
        handleWrong();
        input.value = '';
        input.focus();
    }
};

// Game 23: Double Challenge
function startDoubleChallengeGame() {
    startTimer(300, () => {
        stopGame();
    });
    nextDoubleChallengeQuestion();
}

function nextDoubleChallengeQuestion() {
    const num1 = getRandomNumber();
    const num2 = getRandomNumber();
    const imagePath1 = getImagePath(num1);
    const imagePath2 = getImagePath(num2);
    const correctAnswer = num1 + num2;
    const options = [correctAnswer];

    // Generate wrong options
    for (let i = 0; i < 3; i++) {
        let wrong = Math.floor(Math.random() * 200);
        while (options.includes(wrong)) {
            wrong = Math.floor(Math.random() * 200);
        }
        options.push(wrong);
    }
    const shuffledOptions = options.sort(() => Math.random() - 0.5);

    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="question-container">
            <div class="question-label">Thử thách kép: Cộng 2 số từ hình ảnh</div>
            <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; margin: 2rem 0;">
                <div>
                    <img src="${imagePath1}" alt="${getName(num1)}" class="question-image" style="max-width: 200px;">
                    <div style="text-align: center; margin-top: 0.5rem; font-size: 1.5rem; font-weight: bold;">${num1}</div>
                </div>
                <div style="font-size: 3rem; align-self: center;">+</div>
                <div>
                    <img src="${imagePath2}" alt="${getName(num2)}" class="question-image" style="max-width: 200px;">
                    <div style="text-align: center; margin-top: 0.5rem; font-size: 1.5rem; font-weight: bold;">${num2}</div>
                </div>
            </div>
        </div>
        <div class="answers-grid">
            ${shuffledOptions.map(ans => `
                <div class="answer-option" data-answer="${ans}" data-correct="${ans === correctAnswer}">
                    <div class="answer-number">${ans}</div>
                </div>
            `).join('')}
        </div>
    `;

    container.querySelectorAll('.answer-option').forEach(option => {
        option.addEventListener('click', function () {
            const isCorrect = this.dataset.correct === 'true';
            if (isCorrect) {
                this.classList.add('correct');
                handleCorrect(25);
                setTimeout(() => nextDoubleChallengeQuestion(), 1500);
            } else {
                this.classList.add('wrong');
                handleWrong();
                setTimeout(() => nextDoubleChallengeQuestion(), 1500);
            }
        });
    });
}


// Stubs
function startSpeedChallengeGame() { alert('Game đang bảo trì! Vui lòng quay lại sau.'); showHomepage(); }
function startReverseChallengeGame() { alert('Game đang bảo trì! Vui lòng quay lại sau.'); showHomepage(); }
function startMatchPairsGame() { alert('Game đang bảo trì! Vui lòng quay lại sau.'); showHomepage(); }

// ==========================================
// 3. ADVANCED GAMES
// ==========================================

// Game 21: Rapid Fire
function startRapidFireGame() {
    startTimer(120, () => {
        stopGame();
    });
    nextRapidFireQuestion();
}

function nextRapidFireQuestion() {
    const correctNum = getRandomNumber();
    const imagePath = getImagePath(correctNum);

    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="question-container">
            <div class="question-label">Rapid Fire: Trả lời nhanh nhất có thể!</div>
            <img src="${imagePath}" alt="${getName(correctNum)}" class="question-image" style="max-width: 300px;">
        </div>
        <div class="answers-grid">
            ${getRandomOptions(correctNum, 4).map(num => `
                <div class="answer-option" data-answer="${num}" data-correct="${num === correctNum}">
                    <div class="answer-number">${num}</div>
                </div>
            `).join('')}
        </div>
    `;

    container.querySelectorAll('.answer-option').forEach(option => {
        option.addEventListener('click', function () {
            const isCorrect = this.dataset.correct === 'true';
            if (isCorrect) {
                this.classList.add('correct');
                handleCorrect(15);
                setTimeout(() => nextRapidFireQuestion(), 500);
            } else {
                this.classList.add('wrong');
                handleWrong();
                setTimeout(() => nextRapidFireQuestion(), 500);
            }
        });
    });
}

// Game 17: Basic Review All Codes
function startBasicReviewAllGame() {
    startTimer(360, () => {
        stopGame();
    });
    nextBasicReviewAllQuestion();
}

function nextBasicReviewAllQuestion() {
    const correctCode = getRandomCode();
    const allCodes = getAllCodes();
    const options = [correctCode];
    const available = allCodes.filter(code => code !== correctCode);
    const shuffled = available.sort(() => Math.random() - 0.5);
    options.push(...shuffled.slice(0, 3));
    const shuffledOptions = options.sort(() => Math.random() - 0.5);
    const imagePath = getImagePath(correctCode);

    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="question-container">
            <div class="question-label">Ôn tập toàn bộ: Hình ảnh này là mã nào? (00-99 + đặc biệt)</div>
            <img src="${imagePath}" alt="${getName(correctCode)}" class="question-image">
        </div>
        <div class="answers-grid">
            ${shuffledOptions.map(code => `
                <div class="answer-option" data-answer="${code}" data-correct="${code === correctCode}">
                    <div class="answer-number">${code}</div>
                    <div style="font-size: 1.1rem; margin-top: 0.5rem; opacity: 0.9;">${getName(code)}</div>
                </div>
            `).join('')}
        </div>
    `;

    container.querySelectorAll('.answer-option').forEach(option => {
        option.addEventListener('click', function () {
            const isCorrect = this.dataset.correct === 'true';
            if (isCorrect) {
                this.classList.add('correct');
                handleCorrect(12);
                setTimeout(() => nextBasicReviewAllQuestion(), 1500);
            } else {
                this.classList.add('wrong');
                handleWrong();
                setTimeout(() => nextBasicReviewAllQuestion(), 1500);
            }
        });
    });
}

// Game 14: All Codes Master
function startAllCodesMasterGame() {
    startTimer(300, () => {
        stopGame();
    });
    nextAllCodesQuestion();
}

function nextAllCodesQuestion() {
    const correctCode = getRandomCode();
    const allCodes = getAllCodes();
    const options = [correctCode];
    const available = allCodes.filter(code => code !== correctCode);
    const shuffled = available.sort(() => Math.random() - 0.5);
    options.push(...shuffled.slice(0, 3));
    const shuffledOptions = options.sort(() => Math.random() - 0.5);
    const imagePath = getImagePath(correctCode);

    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="question-container">
            <div class="question-label">Hình ảnh này tương ứng với mã nào? (Tất cả mã 00-99 + đặc biệt)</div>
            <img src="${imagePath}" alt="${getName(correctCode)}" class="question-image">
        </div>
        <div class="answers-grid">
            ${shuffledOptions.map(code => `
                <div class="answer-option" data-answer="${code}" data-correct="${code === correctCode}">
                    <div class="answer-number">${code}</div>
                    <div style="font-size: 1.1rem; margin-top: 0.5rem; opacity: 0.9;">${getName(code)}</div>
                </div>
            `).join('')}
        </div>
    `;

    container.querySelectorAll('.answer-option').forEach(option => {
        option.addEventListener('click', function () {
            const isCorrect = this.dataset.correct === 'true';
            if (isCorrect) {
                this.classList.add('correct');
                handleCorrect(20);
                setTimeout(() => nextAllCodesQuestion(), 1500);
            } else {
                this.classList.add('wrong');
                handleWrong();
                setTimeout(() => nextAllCodesQuestion(), 1500);
            }
        });
    });
}

// Game 24: 52 Cards Memory Challenge
function start52CardsMemoryGame() {
    gameResults = { correct: [], wrong: [], questions: [] };
    startTimer(300, () => {
        stopGame();
    });
    next52CardsQuestion();
}

function next52CardsQuestion() {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    // Generate random sequence of cards
    const cardSequence = [];
    const usedCards = new Set();
    const sequenceLength = 5 + Math.floor(Math.random() * 4); // 5-8 cards

    while (cardSequence.length < sequenceLength) {
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const rank = ranks[Math.floor(Math.random() * ranks.length)];
        const card = `${rank}${suit}`;

        if (!usedCards.has(card)) {
            usedCards.add(card);
            cardSequence.push(card);
        }
    }

    currentQuestion = { correct: cardSequence.join(', '), type: '52cards' };

    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="question-container">
            <div class="question-label">Nhớ thứ tự các lá bài (${sequenceLength} lá, 5 giây để xem)</div>
            <div id="cards-display" style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin: 2rem 0; min-height: 150px;">
                ${cardSequence.map(card => `
                    <div style="width: 60px; height: 90px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.3); border: 2px solid rgba(255,255,255,0.3);">
                        <div style="font-size: 1.5rem;">${card}</div>
                    </div>
                `).join('')}
            </div>
            <div id="cards-input-section" style="display: none;">
                <div class="question-label" style="margin-top: 2rem;">Điền thứ tự các lá bài (ví dụ: A♠, 2♥, K♦)</div>
                <div class="input-game-container">
                    <input type="text" id="cards-input" class="input-field" placeholder="Nhập thứ tự các lá bài" autofocus style="max-width: 600px; font-size: 1.2rem;">
                    <button class="submit-btn" onclick="check52CardsAnswer()">Kiểm tra</button>
                </div>
                <div id="cards-feedback" style="text-align: center; margin-top: 1rem; font-size: 1.5rem; font-weight: bold;"></div>
            </div>
        </div>
    `;

    // Hide cards after 5 seconds
    // Hide cards after time based on difficulty
    let previewTime = 5000;
    if (gameSettings.difficulty === 'hard') previewTime = 3000;
    if (gameSettings.difficulty === 'easy') previewTime = 8000;

    setTimeout(() => {
        document.getElementById('cards-display').innerHTML = '';
        document.getElementById('cards-input-section').style.display = 'block';
        document.getElementById('cards-input').focus();
    }, previewTime);
}

window.check52CardsAnswer = function () {
    const input = document.getElementById('cards-input');
    const feedback = document.getElementById('cards-feedback');
    if (!input || !feedback) return;

    const userAnswer = input.value.trim().replace(/\s+/g, '');
    const correctAnswer = currentQuestion.correct.replace(/\s+/g, '');

    if (userAnswer === correctAnswer) {
        feedback.textContent = '✅ Đúng rồi!';
        feedback.style.color = '#10b981';
        handleCorrect(20);
        input.disabled = true;
        setTimeout(() => next52CardsQuestion(), 1500);
    } else {
        feedback.textContent = `❌ Sai rồi! Đáp án đúng: ${currentQuestion.correct}`;
        feedback.style.color = '#ef4444';
        handleWrong(`Thứ tự các lá bài?`, userAnswer, currentQuestion.correct);
        input.value = '';
        input.focus();
        setTimeout(() => next52CardsQuestion(), 3000);
    }
};

// Game 25: Binary Number Memory (Mapped to startBinaryDigitsGame)
function startBinaryDigitsGame() {
    gameResults = { correct: [], wrong: [], questions: [] };
    startTimer(300, () => {
        stopGame();
    });
    nextBinaryQuestion();
}

function nextBinaryQuestion() {
    const bitLength = 4 + Math.floor(Math.random() * 5);
    let binaryString = '';
    for (let i = 0; i < bitLength; i++) {
        binaryString += Math.random() > 0.5 ? '1' : '0';
    }

    const decimalValue = parseInt(binaryString, 2);
    currentQuestion = { correct: binaryString, decimal: decimalValue, type: 'binary' };

    const questionType = Math.random() > 0.5 ? 'binary-to-decimal' : 'decimal-to-binary';

    const container = document.getElementById('game-container');

    if (questionType === 'binary-to-decimal') {
        container.innerHTML = `
            <div class="question-container">
                <div class="question-label">Nhớ số nhị phân này (${bitLength} bits, 3 giây để xem)</div>
                <div id="binary-display" style="text-align: center; margin: 2rem 0;">
                    <div style="font-size: 3rem; font-weight: 900; color: #f9ca24; text-shadow: 2px 2px 8px rgba(0,0,0,0.8); font-family: 'Courier New', monospace; letter-spacing: 0.2em;">
                        ${binaryString}
                    </div>
                </div>
                <div id="binary-input-section" style="display: none;">
                    <div class="question-label" style="margin-top: 2rem;">Số nhị phân này bằng bao nhiêu trong hệ thập phân?</div>
                    <div class="input-game-container">
                        <input type="number" id="binary-input" class="input-field" placeholder="Nhập số thập phân" autofocus>
                        <button class="submit-btn" onclick="checkBinaryAnswer('decimal')">Kiểm tra</button>
                    </div>
                    <div id="binary-feedback" style="text-align: center; margin-top: 1rem; font-size: 1.5rem; font-weight: bold;"></div>
                </div>
            </div>
        `;

        setTimeout(() => {
            document.getElementById('binary-display').innerHTML = '<div style="font-size: 2rem; color: rgba(255,255,255,0.3);">???</div>';
            document.getElementById('binary-input-section').style.display = 'block';
            document.getElementById('binary-input').focus();
        }, 3000);
    } else {
        container.innerHTML = `
            <div class="question-container">
                <div class="question-label">Chuyển số thập phân này sang nhị phân (${bitLength} bits)</div>
                <div style="text-align: center; margin: 2rem 0;">
                    <div style="font-size: 4rem; font-weight: 900; color: #f9ca24; text-shadow: 2px 2px 8px rgba(0,0,0,0.8);">
                        ${decimalValue}
                    </div>
                </div>
                <div class="input-game-container">
                    <input type="text" id="binary-input" class="input-field" placeholder="Nhập số nhị phân (ví dụ: 1010)" autofocus style="font-family: 'Courier New', monospace;">
                    <button class="submit-btn" onclick="checkBinaryAnswer('binary')">Kiểm tra</button>
                </div>
                <div id="binary-feedback" style="text-align: center; margin-top: 1rem; font-size: 1.5rem; font-weight: bold;"></div>
            </div>
        `;
    }
}

window.checkBinaryAnswer = function (mode) {
    const input = document.getElementById('binary-input');
    const feedback = document.getElementById('binary-feedback');
    if (!input || !feedback) return;

    let isCorrect = false;

    if (mode === 'decimal') {
        const userAnswer = parseInt(input.value);
        isCorrect = userAnswer === currentQuestion.decimal;
    } else {
        const userAnswer = input.value.trim();
        isCorrect = userAnswer === currentQuestion.correct;
    }

    if (isCorrect) {
        feedback.textContent = '✅ Đúng rồi!';
        feedback.style.color = '#10b981';
        handleCorrect(25);
        input.disabled = true;
        setTimeout(() => nextBinaryQuestion(), 1500);
    } else {
        const correctAnswer = mode === 'decimal' ? currentQuestion.decimal : currentQuestion.correct;
        feedback.textContent = `❌ Sai rồi! Đáp án đúng: ${correctAnswer}`;
        feedback.style.color = '#ef4444';
        handleWrong();
        input.value = '';
        input.focus();
        setTimeout(() => nextBinaryQuestion(), 3000);
    }
};

// Game 26: Random Number Sequence Memory (Mapped to startNumberMemoryGame)
function startNumberMemoryGame() {
    gameResults = { correct: [], wrong: [], questions: [] };
    startTimer(300, () => {
        stopGame();
    });
    nextNumberSequenceQuestion();
}

function nextNumberSequenceQuestion() {
    const length = 3 + Math.floor(Math.random() * 5);
    let sequence = '';
    for (let i = 0; i < length; i++) {
        sequence += Math.floor(Math.random() * 10);
    }

    currentQuestion = { correct: sequence, type: 'numbersequence' };

    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="question-container">
            <div class="question-label">Nhớ dãy số này (${length} chữ số, ${length + 2} giây để xem)</div>
            <div id="sequence-display" style="text-align: center; margin: 2rem 0;">
                <div style="font-size: 4rem; font-weight: 900; color: #f9ca24; text-shadow: 2px 2px 8px rgba(0,0,0,0.8); font-family: 'Courier New', monospace; letter-spacing: 0.3em;">
                    ${sequence}
                </div>
            </div>
            <div id="sequence-input-section" style="display: none;">
                <div class="question-label" style="margin-top: 2rem;">Điền lại dãy số bạn đã nhìn thấy</div>
                <div class="input-game-container">
                    <input type="text" id="sequence-input" class="input-field" placeholder="Nhập dãy số" autofocus maxlength="${length}" style="font-family: 'Courier New', monospace; font-size: 2rem; letter-spacing: 0.2em;">
                    <button class="submit-btn" onclick="checkNumberSequenceAnswer()">Kiểm tra</button>
                </div>
                <div id="sequence-feedback" style="text-align: center; margin-top: 1rem; font-size: 1.5rem; font-weight: bold;"></div>
            </div>
        </div>
    `;

    setTimeout(() => {
        document.getElementById('sequence-display').innerHTML = '<div style="font-size: 2rem; color: rgba(255,255,255,0.3);">???</div>';
        document.getElementById('sequence-input-section').style.display = 'block';
        document.getElementById('sequence-input').focus();

        const input = document.getElementById('sequence-input');
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, length);
        });
    }, (length + 2) * 1000);
}

window.checkNumberSequenceAnswer = function () {
    const input = document.getElementById('sequence-input');
    const feedback = document.getElementById('sequence-feedback');
    if (!input || !feedback) return;

    const userAnswer = input.value.trim();
    const correctAnswer = currentQuestion.correct;

    if (userAnswer === correctAnswer) {
        feedback.textContent = '✅ Đúng rồi!';
        feedback.style.color = '#10b981';
        handleCorrect(15);
        input.disabled = true;
        setTimeout(() => nextNumberSequenceQuestion(), 1500);
    } else {
        feedback.textContent = `❌ Sai rồi! Đáp án đúng: ${correctAnswer}`;
        feedback.style.color = '#ef4444';
        handleWrong();
        input.value = '';
        input.focus();
        setTimeout(() => nextNumberSequenceQuestion(), 3000);
    }
};

// Game 27: Speed Numbers
function startSpeedNumbersGame() {
    gameResults = { correct: [], wrong: [], questions: [] };
    startTimer(180, () => {
        stopGame();
    });
    nextSpeedNumbersQuestion();
}

function nextSpeedNumbersQuestion() {
    let digits = '';
    for (let i = 0; i < 20; i++) {
        digits += Math.floor(Math.random() * 10);
    }

    currentQuestion = { correct: digits, type: 'speednumbers' };

    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="question-container">
            <div class="question-label">Nhớ dãy số 20 chữ số (hiển thị 5 giây)</div>
            <div id="speed-display" style="text-align: center; margin: 2rem 0;">
                <div style="font-size: 3rem; font-weight: 900; color: #f9ca24; text-shadow: 2px 2px 8px rgba(0,0,0,0.8); font-family: 'Courier New', monospace; letter-spacing: 0.1em; line-height: 1.5;">
                    ${digits}
                </div>
            </div>
            <div id="speed-input-section" style="display: none;">
                <div class="question-label" style="margin-top: 2rem;">Điền lại dãy số 20 chữ số</div>
                <div class="input-game-container">
                    <input type="text" id="speed-input" class="input-field" placeholder="Nhập 20 chữ số" autofocus maxlength="20" style="font-family: 'Courier New', monospace; font-size: 1.5rem; letter-spacing: 0.1em;">
                    <button class="submit-btn" onclick="checkSpeedNumbersAnswer()">Kiểm tra</button>
                </div>
                <div id="speed-feedback" style="text-align: center; margin-top: 1rem; font-size: 1.5rem; font-weight: bold;"></div>
            </div>
        </div>
    `;

    setTimeout(() => {
        document.getElementById('speed-display').innerHTML = '<div style="font-size: 2rem; color: rgba(255,255,255,0.3);">Nhập đáp án...</div>';
        document.getElementById('speed-input-section').style.display = 'block';
        const input = document.getElementById('speed-input');
        input.focus();
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 20);
        });
    }, 5000);
}

window.checkSpeedNumbersAnswer = function () {
    const input = document.getElementById('speed-input');
    const feedback = document.getElementById('speed-feedback');
    if (!input || !feedback) return;

    const userAnswer = input.value.trim();
    const correctAnswer = currentQuestion.correct;

    if (userAnswer === correctAnswer) {
        feedback.textContent = '✅ Đúng rồi!';
        feedback.style.color = '#10b981';
        handleCorrect(50);
        input.disabled = true;
        setTimeout(() => nextSpeedNumbersQuestion(), 1500);
    } else {
        feedback.textContent = `❌ Sai rồi! Đáp án đúng: ${correctAnswer}`;
        feedback.style.color = '#ef4444';
        handleWrong();
        input.value = '';
        input.focus();
        setTimeout(() => nextSpeedNumbersQuestion(), 3000);
    }
};

// Game 28: Random Words Memory
function startRandomWordsGame() {
    gameResults = { correct: [], wrong: [], questions: [] };
    startTimer(300, () => {
        stopGame();
    });
    nextRandomWordsQuestion();
}

function nextRandomWordsQuestion() {
    const words = ['TÁO', 'BƯỞI', 'CAM', 'CHUỐI', 'NHO', 'DƯA', 'XÒAI', 'ỔI', 'LỰU', 'CHANH'];
    const selectedWords = [];
    const wordCount = 4 + Math.floor(Math.random() * 3); // 4-6 words

    while (selectedWords.length < wordCount) {
        const word = words[Math.floor(Math.random() * words.length)];
        if (!selectedWords.includes(word)) {
            selectedWords.push(word);
        }
    }

    currentQuestion = { correct: selectedWords.join(', '), type: 'randomwords' };

    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="question-container">
            <div class="question-label">Nhớ thứ tự các từ (${wordCount} từ, 5 giây để xem)</div>
            <div id="words-display" style="text-align: center; margin: 2rem 0;">
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    ${selectedWords.map((word, idx) => `
                        <div style="padding: 1rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; color: white; font-size: 1.5rem; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.3); border: 2px solid rgba(255,255,255,0.3);">
                            ${idx + 1}. ${word}
                        </div>
                    `).join('')}
                </div>
            </div>
            <div id="words-input-section" style="display: none;">
                <div class="question-label" style="margin-top: 2rem;">Điền thứ tự các từ (ví dụ: TÁO, BƯỞI, CAM)</div>
                <div class="input-game-container">
                    <input type="text" id="words-input" class="input-field" placeholder="Nhập thứ tự các từ" autofocus style="max-width: 600px; font-size: 1.2rem;">
                    <button class="submit-btn" onclick="checkRandomWordsAnswer()">Kiểm tra</button>
                </div>
                <div id="words-feedback" style="text-align: center; margin-top: 1rem; font-size: 1.5rem; font-weight: bold;"></div>
            </div>
        </div>
    `;

    setTimeout(() => {
        document.getElementById('words-display').innerHTML = '<div style="font-size: 2rem; color: rgba(255,255,255,0.3);">???</div>';
        document.getElementById('words-input-section').style.display = 'block';
        document.getElementById('words-input').focus();
    }, 5000);
}

window.checkRandomWordsAnswer = function () {
    const input = document.getElementById('words-input');
    const feedback = document.getElementById('words-feedback');
    if (!input || !feedback) return;

    const userAnswer = input.value.trim().toUpperCase().replace(/\s+/g, ' ');
    const correctAnswer = currentQuestion.correct.toUpperCase();

    if (userAnswer === correctAnswer) {
        feedback.textContent = '✅ Đúng rồi!';
        feedback.style.color = '#10b981';
        handleCorrect(18);
        input.disabled = true;
        setTimeout(() => nextRandomWordsQuestion(), 1500);
    } else {
        feedback.textContent = `❌ Sai rồi! Đáp án đúng: ${currentQuestion.correct}`;
        feedback.style.color = '#ef4444';
        handleWrong();
        input.value = '';
        input.focus();
        setTimeout(() => nextRandomWordsQuestion(), 3000);
    }
};

// Stubs for remaining
function startSequenceMemoryGame() { alert('Game đang bảo trì! Vui lòng quay lại sau.'); showHomepage(); }
function startSpecialCodesGame() { alert('Game đang bảo trì! Vui lòng quay lại sau.'); showHomepage(); }

// ==========================================
// 4. PALACE GAMES & OTHERS
// ==========================================

// Game 18: Memory Palace A-Z
function startMemoryPalaceAZGame() {
    startTimer(300, () => {
        stopGame();
    });

    const selectedLoci = getRandomLociRoom();
    const allCodes = getAllCodes();
    const numbers = [];

    // Generate 10 random codes
    for (let i = 0; i < 10; i++) {
        numbers.push(allCodes[Math.floor(Math.random() * allCodes.length)]);
    }

    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="question-container">
            <div class="question-label">Cung Điện A-Z: Gắn các mã vào căn phòng ${selectedLoci.replace('.jpg', '')}</div>
            <img src="loci/${selectedLoci}" alt="Memory Palace" class="question-image" style="max-width: 700px; height: 350px; object-fit: contain;">
        </div>
        <div class="palace-container">
            ${numbers.map((code, index) => {
        const imagePath = getImagePath(code);
        return `
                    <div class="palace-room" data-code="${code}" data-index="${index}">
                        <img src="${imagePath}" alt="${getName(code)}" class="palace-image">
                        <div class="palace-number">${code}</div>
                        <div style="font-size: 0.9rem; margin-top: 0.5rem; text-align: center; opacity: 0.9;">${getName(code)}</div>
                    </div>
                `;
    }).join('')}
        </div>
        <div style="text-align: center; margin-top: 2rem;">
            <div class="question-label" style="font-size: 1.3rem;">Nhấp vào từng phòng để xem mã và ghi nhớ vị trí trong cung điện</div>
        </div>
    `;

    // Add click to show/hide number
    container.querySelectorAll('.palace-room').forEach(room => {
        room.addEventListener('click', function () {
            const numberEl = this.querySelector('.palace-number');
            if (numberEl.style.opacity === '0' || numberEl.style.opacity === '') {
                numberEl.style.opacity = '1';
                numberEl.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    numberEl.style.transform = 'scale(1)';
                }, 300);
            } else {
                numberEl.style.opacity = '0';
            }
        });
    });
}

function startMemoryPalaceGame() { alert('Game đang bảo trì! Vui lòng quay lại sau.'); showHomepage(); }
function startMemoryPalaceAdvancedGame() { alert('Game đang bảo trì! Vui lòng quay lại sau.'); showHomepage(); }
function startChineseRadicalsGame() { alert('Game đang bảo trì! Vui lòng quay lại sau.'); showHomepage(); }
function startChineseRadicalsByDayGame() { alert('Game đang bảo trì! Vui lòng quay lại sau.'); showHomepage(); }
function startLociCastleGame() { alert('Game đang bảo trì! Vui lòng quay lại sau.'); showHomepage(); }

// Memory Challenge (Extra)
function startMemoryChallengeGame() {
    startTimer(240, () => {
        stopGame();
    });
    nextMemoryChallengeQuestion();
}

function nextMemoryChallengeQuestion() {
    const correctCode = getRandomCode();
    const allCodes = getAllCodes();
    const options = [correctCode];
    const available = allCodes.filter(code => code !== correctCode);
    const shuffled = available.sort(() => Math.random() - 0.5);
    options.push(...shuffled.slice(0, 3));
    const shuffledOptions = options.sort(() => Math.random() - 0.5);
    const imagePath = getImagePath(correctCode);

    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="question-container">
            <div class="question-label">Thử thách trí nhớ: Chọn mã đúng (Tất cả mã)</div>
            <img src="${imagePath}" alt="${getName(correctCode)}" class="question-image">
        </div>
        <div class="answers-grid">
            ${shuffledOptions.map(code => `
                <div class="answer-option" data-answer="${code}" data-correct="${code === correctCode}">
                    <div class="answer-number">${code}</div>
                    <div style="font-size: 1.1rem; margin-top: 0.5rem; opacity: 0.9;">${getName(code)}</div>
                </div>
            `).join('')}
        </div>
    `;

    container.querySelectorAll('.answer-option').forEach(option => {
        option.addEventListener('click', function () {
            const isCorrect = this.dataset.correct === 'true';
            if (isCorrect) {
                this.classList.add('correct');
                handleCorrect(18);
                setTimeout(() => nextMemoryChallengeQuestion(), 1500);
            } else {
                this.classList.add('wrong');
                handleWrong();
                setTimeout(() => nextMemoryChallengeQuestion(), 1500);
            }
        });
    });
}
