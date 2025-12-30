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
            <div class="question-label">Nhớ thứ tự các lá bài (${sequenceLength} lá, ${5} giây để xem)</div>
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
    setTimeout(() => {
        document.getElementById('cards-display').innerHTML = '';
        document.getElementById('cards-input-section').style.display = 'block';
        document.getElementById('cards-input').focus();
    }, 5000);
}

window.check52CardsAnswer = function() {
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

// Game 25: Binary Number Memory
function startBinaryMemoryGame() {
    gameResults = { correct: [], wrong: [], questions: [] };
    startTimer(300, () => {
        stopGame();
    });
    nextBinaryQuestion();
}

function nextBinaryQuestion() {
    // Generate random binary number (4-8 bits)
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

window.checkBinaryAnswer = function(mode) {
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

// Game 26: Random Number Sequence Memory
function startNumberSequenceGame() {
    gameResults = { correct: [], wrong: [], questions: [] };
    startTimer(300, () => {
        stopGame();
    });
    nextNumberSequenceQuestion();
}

function nextNumberSequenceQuestion() {
    // Generate random number sequence (3-7 digits)
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
    
    // Hide sequence after time
    setTimeout(() => {
        document.getElementById('sequence-display').innerHTML = '<div style="font-size: 2rem; color: rgba(255,255,255,0.3);">???</div>';
        document.getElementById('sequence-input-section').style.display = 'block';
        document.getElementById('sequence-input').focus();
        
        // Auto-focus on input and prevent non-numeric
        const input = document.getElementById('sequence-input');
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, length);
        });
    }, (length + 2) * 1000);
}

window.checkNumberSequenceAnswer = function() {
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

// Game 27: Speed Numbers (Siêu Trí Nhớ Style)
function startSpeedNumbersGame() {
    gameResults = { correct: [], wrong: [], questions: [] };
    startTimer(180, () => {
        stopGame();
    });
    nextSpeedNumbersQuestion();
}

function nextSpeedNumbersQuestion() {
    // Show 20 random digits quickly
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

window.checkSpeedNumbersAnswer = function() {
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

window.checkRandomWordsAnswer = function() {
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
