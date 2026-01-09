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

        // Check for rank up - show big celebration only at end or pause
        if (previousRank && rank.minScore > previousRank.minScore) {
            playSound('levelup');
            // Show small corner message during gameplay
            const messageDiv = document.createElement('div');
            messageDiv.className = 'encouragement-message';
            messageDiv.innerHTML = `
                <span class="encouragement-emoji">🎉</span>
                <span class="encouragement-text">Thăng hạng!</span>
            `;
            document.body.appendChild(messageDiv);
            setTimeout(() => messageDiv.remove(), 2000);
            // Big celebration will be shown at game end
        }
        previousRank = rank;
    }
}

function showEncouragement(isCorrect) {
    // Only show small corner message, no big overlays during gameplay
    const messages = isCorrect ? encouragementMessages.correct : encouragementMessages.wrong;
    const message = messages[Math.floor(Math.random() * messages.length)];

    // Create small fireworks particles (subtle)
    if (isCorrect) {
        createSubtleFireworks();
    }

    // Create small corner message (non-intrusive)
    const messageDiv = document.createElement('div');
    messageDiv.className = 'encouragement-message';
    messageDiv.innerHTML = `
        <span class="encouragement-emoji">${message.emoji}</span>
        <span class="encouragement-text">${message.text}</span>
    `;

    document.body.appendChild(messageDiv);

    // Auto remove after animation
    setTimeout(() => {
        messageDiv.remove();
    }, 1500);
}

