// ===== BODY ANCHORS DATA (Memory Palace on Body) =====
// 100 điểm neo cơ thể từ 00 đến 99
// Tương ứng với STT 1-100 trong tài liệu gốc
// Chia thành 10 Trạm theo vùng cơ thể

const BODY_ANCHOR_STATIONS = [
    { id: 1, name: 'Trạm 1 - Gáy & Đầu Sau', range: [0, 9], emoji: '🧠', color: '#4f46e5' },
    { id: 2, name: 'Trạm 2 - Đỉnh Đầu & Trán', range: [10, 19], emoji: '👆', color: '#7c3aed' },
    { id: 3, name: 'Trạm 3 - Mắt & Thái Dương', range: [20, 29], emoji: '👁️', color: '#059669' },
    { id: 4, name: 'Trạm 4 - Mũi & Miệng', range: [30, 39], emoji: '👃', color: '#d97706' },
    { id: 5, name: 'Trạm 5 - Cằm, Cổ & Vai', range: [40, 49], emoji: '🦴', color: '#dc2626' },
    { id: 6, name: 'Trạm 6 - Ngực & Lưng Trên', range: [50, 59], emoji: '💪', color: '#0891b2' },
    { id: 7, name: 'Trạm 7 - Bụng & Eo', range: [60, 69], emoji: '🫀', color: '#65a30d' },
    { id: 8, name: 'Trạm 8 - Đùi & Gối', range: [70, 79], emoji: '🦵', color: '#e11d48' },
    { id: 9, name: 'Trạm 9 - Bắp Chân & Mắt Cá', range: [80, 89], emoji: '🦶', color: '#7c2d12' },
    { id: 10, name: 'Trạm 10 - Bàn Chân & Ngón', range: [90, 99], emoji: '🦷', color: '#6b7280' }
];

