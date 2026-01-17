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
    { num: '28', name: 'Nghiện Hút', file: '28 - Nghiện Hút.jpg' },
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

// ===== PAO SYSTEM DATA =====
// PAO System Data (Person-Action-Object)
const paoData = {
    '00': { person: 'Con Cao', action: 'Vuốt Ve', object: 'Con Chó' },
    '01': { person: 'Bố Chí', action: 'Cưỡi phi nước đại', object: 'Con Trâu' },
    '02': { person: 'U Cẩm', action: 'Nhổ Lông', object: 'Con Nhím' },
    '03': { person: 'chị Chanh', action: 'Nướng', object: 'Con Mực' },
    '04': { person: 'Cháu Chi', action: 'Thôi Miên', object: 'Con Rắn' },
    '05': { person: 'Chị Cát', action: 'Vật Ngã', object: 'Cá Sấu' },
    '06': { person: 'em Cúc', action: 'Đập', object: 'Cái Búa' },
    '07': { person: 'anh Chung dạy English', action: 'Viết', object: 'Cục Phấn' },
    '08': { person: 'Cháu Châu', action: 'Mổ bụng', object: 'Con Heo' },
    '09': { person: 'anh Cương béo', action: 'Dẫm lên', object: 'Con Gián' },
    '10': { person: 'Bố Thịnh', action: 'Ấp', object: 'Tổ Chim' },
    '11': { person: 'Cháu Tôn', action: 'Gãi', object: 'Tinh Tinh' },
    '12': { person: 'Giám Đốc Tâm', action: 'Nằm đè', object: 'Tấm Nệm' },
    '13': { person: 'chị Trang', action: 'Cạy cửa', object: 'Thang Máy' },
    '14': { person: 'chị Thùy', action: 'Đổ đầy', object: 'Túi Rác' },
    '15': { person: 'chú Thái', action: 'khuấy', object: 'Thùng Sơn' },
    '16': { person: 'anh Tuấn The Zei', action: 'Đeo', object: 'Túi Balo' },
    '17': { person: 'em Thành kỹ thuật', action: 'Bịt tai', object: 'Tai Phôn' },
    '18': { person: 'Thế Anh kỹ sư', action: 'giật còi', object: 'Tàu Hỏa' },
    '19': { person: 'ông Trương', action: 'Húc', object: 'Tê Giác' },
    '20': { person: 'Con Ngọc', action: 'Hứng từng giọt', object: 'Nước Cất' },
    '21': { person: 'anh Nam', action: 'Bay ra khỏi', object: 'Nhà Tù' },
    '22': { person: 'cháu Nhất', action: 'Bắn tơ', object: 'Người Nhện' },
    '23': { person: 'chị Nương', action: 'Chấm', object: 'Nước Mắm' },
    '24': { person: 'cậu Nguyên', action: 'Hái', object: 'Nấm Rơm' },
    '25': { person: 'chị Kim Nhung', action: 'Ngậm mãi', object: 'Nhân Sâm' },
    '26': { person: 'chị Nga đồng tu', action: 'Dâng', object: 'Nhẫn Bạc' },
    '27': { person: 'cháu Ninh', action: 'Ném', object: 'Nổ Pháo' },
    '28': { person: 'anh Ngôn', action: 'Tiêm', object: 'Nghiện Hút' },
    '29': { person: 'Chú Nghiêm toản', action: 'Đẩy xe lăn', object: 'Người già' },
    '30': { person: 'bá Mạo', action: 'bấm cắt', object: 'Móng Chân' },
    '31': { person: 'anh Minh công ty', action: 'Xoay ốc', object: 'Máy Tính' },
    '32': { person: 'bà Mưu', action: 'ngoáy tai', object: 'Màng Nhĩ' },
    '33': { person: 'em Mạnh đồng tu', action: 'Moi', object: 'Móc Mắt' },
    '34': { person: 'Mẹ Xuân', action: 'Che', object: 'Mưa Rào' },
    '35': { person: 'anh May', action: 'Uốn cong', object: 'Móc Sắt' },
    '36': { person: 'Cháu Mai', action: 'Lái', object: 'Máy Bay' },
    '37': { person: 'ông Món', action: 'xả súng', object: 'Ma Phia' },
    '38': { person: 'bạn My', action: 'Liếm', object: 'Màn Hình' },
    '39': { person: 'Tam Mao TV', action: 'Chui', object: 'Máy Giặt' },
    '40': { person: 'Cháu Đễ (chồng Dung)', action: 'Cưa qua lại', object: 'Răng Cưa' },
    '41': { person: 'Bá Đông', action: 'Đan', object: 'Rổ Tre' },
    '42': { person: 'anh Dương', action: 'Nhồi', object: 'Ruột Non' },
    '43': { person: 'Cô Duy', action: 'Rắc đều', object: 'Rắc Muối' },
    '44': { person: 'cháu Dũng', action: 'Đu', object: 'Ròng Rọc' },
    '45': { person: 'Bác Dị', action: 'Múa', object: 'Rồng Sắt (gậy)' },
    '46': { person: 'anh Đăng', action: 'Lắp Ráp', object: 'Rô Bốt' },
    '47': { person: 'em Đoàn', action: 'giăng lưới', object: 'Rô Phi' },
    '48': { person: 'Cháu Dung', action: 'Buộc', object: 'Rau Hẹ' },
    '49': { person: 'Anh Đạt', action: 'Vặn Ga', object: 'Rồ Ga' },
    '50': { person: 'Sang Ca Nghĩa Vụ', action: 'Hút', object: 'Sữa Chua' },
    '51': { person: 'chị Sinh', action: 'Quất Roi', object: 'Sư Tử' },
    '52': { person: 'Đoàn Văn Sáng', action: 'Hôn má', object: 'Sọ Người' },
    '53': { person: 'Stephen Hawking', action: 'Khâu', object: 'Sứt môi' },
    '54': { person: 'Bác Sửu thủ thư', action: 'Ngửi', object: 'Sầu Riêng' },
    '55': { person: 'chị Sợi', action: 'Gọt vỏ', object: 'Su Su' },
    '56': { person: 'Pak Hang SEO', action: 'Lướt sóng', object: 'Sóng Biển' },
    '57': { person: 'em Sỏi địa chính', action: 'Sạc điện', object: 'Sạc Pin' },
    '58': { person: 'Em Sơn hà nội', action: 'Nhai', object: 'Su Hào' },
    '59': { person: 'Cô Sen lao công', action: 'Lau sàn', object: 'Sàn Gỗ' },
    '60': { person: 'Bạn Bích Bác Sĩ', action: 'Kẹp nhíp', object: 'Bọ Cạp' },
    '61': { person: 'chị Biên', action: 'Xỏ lỗ', object: 'Bông Tai' },
    '62': { person: 'Bác Bản ở chùa', action: 'luộc', object: 'Bắp Ngô' },
    '63': { person: 'Anh Bảo', action: 'đuổi bắt', object: 'Bóng Ma' },
    '64': { person: 'Đoàn Văn Báu', action: 'Úp rổ', object: 'Bóng Rổ' },
    '65': { person: 'Xuân Bắc', action: 'Bắt mạch', object: 'Bác Sĩ' },
    '66': { person: 'Vợ Bình', action: 'Bơm phồng', object: 'Bóng Bay' },
    '67': { person: 'Bin Anh', action: 'Gõ 10 ngón', object: 'Bàn Phím' },
    '68': { person: 'Anh Bách Việt Mỹ', action: 'Chào điều lệnh', object: 'Bác Hồ' },
    '69': { person: 'Bob Marley', action: 'Ôm', object: 'Bình Ga' },
    '70': { person: 'bạn Phong', action: 'Nhảy dù cùng', object: 'Phi Công' },
    '71': { person: 'Cô Phán thảo', action: 'Dán bùa giấy', object: 'Phù Thủy' },
    '72': { person: 'chú Phú', action: 'Khoan cắt bê tông', object: 'Phá Nhà' },
    '73': { person: 'Pele', action: 'Sút bóng vào', object: 'Phát Minh' },
    '74': { person: 'Cát Phượng', action: 'Vỗ phấn phủ mặt', object: 'Phấn Rôm' },
    '75': { person: 'anh Phúc giám đốc', action: 'Xếp chân kiết già', object: 'Pháp Sư' },
    '76': { person: 'Bá Phương', action: 'Đếm', object: 'Phong Bì' },
    '77': { person: 'Phước Thịnh', action: 'Lạy 5 vóc', object: 'Phật Pháp' },
    '78': { person: 'em Phi', action: 'châm lửa', object: 'Phóng Hỏa' },
    '79': { person: 'Rapper Pháo', action: 'Hót xẻng', object: 'Phân Gà' },
    '80': { person: 'cháu Hải', action: 'Vươn cổ', object: 'Hươu Cao Cổ' },
    '81': { person: 'anh Hùng Liên', action: 'Chảy nước mắt', object: 'Hành Tây' },
    '82': { person: 'chị Huyền', action: 'nếm', object: 'Hạt Nêm' },
    '83': { person: 'Hoàng', action: 'Ói', object: 'Hộc Máu' },
    '84': { person: 'anh Hợp hàng xóm', action: 'Leo qua tường', object: 'Hàng Rào' },
    '85': { person: 'bà Hiên', action: 'Đào', object: 'Hố Sâu' },
    '86': { person: 'anh Huy', action: 'Choàng Mặc', object: 'Hoàng Bào' },
    '87': { person: 'sếp Hạnh', action: 'Nhặt từng cánh', object: 'Hoa Phượng' },
    '88': { person: 'em Hường', action: 'Xịt khử mùi', object: 'Miệng Hôi Hám' },
    '89': { person: 'bà Hiệp', action: 'Sàng', object: 'Hạt Gạo' },
    '90': { person: 'Cháu Loa', action: 'bóp cổ', object: 'Gà Chọi' },
    '91': { person: 'anh Lập', action: 'Đấm bằng', object: 'Găng Tay' },
    '92': { person: 'anh Lanh', action: 'Biến dài', object: 'Gậy Như Ý' },
    '93': { person: 'bạn Loan', action: 'câu bằng', object: 'Giun Móc' },
    '94': { person: 'Mùi A Lưu', action: 'Trà sát', object: 'Giấy Giáp' },
    '95': { person: 'Em Long', action: 'tựa lưng', object: 'Ghế Sofa' },
    '96': { person: 'Gì Liên', action: 'quạt ba tiêu', object: 'Gió Bão' },
    '97': { person: 'Chú Liệu', action: 'Mở cửa', object: 'Giải Phóng' },
    '98': { person: 'Em Leng', action: 'Quay phim', object: 'Máy Ghi Hình' },
    '99': { person: 'Anh Lực', action: 'Trải phẳng', object: 'Ga Giường' },
    'JC': { person: 'Bác sĩ Gấm', action: 'rút dây', object: 'Giắc Cắm' },
    'JR': { person: 'Stive Jobs', action: 'Chạm nhẹ đầu ngón', object: 'Iphone' },
    'JT': { person: 'Jack 5 Củ ca sĩ', action: 'Hét', object: 'Inh Tai' },
    'JB': { person: 'Võ Nguyên Giáp', action: 'Phóng tên lửa', object: 'Người Khổng Lồ' },
    'QC': { person: 'Chị Quế', action: 'tâng bằng đùi', object: 'Quả Cầu' },
    'QR': { person: 'anh Quý', action: 'khoét', object: 'Quả rứa' },
    'QT': { person: 'anh Quang', action: 'Cắn', object: 'Quả Táo' },
    'QB': { person: 'Quỳnh anh', action: 'nghiền xay nát', object: 'Quả Bơ' },
    'KC': { person: 'Khoa xuka', action: 'bật nguồn', object: 'Đầu TV K+' },
    'KR': { person: 'Khoát', action: 'Cài', object: 'Kính Râm' },
    'KT': { person: 'Anh Khoái', action: 'quấn', object: 'Khăn Tắm' },
    'KB': { person: 'thầy Kiên', action: 'Dò bằng máy', object: 'Kho Báu' }
};

// PAO Helper Functions
function getPAO(code) {
    const normalized = code.toUpperCase();
    return paoData[normalized] || null;
}

function getRandomPAO() {
    const codes = Object.keys(paoData);
    const randomCode = codes[Math.floor(Math.random() * codes.length)];
    return { code: randomCode, ...paoData[randomCode] };
}

function getRandomPAONumeric() {
    const numericCodes = Object.keys(paoData).filter(code => /^\d{2}$/.test(code));
    const randomCode = numericCodes[Math.floor(Math.random() * numericCodes.length)];
    return { code: randomCode, ...paoData[randomCode] };
}

function getAllPAOCodes() {
    return Object.keys(paoData);
}

function parseNumbersToPAO(numberString) {
    // Parse string of numbers into PAO pairs
    // e.g., "152637" -> [{code: "15", person: ..., action: ..., object: ...}, ...]
    if (numberString.length % 2 !== 0) {
        numberString = '0' + numberString; // Pad with 0 if odd
    }

    const pairs = [];
    for (let i = 0; i < numberString.length; i += 2) {
        const code = numberString.substr(i, 2);
        const pao = getPAO(code);
        if (pao) {
            pairs.push({ code, ...pao });
        }
    }
    return pairs;
}

function generateRandomNumberString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}