// Subtle fireworks for corner encouragement
function createSubtleFireworks() {
    const colors = ['#ec4899', '#8b5cf6', '#f9ca24'];
    const centerX = window.innerWidth - 100;
    const centerY = 100;

    // Create small subtle particles
    for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 * i) / 5;
        const distance = 30 + Math.random() * 20;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const color = colors[Math.floor(Math.random() * colors.length)];

        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 5px ${color}`;
        particle.style.animationDuration = '0.8s';
        particle.style.animationDelay = (Math.random() * 0.2) + 's';

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

function createFireworks() {
    const colors = ['#ec4899', '#8b5cf6', '#6366f1', '#f9ca24', '#4ecdc4', '#ff6b6b'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 3;

    // Create multiple firework bursts
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const angleStep = (Math.PI * 2) / 12;
            for (let j = 0; j < 12; j++) {
                const angle = j * angleStep;
                const distance = 100 + Math.random() * 50;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                const color = colors[Math.floor(Math.random() * colors.length)];

                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.backgroundColor = color;
                particle.style.boxShadow = `0 0 10px ${color}`;

                // Random delay for each particle
                particle.style.animationDelay = (Math.random() * 0.3) + 's';

                document.body.appendChild(particle);

                setTimeout(() => particle.remove(), 1800);
            }
        }, i * 200);
    }
}

// Game definitions - Must be defined after games.js is loaded
// Organized by categories
const gameCategories = {
    beginner: {
        name: '🎯 Bắt Đầu',
        desc: 'Các game cơ bản để làm quen',
        color: '#10b981',
        order: 1
    },
    intermediate: {
        name: '⚡ Trung Bình',
        desc: 'Game có độ khó vừa phải',
        color: '#f59e0b',
        order: 2
    },
    advanced: {
        name: '🔥 Nâng Cao',
        desc: 'Game thử thách kỹ năng',
        color: '#ef4444',
        order: 3
    },
    palace: {
        name: '🏰 Cung Điện',
        desc: 'Game Memory Palace với các phòng',
        color: '#8b5cf6',
        order: 4
    },
    chinese: {
        name: '🇨🇳 Tiếng Trung',
        desc: 'Game học bộ thủ tiếng Trung',
        color: '#dc2626',
        order: 5
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
        id: 'reverse-challenge',
        title: 'Thử Thách Ngược',
        icon: '🔄',
        desc: 'Xem số, nhớ tên và hình ảnh',
        category: 'intermediate',
        func: typeof startReverseChallengeGame !== 'undefined' ? startReverseChallengeGame : null
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
    // SIÊU TRÍ NHỚ GAMES
    {
        id: 'binary-digits',
        title: 'Số Nhị Phân',
        icon: '⚡',
        desc: 'Ghi nhớ 1200 số nhị phân ngẫu nhiên trong 3 phút',
        category: 'advanced',
        func: typeof startBinaryDigitsGame !== 'undefined' ? startBinaryDigitsGame : null
    },
    {
        id: 'number-memory',
        title: 'Ghi Nhớ Số',
        icon: '🔢',
        desc: 'Ghi nhớ số lượng số tùy chọn trong thời gian tùy chỉnh (5-20 phút)',
        category: 'advanced',
        func: typeof startNumberMemoryGame !== 'undefined' ? startNumberMemoryGame : null
    },
    {
        id: 'speed-numbers',
        title: 'Siêu Tốc Số',
        icon: '⚡',
        desc: 'Nhớ 20 chữ số trong 5 giây (Siêu Trí Nhớ)',
        category: 'advanced',
        func: typeof startSpeedNumbersGame !== 'undefined' ? startSpeedNumbersGame : null
    },
    // CHINESE RADICALS GAMES
    {
        id: 'chinese-radicals',
        title: 'Bộ Thủ Tiếng Trung',
        icon: '🇨🇳',
        desc: 'Nhớ bộ thủ tiếng Trung qua thơ',
        category: 'chinese',
        func: typeof startChineseRadicalsGame !== 'undefined' ? startChineseRadicalsGame : null
    },
    {
        id: 'chinese-radicals-by-day',
        title: 'Bộ Thủ Theo Ngày',
        icon: '📅',
        desc: 'Học bộ thủ theo từng ngày (1-8)',
        category: 'chinese',
        func: typeof startChineseRadicalsByDayGame !== 'undefined' ? startChineseRadicalsByDayGame : null
    },
    {
        id: 'loci-castle',
        title: 'Loci Lâu Đài',
        icon: '🏯',
        desc: 'Game loci với các ảnh đã gắn số sẵn',
        category: 'palace',
        func: typeof startLociCastleGame !== 'undefined' ? startLociCastleGame : null
    },
    {
        id: 'cards-memory',
        title: '52 Lá Bài',
        icon: '🃏',
        desc: 'Ghi nhớ thứ tự 52 lá bài tây',
        category: 'advanced',
        func: typeof start52CardsMemoryGame !== 'undefined' ? start52CardsMemoryGame : null
    },
    {
        id: 'random-words',
        title: 'Từ Ngẫu Nhiên',
        icon: '📝',
        desc: 'Ghi nhớ danh sách các từ ngẫu nhiên',
        category: 'advanced',
        func: typeof startRandomWordsGame !== 'undefined' ? startRandomWordsGame : null
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
// Render quick menu games - Only featured games
function renderQuickMenu() {
    const quickMenu = document.getElementById('game-quick-menu');
    if (!quickMenu) return;

    // Featured games - only the most important/representative ones
    const featuredGameIds = [
        'number-memory',      // Random Numbers - Highlighted
        'binary-digits',
        'image-to-number',
        'cards-memory',
        'random-words',
        'memory-palace-az',
        'speed-challenge',
        'all-codes-master'
    ];

    const featuredGames = featuredGameIds
        .map(id => games.find(g => g.id === id))
        .filter(g => g && g.func && typeof g.func === 'function');

    quickMenu.innerHTML = featuredGames.map(game => {
        const category = gameCategories[game.category] || gameCategories.beginner;
        return `
            <div class="quick-game-card" data-game-id="${game.id}" style="border-top: 3px solid ${category.color};">
                <div class="quick-game-icon">${game.icon}</div>
                <div class="quick-game-title">${game.title}</div>
            </div>
        `;
    }).join('');

    // Add click listeners
    quickMenu.querySelectorAll('.quick-game-card').forEach(card => {
        card.addEventListener('click', () => {
            const gameId = card.dataset.gameId;
            const game = games.find(g => g.id === gameId);
            if (game && game.func && typeof game.func === 'function') {
                startGame(game);
            }
        });
    });
}

// Render games into tabs
function renderGames() {
    console.error('Games grid not found!');
    return;
}

if (!games || games.length === 0) {
    console.error('No games defined!');
    grid.innerHTML = '<div style="text-align: center; color: white;">Không tìm thấy game nào</div>';
    return;
}

// Render quick menu first
renderQuickMenu();

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

// Sort categories by order
const sortedCategories = Object.keys(gameCategories).sort((a, b) => {
    return (gameCategories[a].order || 999) - (gameCategories[b].order || 999);
});

// Render by categories in order
let html = '';
sortedCategories.forEach(categoryKey => {
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

    const shareAchievementBtn = document.getElementById('share-achievement-btn');
    if (shareAchievementBtn) {
        shareAchievementBtn.addEventListener('click', () => {
            generateAchievementImage();
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

        // Check if it's a Memory Palace game and show room selection
        const memoryPalaceGames = ['memory-palace-az', 'memory-palace-advanced'];
        if (memoryPalaceGames.includes(game.id) && typeof showLociRoomSelection === 'function') {
            showLociRoomSelection((selectedRoom) => {
                // Store selected room and start the game
                selectedLociRoom = selectedRoom;
                currentGame = game;
                if (game.func && typeof game.func === 'function') {
                    // Override getRandomLociRoom temporarily
                    const originalGetRandom = window.getRandomLociRoom;
                    window.getRandomLociRoom = function () { return selectedRoom; };
                    game.func();
                    // Restore after a short delay
                    setTimeout(() => {
                        window.getRandomLociRoom = originalGetRandom;
                    }, 100);
                }
            });
            return;
        }

        // Start game normally
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
            
            <div style="text-align: center; margin-top: 2rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button class="btn-back" id="share-result-btn" onclick="shareGameResult()" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-size: 1.2rem; padding: 1rem 2rem;">
                    📸 Chia Sẻ Kết Quả
                </button>
                <button class="btn-back" onclick="restartCurrentGame()" style="background: var(--success); font-size: 1.2rem; padding: 1rem 2rem;">
                    🔄 Chơi Lại
                </button>
                <button class="btn-back" onclick="showHomepage()" style="background: var(--primary); font-size: 1.2rem; padding: 1rem 2rem;">
                    🏠 Về Trang Chủ
                </button>
            </div>
        </div>
    `;

    // Reset results
    gameResults = { correct: [], wrong: [], questions: [] };
}

