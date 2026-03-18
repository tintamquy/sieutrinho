// ===== PAO GAMES LOGIC =====
// Tích hợp vào app chính sieutrinho

// Tích hợp vào app chính sieutrinho

function getActivePaoTypes() {
    return window.getCurrentPaoSystem && window.getCurrentPaoSystem() === 'paoq'
        ? ['person', 'action', 'object', 'quote']
        : ['person', 'action', 'object'];
}

function getPaoTypeLabel(type) {
    return type === 'person' ? 'Person' : type === 'action' ? 'Action' : type === 'quote' ? 'Quote' : 'Object';
}

function getPaoTypeLabelShort(type) {
    return type === 'person' ? 'P' : type === 'action' ? 'A' : type === 'quote' ? 'Q' : 'O';
}

// Global keyboard shortcuts handler for multiple choice (1,2,3,4 keys)
let currentKeyboardHandler = null;

function setupKeyboardShortcuts(options, correctAnswer, checkAnswerCallback) {
    // Remove previous handler if exists
    if (currentKeyboardHandler) {
        document.removeEventListener('keydown', currentKeyboardHandler);
    }

    // Create new handler
    currentKeyboardHandler = function (event) {
        const key = event.key;
        if (['1', '2', '3', '4'].includes(key)) {
            const index = parseInt(key) - 1;
            if (index < options.length) {
                // Check if PAO option buttons still exist and are enabled
                const buttons = document.querySelectorAll('.pao-option-btn');
                if (buttons.length > 0 && !buttons[0].disabled) {
                    event.preventDefault();
                    const answer = options[index];
                    checkAnswerCallback(answer, correctAnswer);
                }
            }
        }
    };

    // Add listener
    document.addEventListener('keydown', currentKeyboardHandler);
}

function clearKeyboardShortcuts() {
    if (currentKeyboardHandler) {
        document.removeEventListener('keydown', currentKeyboardHandler);
        currentKeyboardHandler = null;
    }
}

// PAO Game 1: Flash Card
function startPAOFlashCard() {
    let currentIndex = 0;
    const allCodes = Object.keys(paoData);

    function loadCard(index) {
        currentIndex = index;
        const code = allCodes[index];
        const pao = getPAO(code);

        document.getElementById('game-container').innerHTML = `
            <div class="pao-flashcard-container">
                <div class="pao-progress">Thẻ ${index + 1} / ${allCodes.length}</div>
                <div class="pao-flashcard" id="pao-card">
                    <div class="pao-card-front">
                        <div class="pao-card-number">${code}</div>
                    </div>
                    <div class="pao-card-back">
                        <div class="pao-info-box">
                            <div class="pao-item"><strong>Person:</strong> ${pao.person}</div>
                            <div class="pao-item"><strong>Action:</strong> ${pao.action}</div>
                            <div class="pao-item"><strong>Object:</strong> ${pao.object}</div>
                            ${pao.quote ? `<div class="pao-item"><strong>Quote:</strong> ${pao.quote}</div>` : ''}
                        </div>
                    </div>
                </div>
                <div class="pao-controls">
                    <button class="btn-game" onclick="PAOGames.flashCard.flip()">Lật Thẻ</button>
                    <button class="btn-game" onclick="PAOGames.flashCard.prev()">← Trước</button>
                    <button class="btn-game" onclick="PAOGames.flashCard.next()">Sau →</button>
                    <button class="btn-game" onclick="PAOGames.flashCard.random()">🎲 Ngẫu Nhiên</button>
                </div>
            </div>
        `;

        document.getElementById('pao-card').classList.remove('flipped');
    }

    const publicAPI = {
        flip: () => {
            document.getElementById('pao-card').classList.toggle('flipped');
        },
        next: () => {
            currentIndex = (currentIndex + 1) % allCodes.length;
            loadCard(currentIndex);
        },
        prev: () => {
            currentIndex = (currentIndex - 1 + allCodes.length) % allCodes.length;
            loadCard(currentIndex);
        },
        random: () => {
            currentIndex = Math.floor(Math.random() * allCodes.length);
            loadCard(currentIndex);
        },
        cleanup: () => {
            if (publicAPI.keyboardHandler) {
                document.removeEventListener('keydown', publicAPI.keyboardHandler);
                publicAPI.keyboardHandler = null;
            }
        },
        keyboardHandler: null
    };

    // Setup keyboard controls for Flashcard
    publicAPI.keyboardHandler = function (event) {
        // Ignore if user is typing in an input field
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        switch (event.key) {
            case ' ':           // Space
            case 'Enter':       // Enter
                event.preventDefault();
                publicAPI.flip();
                break;
            case 'ArrowLeft':   // Left arrow
                event.preventDefault();
                publicAPI.prev();
                break;
            case 'ArrowRight':  // Right arrow
                event.preventDefault();
                publicAPI.next();
                break;
            case 'r':           // R key
            case 'R':
                event.preventDefault();
                publicAPI.random();
                break;
        }
    };

    document.addEventListener('keydown', publicAPI.keyboardHandler);

    window.PAOGames = window.PAOGames || {};
    window.PAOGames.flashCard = publicAPI;

    loadCard(0);
    document.getElementById('timer').parentElement.style.display = 'none';
}

