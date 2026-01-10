// Firebase Configuration for Leaderboard
// Note: You need to create a Realtime Database in Firebase Console to get databaseURL

const firebaseConfig = {
    apiKey: "AIzaSyAo1XIovBjGUNHwFhHN_jOknsYBO8o0VYc",
    authDomain: "khongthudam-b262d.firebaseapp.com",
    databaseURL: "https://khongthudam-b262d-default-rtdb.asia-southeast1.firebasedatabase.app", // Cần tạo Realtime Database trong Firebase Console
    projectId: "khongthudam-b262d",
    storageBucket: "khongthudam-b262d.firebasestorage.app",
    messagingSenderId: "972076342464",
    appId: "1:972076342464:web:415c5aa47a8d09e1cce125"
};

// Initialize Firebase
let database = null;
let firebaseInitialized = false;

function initializeFirebase() {
    try {
        if (typeof firebase === 'undefined') {
            console.warn('Firebase SDK not loaded. Leaderboard features disabled.');
            return false;
        }

        firebase.initializeApp(firebaseConfig);
        database = firebase.database();
        firebaseInitialized = true;
        console.log('Firebase initialized successfully');
        return true;
    } catch (error) {
        console.error('Firebase initialization error:', error);
        return false;
    }
}

// Submit score to leaderboard
async function submitScore(gameId, score, nickname) {
    if (!firebaseInitialized) {
        console.warn('Firebase not initialized');
        return false;
    }

    try {
        nickname = nickname || 'Anonymous';
        const timestamp = Date.now();

        // Create unique player ID based on nickname and timestamp
        const playerId = `${nickname}_${timestamp}`;

        const scoreData = {
            nickname: nickname,
            score: score,
            gameId: gameId,
            timestamp: timestamp,
            date: new Date().toISOString()
        };

        // Save to /leaderboard/{gameId}/{playerId}
        await database.ref(`leaderboard/${gameId}/${playerId}`).set(scoreData);

        console.log('Score submitted successfully');
        return true;
    } catch (error) {
        console.error('Error submitting score:', error);
        return false;
    }
}

// Get top scores for a game
async function getTopScores(gameId, limit = 10) {
    if (!firebaseInitialized) {
        return [];
    }

    try {
        const snapshot = await database.ref(`leaderboard/${gameId}`)
            .orderByChild('score')
            .limitToLast(limit)
            .once('value');

        const scores = [];
        snapshot.forEach((child) => {
            scores.push(child.val());
        });

        // Sort descending (highest first)
        return scores.reverse();
    } catch (error) {
        console.error('Error fetching scores:', error);
        return [];
    }
}

// Get global top scores (all games combined)
async function getGlobalTopScores(limit = 10) {
    if (!firebaseInitialized) {
        return [];
    }

    try {
        const allScores = [];
        const gamesSnapshot = await database.ref('leaderboard').once('value');

        gamesSnapshot.forEach((gameSnapshot) => {
            gameSnapshot.forEach((scoreSnapshot) => {
                allScores.push(scoreSnapshot.val());
            });
        });

        // Sort by score descending
        allScores.sort((a, b) => b.score - a.score);

        return allScores.slice(0, limit);
    } catch (error) {
        console.error('Error fetching global scores:', error);
        return [];
    }
}
