// Memory Encoding Data - Bộ mã hóa 00-99
const memoryData = {
    images: {},
    numbers: {},
    names: {}
};

// Load all images from bomahoa folder
const imageFiles = [
    { num: '00', name: 'Con Chó', file: '00 - Con Chó.jpg' },
    { num: '01', name: 'Con Trâu', file: '01 - Con Trâu.jpg' },
    { num: '02', name: 'Con Nhím', file: '02 - Con Nhím.jpg' },
    { num: '03', name: 'Con Mực', file: '03 - Con Mực.jpg' },
    { num: '04', name: 'Con Rắn', file: '04 - Con Rắn.jpg' },
    { num: '05', name: 'Cá Sấu', file: '05 - Cá Sấu.jpg' },
    { num: '06', name: 'Cái Búa', file: '06 - Cái Búa.jpg' },
    { num: '07', name: 'Cục Phấn', file: '07 - Cục Phấn.jpg' },
    { num: '08', name: 'Con Heo', file: '08 - Con Heo.jpg' },
    { num: '09', name: 'Con Gián', file: '09- Con Gián.jpg' },
    { num: '10', name: 'Tổ Chim', file: '10 - Tổ Chim.jpg' },
    { num: '11', name: 'Tinh Tinh', file: '11 - Tinh Tinh.jpg' },
    { num: '12', name: 'Tấm Nệm', file: '12 - Tấm Nệm.jpg' },
    { num: '13', name: 'Thang Máy', file: '13 - Thang Máy.jpg' },
    { num: '14', name: 'Túi Rác', file: '14 - Túi Rác.jpg' },
    { num: '15', name: 'Thùng Sơn', file: '15 - Thùng Sơn.jpg' },
    { num: '16', name: 'Túi Balo', file: '16 - Túi Balo.jpg' },
    { num: '17', name: 'Tai Phone', file: '17 - Tai Phone.jpg' },
    { num: '18', name: 'Tàu Hỏa', file: '18 - Tàu Hỏa.jpg' },
    { num: '19', name: 'Tê Giác', file: '19 - Tê Giác.jpg' },
    { num: '20', name: 'Nước Cất', file: '20 - Nước Cất.jpg' },
    { num: '21', name: 'Nhà Tù', file: '21 - Nhà Tù.jpg' },
    { num: '22', name: 'Người Nhện', file: '22 - Người Nhện.jpg' },
    { num: '23', name: 'Nước Mắm', file: '23 - Nước Mắm.jpg' },
    { num: '24', name: 'Nấm Rơm', file: '24 - Nấm Rơm.jpg' },
    { num: '25', name: 'Nhân Sâm', file: '25 - Nhân Sâm.jpg' },
    { num: '26', name: 'Nhẫn Bạc', file: '26 - Nhẫn Bạc.jpg' },
    { num: '27', name: 'Nổ Pháo', file: '27 - Nổ Pháo.jpg' },
    { num: '28', name: 'Nghiệm Hút', file: '28 - Nghiệm Hút.jpg' },
    { num: '29', name: 'Người Già', file: '29 - Người Già.jpg' },
    { num: '30', name: 'Móng Chân', file: '30 - Móng Chân.jpg' },
    { num: '31', name: 'Máy Tính', file: '31 - Máy Tính.jpg' },
    { num: '32', name: 'Màng Nhĩ', file: '32 - Màng Nhĩ.jpg' },
    { num: '33', name: 'Móc Mắt', file: '33 - Móc Mắt.jpg' },
    { num: '34', name: 'Mưa Rào', file: '34 - Mưa Rào.jpg' },
    { num: '35', name: 'Móc Sắt', file: '35 - Móc Sắt.jpg' },
    { num: '36', name: 'Máy Bay', file: '36 - Máy Bay.jpg' },
    { num: '37', name: 'Ma Phia', file: '37 - Ma Phia.jpg' },
    { num: '38', name: 'Màn Hình', file: '38 - Màn Hình.jpg' },
    { num: '39', name: 'Máy Giặt', file: '39 - Máy Giặt.jpg' },
    { num: '40', name: 'Răng Cưa', file: '40 - Răng Cưa.jpg' },
    { num: '41', name: 'Rổ Tre', file: '41 - Rổ Tre.jpg' },
    { num: '42', name: 'Ruột Non', file: '42- Ruột Non.jpg' },
    { num: '43', name: 'Rắc Muối', file: '43 - Rắc Muối.jpg' },
    { num: '44', name: 'Ròng Rọc', file: '44 - Ròng Rọc.jpg' },
    { num: '45', name: 'Rồng Sắt', file: '45 - Rồng Sắt.jpg' },
    { num: '46', name: 'Rô Bốt', file: '46 - Rô Bốt.jpg' },
    { num: '47', name: 'Rô Phi', file: '47 - Rô Phi.jpg' },
    { num: '48', name: 'Rau Hẹ', file: '48 - Rau Hẹ.jpg' },
    { num: '49', name: 'Rồ Ga', file: '49 - Rồ Ga.jpg' },
    { num: '50', name: 'Sữa Chua', file: '50 - Sữa Chua.jpg' },
    { num: '51', name: 'Sư Tử', file: '51 - Sư Tử.jpg' },
    { num: '52', name: 'Sọ Người', file: '52 - Sọ Người.jpg' },
    { num: '53', name: 'Sứt Môi', file: '53 - Sứt Môi.jpg' },
    { num: '54', name: 'Sầu Riêng', file: '54 - Sầu Riêng.jpg' },
    { num: '55', name: 'Su Su', file: '55 - Su Su.jpg' },
    { num: '56', name: 'Sóng Biển', file: '56 - Sóng Biển.jpg' },
    { num: '57', name: 'Sạc Pin', file: '57 - Sạc Pin.jpg' },
    { num: '58', name: 'Su Hào', file: '58 - Su Hào.jpg' },
    { num: '59', name: 'Sàn Gỗ', file: '59 - Sàn Gỗ.jpg' },
    { num: '60', name: 'Bọ Cạp', file: '60 - Bọ Cạp.jpg' },
    { num: '61', name: 'Bông Tai', file: '61 - Bông Tai.jpg' },
    { num: '62', name: 'Bắp Ngô', file: '62 - Bắp Ngô.jpg' },
    { num: '63', name: 'Bóng Ma', file: '63 - Bóng Ma.jpg' },
    { num: '64', name: 'Bóng Rổ', file: '64 - Bóng Rổ.jpg' },
    { num: '65', name: 'Bác Sĩ', file: '65 - Bác Sĩ.jpg' },
    { num: '66', name: 'Bong Bóng', file: '66 - Bong Bóng.jpg' },
    { num: '67', name: 'Bàn Phím', file: '67 - Bàn Phím.jpg' },
    { num: '68', name: 'Bác Hồ', file: '68 - Bác Hồ.jpg' },
    { num: '69', name: 'Bình Ga', file: '69 - Bình Ga.jpg' },
    { num: '70', name: 'Phi Công', file: '70 - Phi Công.jpg' },
    { num: '71', name: 'Phù Thủy', file: '71 - Phù Thủy.jpg' },
    { num: '72', name: 'Phá Nhà', file: '72 - Phá Nhà.jpg' },
    { num: '73', name: 'Phát Minh', file: '73 - Phát Minh.jpg' },
    { num: '74', name: 'Phấn Rôm', file: '74 - Phấn Rôm.jpg' },
    { num: '75', name: 'Pháp Sư', file: '75 - Pháp Sư.jpg' },
    { num: '76', name: 'Phong Bì', file: '76 - Phong Bì.jpg' },
    { num: '77', name: 'Phật Pháp', file: '77 - Phật Pháp.jpg' },
    { num: '78', name: 'Phóng Hỏa', file: '78 - Phóng Hỏa.jpg' },
    { num: '79', name: 'Phân Gà', file: '79 - Phân Gà.jpg' },
    { num: '80', name: 'Hươu Cao Cổ', file: '80 - Hươu Cao(Cổ).jpg' },
    { num: '81', name: 'Hành Tây', file: '81 - Hành Tây.jpg' },
    { num: '82', name: 'Hạt Nêm', file: '82 - Hạt Nêm.jpg' },
    { num: '83', name: 'Hộc Máu', file: '83 - Hộc Máu.jpg' },
    { num: '84', name: 'Hàng Rào', file: '84 - Hàng Rào.jpg' },
    { num: '85', name: 'Hố Sâu', file: '85 - Hố Sâu.jpg' },
    { num: '86', name: 'Hoàng Bào', file: '86 - Hoàng Bào.jpg' },
    { num: '87', name: 'Hoa Phượng', file: '87 - Hoa Phượng.jpg' },
    { num: '88', name: 'Hôi Hám', file: '88 - Hôi Hám.jpg' },
    { num: '89', name: 'Hạt Gạo', file: '89 - Hạt Gạo.jpg' },
    { num: '90', name: 'Gà Chọi', file: '90 - Gà Chọi.jpg' },
    { num: '91', name: 'Găng Tay', file: '91 - Găng Tay.jpg' },
    { num: '92', name: 'Gậy Như Ý', file: '92 - Gậy Như (ý).jpg' },
    { num: '93', name: 'Giun Móc', file: '93 - Giun Móc.jpg' },
    { num: '94', name: 'Giấy Ráp', file: '94 - Giấy Ráp.jpg' },
    { num: '95', name: 'Ghế Sofa', file: '95 - Ghế Sofa.jpg' },
    { num: '96', name: 'Gió Bão', file: '96 -  Gió Bão.jpg' },
    { num: '97', name: 'Giải Phóng', file: '97 - Giải Phóng.jpg' },
    { num: '98', name: 'Ghi Hình', file: '98 - Ghi Hình.jpg' },
    { num: '99', name: 'Ga Giường', file: '99 - Ga Giường.jpg' },
    // Special images
    { num: 'Jb', name: 'Jack Black', file: 'Jb - Jack Black.jpg' },
    { num: 'Jc', name: 'Jắc Cắm', file: 'Jc - Jắc Cắm.jpg' },
    { num: 'Jr', name: 'Iphone Red', file: 'Jr - Iphone Red.jpg' },
    { num: 'Jt', name: 'Inh Tai', file: 'Jt - Inh Tai.jpg' },
    { num: 'Kb', name: 'Kho Báu', file: 'Kb - Kho Báu.jpg' },
    { num: 'Kc', name: 'K Cộng', file: 'Kc - K Cộng.jpg' },
    { num: 'Kr', name: 'Kính Râm', file: 'Kr - Kính Râm.jpg' },
    { num: 'Kt', name: 'Khăn Tắm', file: 'Kt - Khăn Tắm.jpg' },
    { num: 'Qb', name: 'Quả Bơ', file: 'Qb - Quả Bơ.jpg' },
    { num: 'Qc', name: 'Quả Cầu', file: 'Qc - Quả Cầu.jpg' },
    { num: 'Qr', name: 'Quả Rứa', file: 'Qr - Quả Rứa.jpg' },
    { num: 'Qt', name: 'Quả Táo', file: 'Qt - Quả Táo.jpg' }
];