// PAO Game 2: Speed Quiz (Số → PAO)
function startPAOSpeedQuiz() {
    let isPlaying = false;
    let score = 0;
    let wrong = 0;
    let startTime;
    let timerInterval;
    let timeLimit = gameSettings.difficulty === 'hard' ? 5 : gameSettings.difficulty === 'medium' ? 8 : 12;

    function startGame() {
        isPlaying = true;
        score = 0;
        wrong = 0;
        correctCount = 0;
        wrongCount = 0;
        startTime = Date.now();
        updateGameStats();
        nextQuestion();

        timerInterval = setInterval(() => {
            document.getElementById('score').textContent = score;
        }, 100);
    }

    function nextQuestion() {
        if (!isPlaying) return; // Check if game is still playing

        // Clear any existing question timer to prevent duplicates
        if (window.PAOGames.speedQuiz.currentTimer) {
            clearInterval(window.PAOGames.speedQuiz.currentTimer);
            window.PAOGames.speedQuiz.currentTimer = null;
        }

        const data = getRandomPAO(); // Include ALL codes (00-99 + special codes)
        const types = getActivePaoTypes();
        let selectedType = types[Math.floor(Math.random() * types.length)];
        let correctAnswer = data[selectedType];
        while (!correctAnswer) {
            selectedType = types[Math.floor(Math.random() * types.length)];
            correctAnswer = data[selectedType];
        }

        // Generate wrong answers
        const wrongAnswers = [];
        while (wrongAnswers.length < 3) {
            const randomPao = getRandomPAO();
            const random = randomPao[selectedType];
            if (random && random !== correctAnswer && !wrongAnswers.includes(random)) {
                wrongAnswers.push(random);
            }
        }

        const options = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
        const typeLabel = getPaoTypeLabel(selectedType);

        document.getElementById('game-container').innerHTML = `
            <div class="pao-quiz-container">
                <div class="pao-question-box">
                    <div class="pao-question-number">${data.code}</div>
                    <div class="pao-question-text">Số này có [${typeLabel}] là gì?</div>
                    <div class="pao-timer-bar"><div class="pao-timer-fill" id="pao-timer-fill"></div></div>
                </div>
                <div class="pao-options-grid pao-grid-2x2">
                    ${options.map((opt, index) => `
                        <button class="pao-option-btn" data-index="${index}" data-answer="${opt.replace(/'/g, '&#39;')}" onclick="PAOGames.speedQuiz.checkAnswer('${opt.replace(/'/g, "\\'")}', '${correctAnswer.replace(/'/g, "\\'")}')">
                            <span class="option-number">${index + 1}</span> ${opt}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Setup keyboard shortcuts for 1,2,3,4
        setupKeyboardShortcuts(options, correctAnswer, publicAPI.checkAnswer);

        // Start countdown timer
        let timeLeft = timeLimit * 1000;
        const startQuestionTime = Date.now();
        const timerBar = setInterval(() => {
            const elapsed = Date.now() - startQuestionTime;
            const percent = Math.max(0, 100 - ((elapsed / (timeLimit * 1000)) * 100));
            const fillEl = document.getElementById('pao-timer-fill');
            if (fillEl) fillEl.style.width = percent + '%';

            if (elapsed >= timeLimit * 1000) {
                clearInterval(timerBar);
                if (!isPlaying) return; // Don't continue if game stopped
                wrong++;
                wrongCount++;
                updateGameStats();
                playSound('wrong');
                setTimeout(() => {
                    if (isPlaying) nextQuestion(); // Check again before calling
                }, 1000);
            }
        }, 50);

        window.PAOGames.speedQuiz.currentTimer = timerBar;
    }

    const publicAPI = {
        start: startGame,
        currentTimer: null,
        stop: () => {
            isPlaying = false;
            clearKeyboardShortcuts(); // Remove keyboard listener
            if (publicAPI.currentTimer) {
                clearInterval(publicAPI.currentTimer);
                publicAPI.currentTimer = null;
            }
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
        },
        checkAnswer: (selected, correct) => {
            if (!isPlaying) return;

            clearInterval(publicAPI.currentTimer);
            publicAPI.currentTimer = null;
            const buttons = document.querySelectorAll('.pao-option-btn');
            buttons.forEach(btn => btn.disabled = true);

            if (selected === correct) {
                score += 10;
                correctCount++;
                playSound('correct');
                showEncouragement(true);
            } else {
                wrong++;
                wrongCount++;
                playSound('wrong');
                showEncouragement(false);
            }

            gameScore = score;
            updateGameStats();
            setTimeout(() => {
                if (isPlaying) nextQuestion(); // Check before calling
            }, 1500);
        }
    };

    window.PAOGames = window.PAOGames || {};
    window.PAOGames.speedQuiz = publicAPI;

    document.getElementById('game-container').innerHTML = `
        <div class="pao-start-screen">
            <h2>⚡ Speed Quiz - PAO</h2>
            <p>Trả lời nhanh: Số → ${window.getCurrentPaoSystem && window.getCurrentPaoSystem() === 'paoq' ? 'Person/Action/Object/Quote' : 'Person/Action/Object'}</p>
            <p>Thời gian: ${timeLimit}s mỗi câu</p>
            <button class="btn-game-large" onclick="PAOGames.speedQuiz.start()">Bắt Đầu</button>
        </div>
    `;

    document.getElementById('timer').parentElement.style.display = 'none';
}

