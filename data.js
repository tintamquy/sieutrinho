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
const paoDataOriginal = {
    '00': { person: 'Con Cao', action: 'Vuốt Ve', object: 'Con Chó', story: 'Con Cao (con trai bạn) đang cúi xuống âu yếm Vuốt Ve đầu một chú Con Chó cưng.' },
    '01': { person: 'Bố Chí', action: 'Cưỡi phi nước đại', object: 'Con Trâu', story: 'Bố Chí oai phong như cao bồi đang Cưỡi phi nước đại trên lưng Con Trâu mộng điên cuồng.' },
    '02': { person: 'U Cẩm', action: 'Nhổ Lông', object: 'Con Nhím', story: 'U Cẩm đeo kính lúp tỉ mẩn ngồi Nhổ Lông từng cái gai nhọn hoắt của Con Nhím.' },
    '03': { person: 'chị Chanh', action: 'Nướng', object: 'Con Mực', story: 'Chị Chanh quạt than hồng hì hục Nướng một Con Mực khổng lồ thơm phức.' },
    '04': { person: 'Cháu Chi', action: 'Mắt bắn tia thôi miên', object: 'Con Rắn', story: 'Cháu Chi thổi sáo nghệ thuật để Mắt bắn tia thôi miên một Con Rắn hổ mang chúa đang múa.' },
    '05': { person: 'Chị Cát', action: 'Vật Ngã', object: 'Cá Sấu', story: 'Chị Cát khỏe như lực sĩ lao vào Vật Ngã ngửa bụng con Cá Sấu hung dữ.' },
    '06': { person: 'em Cúc', action: 'Đập', object: 'Cái Búa', story: 'Em Cúc tức giận cầm lấy tay mình Đập mạnh vào cán Cái Búa (hoặc dùng búa đập cái gì đó). Sửa: Em Cúc cầm Cái Búa lên Đập nát đồ vật. (Theo thứ tự P hành động với O: Em Cúc giận dữ Đập mạnh cái Cái Búa xuống bàn).' },
    '07': { person: 'anh Chung dạy English', action: 'Viết', object: 'Cục Phấn', story: 'Anh Chung dạy English bay nhảy như diễn viên múa để Viết bằng Cục Phấn thần kỳ.' },
    '08': { person: 'Cháu Châu', action: 'Mổ bụng', object: 'Con Heo', story: 'Cháu Châu đóng vai bác sĩ phẫu thuật đang tập trung Mổ bụng cứu chữa cho Con Heo.' },
    '09': { person: 'anh Cương béo', action: 'Dẫm lên', object: 'Con Gián', story: 'Anh Cương béo nhảy cẫng lên và la hét khi lỡ chân Dẫm lên một Con Gián đang bò.' },
    '10': { person: 'Bố Thịnh', action: 'Ấp', object: 'Tổ Chim', story: 'Bố Thịnh leo lên cây ngồi xổm cố gắng Ấp ủ đàn trứng trong Tổ Chim.' },
    '11': { person: 'Cháu Tôn', action: 'Gãi', object: 'Tinh Tinh', story: 'Cháu Tôn đứng sau lưng tận tình Gãi ngứa cho một con Tinh Tinh khổng lồ.' },
    '12': { person: 'Giám Đốc Tâm', action: 'Nằm đè', object: 'Tấm Nệm', story: 'Giám Đốc Tâm mệt mỏi sau giờ làm việc lao vào Nằm đè bẹp dí cái Tấm Nệm lò xo.' },
    '13': { person: 'chị Trang', action: 'Cạy cửa', object: 'Thang Máy', story: 'Chị Trang dùng sức mạnh phi thường dùng tay không Cạy cửa cứu người kẹt trong Thang Máy.' },
    '14': { person: 'chị Thùy', action: 'Đổ đầy', object: 'Túi Rác', story: 'Chị Thùy đang hốt vàng bạc châu báu Đổ đầy vào một cái Túi Rác đen xì.' },
    '15': { person: 'chú Thái', action: 'khuấy', object: 'Thùng Sơn', story: 'Chú Thái dùng cây gậy như Tôn Ngộ Không để khuấy tung tóe màu trong Thùng Sơn.' },
    '16': { person: 'anh Tuấn The Zei', action: 'Đeo trước ngực', object: 'Túi Balo', story: 'Anh Tuấn The Zei đang loay hoay Đeo trước ngực ngược cái Túi Balo to tướng trước ngực.' },
    '17': { person: 'em Thành kỹ thuật', action: 'Bịt tai', object: 'Tai Phôn', story: 'Em Thành kỹ thuật sợ âm thanh lớn vội vàng cầm Tai Phôn để Bịt tai lại.' },
    '18': { person: 'Thế Anh kỹ sư', action: 'giật còi', object: 'Tàu Hỏa', story: 'Thế Anh kỹ sư đứng chặn đầu tàu và hét lớn giật còi inh ỏi làm Tàu Hỏa phanh gấp.' },
    '19': { person: 'ông Trương', action: 'Húc', object: 'Tê Giác', story: 'Ông Trương thi đấu sumo dùng đầu Húc mạnh vào sừng của con Tê Giác.' },
    '20': { person: 'Con Ngọc', action: 'Dâng lên như người hầu', object: 'Nước Cất', story: 'Con Ngọc kiên nhẫn cầm cốc pha lê Dâng lên như người hầu tinh khiết của Nước Cất.' },
    '21': { person: 'anh Nam', action: 'Bay ra khỏi', object: 'Nhà Tù', story: 'Anh Nam mọc đôi cánh thiên thần bất ngờ Bay ra khỏi song sắt Nhà Tù.' },
    '22': { person: 'cháu Nhất', action: 'Bắn tơ', object: 'Người Nhện', story: 'Cháu Nhất mặc đồ siêu nhân bắt chước Bắn tơ dính chặt vào Người Nhện đồ chơi.' },
    '23': { person: 'chị Nương', action: 'Chấm', object: 'Nước Mắm', story: 'Chị Nương lấy miếng xoài xanh chua loét Chấm ngập vào bát Nước Mắm ớt cay xè.' },
    '24': { person: 'cậu Nguyên', action: 'Hái', object: 'Nấm Rơm', story: 'Cậu Nguyên lạc vào xứ sở tí hon và Hái một cây Nấm Rơm to bằng cái ô.' },
    '25': { person: 'chị Kim Nhung', action: 'Ngậm mãi', object: 'Nhân Sâm', story: 'Chị Kim Nhung vì tiếc của quý nên cứ Ngậm mãi củ Nhân Sâm ngàn năm trong miệng.' },
    '26': { person: 'chị Nga đồng tu', action: 'đeo vào ngón áp út', object: 'Nhẫn Bạc', story: 'Chị Nga đồng tu trân trọng quỳ xuống dùng hai tay đeo vào ngón áp út lên một chiếc Nhẫn Bạc sáng chói.' },
    '27': { person: 'cháu Ninh', action: 'Ném', object: 'Nổ Pháo', story: 'Cháu Ninh nghịch ngợm lấy lửa Ném vào đống Nổ Pháo làm nó nổ đùng đoàng.' },
    '28': { person: 'anh Ngôn', action: 'Tiêm', object: 'Nghiện Hút', story: 'Anh Ngôn mặc áo blouse trắng đang Tiêm thuốc giải độc cho một người Nghiện Hút.' },
    '29': { person: 'Chú Nghiêm toản', action: 'Đẩy xe lăn', object: 'Người già', story: 'Chú Nghiêm toản tận tình vừa hát vừa Đẩy xe lăn đưa một Người già đi dạo mát.' },
    '30': { person: 'bá Mạo', action: 'bấm cắt', object: 'Móng Chân', story: 'Bá Mạo dùng cái kìm cộng lực khổng lồ để bấm cắt cái Móng Chân cứng như đá.' },
    '31': { person: 'anh Minh công ty', action: 'Xoay ốc', object: 'Máy Tính', story: 'Anh Minh công ty múa tua vít điệu nghệ Xoay ốc tháo tung cái Máy Tính ra.' },
    '32': { person: 'bà Mưu', action: 'chọc bông tai', object: 'Màng Nhĩ', story: 'Bà Mưu lỡ tay chọc cây bông quá sâu khi ngoáy tai làm thủng cả Màng Nhĩ.' },
    '33': { person: 'em Mạnh đồng tu', action: 'Moi', object: 'Móc Mắt', story: 'Em Mạnh đồng tu đang diễn ảo thuật kinh dị hành động Moi ra một cái Móc Mắt giả.' },
    '34': { person: 'Mẹ Xuân', action: 'Che phủ lên', object: 'Mưa Rào', story: 'Mẹ Xuân lấy thân mình làm ô Che phủ lên chắn cho đàn con khỏi cơn Mưa Rào tầm tã.' },
    '35': { person: 'anh May', action: 'Uốn cong', object: 'Móc Sắt', story: 'Anh May gồng cơ bắp cuồn cuộn dùng tay không Uốn cong một thanh Móc Sắt cứng.' },
    '36': { person: 'Cháu Mai', action: 'Lái', object: 'Máy Bay', story: 'Cháu Mai đeo kính phi công cực ngầu đang điều khiển Lái chiếc Máy Bay phản lực lượn vòng.' },
    '37': { person: 'ông Món', action: 'xả súng', object: 'Ma Phia', story: 'Ông Món hóa thân thành Rambo cầm súng máy xả súng tiêu diệt băng đảng Ma Phia.' },
    '38': { person: 'bạn My', action: 'Liếm', object: 'Màn Hình', story: 'Bạn My nhìn thấy món gà rán trên TV thèm quá liền thè lưỡi Liếm cả Màn Hình.' },
    '39': { person: 'Tam Mao TV', action: 'Chui', object: 'Máy Giặt', story: 'Tam Mao TV làm clip thử thách nghịch dại Chui cả người tọt vào lồng Máy Giặt.' },
    '40': { person: 'Cháu Đễ (chồng Dung)', action: 'Cưa qua lại', object: 'Răng Cưa', story: 'Cháu Đễ cầm thanh gỗ Cưa qua lại mài mòn cả cái Răng Cưa sắc nhọn.' },
    '41': { person: 'Bá Đông', action: 'Đan', object: 'Rổ Tre', story: 'Bá Đông ngồi hiên nhà tay thoăn thoắt Đan từng nan tre thành cái Rổ Tre xinh xắn.' },
    '42': { person: 'anh Dương', action: 'Nhồi', object: 'Ruột Non', story: 'Anh Dương đang làm dồi lợn, dùng phễu hì hục Nhồi thịt vào đoạn Ruột Non.' },
    '43': { person: 'Cô Duy', action: 'Rắc đều', object: 'Rắc Muối', story: 'Cô Duy tạo dáng "Rắc Muối" (Salt Bae) điệu nghệ để Rắc đều gia vị từ lọ Rắc Muối.' },
    '44': { person: 'cháu Dũng', action: 'Đu', object: 'Ròng Rọc', story: 'Cháu Dũng bám tay và Đu người trượt vèo vèo trên dây Ròng Rọc như Tarzan.' },
    '45': { person: 'Bác Dị', action: 'Múa', object: 'Rồng Sắt (gậy)', story: 'Bác Dị mặc võ phục đang đi quyền, Múa may quay cuồng với cây Rồng Sắt.' },
    '46': { person: 'anh Đăng', action: 'Lắp Ráp', object: 'Rô Bốt', story: 'Anh Đăng kỹ sư đang tập trung hàn xì Lắp Ráp hoàn thiện con Rô Bốt Gundam.' },
    '47': { person: 'em Đoàn', action: 'giăng lưới', object: 'Rô Phi', story: 'Em Đoàn chèo thuyền ra giữa sông giăng lưới vây bắt đàn cá Rô Phi.' },
    '48': { person: 'Cháu Dung', action: 'Buộc', object: 'Rau Hẹ', story: 'Cháu Dung dùng dây lạt khéo léo Buộc bó Rau Hẹ xanh mướt thành từng bó đẹp.' },
    '49': { person: 'Anh Đạt', action: 'Vặn Ga', object: 'Rồ Ga', story: 'Anh Đạt cúi người trên xe phân khối lớn Vặn Ga hết cỡ làm xe Rồ Ga phóng đi.' },
    '50': { person: 'Sang Ca Nghĩa Vụ', action: 'Hút', object: 'Sữa Chua', story: 'Sang Ca Nghĩa Vụ dùng cái ống hút to bằng ngón tay cái để Hút hộp Sữa Chua 1 lít.' },
    '51': { person: 'chị Sinh', action: 'Quất Roi', object: 'Sư Tử', story: 'Chị Sinh dũng cảm đứng trong chuồng thú cầm roi da Quất Roi răn đe con Sư Tử.' },
    '52': { person: 'Đoàn Văn Sáng', action: 'Hôn má', object: 'Sọ Người', story: 'Đoàn Văn Sáng như diễn viên kịch cầm cái Sọ Người lên và âu yếm Hôn má nó.' },
    '53': { person: 'Stephen Hawking', action: 'Khâu', object: 'Sứt môi', story: 'Stephen Hawking ngồi xe lăn điều khiển cánh tay robot để phẫu thuật Khâu vết Sứt môi.' },
    '54': { person: 'Bác Sửu thủ thư', action: 'chạm mũi Ngửi', object: 'Sầu Riêng', story: 'Bác Sửu thủ thư nhăn mặt bịt mũi khi cúi xuống chạm mũi Ngửi quả Sầu Riêng nặng mùi.' },
    '55': { person: 'chị Sợi', action: 'Gọt vỏ', object: 'Su Su', story: 'Chị Sợi đeo bao tay nhựa ngồi tỉ mỉ Gọt vỏ quả Su Su chảy đầy nhựa dính.' },
    '56': { person: 'Pak Hang SEO', action: 'Lướt sóng', object: 'Sóng Biển', story: 'Pak Hang SEO cởi vest mặc quần bơi hào hứng Lướt sóng trên ngọn Sóng Biển cao vút.' },
    '57': { person: 'em Sỏi địa chính', action: 'Cắm dây Sạc điện', object: 'Sạc Pin', story: 'Em Sỏi địa chính tìm ổ cắm để Cắm dây Sạc điện nạp năng lượng cho cục Sạc Pin dự phòng.' },
    '58': { person: 'Em Sơn hà nội', action: 'Nhai', object: 'Su Hào', story: 'Em Sơn hà nội đói bụng quá cầm cả củ Su Hào sống lên gặm và Nhai rau ráu.' },
    '59': { person: 'Cô Sen lao công', action: 'Lau sàn', object: 'Sàn Gỗ', story: 'Cô Sen lao công cần mẫn dùng cây lau nhà đẩy qua đẩy lại Lau sàn bóng loáng trên Sàn Gỗ.' },
    '60': { person: 'Bạn Bích Bác Sĩ', action: 'Kẹp nhíp', object: 'Bọ Cạp', story: 'Bạn Bích Bác Sĩ dùng cái nhíp dài chuyên dụng cẩn thận Kẹp nhíp gắp con Bọ Cạp độc.' },
    '61': { person: 'chị Biên', action: 'Xỏ lỗ đeo', object: 'Bông Tai', story: 'Chị Biên rùng mình nhắm mắt khi tự tay Xỏ lỗ đeo tai để đeo chiếc Bông Tai mới.' },
    '62': { person: 'Bác Bản ở chùa', action: 'dìm luộc', object: 'Bắp Ngô', story: 'Bác Bản ở chùa đang nhóm lửa đun nước sôi sùng sục để dìm luộc nồi Bắp Ngô nếp.' },
    '63': { person: 'Anh Bảo', action: 'vồ nhưu vồ ếch', object: 'Bóng Ma', story: 'Anh Bảo cầm máy hút bụi Ghostbusters chạy khắp nhà vồ nhưu vồ ếch con Bóng Ma đang bay.' },
    '64': { person: 'Đoàn Văn Báu', action: 'Úp rổ', object: 'Bóng Rổ', story: 'Đoàn Văn Báu bật nhảy lên cao thực hiện cú Slam Dunk Úp rổ quả Bóng Rổ cực mạnh.' },
    '65': { person: 'Xuân Bắc', action: 'Bắt mạch', object: 'Bác Sĩ', story: 'Xuân Bắc nghịch ngợm cầm tay ông bác sĩ thật để giả bộ Bắt mạch kiểm tra Bác Sĩ.' },
    '66': { person: 'Vợ Bình', action: 'Bơm phồng', object: 'Bóng Bay', story: 'Vợ Bình phồng má trợn mắt lấy hơi cố gắng Bơm phồng quả Bóng Bay hidro.' },
    '67': { person: 'Bin Anh', action: 'Gõ 10 ngón', object: 'Bàn Phím', story: 'Bin Anh múa tay trên không trung rồi hạ xuống Gõ 10 ngón tanh tách lên Bàn Phím cơ.' },
    '68': { person: 'Anh Bách Việt Mỹ', action: 'hi-5', object: 'Bác Hồ', story: 'Anh Bách Việt Mỹ mặc quân phục chỉnh tề đứng nghiêm hi-5 trước tượng Bác Hồ.' },
    '69': { person: 'Bob Marley', action: 'Ôm', object: 'Bình Ga', story: 'Bob Marley vừa hát nhạc reggae vừa dang hai tay Ôm trọn cái Bình Ga màu hồng.' },
    '70': { person: 'bạn Phong', action: 'buộc vào nhau Nhảy dù cùng', object: 'Phi Công', story: 'Bạn Phong gan dạ ôm chặt eo anh Phi Công rồi cả hai buộc vào nhau Nhảy dù cùng nhau xuống đất.' },
    '71': { person: 'Cô Phán thảo', action: 'Dán bùa giấy', object: 'Phù Thủy', story: 'Cô Phán thảo nhanh tay cầm lá bùa vàng Dán bùa giấy phong ấn lên trán bà Phù Thủy.' },
    '72': { person: 'chú Phú', action: 'Khoan cắt bê tông', object: 'Phá Nhà', story: 'Chú Phú cầm máy khoan rung bần bật đi Khoan cắt bê tông làm ầm ĩ để Phá Nhà.' },
    '73': { person: 'Pele', action: 'Sút bóng vào', object: 'Phát Minh', story: 'Pele tung cú sút sấm sét Sút bóng vào làm hỏng cỗ máy Phát Minh mới toanh.' },
    '74': { person: 'Cát Phượng', action: 'Vỗ phấn phủ mặt', object: 'Phấn Rôm', story: 'Cát Phượng lấy bông phấn to đùng đập bop bop Vỗ phấn phủ mặt bằng bột Phấn Rôm trắng xóa.' },
    '75': { person: 'anh Phúc giám đốc', action: 'Xếp chân kiết già', object: 'Pháp Sư', story: 'Anh Phúc giám đốc ngồi thiền Xếp chân kiết già rồi bay lơ lửng nhu một Pháp Sư đắc đạo.' },
    '76': { person: 'Bá Phương', action: 'Đếm vứt kiểu Gangster', object: 'Phong Bì', story: 'Bá Phương ngồi liếm ngón tay sột soạt Đếm vứt kiểu Gangster đi Đếm vứt kiểu Gangster lại xấp Phong Bì dày cộp.' },
    '77': { person: 'Phước Thịnh', action: 'Lạy 5 vóc chạm chân', object: 'Phật Pháp', story: 'Phước Thịnh thành tâm nằm rạp xuống đất Lạy 5 vóc chạm chân trước biểu tượng Phật Pháp thiêng liêng.' },
    '78': { person: 'em Phi', action: 'châm lửa', object: 'Phóng Hỏa', story: 'Em Phi cầm đuốc châm lửa rồi chạy đi Phóng Hỏa đốt cháy rụi kho rơm.' },
    '79': { person: 'Rapper Pháo', action: 'Hót xẻng', object: 'Phân Gà', story: 'Rapper Pháo đeo khẩu trang bịt mũi cầm Hót xẻng xúc dọn đống Phân Gà trong chuồng.' },
    '80': { person: 'cháu Hải', action: 'dắt kéo cổ', object: 'Hươu Cao Cổ', story: 'Cháu Hải đứng kiễng chân cố gắng dắt kéo cổ dài ra để thi cao với Hươu Cao Cổ.' },
    '81': { person: 'anh Hùng Liên', action: 'Chảy nước mắt rơi vào', object: 'Hành Tây', story: 'Anh Hùng Liên đang thái rau thì bị cay xè mắt, khóc Chảy nước mắt rơi vào giàn giụa vì củ Hành Tây.' },
    '82': { person: 'chị Huyền', action: 'nếm', object: 'Hạt Nêm', story: 'Chị Huyền dùng đầu ngón tay út chấm một ít và nếm thử vị mặn ngọt của gói Hạt Nêm.' },
    '83': { person: 'Hoàng', action: 'Ói nôn', object: 'Hộc Máu', story: 'Hoàng diễn cảnh kiếm hiệp bị nội thương, ôm ngực rên rỉ rồi Ói nôn ra một Hộc Máu giả.' },
    '84': { person: 'anh Hợp hàng xóm', action: 'Leo qua tường', object: 'Hàng Rào', story: 'Anh Hợp hàng xóm lén lút như điệp viên Leo qua tường trèo qua Hàng Rào thép gai nhà bên.' },
    '85': { person: 'bà Hiên', action: 'Đào', object: 'Hố Sâu', story: 'Bà Hiên cầm cái xẻng hì hục xúc đất Đào một cái Hố Sâu hoắm trong vườn.' },
    '86': { person: 'anh Huy', action: 'Choàng Mặc', object: 'Hoàng Bào', story: 'Anh Huy đứng trước gương sửa soạn uy nghiêm Choàng Mặc bộ Hoàng Bào rồng phượng của vua.' },
    '87': { person: 'sếp  Hạnh', action: 'Nhặt từng cánh', object: 'Hoa Phượng', story: 'sếp  Hạnh thẩn thơ ngồi dưới gốc cây sân trường Nhặt từng cánh hoa rơi từ bông Hoa Phượng đỏ.' },
    '88': { person: 'em Hường', action: 'Xịt khử mùi', object: 'Miệng Hôi Hám', story: 'Em Hường bịt mũi cầm chai xịt thơm thẳng tay Xịt khử mùi vào cái Miệng Hôi Hám đang mở to.' },
    '89': { person: 'bà Hiệp', action: 'Sàng bằng rổ cho lọt xuống', object: 'Hạt Gạo', story: 'Bà Hiệp cầm cái mẹt tre khéo léo lắc lắc để Sàng bằng rổ cho lọt xuống sảy sạch trấu khỏi những Hạt Gạo trắng.' },
    '90': { person: 'Cháu Loa', action: 'bóp cổ', object: 'Gà Chọi', story: 'Cháu Loa tức giận lao vào dùng hai tay bóp cổ con Gà Chọi đang gáy làm nó im bặt.' },
    '91': { person: 'anh Lập', action: 'Đấm bằng', object: 'Găng Tay', story: 'Anh Lập đeo bao tay vào rồi dùng hết sức Đấm bằng đôi Găng Tay boxing vào bao cát.' },
    '92': { person: 'anh Lanh', action: 'kéo dài', object: 'Gậy Như Ý', story: 'Anh Lanh hô to câu thần chú "Biến to" làm cây Gậy Như Ý kéo dài ra chọc thủng trời xanh.' },
    '93': { person: 'bạn Loan', action: 'câu bằng', object: 'Giun Móc', story: 'Bạn Loan ngồi kiên nhẫn bên bờ sông móc mồi câu bằng con Giun Móc ngoe nguẩy vào lưỡi câu.' },
    '94': { person: 'Mùi A Lưu', action: 'Trà sát', object: 'Giấy Giáp', story: 'Mùi A Lưu thợ mộc lấy tờ Giấy Giáp thô ráp Trà sát mạnh lên mặt gỗ cho láng mịn.' },
    '95': { person: 'Em Long', action: 'tựa lưng', object: 'Ghế Sofa', story: 'Em Long thư giãn sau giờ học, ngả người tựa lưng êm ái chìm sâu vào chiếc Ghế Sofa nhung.' },
    '96': { person: 'Gì Liên', action: 'quạt bay', object: 'Gió Bão', story: 'Gì Liên hóa thân thành Thiết Phiến Công Chúa cầm quạt bay vẫy mạnh tạo ra cơn Gió Bão cuốn bay tất cả.' },
    '97': { person: 'Chú Liệu', action: 'Mở cửa lồng chim', object: 'Giải Phóng', story: 'Chú Liệu cầm chìa khóa vàng trịnh trọng Mở cửa lồng chim cổng thành để Giải Phóng đoàn quân chiến thắng đi vào.' },
    '98': { person: 'Em Leng', action: 'Quay phim', object: 'Máy Ghi Hình', story: 'Em Leng vác trên vai cái Máy Ghi Hình chuyên nghiệp to đùng đang say sưa Quay phim hiện trường vụ án.' },
    '99': { person: 'Anh Lực', action: 'Trải dàn phẳng', object: 'Ga Giường', story: 'Anh Lực tỉ mỉ vuốt ve từng nếp nhăn và Trải dàn phẳng phiu tấm Ga Giường trắng tinh tươm.' },
    'JC': { person: 'Bác sĩ Gấm', action: 'rút dây', object: 'Giắc Cắm', story: 'Bác sĩ Gấm trong phòng cấp cứu vội vàng chạy tới rút dây điện nguồn khỏi Giắc Cắm máy móc.' },
    'JR': { person: 'Stive Jobs', action: 'Chạm nhẹ đầu ngón', object: 'Iphone', story: 'Stive Jobs cầm chiếc điện thoại lên và tinh tế Chạm nhẹ đầu ngón tay lướt trên màn hình Iphone.' },
    'JT': { person: 'Jack 5 Củ ca sĩ', action: 'Hét ra lửa', object: 'Inh Tai', story: 'Jack 5 Củ ca sĩ cầm mic gào Hét ra lửa lên một nốt cao chót vót làm Inh Tai nhức óc khán giả.' },
    'JB': { person: 'Võ Nguyên Giáp', action: 'Phóng súng phóng lựu', object: 'Người Khổng Lồ', story: 'Võ Nguyên Giáp bình tĩnh ra lệnh ấn nút Phóng súng phóng lựu bay vèo vào gót chân của Người Khổng Lồ.' },
    'QC': { person: 'Chị Quế', action: 'xé nát', object: 'Quả Cầu', story: 'Chị Quế mặc váy xòe chơi thể thao, khéo léo co chân xé nát trái Quả Cầu lông bay lên xuống.' },
    'QR': { person: 'anh Quý', action: 'khoét', object: 'Quả rứa', story: 'Anh Quý dùng con dao nhọn tỉ mỉ xoay tròn khoét từng cái mắt nâu trên thân Quả rứa (thơm).' },
    'QT': { person: 'anh Quang', action: 'Cắn', object: 'Quả Táo', story: 'Anh Quang cầm Quả Táo đỏ mọng lên và há to miệng Cắn một miếng giòn tan (tạo hình logo Apple).' },
    'QB': { person: 'Quỳnh anh', action: 'nghiền xay nát', object: 'Quả Bơ', story: 'Quỳnh anh bỏ Quả Bơ sáp vào máy xay sinh tố cối lớn để nghiền xay nát làm món sinh tố bơ.' },
    'KC': { person: 'Khoa xuka', action: 'bật nguồn', object: 'Đầu TV K+', story: 'Khoa xuka cầm điều khiển từ xa bấm nút đỏ bật nguồn khởi động cái Đầu TV K+ lên xem bóng đá ngoại hạng.' },
    'KR': { person: 'Khoát', action: 'Gài lên áo', object: 'Kính Râm', story: 'Khoát điệu đà lấy Kính Râm đen xì ra và Gài lên áo lên cổ áo sơ mi cho ngầu.' },
    'KT': { person: 'Anh Khoái', action: 'quấn', object: 'Khăn Tắm', story: 'Anh Khoái vừa tắm xong bước ra vội vàng lấy Khăn Tắm to sụ quấn quanh người che thân.' },
    'KB': { person: 'thầy Kiên', action: 'Dò bằng siêu âm', object: 'Kho Báu', story: 'Thầy Kiên cầm máy dò kim loại đi rà trên bãi biển để Dò bằng siêu âm tín hiệu phát ra từ rương Kho Báu chôn vùi.' }
};

