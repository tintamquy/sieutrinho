// Main Application Controller
let currentGame = null;
let gameTimer = null;
let gameScore = 0;
let correctCount = 0;
let wrongCount = 0;
let totalScore = 0;
let highScore = 0;
let userRank = 'beginner';

// Encouragement messages
const encouragementMessages = {
    correct: [
        { text: 'Tuyệt vời! 🎉', emoji: '🎉' },
        { text: 'Xuất sắc! ⭐', emoji: '⭐' },
        { text: 'Giỏi lắm! 👏', emoji: '👏' },
        { text: 'Hoàn hảo! 💯', emoji: '💯' },
        { text: 'Đúng rồi! ✅', emoji: '✅' },
        { text: 'Tuyệt đỉnh! 🔥', emoji: '🔥' },
        { text: 'Thần đồng! 🧠', emoji: '🧠' },
        { text: 'Bất ngờ quá! 😲', emoji: '😲' },
        { text: 'Siêu phàm! 🚀', emoji: '🚀' },
        { text: 'Vô địch! 🏆', emoji: '🏆' }
    ],
    wrong: [
        { text: 'Gần đúng rồi! 💪', emoji: '💪' },
        { text: 'Cố gắng thêm! 🌟', emoji: '🌟' },
        { text: 'Tiếp tục nào! 🎯', emoji: '🎯' },
        { text: 'Đừng bỏ cuộc! 💎', emoji: '💎' },
        { text: 'Học từ sai lầm! 📚', emoji: '📚' },
        { text: 'Bạn sẽ làm được! ✨', emoji: '✨' },
        { text: 'Thử lại nhé! 🔄', emoji: '🔄' },
        { text: 'Kiên trì là chìa khóa! 🔑', emoji: '🔑' }
    ]
};

// Rank system
const ranks = [
    { name: 'Mới bắt đầu', minScore: 0, class: 'rank-beginner', emoji: '🌱' },
    { name: 'Học viên', minScore: 100, class: 'rank-beginner', emoji: '📖' },
    { name: 'Thực tập sinh', minScore: 500, class: 'rank-intermediate', emoji: '🎓' },
    { name: 'Chuyên gia', minScore: 1000, class: 'rank-intermediate', emoji: '⭐' },
    { name: 'Bậc thầy', minScore: 2500, class: 'rank-advanced', emoji: '🔥' },
    { name: 'Siêu sao', minScore: 5000, class: 'rank-advanced', emoji: '💫' },
    { name: 'Huyền thoại', minScore: 10000, class: 'rank-master', emoji: '👑' },
    { name: 'Bất tử', minScore: 20000, class: 'rank-legend', emoji: '🏆' }
];

function getRank(totalScore) {
    for (let i = ranks.length - 1; i >= 0; i--) {
        if (totalScore >= ranks[i].minScore) {
            return ranks[i];
        }
    }
    return ranks[0];
}

let previousRank = null;

function updateRank() {
    const rank = getRank(totalScore);
    userRank = rank.class;
    const rankEl = document.getElementById('user-rank');
    if (rankEl) {
        rankEl.textContent = `${rank.emoji} ${rank.name}`;
        rankEl.className = `rank-badge ${rank.class}`;
        
        // Check for rank up
        if (previousRank && rank.minScore > previousRank.minScore) {
            playSound('levelup');
            setTimeout(() => {
                showEncouragement(true);
                const overlay = document.createElement('div');
                overlay.className = 'encouragement-message';
                overlay.innerHTML = `
                    <div class="encouragement-emoji">🎉</div>
                    <div class="encouragement-text">Thăng hạng! ${rank.emoji} ${rank.name}</div>
                `;
                document.body.appendChild(overlay);
                setTimeout(() => overlay.remove(), 3000);
            }, 500);
        }
        previousRank = rank;
    }
}

function showEncouragement(isCorrect) {
    const messages = isCorrect ? encouragementMessages.correct : encouragementMessages.wrong;
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    const overlay = document.createElement('div');
    overlay.className = 'encouragement-message';
    overlay.innerHTML = `
        <div class="encouragement-emoji">${message.emoji}</div>
        <div class="encouragement-text">${message.text}</div>
    `;
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.animation = 'encouragementPop 0.3s ease reverse';
        setTimeout(() => overlay.remove(), 300);
    }, 1500);
}