// PAO Game 3: Reverse Quiz (PAO → Số)
function startPAOReverseQuiz() {
    let score = 0;
    let wrong = 0;

    function nextQuestion() {
        const data = getRandomPAONumeric();
        const types = getActivePaoTypes();
        let selectedType = types[Math.floor(Math.random() * types.length)];
        let paoValue = data[selectedType];
        while (!paoValue) {
            selectedType = types[Math.floor(Math.random() * types.length)];
            paoValue = data[selectedType];
        }
        const correctCode = data.code;
        const typeLabel = getPaoTypeLabel(selectedType);

        document.getElementById('game-container').innerHTML = `
            <div class="pao-quiz-container">
                <div class="pao-question-box reverse">
                    <div class="pao-type-badge">${typeLabel}</div>
                    <div class="pao-value-large">${paoValue}</div>
                    <div class="pao-question-text">Số nào có ${typeLabel} này?</div>
                </div>
                <div class="pao-input-area">
                    <input type="text" id="pao-number-input" class="pao-number-input" placeholder="Nhập số (00-99)" maxlength="2" />
                    <button class="btn-game" onclick="PAOGames.reverseQuiz.submit('${correctCode}')">Kiểm Tra</button>
                </div>
            </div>
        `;

        document.getElementById('pao-number-input').focus();
        document.getElementById('pao-number-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                window.PAOGames.reverseQuiz.submit(correctCode);
            }
        });
    }

    const publicAPI = {
        submit: (correctCode) => {
            const input = document.getElementById('pao-number-input');
            const userAnswer = input.value.trim().padStart(2, '0');

            if (!userAnswer) return;

            if (userAnswer === correctCode) {
                score += 10;
                correctCount++;
                playSound('correct');
                showEncouragement(true);
                input.style.borderColor = '#10b981';
            } else {
                wrong++;
                wrongCount++;
                playSound('wrong');
                showEncouragement(false);
                input.style.borderColor = '#ef4444';
                setTimeout(() => alert(`Sai rồi! Đáp án đúng là: ${correctCode}`), 100);
            }

            gameScore = score;
            updateGameStats();
            setTimeout(nextQuestion, 1000);
        }
    };

    window.PAOGames = window.PAOGames || {};
    window.PAOGames.reverseQuiz = publicAPI;

    nextQuestion();
    document.getElementById('timer').parentElement.style.display = 'none';
}

