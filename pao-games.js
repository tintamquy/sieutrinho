// ===== PAO GAMES LOGIC =====
// Main controller
const GameController = {
    currentGame: 'menu',

    init() {
        this.setupNavigation();
        this.initAllGames();
    },

    setupNavigation() {
        // Nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const game = btn.dataset.game;
                this.switchGame(game);
            });
        });

        // Menu cards
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', () => {
                const game = card.dataset.game;
                this.switchGame(game);
            });
        });
    },

    switchGame(gameName) {
        // Update nav active state
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.game === gameName);
        });

        // Show screen
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(`${gameName}-screen`).classList.add('active');

        this.currentGame = gameName;
    },

    initAllGames() {
        FlashCardGame.init();
        SpeedQuizGame.init();
        ReverseQuizGame.init();
        MemoryMatchGame.init();
        ChainChallengeGame.init();
    }
};

// ===== FLASH CARD GAME =====
const FlashCardGame = {
    currentIndex: 0,
    isFlipped: false,
    allCodes: [],

    init() {
        this.allCodes = PAO_DATA.getAllNumericCodes();
        this.setupButtons();
        this.loadCard(0);
    },

    setupButtons() {
        document.getElementById('fc-flip').addEventListener('click', () => this.flipCard());
        document.getElementById('fc-next').addEventListener('click', () => this.nextCard());
        document.getElementById('fc-prev').addEventListener('click', () => this.prevCard());
        document.getElementById('fc-random').addEventListener('click', () => this.randomCard());

        // Click card to flip
        document.getElementById('flashcard').addEventListener('click', () => this.flipCard());
    },

    loadCard(index) {
        this.currentIndex = index;
        const data = this.allCodes[index];

        // Update progress
        document.getElementById('fc-progress').textContent = `${index + 1} / ${this.allCodes.length}`;

        // Update card content
        document.querySelector('.card-number').textContent = data.code;
        document.getElementById('fc-person').textContent = data.person;
        document.getElementById('fc-action').textContent = data.action;
        document.getElementById('fc-object').textContent = data.object;

        // Reset flip
        this.isFlipped = false;
        document.getElementById('flashcard').classList.remove('flipped');
    },

    flipCard() {
        this.isFlipped = !this.isFlipped;
        document.getElementById('flashcard').classList.toggle('flipped');
    },

    nextCard() {
        this.currentIndex = (this.currentIndex + 1) % this.allCodes.length;
        this.loadCard(this.currentIndex);
    },

    prevCard() {
        this.currentIndex = (this.currentIndex - 1 + this.allCodes.length) % this.allCodes.length;
        this.loadCard(this.currentIndex);
    },

    randomCard() {
        const randomIndex = Math.floor(Math.random() * this.allCodes.length);
        this.loadCard(randomIndex);
    }
};

// ===== SPEED QUIZ GAME =====
const SpeedQuizGame = {
    isPlaying: false,
    score: 0,
    wrong: 0,
    startTime: 0,
    timerInterval: null,
    currentAnswer: null,

    init() {
        document.getElementById('sq-start').addEventListener('click', () => this.start());
        document.getElementById('sq-stop').addEventListener('click', () => this.stop());
    },

    start() {
        this.isPlaying = true;
        this.score = 0;
        this.wrong = 0;
        this.startTime = Date.now();

        document.getElementById('sq-start').style.display = 'none';
        document.getElementById('sq-stop').style.display = 'inline-block';

        this.updateStats();
        this.nextQuestion();
        this.startTimer();
    },

    stop() {
        this.isPlaying = false;
        clearInterval(this.timerInterval);

        document.getElementById('sq-start').style.display = 'inline-block';
        document.getElementById('sq-stop').style.display = 'none';

        alert(`Kết thúc!\n✓ Đúng: ${this.score}\n✗ Sai: ${this.wrong}\n⏱️ Thời gian: ${this.getElapsedTime()}s`);
    },

    startTimer() {
        this.timerInterval = setInterval(() => {
            document.getElementById('sq-timer').textContent = this.getElapsedTime();
        }, 100);
    },

    getElapsedTime() {
        return ((Date.now() - this.startTime) / 1000).toFixed(1);
    },

    updateStats() {
        document.getElementById('sq-score').textContent = this.score;
        document.getElementById('sq-wrong').textContent = this.wrong;
    },

    nextQuestion() {
        if (!this.isPlaying) return;

        const data = PAO_DATA.getRandomNumericCode();
        this.currentAnswer = data;

        // Display number
        document.getElementById('sq-number').textContent = data.code;

        // Generate options
        const optionsContainer = document.getElementById('sq-options');
        optionsContainer.innerHTML = '';

        // Random type: P, A, or O
        const types = ['person', 'action', 'object'];
        const selectedType = types[Math.floor(Math.random() * types.length)];

        const correctAnswer = data[selectedType];
        const allAnswers = PAO_DATA.getAllNumericCodes().map(d => d[selectedType]);

        // Get 3 random wrong answers
        const wrongAnswers = [];
        while (wrongAnswers.length < 3) {
            const random = allAnswers[Math.floor(Math.random() * allAnswers.length)];
            if (random !== correctAnswer && !wrongAnswers.includes(random)) {
                wrongAnswers.push(random);
            }
        }

        // Mix with correct answer
        const options = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);

        // Create buttons
        options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';

            const typeLabel = selectedType === 'person' ? 'P' : selectedType === 'action' ? 'A' : 'O';
            btn.innerHTML = `<strong>[${typeLabel}]</strong> ${option}`;

            btn.addEventListener('click', () => {
                this.checkAnswer(btn, option, correctAnswer);
            });

            optionsContainer.appendChild(btn);
        });
    },

    checkAnswer(btn, selected, correct) {
        if (!this.isPlaying) return;

        // Disable all buttons
        document.querySelectorAll('.option-btn').forEach(b => {
            b.style.pointerEvents = 'none';
        });

        if (selected === correct) {
            btn.classList.add('correct');
            this.score++;
        } else {
            btn.classList.add('wrong');
            this.wrong++;

            // Show correct answer
            document.querySelectorAll('.option-btn').forEach(b => {
                if (b.textContent.includes(correct)) {
                    b.classList.add('correct');
                }
            });
        }

        this.updateStats();

        // Next question after 1.5s
        setTimeout(() => {
            this.nextQuestion();
        }, 1500);
    }
};