const BODY_ANCHORS = {
    '00': { anchor: 'Hõm gáy', description: 'Phần trũng sâu sát gáy', station: 1 },
    '01': { anchor: 'Chân tóc gáy', description: 'Đường viền tóc phía sau cổ', station: 1 },
    '02': { anchor: 'Xương chẩm', description: 'Phần hộp sọ gồ lên phía sau', station: 1 },
    '03': { anchor: 'Gờ chẩm', description: 'Đường viền ngang nổi lên của xương sau đầu', station: 1 },
    '04': { anchor: 'Xoáy tóc', description: 'Điểm xoáy tóc trên đầu', station: 1 },
    '05': { anchor: 'Đỉnh đầu', description: 'Điểm cao nhất của mâm sọ (Crown)', station: 1 },
    '06': { anchor: 'Chân tóc trán', description: 'Đường viền tóc phía trước', station: 1 },
    '07': { anchor: 'Giữa trán', description: 'Vùng phẳng trung tâm trán', station: 1 },
    '08': { anchor: 'Lõm thái dương', description: 'Hố lõm hai bên thái dương', station: 1 },
    '09': { anchor: 'Thái dương', description: 'Chỗ lõm bên hông trán', station: 1 },

    '10': { anchor: 'Cung lông mày ngoài', description: 'Phần cung vồng ngoài cùng lông mày', station: 2 },
    '11': { anchor: 'Giữa lông mày', description: 'Điểm đỉnh cung lông mày', station: 2 },
    '12': { anchor: 'Đầu lông mày trong', description: 'Điểm khởi đầu phía mũi của lông mày', station: 2 },
    '13': { anchor: 'Khoảng giữa 2 lông mày', description: 'Vùng ấn đường (Glabella)', station: 2 },
    '14': { anchor: 'Góc mắt ngoài', description: 'Khóe mắt phía tai', station: 2 },
    '15': { anchor: 'Mi mắt trên', description: 'Nếp gấp da che mí mắt trên', station: 2 },
    '16': { anchor: 'Tròng mắt', description: 'Phần mắt màu có màu sắc', station: 2 },
    '17': { anchor: 'Mi mắt dưới', description: 'Vùng da mỏng dưới mắt', station: 2 },
    '18': { anchor: 'Góc mắt trong', description: 'Khóe mắt phía mũi (canthus)', station: 2 },
    '19': { anchor: 'Túi mắt', description: 'Vùng da phùng dưới mắt', station: 2 },

    '20': { anchor: 'Gốc sống mũi', description: 'Điểm gãy ngay giữa 2 mắt', station: 3 },
    '21': { anchor: 'Dọc sống mũi', description: 'Phần xương cứng chạy dọc', station: 3 },
    '22': { anchor: 'Chóp mũi', description: 'Đỉnh tròn trịa nhất của mũi', station: 3 },
    '23': { anchor: 'Cánh mũi', description: 'Phần thịt phồng hai bên', station: 3 },
    '24': { anchor: 'Lỗ mũi', description: 'Cửa hang của khoang mũi', station: 3 },
    '25': { anchor: 'Nhân trung', description: 'Rãnh dọc nối mũi và môi trên', station: 3 },
    '26': { anchor: 'Viền môi trên', description: 'Đường uốn lượn (Cung Cupid)', station: 3 },
    '27': { anchor: 'Viền môi dưới', description: 'Đường viền cong của môi dưới', station: 3 },
    '28': { anchor: 'Giữa môi', description: 'Điểm trung tâm khe miệng', station: 3 },
    '29': { anchor: 'Khoé miệng', description: 'Điểm giao nhau của 2 môi', station: 3 },

    '30': { anchor: 'Cằm giữa', description: 'Điểm nhô ra nhất của cằm', station: 4 },
    '31': { anchor: 'Hõm cằm', description: 'Chỗ lõm nhẹ dưới môi', station: 4 },
    '32': { anchor: 'Góc hàm', description: 'Góc xương hàm dưới nơi tai', station: 4 },
    '33': { anchor: 'Hàm dưới', description: 'Xương hàm dưới dọc theo má', station: 4 },
    '34': { anchor: 'Xương gò má', description: 'Phần cao nổi bật nhất má', station: 4 },
    '35': { anchor: 'Má', description: 'Vùng thịt má phồng', station: 4 },
    '36': { anchor: 'Dái tai', description: 'Phần thịt mềm dưới cùng vành tai', station: 4 },
    '37': { anchor: 'Vành tai', description: 'Sụn cong viền ngoài tai', station: 4 },
    '38': { anchor: 'Hõm tai', description: 'Phần lõm trung tâm vành tai (Concha)', station: 4 },
    '39': { anchor: 'Nắp tai', description: 'Mẩu sụn nhỏ che lỗ tai (Tragus)', station: 4 },

    '40': { anchor: 'Thanh quản', description: 'Nút lồi (Yết hầu/Adam\'s apple)', station: 5 },
    '41': { anchor: 'Khuyết ức', description: 'Chỗ lõm trên cùng xương ức', station: 5 },
    '42': { anchor: 'Xương ức', description: 'Xương trung tâm ngực chạy dọc', station: 5 },
    '43': { anchor: 'Núm vú trái', description: 'Điểm nhô ra ở ngực trái', station: 5 },
    '44': { anchor: 'Núm vú phải', description: 'Điểm nhô ra ở ngực phải', station: 5 },
    '45': { anchor: 'Mũi kiếm', description: 'Điểm nhọn cuối xương ức', station: 5 },
    '46': { anchor: 'Mạng sườn', description: 'Vùng sụn nối sườn với ức', station: 5 },
    '47': { anchor: 'Rốn', description: 'Điểm lõm trung tâm bụng', station: 5 },
    '48': { anchor: 'Bụng dưới', description: 'Vùng dưới rốn trên đùi', station: 5 },
    '49': { anchor: 'Xương chậu trước', description: 'Mào xương chậu trước nhô ra', station: 5 },

    '50': { anchor: 'Vai', description: 'Khớp vai (Acromion)', station: 6 },
    '51': { anchor: 'Đỉnh vai', description: 'Điểm cao nhất của xương bả vai', station: 6 },
    '52': { anchor: 'Hố nách', description: 'Hố lõm dưới cánh tay', station: 6 },
    '53': { anchor: 'Khuỷu tay', description: 'Điểm xương khuỷu lồi ra', station: 6 },
    '54': { anchor: 'Mạch cổ tay ngoài', description: 'Điểm bắt mạch phía ngón cái', station: 6 },
    '55': { anchor: 'Mạch cổ tay trong', description: 'Điểm bắt mạch phía ngón út', station: 6 },
    '56': { anchor: 'Mu bàn tay', description: 'Gân và xương nổi trên mu tay', station: 6 },
    '57': { anchor: 'Lòng bàn tay', description: 'Vùng da dày lòng bàn tay', station: 6 },
    '58': { anchor: 'Ngón cái', description: 'Đốt ngón tay số 1', station: 6 },
    '59': { anchor: 'Đầu ngón cái', description: 'Đệm thịt tròn ngón cái', station: 6 },

    '60': { anchor: 'Đốt sống cổ 7', description: 'Đốt gồ lên rõ nhất khi gập cổ', station: 7 },
    '61': { anchor: 'Bả vai', description: 'Xương dẹt hình tam giác sau lưng', station: 7 },
    '62': { anchor: 'Cột sống lưng', description: 'Dây nổi trung tâm lưng', station: 7 },
    '63': { anchor: 'Thắt lưng', description: 'Vùng eo thon nhất cột sống', station: 7 },
    '64': { anchor: 'Xương cùng', description: 'Xương dẹt cuối cột sống', station: 7 },
    '65': { anchor: 'Xương cụt', description: 'Điểm cùng tận cột sống', station: 7 },
    '66': { anchor: 'Mào chậu sau', description: 'Xương hông phía sau nhô lên', station: 7 },
    '67': { anchor: 'Hố lưng dưới', description: 'Hai lúm đồng tiền lưng dưới', station: 7 },
    '68': { anchor: 'Mông', description: 'Khối cơ mông nổi bật', station: 7 },
    '69': { anchor: 'Nếp lằn mông', description: 'Đường gấp ngang giữa mông và đùi', station: 7 },

    '70': { anchor: 'Đùi trước', description: 'Khối cơ tứ đầu đùi trước', station: 8 },
    '71': { anchor: 'Đùi sau', description: 'Nhóm cơ gân kheo phía sau đùi', station: 8 },
    '72': { anchor: 'Nếp khoeo', description: 'Hố lõm sau đầu gối', station: 8 },
    '73': { anchor: 'Xương bánh chè', description: 'Nắp xương tròn trước khớp gối', station: 8 },
    '74': { anchor: 'Lồi củ trước xương chày', description: 'Gồ cứng ngay dưới bánh chè', station: 8 },
    '75': { anchor: 'Bắp chân', description: 'Cơ bắp sau ống chân', station: 8 },
    '76': { anchor: 'Xương ống chân', description: 'Cạnh xương phía trước ống chân', station: 8 },
    '77': { anchor: 'Mắt cá ngoài', description: 'Mắt cá phía ngón út', station: 8 },
    '78': { anchor: 'Mắt cá trong', description: 'Mắt cá phía ngón cái', station: 8 },
    '79': { anchor: 'Gân Achilles', description: 'Sợi gân cứng vành sau cổ chân', station: 8 },

    '80': { anchor: 'Gót chân', description: 'Đệm xương cứng phía sau bàn chân', station: 9 },
    '81': { anchor: 'Lòng bàn chân', description: 'Mặt tiếp đất, có vòm lõm', station: 9 },
    '82': { anchor: 'Vòm bàn chân', description: 'Vùng lõm cong giữa lòng bàn chân', station: 9 },
    '83': { anchor: 'Mô ngón út', description: 'Đệm thịt cạnh ngoài bàn chân', station: 9 },
    '84': { anchor: 'Mô ngón cái', description: 'Đệm thịt cạnh trong bàn chân', station: 9 },
    '85': { anchor: 'Mu bàn chân', description: 'Mặt trên bàn chân có gân', station: 9 },
    '86': { anchor: 'Gốc ngón chân cái', description: 'Khớp nối ngón cái với bàn chân', station: 9 },
    '87': { anchor: 'Gốc ngón chân trỏ', description: 'Khớp nối ngón trỏ với bàn chân', station: 9 },
    '88': { anchor: 'Gốc ngón chân giữa', description: 'Khớp nối ngón giữa với bàn chân', station: 9 },
    '89': { anchor: 'Gốc ngón chân áp út', description: 'Khớp nối ngón áp út với bàn chân', station: 9 },

    '90': { anchor: 'Gốc ngón chân út', description: 'Khớp nối ngón út với bàn chân', station: 10 },
    '91': { anchor: 'Đốt giữa ngón cái', description: 'Đốt thứ 2 của ngón cái', station: 10 },
    '92': { anchor: 'Đốt giữa ngón trỏ', description: 'Đốt thứ 2 ngón trỏ', station: 10 },
    '93': { anchor: 'Đốt giữa ngón giữa', description: 'Đốt thứ 2 ngón dài nhất', station: 10 },
    '94': { anchor: 'Đốt giữa ngón áp út', description: 'Đốt thứ 2 ngón áp út', station: 10 },
    '95': { anchor: 'Đốt giữa ngón út', description: 'Đốt thứ 2 ngón út', station: 10 },
    '96': { anchor: 'Đầu ngón chân cái', description: 'Đệm thịt ngón số 1', station: 10 },
    '97': { anchor: 'Móng ngón chân cái', description: 'Bề mặt sừng cứng ngón cái', station: 10 },
    '98': { anchor: 'Khe ngón chân', description: 'Điểm kẽ giữa các ngón chân', station: 10 },
    '99': { anchor: 'Đầu ngón chân út', description: 'Đệm thịt nhỏ xíu ngoài cùng', station: 10 }
};

// Get body anchor for a code (00-99)
function getBodyAnchor(code) {
    return BODY_ANCHORS[code] || null;
}

// Get station info for a code
function getStation(code) {
    const anchor = BODY_ANCHORS[code];
    if (!anchor) return null;
    return BODY_ANCHOR_STATIONS.find(s => s.id === anchor.station) || null;
}