// PAO Game 4: Memory Match
function startPAOMemoryMatch() {
    const pairCount = gameSettings.difficulty === 'hard' ? 12 : gameSettings.difficulty === 'medium' ? 8 : 6;
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;

    function generateCards() {
        const selectedCodes = [];
        const allCodes = Object.keys(paoData).filter(code => /^\d{2}$/.test(code));

        while (selectedCodes.length < pairCount) {
            const random = allCodes[Math.floor(Math.random() * allCodes.length)];
            if (!selectedCodes.includes(random)) {
                selectedCodes.push(random);
            }
        }

        cards = [];
        selectedCodes.forEach(code => {
            const pao = getPAO(code);
            cards.push({ type: 'number', value: code, matchId: code });

            const types = getActivePaoTypes();
            let randomType = types[Math.floor(Math.random() * types.length)];
            while (!pao[randomType]) {
                randomType = types[Math.floor(Math.random() * types.length)];
            }
            cards.push({ type: randomType, value: pao[randomType], matchId: code });
        });

        cards.sort(() => Math.random() - 0.5);

        document.getElementById('game-container').innerHTML = `
            <div class="pao-match-container">
                <div class="pao-match-stats">
                    <div>Cặp: <span id="matched-count">0</span>/${pairCount}</div>
                    <div>Lượt: <span id="move-count">0</span></div>
                </div>
                <div class="pao-match-grid">
                    ${cards.map((card, index) => `
                        <div class="pao-match-card" data-index="${index}" onclick="PAOGames.memoryMatch.flip(${index})">
                            <div class="pao-match-card-inner">
                                <div class="pao-match-card-front">?</div>
                                <div class="pao-match-card-back">${card.value}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function checkMatch() {
        if (flippedCards.length !== 2) return;

        moves++;
        document.getElementById('move-count').textContent = moves;

        const [card1, card2] = flippedCards;
        const el1 = document.querySelector(`[data-index="${card1.index}"]`);
        const el2 = document.querySelector(`[data-index="${card2.index}"]`);

        if (card1.card.matchId === card2.card.matchId) {
            matchedPairs++;
            document.getElementById('matched-count').textContent = matchedPairs;
            el1.classList.add('matched');
            el2.classList.add('matched');
            playSound('correct');

            if (matchedPairs === pairCount) {
                setTimeout(() => {
                    alert(`🎉 Hoàn thành! Số lượt: ${moves}`);
                    showHomepage();
                }, 500);
            }
        } else {
            setTimeout(() => {
                el1.classList.remove('flipped');
                el2.classList.remove('flipped');
                playSound('wrong');
            }, 800);
        }

        flippedCards = [];
    }

    const publicAPI = {
        flip: (index) => {
            if (flippedCards.length >= 2) return;

            const cardEl = document.querySelector(`[data-index="${index}"]`);
            if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

            cardEl.classList.add('flipped');
            flippedCards.push({ index, card: cards[index] });

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 800);
            }
        }
    };

    window.PAOGames = window.PAOGames || {};
    window.PAOGames.memoryMatch = publicAPI;

    generateCards();
    document.getElementById('timer').parentElement.style.display = 'none';
}