// Initialize memory data
function initMemoryData() {
    imageFiles.forEach(item => {
        const num = item.num;
        const path = `bomahoa/${item.file}`;
        memoryData.images[num] = path;
        memoryData.numbers[path] = num;
        memoryData.names[num] = item.name;
    });
}

// Get random number (00-99)
function getRandomNumber() {
    const num = Math.floor(Math.random() * 100);
    return String(num).padStart(2, '0');
}

// Get random special code (Jb, Jc, etc.) - ordered J, Q, K
function getRandomSpecialCode() {
    // Order: J first, then Q, then K
    const specialCodes = ['Jb', 'Jc', 'Jr', 'Jt', 'Qb', 'Qc', 'Qr', 'Qt', 'Kb', 'Kc', 'Kr', 'Kt'];
    return specialCodes[Math.floor(Math.random() * specialCodes.length)];
}

// Get all codes (numbers + special) - ordered J, Q, K
function getAllCodes() {
    const numbers = [];
    for (let i = 0; i < 100; i++) {
        numbers.push(String(i).padStart(2, '0'));
    }
    // Order: J first, then Q, then K
    const special = ['Jb', 'Jc', 'Jr', 'Jt', 'Qb', 'Qc', 'Qr', 'Qt', 'Kb', 'Kc', 'Kr', 'Kt'];
    return [...numbers, ...special];
}