// Generate and share achievement image
// Generate and share achievement image - Improved
window.generateAchievementImage = async function generateAchievementImage() {
    const shareBtn = document.getElementById('share-achievement-btn');
    if (shareBtn) {
        shareBtn.disabled = true;
        shareBtn.textContent = '⏳ Đang tạo hình...';
    }

    try {
        // Update achievement container with current stats
        const achievementContainer = document.getElementById('achievement-container');
        const highScoreEl = document.getElementById('achievement-high-score');
        const totalScoreEl = document.getElementById('achievement-total-score');
        const rankEl = document.getElementById('achievement-rank');

        if (highScoreEl) highScoreEl.textContent = highScore;
        if (totalScoreEl) totalScoreEl.textContent = totalScore.toLocaleString('vi-VN');

        // Get rank info
        const rank = getRank(totalScore);
        if (rankEl) {
            rankEl.textContent = `${rank.emoji} ${rank.name}`;
            rankEl.className = `rank-badge ${rank.class}`;
            rankEl.style.display = 'inline-block';
        }

        // Show container temporarily for screenshot
        // Clone it to ensure clean capture environment
        const cloneContainer = achievementContainer.cloneNode(true);
        cloneContainer.style.display = 'block';
        cloneContainer.style.position = 'absolute';
        cloneContainer.style.top = '0';
        cloneContainer.style.left = '-9999px';
        cloneContainer.style.width = '1200px'; // Fixed high-res width
        cloneContainer.style.background = 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)';
        cloneContainer.style.padding = '40px';
        cloneContainer.style.borderRadius = '20px';
        document.body.appendChild(cloneContainer);

        // Wait a bit for rendering
        await new Promise(resolve => setTimeout(resolve, 100));

        // Create canvas from achievement container
        const canvas = await html2canvas(cloneContainer, {
            backgroundColor: null,
            scale: window.innerWidth < 768 ? 1.5 : 2,
            logging: false,
            useCORS: true,
            allowTaint: true,
            width: 1200,
            height: 630
        });

        // Clean up
        document.body.removeChild(cloneContainer);

        // Convert canvas to blob
        canvas.toBlob(async (blob) => {
            if (!blob) {
                throw new Error('Blob creation failed');
            }

            const file = new File([blob], 'thanh-tich-sieu-tri-nho.png', { type: 'image/png' });

            // Try Web Share API first (mobile)
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        title: 'Thành tích Siêu Trí Nhớ của tôi! 🧠',
                        text: `Tôi đã đạt ${highScore} điểm cao nhất và ${totalScore.toLocaleString('vi-VN')} tổng điểm! ${rank.emoji} ${rank.name}`,
                        files: [file]
                    });
                    resetShareBtn();
                    return;
                } catch (err) {
                    console.log('Web Share API failed, falling back to download');
                }
            }

            // Fallback: Download image
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'thanh-tich-sieu-tri-nho.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Show success message
            setTimeout(() => {
                alert('✅ Đã tạo hình ảnh thành tích! Bạn có thể chia sẻ hình ảnh này trên mạng xã hội.');
                URL.revokeObjectURL(url);
            }, 100);

            resetShareBtn();
        }, 'image/png');
    } catch (error) {
        console.error('Error creating achievement image:', error);
        alert('Có lỗi xảy ra khi tạo hình ảnh. Vui lòng thử lại.');
        resetShareBtn();
    }

    function resetShareBtn() {
        if (shareBtn) {
            shareBtn.disabled = false;
            shareBtn.textContent = '📸 Tạo Ảnh Khoe Thành Tích';
        }
    }
};