// PAO Game 5: Chain Challenge
function startPAOChainChallenge() {
    let level = 1;
    let score = 0;
    let currentSequence = '';
    let currentPairs = [];

    function startMemorize() {
        const length = 2 + (level - 1);
        currentSequence = generateRandomNumberString(length * 2);
        currentPairs = parseNumbersToPAO(currentSequence);

        document.getElementById('game-container').innerHTML = `
            <div class="pao-chain-container">
                <div class="pao-chain-header">
                    <h3>Level ${level}</h3>
                    <p>Ghi nhớ chuỗi số:</p>
                </div>
                <div class="pao-number-display">${currentSequence}</div>
                <div class="pao-countdown" id="pao-countdown">5</div>
            </div>
        `;

        let timeLeft = 5 + level;
        const countdownInterval = setInterval(() => {
            timeLeft--;
            const el = document.getElementById('pao-countdown');
            if (el) el.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                showRecallPhase();
            }
        }, 1000);
    }

    function showRecallPhase() {
        let recallHTML = `
            <div class="pao-chain-container">
                <div class="pao-chain-header">
                    <h3>Nhập PAO cho từng cặp số</h3>
                </div>
                <div class="pao-recall-grid">
        `;

        currentPairs.forEach((pair, index) => {
            recallHTML += `
                <div class="pao-recall-item">
                    <div class="pao-recall-number">${pair.code}</div>
                    <input type="text" placeholder="Person" data-index="${index}" data-type="person" class="pao-recall-input" />
                    <input type="text" placeholder="Action" data-index="${index}" data-type="action" class="pao-recall-input" />
                    <input type="text" placeholder="Object" data-index="${index}" data-type="object" class="pao-recall-input" />
                    ${window.getCurrentPaoSystem && window.getCurrentPaoSystem() === 'paoq' ? `<input type="text" placeholder="Quote" data-index="${index}" data-type="quote" class="pao-recall-input" />` : ''}
                </div>
            `;
        });

        recallHTML += `
                </div>
                <button class="btn-game-large" onclick="PAOGames.chainChallenge.checkAnswer()">Kiểm Tra</button>
            </div>
        `;

        document.getElementById('game-container').innerHTML = recallHTML;
        document.querySelector('.pao-recall-input').focus();
    }

    function checkAnswer() {
        const inputs = document.querySelectorAll('.pao-recall-input');
        let correct = 0;
        let total = currentPairs.length * (window.getCurrentPaoSystem && window.getCurrentPaoSystem() === 'paoq' ? 4 : 3);

        inputs.forEach(input => {
            const index = parseInt(input.dataset.index);
            const type = input.dataset.type;
            const userAnswer = input.value.trim().toLowerCase();
            const correctAnswer = currentPairs[index][type].toLowerCase();

            if (userAnswer === correctAnswer) {
                input.style.borderColor = '#10b981';
                correct++;
            } else {
                input.style.borderColor = '#ef4444';
            }
        });

        const percentage = (correct / total) * 100;

        if (percentage === 100) {
            score += level * 10;
            level++;
            setTimeout(() => {
                alert('🎉 Hoàn hảo! Level tiếp theo!');
                startMemorize();
            }, 1000);
        } else if (percentage >= 70) {
            score += level * 5;
            level++;
            setTimeout(() => {
                alert(`👍 Khá tốt! Đúng ${correct}/${total}`);
                startMemorize();
            }, 1000);
        } else {
            setTimeout(() => {
                alert(`😢 Chưa đạt! Đúng ${correct}/${total}. Thử lại!`);
                level = 1;
                score = 0;
                startMemorize();
            }, 1000);
        }

        gameScore = score;
        updateGameStats();
    }

    const publicAPI = {
        startMemorize,
        checkAnswer
    };

    window.PAOGames = window.PAOGames || {};
    window.PAOGames.chainChallenge = publicAPI;

    startMemorize();
    document.getElementById('timer').parentElement.style.display = 'none';
}