// Game definitions - Must be defined after games.js is loaded
// Organized by categories
const gameCategories = {
    beginner: {
        name: '🎯 Bắt Đầu',
        desc: 'Các game cơ bản để làm quen',
        color: '#10b981'
    },
    intermediate: {
        name: '⚡ Trung Bình',
        desc: 'Game có độ khó vừa phải',
        color: '#f59e0b'
    },
    advanced: {
        name: '🔥 Nâng Cao',
        desc: 'Game thử thách kỹ năng',
        color: '#ef4444'
    },
    palace: {
        name: '🏰 Cung Điện',
        desc: 'Game Memory Palace với các phòng',
        color: '#8b5cf6'
    }
};

const games = [
    // BEGINNER GAMES
    {
        id: 'basic-review',
        title: 'Ôn Tập Cơ Bản',
        icon: '📚',
        desc: 'Ôn tập từ 00-99 một cách đơn giản',
        category: 'beginner',
        func: typeof startBasicReviewGame !== 'undefined' ? startBasicReviewGame : null
    },
    {
        id: 'image-to-number',
        title: 'Hình → Số',
        icon: '🖼️',
        desc: 'Xem hình ảnh, chọn số tương ứng (00-99)',
        category: 'beginner',
        func: typeof startImageToNumberGame !== 'undefined' ? startImageToNumberGame : null
    },
    {
        id: 'number-to-image',
        title: 'Số → Hình',
        icon: '🔢',
        desc: 'Xem số, chọn hình ảnh đúng từ 4 lựa chọn',
        category: 'beginner',
        func: typeof startNumberToImageGame !== 'undefined' ? startNumberToImageGame : null
    },
    {
        id: 'flashcard',
        title: 'Flashcard',
        icon: '🃏',
        desc: 'Lật thẻ để học và ghi nhớ',
        category: 'beginner',
        func: typeof startFlashcardGame !== 'undefined' ? startFlashcardGame : null
    },
    // INTERMEDIATE GAMES
    {
        id: 'speed-challenge',
        title: 'Thử Thách Tốc Độ',
        icon: '⚡',
        desc: 'Trả lời nhanh nhất có thể trong thời gian giới hạn',
        category: 'intermediate',
        func: typeof startSpeedChallengeGame !== 'undefined' ? startSpeedChallengeGame : null
    },
    {
        id: 'time-attack',
        title: 'Tấn Công Thời Gian',
        icon: '⏰',
        desc: 'Trả lời càng nhiều càng tốt trong thời gian ngắn',
        category: 'intermediate',
        func: typeof startTimeAttackGame !== 'undefined' ? startTimeAttackGame : null
    },
    {
        id: 'reverse-challenge',
        title: 'Thử Thách Ngược',
        icon: '🔄',
        desc: 'Xem số, nhớ tên và hình ảnh',
        category: 'intermediate',
        func: typeof startReverseChallengeGame !== 'undefined' ? startReverseChallengeGame : null
    },
    {
        id: 'room-explorer',
        title: 'Khám Phá Phòng',
        icon: '🚪',
        desc: 'Khám phá các phòng ngẫu nhiên và ghi nhớ số',
        category: 'intermediate',
        func: typeof startRoomExplorerGame !== 'undefined' ? startRoomExplorerGame : null
    },
    {
        id: 'story-builder',
        title: 'Xây Dựng Câu Chuyện',
        icon: '📖',
        desc: 'Tạo câu chuyện từ các số để ghi nhớ dễ hơn',
        category: 'intermediate',
        func: typeof startStoryBuilderGame !== 'undefined' ? startStoryBuilderGame : null
    },
    {
        id: 'match-pairs',
        title: 'Ghép Đôi',
        icon: '🎯',
        desc: 'Tìm và ghép cặp số với hình ảnh',
        category: 'intermediate',
        func: typeof startMatchPairsGame !== 'undefined' ? startMatchPairsGame : null
    },
    // ADVANCED GAMES
    {
        id: 'sequence-memory',
        title: 'Nhớ Chuỗi',
        icon: '🔗',
        desc: 'Ghi nhớ và lặp lại chuỗi số theo thứ tự',
        category: 'advanced',
        func: typeof startSequenceMemoryGame !== 'undefined' ? startSequenceMemoryGame : null
    },
    {
        id: 'pattern-recognition',
        title: 'Nhận Diện Mẫu',
        icon: '🔍',
        desc: 'Tìm quy luật và mẫu trong dãy số',
        category: 'advanced',
        func: typeof startPatternRecognitionGame !== 'undefined' ? startPatternRecognitionGame : null
    },
    {
        id: 'special-codes',
        title: 'Mã Đặc Biệt',
        icon: '⭐',
        desc: 'Chơi với các mã đặc biệt: Jb, Jc, Kb, Kc, Qb, Qc...',
        category: 'advanced',
        func: typeof startSpecialCodesGame !== 'undefined' ? startSpecialCodesGame : null
    },
    {
        id: 'all-codes-master',
        title: 'Tổng Hợp Tất Cả',
        icon: '🎯',
        desc: 'Game tổng hợp tất cả mã 00-99 + mã đặc biệt trong một lần chơi',
        category: 'advanced',
        func: typeof startAllCodesMasterGame !== 'undefined' ? startAllCodesMasterGame : null
    },
    {
        id: 'basic-review-all',
        title: 'Ôn Tập Toàn Bộ',
        icon: '📖',
        desc: 'Ôn tập tất cả mã (00-99 + đặc biệt)',
        category: 'advanced',
        func: typeof startBasicReviewAllGame !== 'undefined' ? startBasicReviewAllGame : null
    },
    // PALACE GAMES
    {
        id: 'memory-palace',
        title: 'Cung Điện Cơ Bản',
        icon: '🏰',
        desc: 'Gắn số vào các căn phòng trong cung điện (00-99)',
        category: 'palace',
        func: typeof startMemoryPalaceGame !== 'undefined' ? startMemoryPalaceGame : null
    },
    {
        id: 'memory-palace-advanced',
        title: 'Cung Điện Nâng Cao',
        icon: '🏛️',
        desc: 'Memory Palace với tất cả các mã (00-99 + đặc biệt)',
        category: 'palace',
        func: typeof startMemoryPalaceAdvancedGame !== 'undefined' ? startMemoryPalaceAdvancedGame : null
    },
    {
        id: 'memory-palace-az',
        title: 'Cung Điện A-Z',
        icon: '🏛️',
        desc: 'Cung điện với các phòng A-Z và tất cả mã',
        category: 'palace',
        func: typeof startMemoryPalaceAZGame !== 'undefined' ? startMemoryPalaceAZGame : null
    },
    // TYPING GAMES
    {
        id: 'type-number',
        title: 'Gõ Số',
        icon: '⌨️',
        desc: 'Gõ số tương ứng với hình ảnh',
        category: 'intermediate',
        func: typeof startTypeNumberGame !== 'undefined' ? startTypeNumberGame : null
    },
    {
        id: 'type-name',
        title: 'Gõ Tên',
        icon: '✍️',
        desc: 'Gõ tên tương ứng với số',
        category: 'intermediate',
        func: typeof startTypeNameGame !== 'undefined' ? startTypeNameGame : null
    },
    {
        id: 'rapid-fire',
        title: 'Bắn Nhanh',
        icon: '💥',
        desc: 'Trả lời cực nhanh với thời gian ngắn',
        category: 'advanced',
        func: typeof startRapidFireGame !== 'undefined' ? startRapidFireGame : null
    },
    {
        id: 'memory-challenge',
        title: 'Thử Thách Trí Nhớ',
        icon: '🧩',
        desc: 'Thử thách với tất cả mã',
        category: 'advanced',
        func: typeof startMemoryChallengeGame !== 'undefined' ? startMemoryChallengeGame : null
    },
    {
        id: 'double-challenge',
        title: 'Thử Thách Kép',
        icon: '🎲',
        desc: 'Cộng 2 số từ hình ảnh',
        category: 'advanced',
        func: typeof startDoubleChallengeGame !== 'undefined' ? startDoubleChallengeGame : null
    }
].filter(game => game.func !== null); // Filter out games with null functions

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure all scripts are loaded
    setTimeout(() => {
        try {
            init3DBackground();
            loadScores();
            renderGames();
            setupEventListeners();
            
            // Debug: Check if games are loaded
            console.log('Games loaded:', games.length);
            console.log('Game functions:', games.map(g => ({ id: g.id, hasFunc: typeof g.func === 'function' })));
        } catch (error) {
            console.error('Initialization error:', error);
            // Show error to user
            const grid = document.getElementById('games-grid');
            if (grid) {
                grid.innerHTML = `
                    <div style="text-align: center; color: white; padding: 2rem;">
                        <h2>Lỗi khởi tạo ứng dụng</h2>
                        <p>Vui lòng tải lại trang</p>
                        <button onclick="location.reload()" class="btn-back" style="margin-top: 1rem;">
                            Tải lại
                        </button>
                    </div>
                `;
            }
        }
    }, 100);
});