// Get special codes in order J, Q, K
function getSpecialCodesInOrder() {
    return ['Jb', 'Jc', 'Jr', 'Jt', 'Qb', 'Qc', 'Qr', 'Qt', 'Kb', 'Kc', 'Kr', 'Kt'];
}

// Get random code (can be number or special)
function getRandomCode() {
    const allCodes = getAllCodes();
    return allCodes[Math.floor(Math.random() * allCodes.length)];
}

// Get all loci rooms - A-Z Memory Palace
function getAllLociRooms() {
    return [
        '00-20.jpg',
        '21-40.jpg',
        '41-60.jpg',
        // A-Z Rooms
        'A - Attic (Phòng gác mái).jpg',
        'B - Bed room.jpg',
        'C - Classroom (Phòng học).jpg',
        'D - Dining room (Phòng ăn).jpg',
        'E - Entrance hall (Sảnh vào).jpg',
        'F - Family room.jpg', // TODO: Add image
        'G - Gym.jpg', // TODO: Add image
        'H - Home theater.jpg', // TODO: Add image
        'I - Infirmary.jpg', // TODO: Add image
        'J - Jacuzzi room.jpg', // TODO: Add image
        'K - Kitchen.jpg', // TODO: Add image
        'L - Library.jpg', // TODO: Add image
        'M - Master bedroom.jpg', // TODO: Add image
        'N - Nursery.jpg', // TODO: Add image
        'O - Office.jpg', // TODO: Add image
        'P - Pantry.jpg', // TODO: Add image
        'Q - Quarters.jpg', // TODO: Add image
        'R - Recreation room.jpg', // TODO: Add image
        'S - Study.jpg', // TODO: Add image
        'T - Toilet Bathroom.jpg', // TODO: Add image
        'U - Utility room.jpg', // TODO: Add image
        'V - Vestibule (Tiền sảnh).jpg',
        'W - Wine cellar (Hầm rượu).jpg',
        'X- Xerox room (Phòng photocopy).jpg',
        'Y - Yoga room 2  (Phòng yoga).jpg',
        'Y- Yoga room (Phòng yoga).jpg',
        'Z- Zen garden room (Phòng vườn Thiền).jpg'
    ];
}