// ===== REVERSE QUIZ GAME =====
const ReverseQuizGame = {
    isPlaying: false,
    score: 0,
    wrong: 0,
    startTime: 0,
    timerInterval: null,
    currentAnswer: null,
    currentType: null,

    init() {
        document.getElementById('rq-start').addEventListener('click', () => this.start());
        document.getElementById('rq-stop').addEventListener('click', () => this.stop());
        document.getElementById('rq-submit').addEventListener('click', () => this.checkAnswer());

        // Enter to submit
        document.getElementById('rq-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkAnswer();
        });
    },

    start() {
        this.isPlaying = true;
        this.score = 0;
        this.wrong = 0;
        this.startTime = Date.now();

        document.getElementById('rq-start').style.display = 'none';
        document.getElementById('rq-stop').style.display = 'inline-block';

        this.updateStats();
        this.nextQuestion();
        this.startTimer();
    },

    stop() {
        this.isPlaying = false;
        clearInterval(this.timerInterval);

        document.getElementById('rq-start').style.display = 'inline-block';
        document.getElementById('rq-stop').style.display = 'none';

        alert(`Kết thúc!\n✓ Đúng: ${this.score}\n✗ Sai: ${this.wrong}\n⏱️ Thời gian: ${((Date.now() - this.startTime) / 1000).toFixed(1)}s`);
    },

    startTimer() {
        this.timerInterval = setInterval(() => {
            document.getElementById('rq-timer').textContent = ((Date.now() - this.startTime) / 1000).toFixed(1);
        }, 100);
    },

    updateStats() {
        document.getElementById('rq-score').textContent = this.score;
        document.getElementById('rq-wrong').textContent = this.wrong;
    },

    nextQuestion() {
        if (!this.isPlaying) return;

        const data = PAO_DATA.getRandomNumericCode();
        this.currentAnswer = data.code;

        // Random type
        const types = ['person', 'action', 'object'];
        const typeLabels = { person: 'Person', action: 'Action', object: 'Object' };
        this.currentType = types[Math.floor(Math.random() * types.length)];

        document.getElementById('rq-type-label').textContent = typeLabels[this.currentType];
        document.getElementById('rq-pao-value').textContent = data[this.currentType];

        // Clear input
        const input = document.getElementById('rq-input');
        input.value = '';
        input.style.borderColor = '';
        input.style.backgroundColor = '';
        input.focus();
    },

    checkAnswer() {
        if (!this.isPlaying) return;

        const input = document.getElementById('rq-input');
        const userAnswer = input.value.trim();

        if (userAnswer === '') return;

        if (userAnswer === this.currentAnswer) {
            this.score++;
            input.style.borderColor = 'var(--success)';
            input.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
        } else {
            this.wrong++;
            input.style.borderColor = 'var(--danger)';
            input.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';

            setTimeout(() => {
                alert(`Sai rồi! Đáp án đúng là: ${this.currentAnswer}`);
            }, 100);
        }

        this.updateStats();

        // Next question
        setTimeout(() => {
            this.nextQuestion();
        }, 1000);
    }
};