// PAO Game 6: Ultimate Speed Test (NEW - Nâng cao)
function startPAOUltimateSpeed() {
    let score = 0;
    let streak = 0;
    let maxStreak = 0;
    const TIME_LIMIT = 3000; // 3 seconds
    let questionTimer;

    function nextQuestion() {
        const data = getRandomPAONumeric();
        const types = getActivePaoTypes();
        let selectedType = types[Math.floor(Math.random() * types.length)];
        let correctAnswer = data[selectedType];
        while (!correctAnswer) {
            selectedType = types[Math.floor(Math.random() * types.length)];
            correctAnswer = data[selectedType];
        }

        // Get 3 wrong answers
        const allAnswers = Object.values(paoData).map(p => p[selectedType]).filter(Boolean);
        const wrongAnswers = [];
        while (wrongAnswers.length < 3 && allAnswers.length > 3) {
            const random = allAnswers[Math.floor(Math.random() * allAnswers.length)];
            if (random !== correctAnswer && !wrongAnswers.includes(random)) {
                wrongAnswers.push(random);
            }
        }

        const options = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
        const typeLabel = getPaoTypeLabel(selectedType);

        document.getElementById('game-container').innerHTML = `
            <div class="pao-ultimate-container">
                <div class="pao-ultimate-stats">
                    <div>🔥 Streak: ${streak}</div>
                    <div>⭐ Best: ${maxStreak}</div>
                </div>
                <div class="pao-question-box ultimate">
                    <div class="pao-question-number">${data.code}</div>
                    <div class="pao-question-text">[${typeLabel}] = ?</div>
                    <div class="pao-ultimate-timer">
                        <div class="pao-ultimate-timer-bar" id="ultimate-timer-bar"></div>
                    </div>
                </div>
                <div class="pao-options-grid">
                    ${options.map(opt => `
                        <button class="pao-option-btn" onclick="PAOGames.ultimateSpeed.answer('${opt.replace(/'/g, "\\'")}', '${correctAnswer.replace(/'/g, "\\'")}')">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;

        // Timer animation
        const startTime = Date.now();
        questionTimer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const percent = Math.max(0, 100 - ((elapsed / TIME_LIMIT) * 100));
            const barEl = document.getElementById('ultimate-timer-bar');
            if (barEl) barEl.style.width = percent + '%';

            if (elapsed >= TIME_LIMIT) {
                clearInterval(questionTimer);
                handleWrongAnswer();
            }
        }, 20);
    }

    function handleWrongAnswer() {
        streak = 0;
        wrongCount++;
        playSound('wrong');
        showEncouragement(false);
        updateGameStats();
        setTimeout(nextQuestion, 1000);
    }

    const publicAPI = {
        answer: (selected, correct) => {
            clearInterval(questionTimer);
            const buttons = document.querySelectorAll('.pao-option-btn');
            buttons.forEach(btn => btn.disabled = true);

            if (selected === correct) {
                streak++;
                maxStreak = Math.max(maxStreak, streak);
                score += 10 * (Math.floor(streak / 5) + 1); // Bonus mỗi 5 streak
                correctCount++;
                playSound('correct');
                showEncouragement(true);
            } else {
                handleWrongAnswer();
                return;
            }

            gameScore = score;
            updateGameStats();
            setTimeout(nextQuestion, 800);
        }
    };

    window.PAOGames = window.PAOGames || {};
    window.PAOGames.ultimateSpeed = publicAPI;

    nextQuestion();
    // Note: Game has its own 3-second timer per question
}

