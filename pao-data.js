// PAO Data Module - Parse và quản lý dữ liệu PAO System
const PAO_DATA = {
    // Raw data từ CSV
    rawData: [
        { code: '00', person: 'Con Cao', action: 'Vuốt Ve', object: 'Con Chó' },
        { code: '01', person: 'Bố Chí', action: 'Cưỡi phi nước đại', object: 'Con Trâu' },
        { code: '02', person: 'U Cẩm', action: 'Nhổ Lông', object: 'Con Nhím' },
        { code: '03', person: 'chị Chanh', action: 'Nướng', object: 'Con Mực' },
        { code: '04', person: 'Cháu Chi', action: 'Thôi Miên', object: 'Con Rắn' },
        { code: '05', person: 'Chị Cát', action: 'Vật Ngã', object: 'Cá Sấu' },
        { code: '06', person: 'em Cúc', action: 'Đập', object: 'Cái Búa' },
        { code: '07', person: 'anh Chung dạy English', action: 'Viết', object: 'Cục Phấn' },
        { code: '08', person: 'Cháu Châu', action: 'Mổ bụng', object: 'Con Heo' },
        { code: '09', person: 'anh Cương béo', action: 'Dẫm lên', object: 'Con Gián' },
        { code: '10', person: 'Bố Thịnh', action: 'Ấp', object: 'Tổ Chim' },
        { code: '11', person: 'Cháu Tôn', action: 'Gãi', object: 'Tinh Tinh' },
        { code: '12', person: 'Giám Đốc Tâm', action: 'Nằm đè', object: 'Tấm Nệm' },
        { code: '13', person: 'chị Trang', action: 'Cạy cửa', object: 'Thang Máy' },
        { code: '14', person: 'chị Thùy', action: 'Đổ đầy', object: 'Túi Rác' },
        { code: '15', person: 'chú Thái', action: 'khuấy', object: 'Thùng Sơn' },
        { code: '16', person: 'anh Tuấn The Zei', action: 'Đeo', object: 'Túi Balo' },
        { code: '17', person: 'em Thành kỹ thuật', action: 'Bịt tai', object: 'Tai Phôn' },
        { code: '18', person: 'Thế Anh kỹ sư', action: 'giật còi', object: 'Tàu Hỏa' },
        { code: '19', person: 'ông Trương', action: 'Húc', object: 'Tê Giác' },
        { code: '20', person: 'Con Ngọc', action: 'Hứng từng giọt', object: 'Nước Cất' },
        { code: '21', person: 'anh Nam', action: 'Bay ra khỏi', object: 'Nhà Tù' },
        { code: '22', person: 'cháu Nhất', action: 'Bắn tơ', object: 'Người Nhện' },
        { code: '23', person: 'chị Nương', action: 'Chấm', object: 'Nước Mắm' },
        { code: '24', person: 'cậu Nguyên', action: 'Hái', object: 'Nấm Rơm' },
        { code: '25', person: 'chị Kim Nhung', action: 'Ngậm mãi', object: 'Nhân Sâm' },
        { code: '26', person: 'chị Nga đồng tu', action: 'Dâng', object: 'Nhẫn Bạc' },
        { code: '27', person: 'cháu Ninh', action: 'Ném', object: 'Nổ Pháo' },
        { code: '28', person: 'anh Ngôn', action: 'Tiêm', object: 'Nghiện Hút' },
        { code: '29', person: 'Chú Nghiêm toản', action: 'Đẩy xe lăn', object: 'Người già' },
        { code: '30', person: 'bá Mạo', action: 'bấm cắt', object: 'Móng Chân' },
        { code: '31', person: 'anh Minh công ty', action: 'Xoay ốc', object: 'Máy Tính' },
        { code: '32', person: 'bà Mưu', action: 'ngoáy tai', object: 'Màng Nhĩ' },
        { code: '33', person: 'em Mạnh đồng tu', action: 'Moi', object: 'Móc Mắt' },
        { code: '34', person: 'Mẹ Xuân', action: 'Che', object: 'Mưa Rào' },
        { code: '35', person: 'anh May', action: 'Uốn cong', object: 'Móc Sắt' },
        { code: '36', person: 'Cháu Mai', action: 'Lái', object: 'Máy Bay' },
        { code: '37', person: 'ông Món', action: 'xả súng', object: 'Ma Phia' },
        { code: '38', person: 'bạn My', action: 'Liếm', object: 'Màn Hình' },
        { code: '39', person: 'Tam Mao TV', action: 'Chui', object: 'Máy Giặt' },
        { code: '40', person: 'Cháu Đễ (chồng Dung)', action: 'Cưa qua lại', object: 'Răng Cưa' },
        { code: '41', person: 'Bá Đông', action: 'Đan', object: 'Rổ Tre' },
        { code: '42', person: 'anh Dương', action: 'Nhồi', object: 'Ruột Non' },
        { code: '43', person: 'Cô Duy', action: 'Rắc đều', object: 'Rắc Muối' },
        { code: '44', person: 'cháu Dũng', action: 'Đu', object: 'Ròng Rọc' },
        { code: '45', person: 'Bác Dị', action: 'Múa', object: 'Rồng Sắt (gậy)' },
        { code: '46', person: 'anh Đăng', action: 'Lắp Ráp', object: 'Rô Bốt' },
        { code: '47', person: 'em Đoàn', action: 'giăng lưới', object: 'Rô Phi' },
        { code: '48', person: 'Cháu Dung', action: 'Buộc', object: 'Rau Hẹ' },
        { code: '49', person: 'Anh Đạt', action: 'Vặn Ga', object: 'Rồ Ga' },
        { code: '50', person: 'Sang Ca Nghĩa Vụ', action: 'Hút', object: 'Sữa Chua' },
        { code: '51', person: 'chị Sinh', action: 'Quất Roi', object: 'Sư Tử' },
        { code: '52', person: 'Đoàn Văn Sáng', action: 'Hôn má', object: 'Sọ Người' },
        { code: '53', person: 'Stephen Hawking', action: 'Khâu', object: 'Sứt môi' },
        { code: '54', person: 'Bác Sửu thủ thư', action: 'Ngửi', object: 'Sầu Riêng' },
        { code: '55', person: 'chị Sợi', action: 'Gọt vỏ', object: 'Su Su' },
        { code: '56', person: 'Pak Hang SEO', action: 'Lướt sóng', object: 'Sóng Biển' },
        { code: '57', person: 'em Sỏi địa chính', action: 'Sạc điện', object: 'Sạc Pin' },
        { code: '58', person: 'Em Sơn hà nội', action: 'Nhai', object: 'Su Hào' },
        { code: '59', person: 'Cô Sen lao công', action: 'Lau sàn', object: 'Sàn Gỗ' },
        { code: '60', person: 'Bạn Bích Bác Sĩ', action: 'Kẹp nhíp', object: 'Bọ Cạp' },
        { code: '61', person: 'chị Biên', action: 'Xỏ lỗ', object: 'Bông Tai' },
        { code: '62', person: 'Bác Bản ở chùa', action: 'luộc', object: 'Bắp Ngô' },
        { code: '63', person: 'Anh Bảo', action: 'đuổi bắt', object: 'Bóng Ma' },
        { code: '64', person: 'Đoàn Văn Báu', action: 'Úp rổ', object: 'Bóng Rổ' },
        { code: '65', person: 'Xuân Bắc', action: 'Bắt mạch', object: 'Bác Sĩ' },
        { code: '66', person: 'Vợ Bình', action: 'Bơm phồng', object: 'Bóng Bay' },
        { code: '67', person: 'Bin Anh', action: 'Gõ 10 ngón', object: 'Bàn Phím' },
        { code: '68', person: 'Anh Bách Việt Mỹ', action: 'Chào điều lệnh', object: 'Bác Hồ' },
        { code: '69', person: 'Bob Marley', action: 'Ôm', object: 'Bình Ga' },
        { code: '70', person: 'bạn Phong', action: 'Nhảy dù cùng', object: 'Phi Công' },
        { code: '71', person: 'Cô Phán thảo', action: 'Dán bùa giấy', object: 'Phù Thủy' },
        { code: '72', person: 'chú Phú', action: 'Khoan cắt bê tông', object: 'Phá Nhà' },
        { code: '73', person: 'Pele', action: 'Sút bóng vào', object: 'Phát Minh' },
        { code: '74', person: 'Cát Phượng', action: 'Vỗ phấn phủ mặt', object: 'Phấn Rôm' },
        { code: '75', person: 'anh Phúc giám đốc', action: 'Xếp chân kiết già', object: 'Pháp Sư' },
        { code: '76', person: 'Bá Phương', action: 'Đếm', object: 'Phong Bì' },
        { code: '77', person: 'Phước Thịnh', action: 'Lạy 5 vóc', object: 'Phật Pháp' },
        { code: '78', person: 'em Phi', action: 'châm lửa', object: 'Phóng Hỏa' },
        { code: '79', person: 'Rapper Pháo', action: 'Hót xẻng', object: 'Phân Gà' },
        { code: '80', person: 'cháu Hải', action: 'Vươn cổ', object: 'Hươu Cao Cổ' },
        { code: '81', person: 'anh Hùng Liên', action: 'Chảy nước mắt', object: 'Hành Tây' },
        { code: '82', person: 'chị Huyền', action: 'nếm', object: 'Hạt Nêm' },
        { code: '83', person: 'Hoàng', action: 'Ói', object: 'Hộc Máu' },
        { code: '84', person: 'anh Hợp hàng xóm', action: 'Leo qua tường', object: 'Hàng Rào' },
        { code: '85', person: 'bà Hiên', action: 'Đào', object: 'Hố Sâu' },
        { code: '86', person: 'anh Huy', action: 'Choàng Mặc', object: 'Hoàng Bào' },
        { code: '87', person: 'sếp  Hạnh', action: 'Nhặt từng cánh', object: 'Hoa Phượng' },
        { code: '88', person: 'em Hường', action: 'Xịt khử mùi', object: 'Miệng Hôi Hám' },
        { code: '89', person: 'bà Hiệp', action: 'Sàng', object: 'Hạt Gạo' },
        { code: '90', person: 'Cháu Loa', action: 'bóp cổ', object: 'Gà Chọi' },
        { code: '91', person: 'anh Lập', action: 'Đấm bằng', object: 'Găng Tay' },
        { code: '92', person: 'anh Lanh', action: 'Biến dài', object: 'Gậy Như Ý' },
        { code: '93', person: 'bạn Loan', action: 'câu bằng', object: 'Giun Móc' },
        { code: '94', person: 'Mùi A Lưu', action: 'Trà sát', object: 'Giấy Giáp' },
        { code: '95', person: 'Em Long', action: 'tựa lưng', object: 'Ghế Sofa' },
        { code: '96', person: 'Gì Liên', action: 'quạt ba tiêu', object: 'Gió Bão' },
        { code: '97', person: 'Chú Liệu', action: 'Mở cửa', object: 'Giải Phóng' },
        { code: '98', person: 'Em Leng', action: 'Quay phim', object: 'Máy Ghi Hình' },
        { code: '99', person: 'Anh Lực', action: 'Trải phẳng', object: 'Ga Giường' },
    ],

    // Special codes
    specialCodes: [
        { code: 'JC', person: 'Bác sĩ Gấm', action: 'rút dây', object: 'Giắc Cắm' },
        { code: 'JR', person: 'Stive Jobs', action: 'Chạm nhẹ đầu ngón', object: 'Iphone' },
        { code: 'JT', person: 'Jack 5 Củ ca sĩ', action: 'Hét', object: 'Inh Tai' },
        { code: 'JB', person: 'Võ Nguyên Giáp', action: 'Phóng tên lửa', object: 'Người Khổng Lồ' },
        { code: 'QC', person: 'Chị Quế', action: 'tâng bằng đùi', object: 'Quả Cầu' },
        { code: 'QR', person: 'anh Quý', action: 'khoét', object: 'Quả rứa' },
        { code: 'QT', person: 'anh Quang', action: 'Cắn', object: 'Quả Táo' },
        { code: 'QB', person: 'Quỳnh anh', action: 'nghiền xay nát', object: 'Quả Bơ' },
        { code: 'KC', person: 'Khoa xuka', action: 'bật nguồn', object: 'Đầu TV K+' },
        { code: 'KR', person: 'Khoát', action: 'Cài', object: 'Kính Râm' },
        { code: 'KT', person: 'Anh Khoái', action: 'quấn', object: 'Khăn Tắm' },
        { code: 'KB', person: 'thầy Kiên', action: 'Dò bằng máy', object: 'Kho Báu' },
    ],

    // Helper functions
    getAllCodes() {
        return [...this.rawData, ...this.specialCodes];
    },

    getByCode(code) {
        code = code.toUpperCase();
        const item = this.rawData.find(d => d.code === code) ||
            this.specialCodes.find(d => d.code === code);
        return item || null;
    },

    getRandomCode() {
        const all = this.getAllCodes();
        return all[Math.floor(Math.random() * all.length)];
    },

    getRandomNumericCode() {
        return this.rawData[Math.floor(Math.random() * this.rawData.length)];
    },

    getAllNumericCodes() {
        return [...this.rawData];
    },

    // Tạo chuỗi số ngẫu nhiên
    generateRandomNumberSequence(length) {
        let sequence = '';
        for (let i = 0; i < length; i++) {
            sequence += Math.floor(Math.random() * 10);
        }
        return sequence;
    },

    // Parse chuỗi số thành các cặp PAO
    parseSequenceToPAO(sequence) {
        // Padding nếu lẻ
        if (sequence.length % 2 !== 0) {
            sequence = '0' + sequence;
        }

        const pairs = [];
        for (let i = 0; i < sequence.length; i += 2) {
            const code = sequence.substr(i, 2);
            const pao = this.getByCode(code);
            pairs.push({ code, pao });
        }
        return pairs;
    }
};

// Export để sử dụng trong HTML
if (typeof window !== 'undefined') {
    window.PAO_DATA = PAO_DATA;
}