// ===== MEMORY MATCH GAME =====
const MemoryMatchGame = {
    pairs: 6,
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    startTime: 0,
    timerInterval: null,
    isPlaying: false,

    init() {
        document.getElementById('mm-start').addEventListener('click', () => this.start());
        document.getElementById('mm-difficulty').addEventListener('change', (e) => {
            this.pairs = parseInt(e.target.value);
        });
    },

    start() {
        this.isPlaying = true;
        this.matchedPairs = 0;
        this.moves = 0;
        this.flippedCards = [];
        this.startTime = Date.now();

        // Generate cards
        this.generateCards();
        this.updateStats();
        this.startTimer();
    },

    generateCards() {
        const grid = document.getElementById('match-grid');
        grid.innerHTML = '';

        // Get random PAO codes
        const allCodes = PAO_DATA.getAllNumericCodes();
        const selectedCodes = [];
        while (selectedCodes.length < this.pairs) {
            const random = allCodes[Math.floor(Math.random() * allCodes.length)];
            if (!selectedCodes.includes(random)) {
                selectedCodes.push(random);
            }
        }

        // Create card pairs: number and PAO
        this.cards = [];
        selectedCodes.forEach(data => {
            // Number card
            this.cards.push({
                type: 'number',
                value: data.code,
                matchId: data.code
            });

            // PAO card (random P, A, or O)
            const types = ['person', 'action', 'object'];
            const randomType = types[Math.floor(Math.random() * types.length)];
            this.cards.push({
                type: randomType,
                value: data[randomType],
                matchId: data.code
            });
        });

        // Shuffle cards
        this.cards.sort(() => Math.random() - 0.5);

        // Create DOM elements
        this.cards.forEach((card, index) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'match-card';
            cardEl.dataset.index = index;

            cardEl.addEventListener('click', () => this.flipCard(index));

            grid.appendChild(cardEl);
        });
    },

    flipCard(index) {
        if (!this.isPlaying) return;
        if (this.flippedCards.length >= 2) return;

        const cardEl = document.querySelectorAll('.match-card')[index];
        if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

        // Flip card
        cardEl.classList.add('flipped');
        const card = this.cards[index];

        if (card.type === 'number') {
            cardEl.textContent = card.value;
        } else {
            const typeLabel = card.type === 'person' ? 'P' : card.type === 'action' ? 'A' : 'O';
            cardEl.innerHTML = `<small style="display:block;font-size:0.8rem;opacity:0.7;margin-bottom:5px;">${typeLabel}</small>${card.value}`;
        }

        this.flippedCards.push({ index, card });

        // Check match when 2 cards flipped
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.updateStats();

            setTimeout(() => {
                this.checkMatch();
            }, 800);
        }
    },

    checkMatch() {
        const [card1, card2] = this.flippedCards;

        if (card1.card.matchId === card2.card.matchId) {
            // Match!
            document.querySelectorAll('.match-card')[card1.index].classList.add('matched');
            document.querySelectorAll('.match-card')[card2.index].classList.add('matched');

            this.matchedPairs++;
            this.updateStats();

            // Check win
            if (this.matchedPairs === this.pairs) {
                setTimeout(() => {
                    this.win();
                }, 500);
            }
        } else {
            // No match - flip back
            document.querySelectorAll('.match-card')[card1.index].classList.remove('flipped');
            document.querySelectorAll('.match-card')[card2.index].classList.remove('flipped');
            document.querySelectorAll('.match-card')[card1.index].textContent = '';
            document.querySelectorAll('.match-card')[card2.index].textContent = '';
        }

        this.flippedCards = [];
    },

    win() {
        clearInterval(this.timerInterval);
        this.isPlaying = false;

        const time = Math.floor((Date.now() - this.startTime) / 1000);
        alert(`🎉 Hoàn thành!\n⏱️ Thời gian: ${time}s\n🎯 Số lượt: ${this.moves}`);
    },

    startTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            document.getElementById('mm-timer').textContent = elapsed;
        }, 100);
    },

    updateStats() {
        document.getElementById('mm-matched').textContent = this.matchedPairs;
        document.getElementById('mm-total').textContent = this.pairs;
        document.getElementById('mm-moves').textContent = this.moves;
    }
};