// PAO Game 7: Marathon Mode (NEW)
function startPAOMarathon() {
    const TOTAL_QUESTIONS = 100;
    let currentQuestion = 0;
    let score = 0;
    let startTime = Date.now();

    function nextQuestion() {
        if (currentQuestion >= TOTAL_QUESTIONS) {
            endGame();
            return;
        }

        currentQuestion++;
        const data = getRandomPAONumeric();
        const types = getActivePaoTypes();
        let selectedType = types[Math.floor(Math.random() * types.length)];
        let correctAnswer = data[selectedType];
        while (!correctAnswer) {
            selectedType = types[Math.floor(Math.random() * types.length)];
            correctAnswer = data[selectedType];
        }

        const allAnswers = Object.values(paoData).map(p => p[selectedType]).filter(Boolean);
        const wrongAnswers = [];
        while (wrongAnswers.length < 3 && allAnswers.length > 3) {
            const random = allAnswers[Math.floor(Math.random() * allAnswers.length)];
            if (random !== correctAnswer && !wrongAnswers.includes(random)) {
                wrongAnswers.push(random);
            }
        }

        const options = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
        const typeLabel = getPaoTypeLabelShort(selectedType);

        document.getElementById('game-container').innerHTML = `
            <div class="pao-marathon-container">
                <div class="pao-marathon-progress">
                    <div class="pao-progress-text">${currentQuestion} / ${TOTAL_QUESTIONS}</div>
                    <div class="pao-progress-bar">
                        <div class="pao-progress-fill" style="width: ${(currentQuestion / TOTAL_QUESTIONS) * 100}%"></div>
                    </div>
                </div>
                <div class="pao-question-box">
                    <div class="pao-question-number">${data.code}</div>
                    <div class="pao-question-text">[${typeLabel}] = ?</div>
                </div>
                <div class="pao-options-grid compact">
                    ${options.map(opt => `
                        <button class="pao-option-btn" onclick="PAOGames.marathon.answer('${opt.replace(/'/g, "\\'")}', '${correctAnswer.replace(/'/g, "\\'")}')">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function endGame() {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const avgTime = (elapsed / TOTAL_QUESTIONS).toFixed(1);
        const accuracy = ((correctCount / TOTAL_QUESTIONS) * 100).toFixed(1);

        alert(`🏁 Marathon Hoàn Thành!\n✓ Đúng: ${correctCount}/${TOTAL_QUESTIONS} (${accuracy}%)\n⏱️ Thời gian: ${elapsed}s (${avgTime}s/câu)\n⭐ Điểm: ${gameScore}`);
        showHomepage();
    }

    const publicAPI = {
        answer: (selected, correct) => {
            const buttons = document.querySelectorAll('.pao-option-btn');
            buttons.forEach(btn => btn.disabled = true);

            if (selected === correct) {
                score += 10;
                correctCount++;
                playSound('correct');
            } else {
                wrongCount++;
                playSound('wrong');
            }

            gameScore = score;
            updateGameStats();
            setTimeout(nextQuestion, 600);
        }
    };

    window.PAOGames = window.PAOGames || {};
    window.PAOGames.marathon = publicAPI;

    nextQuestion();
    // Note: Marathon tracks total time internally
}

// PAO Game 8: Survival Mode (NEW)
function startPAOSurvival() {
    let lives = 3;
    let score = 0;
    let streak = 0;

    function nextQuestion() {
        if (lives <= 0) {
            alert(`💀 Game Over!\n🔥 Streak tốt nhất: ${streak}\n⭐ Điểm: ${score}`);
            showHomepage();
            return;
        }

        const data = getRandomPAONumeric();
        const types = getActivePaoTypes();
        let selectedType = types[Math.floor(Math.random() * types.length)];
        let correctAnswer = data[selectedType];
        while (!correctAnswer) {
            selectedType = types[Math.floor(Math.random() * types.length)];
            correctAnswer = data[selectedType];
        }

        const allAnswers = Object.values(paoData).map(p => p[selectedType]).filter(Boolean);
        const wrongAnswers = [];
        while (wrongAnswers.length < 3 && allAnswers.length > 3) {
            const random = allAnswers[Math.floor(Math.random() * allAnswers.length)];
            if (random !== correctAnswer && !wrongAnswers.includes(random)) {
                wrongAnswers.push(random);
            }
        }

        const options = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
        const typeLabel = getPaoTypeLabel(selectedType);

        const heartsHTML = '❤️'.repeat(lives) + '🖤'.repeat(3 - lives);

        document.getElementById('game-container').innerHTML = `
            <div class="pao-survival-container">
                <div class="pao-survival-stats">
                    <div class="pao-lives">${heartsHTML}</div>
                    <div class="pao-streak">🔥 ${streak}</div>
                </div>
                <div class="pao-question-box">
                    <div class="pao-question-number">${data.code}</div>
                    <div class="pao-question-text">[${typeLabel}] = ?</div>
                </div>
                <div class="pao-options-grid">
                    ${options.map(opt => `
                        <button class="pao-option-btn" onclick="PAOGames.survival.answer('${opt.replace(/'/g, "\\'")}', '${correctAnswer.replace(/'/g, "\\'")}')">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    const publicAPI = {
        answer: (selected, correct) => {
            const buttons = document.querySelectorAll('.pao-option-btn');
            buttons.forEach(btn => btn.disabled = true);

            if (selected === correct) {
                streak++;
                score += 10;
                correctCount++;
                playSound('correct');
                showEncouragement(true);
            } else {
                lives--;
                streak = 0;
                wrongCount++;
                playSound('wrong');
                showEncouragement(false);
            }

            gameScore = score;
            updateGameStats();
            setTimeout(nextQuestion, 1000);
        }
    };

    window.PAOGames = window.PAOGames || {};
    window.PAOGames.survival = publicAPI;

    nextQuestion();
    document.getElementById('timer').parentElement.style.display = 'none';
}