// Initialize 3D background
function init3DBackground() {
    const container = document.getElementById('background-3d');
    if (!container || !window.THREE) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Add floating particles
    const particles = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        transparent: true,
        opacity: 0.6
    });
    
    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);
    
    camera.position.z = 50;
    
    function animate() {
        requestAnimationFrame(animate);
        particleSystem.rotation.y += 0.001;
        particleSystem.rotation.x += 0.0005;
        renderer.render(scene, camera);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Load scores from localStorage
function loadScores() {
    totalScore = parseInt(localStorage.getItem('totalScore') || '0');
    highScore = parseInt(localStorage.getItem('highScore') || '0');
    updateScoreDisplay();
    updateRank();
    renderReferenceSection();
}

// Save scores to localStorage
function saveScores() {
    localStorage.setItem('totalScore', totalScore.toString());
    localStorage.setItem('highScore', highScore.toString());
}

// Update score display
function updateScoreDisplay() {
    document.getElementById('high-score').textContent = highScore;
    document.getElementById('total-score').textContent = totalScore;
    updateRank();
}

// Render games on homepage by categories
function renderGames() {
    const grid = document.getElementById('games-grid');
    if (!grid) {
        console.error('Games grid not found!');
        return;
    }
    
    if (!games || games.length === 0) {
        console.error('No games defined!');
        grid.innerHTML = '<div style="text-align: center; color: white;">Không tìm thấy game nào</div>';
        return;
    }
    
    // Group games by category
    const gamesByCategory = {};
    games.forEach(game => {
        if (game.func && typeof game.func === 'function') {
            const category = game.category || 'beginner';
            if (!gamesByCategory[category]) {
                gamesByCategory[category] = [];
            }
            gamesByCategory[category].push(game);
        }
    });
    
    // Render by categories
    let html = '';
    Object.keys(gameCategories).forEach(categoryKey => {
        const category = gameCategories[categoryKey];
        const categoryGames = gamesByCategory[categoryKey] || [];
        
        if (categoryGames.length > 0) {
            html += `
                <div class="category-section">
                    <div class="category-header" style="border-left: 5px solid ${category.color};">
                        <h2 class="category-title">${category.name}</h2>
                        <p class="category-desc">${category.desc}</p>
                    </div>
                    <div class="category-games">
                        ${categoryGames.map(game => `
                            <div class="game-card" data-game-id="${game.id}" style="border-top: 3px solid ${category.color};">
                                <div class="game-icon">${game.icon}</div>
                                <div class="game-title">${game.title}</div>
                                <div class="game-desc">${game.desc}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    });
    
    grid.innerHTML = html;
    
    // Add click listeners
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const gameId = card.dataset.gameId;
            const game = games.find(g => g.id === gameId);
            if (game && game.func && typeof game.func === 'function') {
                startGame(game);
            } else {
                console.error('Game function not found for:', gameId);
                alert('Game này chưa sẵn sàng. Vui lòng thử lại sau.');
            }
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('back-btn').addEventListener('click', () => {
        stopGame();
        showHomepage();
    });
    
    const toggleRef = document.getElementById('toggle-reference');
    if (toggleRef) {
        toggleRef.addEventListener('click', () => {
            const refSection = document.getElementById('reference-section');
            if (refSection) {
                refSection.classList.toggle('hidden');
                toggleRef.textContent = refSection.classList.contains('hidden') 
                    ? '📖 Xem Bảng Tham Khảo Tất Cả Mã' 
                    : '❌ Đóng Bảng Tham Khảo';
            }
        });
    }
}

// Render reference section
function renderReferenceSection() {
    const grid = document.getElementById('reference-grid');
    if (!grid) return;
    
    const allCodes = getAllCodes();
    grid.innerHTML = allCodes.map(code => {
        const imagePath = getImagePath(code);
        const name = getName(code);
        return `
            <div class="reference-item">
                <img src="${imagePath}" alt="${name}" class="reference-image">
                <div class="reference-code">${code}</div>
                <div class="reference-name">${name}</div>
            </div>
        `;
    }).join('');
}

// Show homepage
function showHomepage() {
    document.getElementById('homepage').classList.add('active');
    document.getElementById('game-screen').classList.remove('active');
    updateScoreDisplay();
}

// Start game
function startGame(game) {
    try {
        document.getElementById('homepage').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');
        
        // Reset stats
        gameScore = 0;
        correctCount = 0;
        wrongCount = 0;
        updateGameStats();
        
        // Start game
        currentGame = game;
        if (game.func && typeof game.func === 'function') {
            game.func();
        } else {
            console.error('Game function is not a function:', game);
            alert('Lỗi: Game function không hợp lệ');
            showHomepage();
        }
    } catch (error) {
        console.error('Error starting game:', error);
        alert('Lỗi khi khởi động game: ' + error.message);
        showHomepage();
    }
}

// Game results tracking
let gameResults = {
    correct: [],
    wrong: [],
    questions: []
};

// Stop game
function stopGame() {
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
    
    // Save scores
    if (gameScore > highScore) {
        highScore = gameScore;
    }
    totalScore += gameScore;
    saveScores();
    
    // Show results if game was played
    if (currentGame && (correctCount > 0 || wrongCount > 0)) {
        showGameResults();
    }
    
    currentGame = null;
}

// Show game results
function showGameResults() {
    const container = document.getElementById('game-container');
    const accuracy = correctCount + wrongCount > 0 
        ? Math.round((correctCount / (correctCount + wrongCount)) * 100) 
        : 0;
    
    container.innerHTML = `
        <div class="game-results">
            <h2 style="text-align: center; font-size: 3rem; color: #ffffff; margin-bottom: 2rem; text-shadow: 3px 3px 8px rgba(0,0,0,0.8);">
                🎉 Kết Quả Game
            </h2>
            
            <div class="results-stats">
                <div class="result-stat">
                    <div class="result-icon">⭐</div>
                    <div class="result-label">Điểm số</div>
                    <div class="result-value">${gameScore}</div>
                </div>
                <div class="result-stat">
                    <div class="result-icon">✓</div>
                    <div class="result-label">Đúng</div>
                    <div class="result-value" style="color: #10b981;">${correctCount}</div>
                </div>
                <div class="result-stat">
                    <div class="result-icon">✗</div>
                    <div class="result-label">Sai</div>
                    <div class="result-value" style="color: #ef4444;">${wrongCount}</div>
                </div>
                <div class="result-stat">
                    <div class="result-icon">📊</div>
                    <div class="result-label">Độ chính xác</div>
                    <div class="result-value">${accuracy}%</div>
                </div>
            </div>
            
            ${wrongCount > 0 ? `
                <div class="wrong-answers-section">
                    <h3 style="text-align: center; font-size: 2rem; color: #ffffff; margin: 2rem 0 1rem; text-shadow: 2px 2px 6px rgba(0,0,0,0.8);">
                        📝 Ôn Lại Những Câu Sai
                    </h3>
                    <div class="wrong-answers-list">
                        ${gameResults.wrong.map(item => `
                            <div class="wrong-answer-item">
                                <div class="wrong-question">
                                    ${item.question || 'Câu hỏi'}
                                </div>
                                <div class="wrong-answer">
                                    <span style="color: #ef4444;">❌ Bạn chọn: ${item.userAnswer || 'N/A'}</span>
                                    <span style="color: #10b981; margin-left: 1rem;">✅ Đáp án đúng: ${item.correctAnswer || 'N/A'}</span>
                                </div>
                                ${item.image ? `<img src="${item.image}" alt="${item.correctAnswer}" class="wrong-answer-image">` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : `
                <div style="text-align: center; font-size: 2rem; color: #10b981; margin: 2rem 0; text-shadow: 2px 2px 6px rgba(0,0,0,0.8);">
                    🎉 Hoàn hảo! Bạn không sai câu nào!
                </div>
            `}
            
            <div style="text-align: center; margin-top: 2rem;">
                <button class="btn-back" onclick="showHomepage()" style="background: var(--primary); font-size: 1.2rem; padding: 1rem 2rem;">
                    🏠 Về Trang Chủ
                </button>
            </div>
        </div>
    `;
    
    // Reset results
    gameResults = { correct: [], wrong: [], questions: [] };
}

// Track wrong answer
function trackWrongAnswer(question, userAnswer, correctAnswer, image = null) {
    gameResults.wrong.push({
        question,
        userAnswer,
        correctAnswer,
        image
    });
}

// Update game stats
function updateGameStats() {
    document.getElementById('score').textContent = gameScore;
    document.getElementById('correct').textContent = correctCount;
    document.getElementById('wrong').textContent = wrongCount;
}

// Start timer
function startTimer(seconds, onComplete) {
    let timeLeft = seconds;
    document.getElementById('timer').textContent = timeLeft;
    
    if (gameTimer) clearInterval(gameTimer);
    
    gameTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        if (timeLeft <= 10) {
            document.getElementById('timer').parentElement.classList.add('timer-warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            if (onComplete) onComplete();
        }
    }, 1000);
}

// Stop timer
function stopTimer() {
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
    document.getElementById('timer').parentElement.classList.remove('timer-warning');
}

// Play sound using Web Audio API
function playSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        if (type === 'correct') {
            // Success sound - cheerful ascending tones
            const frequencies = [523.25, 659.25, 783.99, 987.77]; // C5, E5, G5, B5
            frequencies.forEach((freq, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + index * 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.2);
                oscillator.start(audioContext.currentTime + index * 0.1);
                oscillator.stop(audioContext.currentTime + index * 0.1 + 0.2);
            });
        } else if (type === 'wrong') {
            // Gentle error sound - not too harsh
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.value = 200;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
        } else if (type === 'levelup') {
            // Level up sound
            const frequencies = [523.25, 659.25, 783.99, 1046.50];
            frequencies.forEach((freq, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.25, audioContext.currentTime + index * 0.08);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.08 + 0.15);
                oscillator.start(audioContext.currentTime + index * 0.08);
                oscillator.stop(audioContext.currentTime + index * 0.08 + 0.15);
            });
        }
    } catch (e) {
        console.log('Audio play failed:', e);
    }
}