let currentPaoSystem = localStorage.getItem('paoSystem') || 'paoq';
let paoData = paoDataOriginal;
window.paoqDataObj = null;

function initPaoSystem() {
    if (typeof PAOQ_DATA !== 'undefined') {
        const paoqObj = {};
        PAOQ_DATA.getAllCodes().forEach(item => {
            paoqObj[item.code.toUpperCase()] = {
                person: item.person,
                action: item.action,
                object: item.object,
                quote: item.quote || '',
                story: ''
            };
        });
        window.paoqDataObj = paoqObj;

        if (currentPaoSystem === 'paoq') {
            paoData = window.paoqDataObj;
        }
    }
}

// Ensure PAOQ_DATA is loaded (it should be if order in index.html is correct, but just in case)
setTimeout(initPaoSystem, 100);

window.togglePaoSystem = function (sys) {
    currentPaoSystem = sys;
    localStorage.setItem('paoSystem', sys);
    if (sys === 'paoq' && window.paoqDataObj) {
        paoData = window.paoqDataObj;
    } else {
        paoData = paoDataOriginal;
    }

    // Notify app.js to update UI if exists
    if (typeof window.onPaoSystemChanged === 'function') {
        window.onPaoSystemChanged(sys);
    }
};

window.getCurrentPaoSystem = function () {
    return currentPaoSystem;
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