// ===== CHAIN CHALLENGE GAME =====
const ChainChallengeGame = {
    level: 1,
    score: 0,
    currentSequence: '',
    currentPairs: [],

    init() {
        document.getElementById('cc-start-memorize').addEventListener('click', () => this.startMemorize());
        document.getElementById('cc-check-answer').addEventListener('click', () => this.checkAnswer());
        document.getElementById('cc-next-level').addEventListener('click', () => this.nextLevel());
        document.getElementById('cc-restart').addEventListener('click', () => this.restart());
    },

    restart() {
        this.level = 1;
        this.score = 0;
        this.showPhase('memorize');
        this.updateStats();
    },

    startMemorize() {
        // Generate sequence based on level
        const length = 2 + (this.level - 1); // Level 1 = 2 digits, Level 2 = 3 digits, etc.
        this.currentSequence = PAO_DATA.generateRandomNumberSequence(length * 2);
        this.currentPairs = PAO_DATA.parseSequenceToPAO(this.currentSequence);

        // Display sequence
        document.getElementById('cc-number-display').textContent = this.currentSequence;

        // Hide button, show countdown
        document.getElementById('cc-start-memorize').style.display = 'none';

        // Countdown
        let timeLeft = 5 + this.level; // More time for higher levels
        const countdownEl = document.getElementById('cc-countdown');
        countdownEl.style.display = 'block';
        countdownEl.textContent = timeLeft;

        const countdownInterval = setInterval(() => {
            timeLeft--;
            countdownEl.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                this.showRecallPhase();
            }
        }, 1000);
    },

    showRecallPhase() {
        this.showPhase('recall');

        // Generate recall inputs
        const grid = document.getElementById('cc-recall-grid');
        grid.innerHTML = '';

        this.currentPairs.forEach((pair, index) => {
            const item = document.createElement('div');
            item.className = 'recall-item';

            item.innerHTML = `
                <div class="recall-number">${pair.code}</div>
                <div class="recall-inputs">
                    <input type="text" class="recall-input" placeholder="Person" data-index="${index}" data-type="person" />
                    <input type="text" class="recall-input" placeholder="Action" data-index="${index}" data-type="action" />
                    <input type="text" class="recall-input" placeholder="Object" data-index="${index}" data-type="object" />
                </div>
            `;

            grid.appendChild(item);
        });

        // Focus first input
        grid.querySelector('.recall-input').focus();
    },

    checkAnswer() {
        const inputs = document.querySelectorAll('.recall-input');
        let correct = 0;
        let total = this.currentPairs.length * 3;

        inputs.forEach(input => {
            const index = parseInt(input.dataset.index);
            const type = input.dataset.type;
            const userAnswer = input.value.trim().toLowerCase();
            const correctAnswer = this.currentPairs[index].pao[type].toLowerCase();

            if (userAnswer === correctAnswer) {
                input.classList.add('correct');
                input.classList.remove('wrong');
                correct++;
            } else {
                input.classList.add('wrong');
                input.classList.remove('correct');
            }
        });

        // Calculate score
        const percentage = (correct / total) * 100;

        // Show result
        this.showResult(percentage, correct, total);
    },

    showResult(percentage, correct, total) {
        this.showPhase('result');

        const messageEl = document.getElementById('cc-result-message');
        const detailEl = document.getElementById('cc-result-detail');

        if (percentage === 100) {
            messageEl.textContent = '🎉 Hoàn Hảo!';
            messageEl.className = 'result-message success';
            this.score += this.level * 10;
        } else if (percentage >= 70) {
            messageEl.textContent = '👍 Khá Tốt!';
            messageEl.className = 'result-message success';
            this.score += this.level * 5;
        } else {
            messageEl.textContent = '😢 Chưa Đạt';
            messageEl.className = 'result-message failure';
        }

        detailEl.textContent = `Đúng ${correct}/${total} (${percentage.toFixed(0)}%) - Điểm: ${this.score}`;

        this.updateStats();
    },

    nextLevel() {
        this.level++;
        this.showPhase('memorize');
        this.updateStats();
    },

    showPhase(phase) {
        document.getElementById('cc-memorize-phase').style.display = phase === 'memorize' ? 'block' : 'none';
        document.getElementById('cc-recall-phase').style.display = phase === 'recall' ? 'block' : 'none';
        document.getElementById('cc-result-phase').style.display = phase === 'result' ? 'block' : 'none';

        if (phase === 'memorize') {
            document.getElementById('cc-start-memorize').style.display = 'inline-block';
            document.getElementById('cc-countdown').style.display = 'none';
        }
    },

    updateStats() {
        document.getElementById('cc-level').textContent = this.level;
        document.getElementById('cc-score').textContent = this.score;
    }
};

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    GameController.init();
});