// Show reward
function showReward(points) {
    const overlay = document.getElementById('reward-overlay');
    const pointsEl = overlay.querySelector('.reward-points');
    pointsEl.textContent = `+${points} điểm`;
    
    overlay.classList.remove('hidden');
    
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 1500);
}

// Handle correct answer
function handleCorrect(points = 10) {
    correctCount++;
    gameScore += points;
    totalScore += points;
    updateGameStats();
    updateScoreDisplay();
    playSound('correct');
    showReward(points);
    showEncouragement(true);
    
    // Special encouragement for streaks
    if (correctCount % 5 === 0) {
        setTimeout(() => {
            showEncouragement(true);
        }, 2000);
    }
}

// Handle wrong answer
function handleWrong(question = null, userAnswer = null, correctAnswer = null, image = null) {
    wrongCount++;
    updateGameStats();
    playSound('wrong');
    showEncouragement(false);
    
    if (question && userAnswer && correctAnswer) {
        trackWrongAnswer(question, userAnswer, correctAnswer, image);
    }
}

// Get random answer options - ensure no duplicates
function getRandomOptions(correctNum, count = 4) {
    const options = [correctNum];
    const used = new Set([correctNum]);
    const available = imageFiles
        .map(item => item.num)
        .filter(num => num !== correctNum);
    
    const shuffled = available.sort(() => Math.random() - 0.5);
    
    for (const num of shuffled) {
        if (!used.has(num) && options.length < count) {
            options.push(num);
            used.add(num);
        }
    }
    
    // If we still need more options (for special codes), add them
    if (options.length < count) {
        const specialCodes = ['Jb', 'Jc', 'Jr', 'Jt', 'Kb', 'Kc', 'Kr', 'Kt', 'Qb', 'Qc', 'Qr', 'Qt'];
        for (const code of specialCodes) {
            if (!used.has(code) && options.length < count) {
                options.push(code);
                used.add(code);
            }
        }
    }
    
    return options.sort(() => Math.random() - 0.5);
}