// Get letter-based loci rooms in order (A, B, C, D, etc.)
function getLetterLociRooms() {
    const allRooms = getAllLociRooms();
    return allRooms.filter(room => {
        const match = room.match(/^([A-Z]) - /);
        return match !== null;
    }).sort((a, b) => {
        const letterA = a.match(/^([A-Z]) - /)[1];
        const letterB = b.match(/^([A-Z]) - /)[1];
        return letterA.localeCompare(letterB);
    });
}

// Get all loci files (including numbered ones if they exist)
function getAllLociFiles() {
    // Castle loci with numbers already assigned (from loci-gan-so folder)
    const castleLoci = [
        { file: 'Loci-00-20.jpg', folder: 'loci-gan-so', numbers: generateRange(0, 20), type: 'castle-range', name: 'Loci 00-20' },
        { file: 'Loci-21-40.jpg', folder: 'loci-gan-so', numbers: generateRange(21, 40), type: 'castle-range', name: 'Loci 21-40' },
        { file: 'Loci-41-60.jpg', folder: 'loci-gan-so', numbers: generateRange(41, 60), type: 'castle-range', name: 'Loci 41-60' },
        { file: 'Loci-61-80.jpg', folder: 'loci-gan-so', numbers: generateRange(61, 80), type: 'castle-range', name: 'Loci 61-80' },
        { file: 'Loci-81-99.jpg', folder: 'loci-gan-so', numbers: generateRange(81, 99), type: 'castle-range', name: 'Loci 81-99' },
        { file: 'Loci-Jc-Kt.jpg', folder: 'loci-gan-so', numbers: ['Jc', 'Jr', 'Jt', 'Kb', 'Kc', 'Kr', 'Kt'], type: 'castle-special', name: 'Loci J-K Đặc Biệt' }
    ];
    
    // Helper function to generate number range
    function generateRange(start, end) {
        const range = [];
        for (let i = start; i <= end; i++) {
            range.push(String(i).padStart(2, '0'));
        }
        return range;
    }
    
    return {
        castle: castleLoci,
        ranges: ['00-20.jpg', '21-40.jpg', '41-60.jpg'], // Original range files
        letters: getAllLociRooms().filter(r => r.match(/^[A-Z] - /))
    };
}

// Get random loci room
function getRandomLociRoom() {
    const rooms = getAllLociRooms();
    return rooms[Math.floor(Math.random() * rooms.length)];
}

// Get random numbers (excluding some) - ensure no duplicates
function getRandomNumbers(count, exclude = []) {
    const available = imageFiles
        .map(item => item.num)
        .filter(num => !exclude.includes(num));
    
    const used = new Set(exclude);
    const result = [];
    const shuffled = available.sort(() => Math.random() - 0.5);
    
    for (const num of shuffled) {
        if (!used.has(num) && result.length < count) {
            result.push(num);
            used.add(num);
        }
    }
    
    return result;
}

// Get image path for number
function getImagePath(num) {
    return memoryData.images[num] || null;
}

// Get number for image path
function getNumberForImage(path) {
    return memoryData.numbers[path] || null;
}

// Get name for number
function getName(num) {
    return memoryData.names[num] || '';
}

// Initialize on load
initMemoryData();