// Share game result as image
// Share game result as image - Improved for Mobile
window.shareGameResult = async function shareGameResult() {
    const resultsContainer = document.querySelector('.game-results');
    if (!resultsContainer) {
        console.error('Results container not found');
        return;
    }

    const shareBtn = document.getElementById('share-result-btn');
    if (shareBtn) {
        shareBtn.disabled = true;
        shareBtn.textContent = '⏳ Đang tạo hình...';
    }

    try {
        // Clone the container to a clean "screenshot" area to ensure visibility and contrast
        const cloneContainer = document.createElement('div');
        cloneContainer.innerHTML = resultsContainer.innerHTML;
        cloneContainer.style.position = 'absolute';
        cloneContainer.style.top = '0';
        cloneContainer.style.left = '-9999px';
        cloneContainer.style.width = '600px'; // Fixed width for consistent look
        cloneContainer.style.padding = '2rem';
        cloneContainer.style.background = '#0f172a'; // Dark background
        cloneContainer.style.color = '#fff';
        cloneContainer.style.borderRadius = '20px';
        cloneContainer.style.fontFamily = 'sans-serif';
        document.body.appendChild(cloneContainer);

        // Wait a moment for DOM
        await new Promise(resolve => setTimeout(resolve, 100));

        // Create canvas
        const canvas = await html2canvas(cloneContainer, {
            backgroundColor: '#0f172a',
            scale: window.innerWidth < 768 ? 1.5 : 2, // Reduce scale on mobile
            logging: false,
            useCORS: true,
            allowTaint: true
        });

        // Clean up
        document.body.removeChild(cloneContainer);

        // Convert canvas to blob
        canvas.toBlob(async (blob) => {
            if (!blob) {
                throw new Error('Blob creation failed');
            }

            const file = new File([blob], 'ket-qua-game.png', { type: 'image/png' });

            // Try Web Share API (Mobile)
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        title: 'Kết quả game Siêu Trí Nhớ',
                        text: `Tôi đã đạt ${gameScore} điểm! Bạn có làm được không? 🧠`,
                        files: [file]
                    });
                    resetShareBtn();
                    return;
                } catch (err) {
                    console.log('Web Share API cancelled or failed:', err);
                }
            }

            // Fallback: Download (PC)
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `sieu-tri-nho-score-${gameScore}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => URL.revokeObjectURL(url), 100);

            resetShareBtn();
            alert('✅ Đã lưu ảnh! Hãy chia sẻ với bạn bè nhé!');
        }, 'image/png');

    } catch (error) {
        console.error('Error in shareGameResult:', error);
        alert('Không thể tạo ảnh. Vui lòng thử chụp màn hình thủ công.');
        resetShareBtn();
    }

    function resetShareBtn() {
        if (shareBtn) {
            shareBtn.disabled = false;
            shareBtn.textContent = '📸 Chia Sẻ Kết Quả';
        }
    }
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

// Show reward - small corner display
function showReward(points) {
    const overlay = document.getElementById('reward-overlay');
    const pointsEl = overlay.querySelector('.reward-points');
    const iconEl = overlay.querySelector('.reward-icon');

    pointsEl.textContent = `+${points}`;
    iconEl.textContent = '⭐';

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

// Loci room selection state
let selectedLociRoom = null;

// Show loci room selection UI
function showLociRoomSelection(onSelect) {
    const letterRooms = getLetterLociRooms();
    const container = document.getElementById('game-container');

    container.innerHTML = `
        <div class="loci-selection-container">
            <div class="loci-selection-title">🏰 Chọn phòng trong Cung Điện (theo thứ tự A-B-C-D...)</div>
            <div class="loci-rooms-grid">
                ${letterRooms.map(room => {
        const letter = room.match(/^([A-Z]) - /)[1];
        const name = room.replace(/^[A-Z] - /, '').replace('.jpg', '');
        return `
                        <div class="loci-room-option" data-room="${room}">
                            <img src="loci/${room}" alt="${name}">
                            <div class="room-letter">${letter}</div>
                            <div class="room-name">${name}</div>
                        </div>
                    `;
    }).join('')}
            </div>
        </div>
    `;

    // Add click handlers
    container.querySelectorAll('.loci-room-option').forEach(option => {
        option.addEventListener('click', function () {
            // Remove previous selection
            container.querySelectorAll('.loci-room-option').forEach(opt => {
                opt.classList.remove('selected');
            });

            // Select this room
            this.classList.add('selected');
            selectedLociRoom = this.dataset.room;

            // Call callback after short delay for visual feedback
            setTimeout(() => {
                if (onSelect) onSelect(selectedLociRoom);
            }, 300);
        });
    });
}

// Restart current game
function restartCurrentGame() {
    if (currentGame && currentGame.func && typeof currentGame.func === 'function') {
        // Reset stats
        gameScore = 0;
        correctCount = 0;
        wrongCount = 0;
        updateGameStats();
        gameResults = { correct: [], wrong: [], questions: [] };

        // Stop any running timers
        if (gameTimer) {
            clearInterval(gameTimer);
            gameTimer = null;
        }

        // Ensure we're on game screen
        document.getElementById('homepage').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');

        // Restart the game
        currentGame.func();
    } else {
        showHomepage();
    }
}

// Make restartCurrentGame available globally
window.restartCurrentGame = restartCurrentGame;

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

