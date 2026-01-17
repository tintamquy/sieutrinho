// Major System and Alphabet System Flashcard Games

// ===== MAJOR SYSTEM FLASHCARD GAME =====
function startMajorSystemFlashcard() {
    let currentIndex = 0;
    const allItems = MAJOR_SYSTEM_DATA.rawData;

    function loadCard(index) {
        currentIndex = index;
        const item = allItems[index];

        document.getElementById('game-container').innerHTML = `
            <div class="pao-flashcard-container">
                <div class="pao-progress">Thẻ ${index + 1} / ${allItems.length}</div>
                <div class="pao-flashcard" id="major-card">
                    <div class="pao-card-front">
                        <div class="pao-card-number">${item.number}</div>
                        <div class="pao-card-subtitle">Major System</div>
                    </div>
                    <div class="pao-card-back">
                        <div class="pao-info-box">
                            <div class="pao-item"><strong>Số:</strong> ${item.number}</div>
                            <div class="pao-item"><strong>Ký tự:</strong> ${item.character}</div>
                            <div class="pao-item"><strong>Hình ảnh:</strong> ${item.image}</div>
                        </div>
                    </div>
                </div>
                <div class="pao-controls">
                    <button class="btn-game" onclick="MajorFlashCard.flip()">Lật Thẻ (Space/Enter)</button>
                    <button class="btn-game" onclick="MajorFlashCard.prev()">← Trước</button>
                    <button class="btn-game" onclick="MajorFlashCard.next()">Sau →</button>
                    <button class="btn-game" onclick="MajorFlashCard.random()">🎲 Ngẫu Nhiên (R)</button>
                </div>
                <div class="pao-hint">
                    <small>💡 Phím tắt: Space/Enter = Lật thẻ | ← → = Điều hướng | R = Random</small>
                </div>
            </div>
        `;

        document.getElementById('major-card').classList.remove('flipped');
    }

    const publicAPI = {
        flip: () => {
            document.getElementById('major-card').classList.toggle('flipped');
        },
        next: () => {
            currentIndex = (currentIndex + 1) % allItems.length;
            loadCard(currentIndex);
        },
        prev: () => {
            currentIndex = (currentIndex - 1 + allItems.length) % allItems.length;
            loadCard(currentIndex);
        },
        random: () => {
            currentIndex = Math.floor(Math.random() * allItems.length);
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

    // Setup keyboard controls
    publicAPI.keyboardHandler = function (event) {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        switch (event.key) {
            case ' ':
            case 'Enter':
                event.preventDefault();
                publicAPI.flip();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                publicAPI.prev();
                break;
            case 'ArrowRight':
                event.preventDefault();
                publicAPI.next();
                break;
            case 'r':
            case 'R':
                event.preventDefault();
                publicAPI.random();
                break;
        }
    };

    document.addEventListener('keydown', publicAPI.keyboardHandler);

    window.MajorFlashCard = publicAPI;

    loadCard(0);
    document.getElementById('timer').parentElement.style.display = 'none';
}

// ===== ALPHABET SYSTEM FLASHCARD GAME =====
function startAlphabetSystemFlashcard() {
    let currentIndex = 0;
    const allItems = ALPHABET_SYSTEM_DATA.rawData;

    function loadCard(index) {
        currentIndex = index;
        const item = allItems[index];

        document.getElementById('game-container').innerHTML = `
            <div class="pao-flashcard-container">
                <div class="pao-progress">Thẻ ${index + 1} / ${allItems.length}</div>
                <div class="pao-flashcard" id="alphabet-card">
                    <div class="pao-card-front">
                        <div class="pao-card-number">${item.character}</div>
                        <div class="pao-card-subtitle">Alphabet System</div>
                    </div>
                    <div class="pao-card-back">
                        <div class="pao-info-box">
                            <div class="pao-item"><strong>Chữ cái:</strong> ${item.character}</div>
                            <div class="pao-item"><strong>Số:</strong> ${item.number}</div>
                            <div class="pao-item"><strong>Hình ảnh:</strong> ${item.image}</div>
                        </div>
                    </div>
                </div>
                <div class="pao-controls">
                    <button class="btn-game" onclick="AlphabetFlashCard.flip()">Lật Thẻ (Space/Enter)</button>
                    <button class="btn-game" onclick="AlphabetFlashCard.prev()">← Trước</button>
                    <button class="btn-game" onclick="AlphabetFlashCard.next()">Sau →</button>
                    <button class="btn-game" onclick="AlphabetFlashCard.random()">🎲 Ngẫu Nhiên (R)</button>
                </div>
                <div class="pao-hint">
                    <small>💡 Phím tắt: Space/Enter = Lật thẻ | ← → = Điều hướng | R = Random</small>
                </div>
            </div>
        `;

        document.getElementById('alphabet-card').classList.remove('flipped');
    }

    const publicAPI = {
        flip: () => {
            document.getElementById('alphabet-card').classList.toggle('flipped');
        },
        next: () => {
            currentIndex = (currentIndex + 1) % allItems.length;
            loadCard(currentIndex);
        },
        prev: () => {
            currentIndex = (currentIndex - 1 + allItems.length) % allItems.length;
            loadCard(currentIndex);
        },
        random: () => {
            currentIndex = Math.floor(Math.random() * allItems.length);
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

    // Setup keyboard controls
    publicAPI.keyboardHandler = function (event) {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        switch (event.key) {
            case ' ':
            case 'Enter':
                event.preventDefault();
                publicAPI.flip();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                publicAPI.prev();
                break;
            case 'ArrowRight':
                event.preventDefault();
                publicAPI.next();
                break;
            case 'r':
            case 'R':
                event.preventDefault();
                publicAPI.random();
                break;
        }
    };

    document.addEventListener('keydown', publicAPI.keyboardHandler);

    window.AlphabetFlashCard = publicAPI;

    loadCard(0);
    document.getElementById('timer').parentElement.style.display = 'none';
}