// PAO Game 9: Combo Streak (NEW)
function startPAOComboStreak() {
    let score = 0;
    let combo = 1;
    let maxCombo = 1;

    function nextQuestion() {
        const data = getRandomPAONumeric();
        const types = getActivePaoTypes();
        let selectedType = types[Math.floor(Math.random() * types.length)];
        let correctAnswer = data[selectedType];
        while (!correctAnswer) {
            selectedType = types[Math.floor(Math.random() * types.length)];
            correctAnswer = data[selectedType];
        }

        const allAnswers = Object.values(paoData).map(p => p[selectedType]).filter(Boolean);
        const wrongAnswers = [];
        while (wrongAnswers.length < 3 && allAnswers.length > 3) {
            const random = allAnswers[Math.floor(Math.random() * allAnswers.length)];
            if (random !== correctAnswer && !wrongAnswers.includes(random)) {
                wrongAnswers.push(random);
            }
        }

        const options = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
        const typeLabel = getPaoTypeLabelShort(selectedType);

        const comboClass = combo >= 10 ? 'mega' : combo >= 5 ? 'super' : '';

        document.getElementById('game-container').innerHTML = `
            <div class="pao-combo-container">
                <div class="pao-combo-display ${comboClass}">
                    <div class="pao-combo-text">COMBO</div>
                    <div class="pao-combo-number">x${combo}</div>
                    <div class="pao-combo-max">Best: x${maxCombo}</div>
                </div>
                <div class="pao-question-box">
                    <div class="pao-question-number">${data.code}</div>
                    <div class="pao-question-text">[${typeLabel}] = ?</div>
                </div>
                <div class="pao-options-grid">
                    ${options.map(opt => `
                        <button class="pao-option-btn" onclick="PAOGames.comboStreak.answer('${opt.replace(/'/g, "\\'")}', '${correctAnswer.replace(/'/g, "\\'")}')">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    const publicAPI = {
        answer: (selected, correct) => {
            const buttons = document.querySelectorAll('.pao-option-btn');
            buttons.forEach(btn => btn.disabled = true);

            if (selected === correct) {
                combo++;
                maxCombo = Math.max(maxCombo, combo);
                const points = 10 * combo;
                score += points;
                correctCount++;
                playSound('correct');
                showEncouragement(true);

                // Show +points animation
                showReward(`+${points}`, '🔥');
            } else {
                combo = 1;
                wrongCount++;
                playSound('wrong');
                showEncouragement(false);
            }

            gameScore = score;
            updateGameStats();
            setTimeout(nextQuestion, 1000);
        }
    };

    window.PAOGames = window.PAOGames || {};
    window.PAOGames.comboStreak = publicAPI;

    nextQuestion();
    // Note: Combo Streak has per-question timer
}
