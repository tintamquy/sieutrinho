// Multiplayer Logic Controller
const Multiplayer = {
    database: null,
    currentRoom: null,
    playerInfo: {
        id: null,
        name: 'Người Chơi',
        isHost: false
    },
    refs: {
        room: null,
        chat: null,
        players: null
    },

    // Initialize
    init: function () {
        if (typeof firebase !== 'undefined') {
            this.database = firebase.database();
            // Generate temporary ID if not exists
            if (!localStorage.getItem('playerId')) {
                localStorage.setItem('playerId', 'p_' + Date.now() + Math.floor(Math.random() * 1000));
            }
            this.playerInfo.id = localStorage.getItem('playerId');

            // Restore name if saved
            const savedName = localStorage.getItem('playerName');
            if (savedName) {
                document.getElementById('player-name-input').value = savedName;
                this.playerInfo.name = savedName;
            }
        } else {
            console.error("Firebase SDK not loaded!");
            alert("Lỗi: Không thể kết nối đến máy chủ.");
        }
    },

    // UI Helpers
    showJoinInput: function () {
        document.getElementById('join-room-input').classList.remove('hidden');
    },

    // Create Room
    createRoom: function () {
        const nameInput = document.getElementById('player-name-input').value.trim();
        if (!nameInput) return alert("Vui lòng nhập tên của bạn!");

        this.playerInfo.name = nameInput;
        this.playerInfo.isHost = true;
        localStorage.setItem('playerName', nameInput);

        const roomId = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit code

        // Initialize Room Data
        const roomData = {
            id: roomId,
            status: 'waiting', // waiting, playing, finished
            hostId: this.playerInfo.id,
            createdAt: firebase.database.ServerValue.TIMESTAMP
        };

        // Create Room in DB
        this.database.ref('rooms/' + roomId).set(roomData)
            .then(() => {
                this.joinRoomLogic(roomId);
            })
            .catch(err => {
                console.error(err);
                alert("Lỗi tạo phòng: " + err.message);
            });
    },

    // Join Room (UI Trigger)
    joinRoom: function () {
        const nameInput = document.getElementById('player-name-input').value.trim();
        const roomId = document.getElementById('room-id-input').value.trim();

        if (!nameInput) return alert("Vui lòng nhập tên của bạn!");
        if (!roomId || roomId.length !== 6) return alert("Mã phòng không hợp lệ!");

        this.playerInfo.name = nameInput;
        this.playerInfo.isHost = false;
        localStorage.setItem('playerName', nameInput);

        // Check if room exists
        this.database.ref('rooms/' + roomId).once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    this.joinRoomLogic(roomId);
                } else {
                    alert("Phòng không tồn tại!");
                }
            });
    },

    // Join Room (Logic)
    joinRoomLogic: function (roomId) {
        this.currentRoom = roomId;
        this.refs.room = this.database.ref('rooms/' + roomId);
        this.refs.players = this.database.ref('rooms/' + roomId + '/players');
        this.refs.chat = this.database.ref('rooms/' + roomId + '/chat');

        // Add self to players list
        this.refs.players.child(this.playerInfo.id).set({
            name: this.playerInfo.name,
            score: 0,
            status: 'ready',
            isHost: this.playerInfo.isHost
        });

        // Add disconnect handler (remove player on close)
        this.refs.players.child(this.playerInfo.id).onDisconnect().remove();

        // Switch Screen
        document.getElementById('multiplayer-screen').classList.remove('active');
        document.getElementById('lobby-screen').classList.add('active');
        document.getElementById('current-room-id').textContent = roomId;

        this.subscribeToRoom();
        this.addSystemMessage(`${this.playerInfo.name} đã tham gia phòng!`);
    },

    // Listen for Room Updates
    subscribeToRoom: function () {
        // Listen to Players List
        this.refs.players.on('value', snapshot => {
            const players = snapshot.val();
            this.updateLobbyUI(players);
        });

        // Listen to Chat
        this.refs.chat.limitToLast(20).on('child_added', snapshot => {
            const msg = snapshot.val();
            this.appendChatMessage(msg);
        });

        // Listen to Game Status (Start Game)
        this.refs.room.child('status').on('value', snapshot => {
            const status = snapshot.val();
            if (status === 'playing') {
                this.onGameStart();
            }
        });
    },

    // Update Lobby UI
    updateLobbyUI: function (players) {
        const listEl = document.getElementById('players-list');
        const startBtn = document.getElementById('start-battle-btn');
        listEl.innerHTML = '';

        if (!players) return;

        const playerIds = Object.keys(players);

        // Host logic for Start Button
        if (this.playerInfo.isHost) {
            if (playerIds.length >= 2) {
                startBtn.disabled = false;
                startBtn.textContent = "⚔️ BẮT ĐẦU TRẬN ĐẤU";
                startBtn.style.background = "var(--success)";
            } else {
                startBtn.disabled = true;
                startBtn.textContent = "⏳ Đợi thêm người chơi...";
                startBtn.style.background = "rgba(255,255,255,0.1)";
            }
        } else {
            startBtn.textContent = "⏳ Chờ chủ phòng bắt đầu...";
            startBtn.disabled = true;
        }

        playerIds.forEach(id => {
            const p = players[id];
            const div = document.createElement('div');
            div.className = 'player-card';
            div.innerHTML = `
                <div style="font-weight: bold; font-size: 1.1rem;">
                    ${p.isHost ? '👑 ' : '👤 '} ${p.name} ${id === this.playerInfo.id ? '(Bạn)' : ''}
                </div>
                <div class="status-badge" style="color: #4ade80; font-size: 0.9rem;">● Sẵn sàng</div>
            `;
            listEl.appendChild(div);
        });
    },

    // Chat Functions
    sendChat: function () {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text) return;

        this.refs.chat.push({
            sender: this.playerInfo.name,
            senderId: this.playerInfo.id,
            text: text,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        input.value = '';
        input.focus();
    },

    handleChatKey: function (e) {
        if (e.key === 'Enter') this.sendChat();
    },

    appendChatMessage: function (msg) {
        const chatBox = document.getElementById('chat-messages');
        const isSelf = msg.senderId === this.playerInfo.id;

        const div = document.createElement('div');
        div.className = `chat-msg ${isSelf ? 'self' : 'other'}`;
        div.innerHTML = `
            <span class="sender">${msg.sender}</span>
            <div class="text">${msg.text}</div>
        `;

        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    },

    addSystemMessage: function (text) {
        const chatBox = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.className = 'system-msg';
        div.textContent = text;
        chatBox.appendChild(div);
    },

    // Copy Code
    copyRoomId: function () {
        navigator.clipboard.writeText(this.currentRoom)
            .then(() => alert("Đã sao chép mã phòng!"))
            .catch(() => prompt("Copy mã này gửi cho bạn bè:", this.currentRoom));
    },

    // Start Battle (Host Only)
    startBattle: function () {
        if (!this.playerInfo.isHost) return;
        this.refs.room.update({ status: 'playing' });
    },

    // On Game Start Event
    onGameStart: function () {
        // TODO: Transition to Game Screen
        alert("Trận đấu bắt đầu! (Tính năng game sync đang phát triển)");
    },

    leaveRoom: function () {
        if (confirm("Bạn muốn rời phòng?")) {
            if (this.refs.players) {
                this.refs.players.child(this.playerInfo.id).remove();
            }
            location.reload(); // Simple reload to reset state
        }
    }
};

// Global Helpers
window.showMultiplayerMenu = function () {
    Multiplayer.init();
    document.getElementById('homepage').classList.remove('active');
    document.getElementById('multiplayer-screen').classList.add('active');
};
