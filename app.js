// Main Application Controller
let currentGame = null;
let gameTimer = null;
let gameScore = 0;
let correctCount = 0;
let wrongCount = 0;
let totalScore = 0;
let highScore = 0;

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

// Stop game
function stopGame() {
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
    currentGame = null;
    
    // Save scores
    if (gameScore > highScore) {
        highScore = gameScore;
    }
    totalScore += gameScore;
    saveScores();
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
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'correct') {
            // Success sound - ascending tones
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } else if (type === 'wrong') {
            // Error sound - low buzz
            oscillator.frequency.value = 150;
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
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
    updateGameStats();
    playSound('correct');
    showReward(points);
}

// Handle wrong answer
function handleWrong() {
    wrongCount++;
    updateGameStats();
    playSound('wrong');
}

// Get random answer options
function getRandomOptions(correctNum, count = 4) {
    const options = [correctNum];
    const available = imageFiles
        .map(item => item.num)
        .filter(num => num !== correctNum);
    
    const shuffled = available.sort(() => Math.random() - 0.5);
    options.push(...shuffled.slice(0, count - 1));
    
    return options.sort(() => Math.random() - 0.5);
}

