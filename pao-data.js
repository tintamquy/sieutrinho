// PAO Data Module - Parse và quản lý dữ liệu PAO System
const PAO_DATA = {
    // Raw data từ CSV
    rawData: [
        {
                code: "00",
                person: "Con Cao",
                action: "Vuốt Ve",
                object: "Con Chó",
                story: "Con Cao (con trai bạn) đang cúi xuống âu yếm Vuốt Ve đầu một chú Con Chó cưng."
        },
        {
                code: "01",
                person: "Bố Chí",
                action: "Cưỡi phi nước đại",
                object: "Con Trâu",
                story: "Bố Chí oai phong như cao bồi đang Cưỡi phi nước đại trên lưng Con Trâu mộng điên cuồng."
        },
        {
                code: "02",
                person: "U Cẩm",
                action: "Nhổ Lông",
                object: "Con Nhím",
                story: "U Cẩm đeo kính lúp tỉ mẩn ngồi Nhổ Lông từng cái gai nhọn hoắt của Con Nhím."
        },
        {
                code: "03",
                person: "chị Chanh",
                action: "Nướng",
                object: "Con Mực",
                story: "Chị Chanh quạt than hồng hì hục Nướng một Con Mực khổng lồ thơm phức."
        },
        {
                code: "04",
                person: "Cháu Chi",
                action: "Mắt bắn tia thôi miên",
                object: "Con Rắn",
                story: "Cháu Chi thổi sáo nghệ thuật để Mắt bắn tia thôi miên một Con Rắn hổ mang chúa đang múa."
        },
        {
                code: "05",
                person: "Chị Cát",
                action: "Vật Ngã",
                object: "Cá Sấu",
                story: "Chị Cát khỏe như lực sĩ lao vào Vật Ngã ngửa bụng con Cá Sấu hung dữ."
        },
        {
                code: "06",
                person: "em Cúc",
                action: "Đập",
                object: "Cái Búa",
                story: "Em Cúc tức giận cầm lấy tay mình Đập mạnh vào cán Cái Búa (hoặc dùng búa đập cái gì đó). Sửa: Em Cúc cầm Cái Búa lên Đập nát đồ vật. (Theo thứ tự P hành động với O: Em Cúc giận dữ Đập mạnh cái Cái Búa xuống bàn)."
        },
        {
                code: "07",
                person: "anh Chung dạy English",
                action: "Viết",
                object: "Cục Phấn",
                story: "Anh Chung dạy English bay nhảy như diễn viên múa để Viết bằng Cục Phấn thần kỳ."
        },
        {
                code: "08",
                person: "Cháu Châu",
                action: "Mổ bụng",
                object: "Con Heo",
                story: "Cháu Châu đóng vai bác sĩ phẫu thuật đang tập trung Mổ bụng cứu chữa cho Con Heo."
        },
        {
                code: "09",
                person: "anh Cương béo",
                action: "Dẫm lên",
                object: "Con Gián",
                story: "Anh Cương béo nhảy cẫng lên và la hét khi lỡ chân Dẫm lên một Con Gián đang bò."
        },
        {
                code: "10",
                person: "Bố Thịnh",
                action: "Ấp",
                object: "Tổ Chim",
                story: "Bố Thịnh leo lên cây ngồi xổm cố gắng Ấp ủ đàn trứng trong Tổ Chim."
        },
        {
                code: "11",
                person: "Cháu Tôn",
                action: "Gãi",
                object: "Tinh Tinh",
                story: "Cháu Tôn đứng sau lưng tận tình Gãi ngứa cho một con Tinh Tinh khổng lồ."
        },
        {
                code: "12",
                person: "Giám Đốc Tâm",
                action: "Nằm đè",
                object: "Tấm Nệm",
                story: "Giám Đốc Tâm mệt mỏi sau giờ làm việc lao vào Nằm đè bẹp dí cái Tấm Nệm lò xo."
        },
        {
                code: "13",
                person: "chị Trang",
                action: "Cạy cửa",
                object: "Thang Máy",
                story: "Chị Trang dùng sức mạnh phi thường dùng tay không Cạy cửa cứu người kẹt trong Thang Máy."
        },
        {
                code: "14",
                person: "chị Thùy",
                action: "Đổ đầy",
                object: "Túi Rác",
                story: "Chị Thùy đang hốt vàng bạc châu báu Đổ đầy vào một cái Túi Rác đen xì."
        },
        {
                code: "15",
                person: "chú Thái",
                action: "khuấy",
                object: "Thùng Sơn",
                story: "Chú Thái dùng cây gậy như Tôn Ngộ Không để khuấy tung tóe màu trong Thùng Sơn."
        },
        {
                code: "16",
                person: "anh Tuấn The Zei",
                action: "Đeo trước ngực",
                object: "Túi Balo",
                story: "Anh Tuấn The Zei đang loay hoay Đeo trước ngực ngược cái Túi Balo to tướng trước ngực."
        },
        {
                code: "17",
                person: "em Thành kỹ thuật",
                action: "Bịt tai",
                object: "Tai Phôn",
                story: "Em Thành kỹ thuật sợ âm thanh lớn vội vàng cầm Tai Phôn để Bịt tai lại."
        },
        {
                code: "18",
                person: "Thế Anh kỹ sư",
                action: "giật còi",
                object: "Tàu Hỏa",
                story: "Thế Anh kỹ sư đứng chặn đầu tàu và hét lớn giật còi inh ỏi làm Tàu Hỏa phanh gấp."
        },
        {
                code: "19",
                person: "ông Trương",
                action: "Húc",
                object: "Tê Giác",
                story: "Ông Trương thi đấu sumo dùng đầu Húc mạnh vào sừng của con Tê Giác."
        },
        {
                code: "20",
                person: "Con Ngọc",
                action: "Dâng lên như người hầu",
                object: "Nước Cất",
                story: "Con Ngọc kiên nhẫn cầm cốc pha lê Dâng lên như người hầu tinh khiết của Nước Cất."
        },
        {
                code: "21",
                person: "anh Nam",
                action: "Bay ra khỏi",
                object: "Nhà Tù",
                story: "Anh Nam mọc đôi cánh thiên thần bất ngờ Bay ra khỏi song sắt Nhà Tù."
        },
        {
                code: "22",
                person: "cháu Nhất",
                action: "Bắn tơ",
                object: "Người Nhện",
                story: "Cháu Nhất mặc đồ siêu nhân bắt chước Bắn tơ dính chặt vào Người Nhện đồ chơi."
        },
        {
                code: "23",
                person: "chị Nương",
                action: "Chấm",
                object: "Nước Mắm",
                story: "Chị Nương lấy miếng xoài xanh chua loét Chấm ngập vào bát Nước Mắm ớt cay xè."
        },
        {
                code: "24",
                person: "cậu Nguyên",
                action: "Hái",
                object: "Nấm Rơm",
                story: "Cậu Nguyên lạc vào xứ sở tí hon và Hái một cây Nấm Rơm to bằng cái ô."
        },
        {
                code: "25",
                person: "chị Kim Nhung",
                action: "Ngậm mãi",
                object: "Nhân Sâm",
                story: "Chị Kim Nhung vì tiếc của quý nên cứ Ngậm mãi củ Nhân Sâm ngàn năm trong miệng."
        },
        {
                code: "26",
                person: "chị Nga đồng tu",
                action: "đeo vào ngón áp út",
                object: "Nhẫn Bạc",
                story: "Chị Nga đồng tu trân trọng quỳ xuống dùng hai tay đeo vào ngón áp út lên một chiếc Nhẫn Bạc sáng chói."
        },
        {
                code: "27",
                person: "cháu Ninh",
                action: "Ném",
                object: "Nổ Pháo",
                story: "Cháu Ninh nghịch ngợm lấy lửa Ném vào đống Nổ Pháo làm nó nổ đùng đoàng."
        },
        {
                code: "28",
                person: "anh Ngôn",
                action: "Tiêm",
                object: "Nghiện Hút",
                story: "Anh Ngôn mặc áo blouse trắng đang Tiêm thuốc giải độc cho một người Nghiện Hút."
        },
        {
                code: "29",
                person: "Chú Nghiêm toản",
                action: "Đẩy xe lăn",
                object: "Người già",
                story: "Chú Nghiêm toản tận tình vừa hát vừa Đẩy xe lăn đưa một Người già đi dạo mát."
        },
        {
                code: "30",
                person: "bá Mạo",
                action: "bấm cắt",
                object: "Móng Chân",
                story: "Bá Mạo dùng cái kìm cộng lực khổng lồ để bấm cắt cái Móng Chân cứng như đá."
        },
        {
                code: "31",
                person: "anh Minh công ty",
                action: "Xoay ốc",
                object: "Máy Tính",
                story: "Anh Minh công ty múa tua vít điệu nghệ Xoay ốc tháo tung cái Máy Tính ra."
        },
        {
                code: "32",
                person: "bà Mưu",
                action: "chọc bông tai",
                object: "Màng Nhĩ",
                story: "Bà Mưu lỡ tay chọc cây bông quá sâu khi ngoáy tai làm thủng cả Màng Nhĩ."
        },
        {
                code: "33",
                person: "em Mạnh đồng tu",
                action: "Moi",
                object: "Móc Mắt",
                story: "Em Mạnh đồng tu đang diễn ảo thuật kinh dị hành động Moi ra một cái Móc Mắt giả."
        },
        {
                code: "34",
                person: "Mẹ Xuân",
                action: "Che phủ lên",
                object: "Mưa Rào",
                story: "Mẹ Xuân lấy thân mình làm ô Che phủ lên chắn cho đàn con khỏi cơn Mưa Rào tầm tã."
        },
        {
                code: "35",
                person: "anh May",
                action: "Uốn cong",
                object: "Móc Sắt",
                story: "Anh May gồng cơ bắp cuồn cuộn dùng tay không Uốn cong một thanh Móc Sắt cứng."
        },
        {
                code: "36",
                person: "Cháu Mai",
                action: "Lái",
                object: "Máy Bay",
                story: "Cháu Mai đeo kính phi công cực ngầu đang điều khiển Lái chiếc Máy Bay phản lực lượn vòng."
        },
        {
                code: "37",
                person: "ông Món",
                action: "xả súng",
                object: "Ma Phia",
                story: "Ông Món hóa thân thành Rambo cầm súng máy xả súng tiêu diệt băng đảng Ma Phia."
        },
        {
                code: "38",
                person: "bạn My",
                action: "Liếm",
                object: "Màn Hình",
                story: "Bạn My nhìn thấy món gà rán trên TV thèm quá liền thè lưỡi Liếm cả Màn Hình."
        },
        {
                code: "39",
                person: "Tam Mao TV",
                action: "Chui",
                object: "Máy Giặt",
                story: "Tam Mao TV làm clip thử thách nghịch dại Chui cả người tọt vào lồng Máy Giặt."
        },
        {
                code: "40",
                person: "Cháu Đễ (chồng Dung)",
                action: "Cưa qua lại",
                object: "Răng Cưa",
                story: "Cháu Đễ cầm thanh gỗ Cưa qua lại mài mòn cả cái Răng Cưa sắc nhọn."
        },
        {
                code: "41",
                person: "Bá Đông",
                action: "Đan",
                object: "Rổ Tre",
                story: "Bá Đông ngồi hiên nhà tay thoăn thoắt Đan từng nan tre thành cái Rổ Tre xinh xắn."
        },
        {
                code: "42",
                person: "anh Dương",
                action: "Nhồi",
                object: "Ruột Non",
                story: "Anh Dương đang làm dồi lợn, dùng phễu hì hục Nhồi thịt vào đoạn Ruột Non."
        },
        {
                code: "43",
                person: "Cô Duy",
                action: "Rắc đều",
                object: "Rắc Muối",
                story: "Cô Duy tạo dáng \"Rắc Muối\" (Salt Bae) điệu nghệ để Rắc đều gia vị từ lọ Rắc Muối."
        },
        {
                code: "44",
                person: "cháu Dũng",
                action: "Đu",
                object: "Ròng Rọc",
                story: "Cháu Dũng bám tay và Đu người trượt vèo vèo trên dây Ròng Rọc như Tarzan."
        },
        {
                code: "45",
                person: "Bác Dị",
                action: "Múa",
                object: "Rồng Sắt (gậy)",
                story: "Bác Dị mặc võ phục đang đi quyền, Múa may quay cuồng với cây Rồng Sắt."
        },
        {
                code: "46",
                person: "anh Đăng",
                action: "Lắp Ráp",
                object: "Rô Bốt",
                story: "Anh Đăng kỹ sư đang tập trung hàn xì Lắp Ráp hoàn thiện con Rô Bốt Gundam."
        },
        {
                code: "47",
                person: "em Đoàn",
                action: "giăng lưới",
                object: "Rô Phi",
                story: "Em Đoàn chèo thuyền ra giữa sông giăng lưới vây bắt đàn cá Rô Phi."
        },
        {
                code: "48",
                person: "Cháu Dung",
                action: "Buộc",
                object: "Rau Hẹ",
                story: "Cháu Dung dùng dây lạt khéo léo Buộc bó Rau Hẹ xanh mướt thành từng bó đẹp."
        },
        {
                code: "49",
                person: "Anh Đạt",
                action: "Vặn Ga",
                object: "Rồ Ga",
                story: "Anh Đạt cúi người trên xe phân khối lớn Vặn Ga hết cỡ làm xe Rồ Ga phóng đi."
        },
        {
                code: "50",
                person: "Sang Ca Nghĩa Vụ",
                action: "Hút",
                object: "Sữa Chua",
                story: "Sang Ca Nghĩa Vụ dùng cái ống hút to bằng ngón tay cái để Hút hộp Sữa Chua 1 lít."
        },
        {
                code: "51",
                person: "chị Sinh",
                action: "Quất Roi",
                object: "Sư Tử",
                story: "Chị Sinh dũng cảm đứng trong chuồng thú cầm roi da Quất Roi răn đe con Sư Tử."
        },
        {
                code: "52",
                person: "Đoàn Văn Sáng",
                action: "Hôn má",
                object: "Sọ Người",
                story: "Đoàn Văn Sáng như diễn viên kịch cầm cái Sọ Người lên và âu yếm Hôn má nó."
        },
        {
                code: "53",
                person: "Stephen Hawking",
                action: "Khâu",
                object: "Sứt môi",
                story: "Stephen Hawking ngồi xe lăn điều khiển cánh tay robot để phẫu thuật Khâu vết Sứt môi."
        },
        {
                code: "54",
                person: "Bác Sửu thủ thư",
                action: "chạm mũi Ngửi",
                object: "Sầu Riêng",
                story: "Bác Sửu thủ thư nhăn mặt bịt mũi khi cúi xuống chạm mũi Ngửi quả Sầu Riêng nặng mùi."
        },
        {
                code: "55",
                person: "chị Sợi",
                action: "Gọt vỏ",
                object: "Su Su",
                story: "Chị Sợi đeo bao tay nhựa ngồi tỉ mỉ Gọt vỏ quả Su Su chảy đầy nhựa dính."
        },
        {
                code: "56",
                person: "Pak Hang SEO",
                action: "Lướt sóng",
                object: "Sóng Biển",
                story: "Pak Hang SEO cởi vest mặc quần bơi hào hứng Lướt sóng trên ngọn Sóng Biển cao vút."
        },
        {
                code: "57",
                person: "em Sỏi địa chính",
                action: "Cắm dây Sạc điện",
                object: "Sạc Pin",
                story: "Em Sỏi địa chính tìm ổ cắm để Cắm dây Sạc điện nạp năng lượng cho cục Sạc Pin dự phòng."
        },
        {
                code: "58",
                person: "Em Sơn hà nội",
                action: "Nhai",
                object: "Su Hào",
                story: "Em Sơn hà nội đói bụng quá cầm cả củ Su Hào sống lên gặm và Nhai rau ráu."
        },
        {
                code: "59",
                person: "Cô Sen lao công",
                action: "Lau sàn",
                object: "Sàn Gỗ",
                story: "Cô Sen lao công cần mẫn dùng cây lau nhà đẩy qua đẩy lại Lau sàn bóng loáng trên Sàn Gỗ."
        },
        {
                code: "60",
                person: "Bạn Bích Bác Sĩ",
                action: "Kẹp nhíp",
                object: "Bọ Cạp",
                story: "Bạn Bích Bác Sĩ dùng cái nhíp dài chuyên dụng cẩn thận Kẹp nhíp gắp con Bọ Cạp độc."
        },
        {
                code: "61",
                person: "chị Biên",
                action: "Xỏ lỗ đeo",
                object: "Bông Tai",
                story: "Chị Biên rùng mình nhắm mắt khi tự tay Xỏ lỗ đeo tai để đeo chiếc Bông Tai mới."
        },
        {
                code: "62",
                person: "Bác Bản ở chùa",
                action: "dìm luộc",
                object: "Bắp Ngô",
                story: "Bác Bản ở chùa đang nhóm lửa đun nước sôi sùng sục để dìm luộc nồi Bắp Ngô nếp."
        },
        {
                code: "63",
                person: "Anh Bảo",
                action: "vồ nhưu vồ ếch",
                object: "Bóng Ma",
                story: "Anh Bảo cầm máy hút bụi Ghostbusters chạy khắp nhà vồ nhưu vồ ếch con Bóng Ma đang bay."
        },
        {
                code: "64",
                person: "Đoàn Văn Báu",
                action: "Úp rổ",
                object: "Bóng Rổ",
                story: "Đoàn Văn Báu bật nhảy lên cao thực hiện cú Slam Dunk Úp rổ quả Bóng Rổ cực mạnh."
        },
        {
                code: "65",
                person: "Xuân Bắc",
                action: "Bắt mạch",
                object: "Bác Sĩ",
                story: "Xuân Bắc nghịch ngợm cầm tay ông bác sĩ thật để giả bộ Bắt mạch kiểm tra Bác Sĩ."
        },
        {
                code: "66",
                person: "Vợ Bình",
                action: "Bơm phồng",
                object: "Bóng Bay",
                story: "Vợ Bình phồng má trợn mắt lấy hơi cố gắng Bơm phồng quả Bóng Bay hidro."
        },
        {
                code: "67",
                person: "Bin Anh",
                action: "Gõ 10 ngón",
                object: "Bàn Phím",
                story: "Bin Anh múa tay trên không trung rồi hạ xuống Gõ 10 ngón tanh tách lên Bàn Phím cơ."
        },
        {
                code: "68",
                person: "Anh Bách Việt Mỹ",
                action: "hi-5",
                object: "Bác Hồ",
                story: "Anh Bách Việt Mỹ mặc quân phục chỉnh tề đứng nghiêm hi-5 trước tượng Bác Hồ."
        },
        {
                code: "69",
                person: "Bob Marley",
                action: "Ôm",
                object: "Bình Ga",
                story: "Bob Marley vừa hát nhạc reggae vừa dang hai tay Ôm trọn cái Bình Ga màu hồng."
        },
        {
                code: "70",
                person: "bạn Phong",
                action: "buộc vào nhau Nhảy dù cùng",
                object: "Phi Công",
                story: "Bạn Phong gan dạ ôm chặt eo anh Phi Công rồi cả hai buộc vào nhau Nhảy dù cùng nhau xuống đất."
        },
        {
                code: "71",
                person: "Cô Phán thảo",
                action: "Dán bùa giấy",
                object: "Phù Thủy",
                story: "Cô Phán thảo nhanh tay cầm lá bùa vàng Dán bùa giấy phong ấn lên trán bà Phù Thủy."
        },
        {
                code: "72",
                person: "chú Phú",
                action: "Khoan cắt bê tông",
                object: "Phá Nhà",
                story: "Chú Phú cầm máy khoan rung bần bật đi Khoan cắt bê tông làm ầm ĩ để Phá Nhà."
        },
        {
                code: "73",
                person: "Pele",
                action: "Sút bóng vào",
                object: "Phát Minh",
                story: "Pele tung cú sút sấm sét Sút bóng vào làm hỏng cỗ máy Phát Minh mới toanh."
        },
        {
                code: "74",
                person: "Cát Phượng",
                action: "Vỗ phấn phủ mặt",
                object: "Phấn Rôm",
                story: "Cát Phượng lấy bông phấn to đùng đập bop bop Vỗ phấn phủ mặt bằng bột Phấn Rôm trắng xóa."
        },
        {
                code: "75",
                person: "anh Phúc giám đốc",
                action: "Xếp chân kiết già",
                object: "Pháp Sư",
                story: "Anh Phúc giám đốc ngồi thiền Xếp chân kiết già rồi bay lơ lửng nhu một Pháp Sư đắc đạo."
        },
        {
                code: "76",
                person: "Bá Phương",
                action: "Đếm vứt kiểu Gangster",
                object: "Phong Bì",
                story: "Bá Phương ngồi liếm ngón tay sột soạt Đếm vứt kiểu Gangster đi Đếm vứt kiểu Gangster lại xấp Phong Bì dày cộp."
        },
        {
                code: "77",
                person: "Phước Thịnh",
                action: "Lạy 5 vóc chạm chân",
                object: "Phật Pháp",
                story: "Phước Thịnh thành tâm nằm rạp xuống đất Lạy 5 vóc chạm chân trước biểu tượng Phật Pháp thiêng liêng."
        },
        {
                code: "78",
                person: "em Phi",
                action: "châm lửa",
                object: "Phóng Hỏa",
                story: "Em Phi cầm đuốc châm lửa rồi chạy đi Phóng Hỏa đốt cháy rụi kho rơm."
        },
        {
                code: "79",
                person: "Rapper Pháo",
                action: "Hót xẻng",
                object: "Phân Gà",
                story: "Rapper Pháo đeo khẩu trang bịt mũi cầm Hót xẻng xúc dọn đống Phân Gà trong chuồng."
        },
        {
                code: "80",
                person: "cháu Hải",
                action: "dắt kéo cổ",
                object: "Hươu Cao Cổ",
                story: "Cháu Hải đứng kiễng chân cố gắng dắt kéo cổ dài ra để thi cao với Hươu Cao Cổ."
        },
        {
                code: "81",
                person: "anh Hùng Liên",
                action: "Chảy nước mắt rơi vào",
                object: "Hành Tây",
                story: "Anh Hùng Liên đang thái rau thì bị cay xè mắt, khóc Chảy nước mắt rơi vào giàn giụa vì củ Hành Tây."
        },
        {
                code: "82",
                person: "chị Huyền",
                action: "nếm",
                object: "Hạt Nêm",
                story: "Chị Huyền dùng đầu ngón tay út chấm một ít và nếm thử vị mặn ngọt của gói Hạt Nêm."
        },
        {
                code: "83",
                person: "Hoàng",
                action: "Ói nôn",
                object: "Hộc Máu",
                story: "Hoàng diễn cảnh kiếm hiệp bị nội thương, ôm ngực rên rỉ rồi Ói nôn ra một Hộc Máu giả."
        },
        {
                code: "84",
                person: "anh Hợp hàng xóm",
                action: "Leo qua tường",
                object: "Hàng Rào",
                story: "Anh Hợp hàng xóm lén lút như điệp viên Leo qua tường trèo qua Hàng Rào thép gai nhà bên."
        },
        {
                code: "85",
                person: "bà Hiên",
                action: "Đào",
                object: "Hố Sâu",
                story: "Bà Hiên cầm cái xẻng hì hục xúc đất Đào một cái Hố Sâu hoắm trong vườn."
        },
        {
                code: "86",
                person: "anh Huy",
                action: "Choàng Mặc",
                object: "Hoàng Bào",
                story: "Anh Huy đứng trước gương sửa soạn uy nghiêm Choàng Mặc bộ Hoàng Bào rồng phượng của vua."
        },
        {
                code: "87",
                person: "sếp  Hạnh",
                action: "Nhặt từng cánh",
                object: "Hoa Phượng",
                story: "sếp  Hạnh thẩn thơ ngồi dưới gốc cây sân trường Nhặt từng cánh hoa rơi từ bông Hoa Phượng đỏ."
        },
        {
                code: "88",
                person: "em Hường",
                action: "Xịt khử mùi",
                object: "Miệng Hôi Hám",
                story: "Em Hường bịt mũi cầm chai xịt thơm thẳng tay Xịt khử mùi vào cái Miệng Hôi Hám đang mở to."
        },
        {
                code: "89",
                person: "bà Hiệp",
                action: "Sàng bằng rổ cho lọt xuống",
                object: "Hạt Gạo",
                story: "Bà Hiệp cầm cái mẹt tre khéo léo lắc lắc để Sàng bằng rổ cho lọt xuống sảy sạch trấu khỏi những Hạt Gạo trắng."
        },
        {
                code: "90",
                person: "Cháu Loa",
                action: "bóp cổ",
                object: "Gà Chọi",
                story: "Cháu Loa tức giận lao vào dùng hai tay bóp cổ con Gà Chọi đang gáy làm nó im bặt."
        },
        {
                code: "91",
                person: "anh Lập",
                action: "Đấm bằng",
                object: "Găng Tay",
                story: "Anh Lập đeo bao tay vào rồi dùng hết sức Đấm bằng đôi Găng Tay boxing vào bao cát."
        },
        {
                code: "92",
                person: "anh Lanh",
                action: "kéo dài",
                object: "Gậy Như Ý",
                story: "Anh Lanh hô to câu thần chú \"Biến to\" làm cây Gậy Như Ý kéo dài ra chọc thủng trời xanh."
        },
        {
                code: "93",
                person: "bạn Loan",
                action: "câu bằng",
                object: "Giun Móc",
                story: "Bạn Loan ngồi kiên nhẫn bên bờ sông móc mồi câu bằng con Giun Móc ngoe nguẩy vào lưỡi câu."
        },
        {
                code: "94",
                person: "Mùi A Lưu",
                action: "Trà sát",
                object: "Giấy Giáp",
                story: "Mùi A Lưu thợ mộc lấy tờ Giấy Giáp thô ráp Trà sát mạnh lên mặt gỗ cho láng mịn."
        },
        {
                code: "95",
                person: "Em Long",
                action: "tựa lưng",
                object: "Ghế Sofa",
                story: "Em Long thư giãn sau giờ học, ngả người tựa lưng êm ái chìm sâu vào chiếc Ghế Sofa nhung."
        },
        {
                code: "96",
                person: "Gì Liên",
                action: "quạt bay",
                object: "Gió Bão",
                story: "Gì Liên hóa thân thành Thiết Phiến Công Chúa cầm quạt bay vẫy mạnh tạo ra cơn Gió Bão cuốn bay tất cả."
        },
        {
                code: "97",
                person: "Chú Liệu",
                action: "Mở cửa lồng chim",
                object: "Giải Phóng",
                story: "Chú Liệu cầm chìa khóa vàng trịnh trọng Mở cửa lồng chim cổng thành để Giải Phóng đoàn quân chiến thắng đi vào."
        },
        {
                code: "98",
                person: "Em Leng",
                action: "Quay phim",
                object: "Máy Ghi Hình",
                story: "Em Leng vác trên vai cái Máy Ghi Hình chuyên nghiệp to đùng đang say sưa Quay phim hiện trường vụ án."
        },
        {
                code: "99",
                person: "Anh Lực",
                action: "Trải dàn phẳng",
                object: "Ga Giường",
                story: "Anh Lực tỉ mỉ vuốt ve từng nếp nhăn và Trải dàn phẳng phiu tấm Ga Giường trắng tinh tươm."
        }
],

    // Special codes
    specialCodes: [
        {
                code: "Jc",
                person: "Bác sĩ Gấm",
                action: "rút dây",
                object: "Giắc Cắm",
                story: "Bác sĩ Gấm trong phòng cấp cứu vội vàng chạy tới rút dây điện nguồn khỏi Giắc Cắm máy móc."
        },
        {
                code: "Jr",
                person: "Stive Jobs",
                action: "Chạm nhẹ đầu ngón",
                object: "Iphone",
                story: "Stive Jobs cầm chiếc điện thoại lên và tinh tế Chạm nhẹ đầu ngón tay lướt trên màn hình Iphone."
        },
        {
                code: "Jt",
                person: "Jack 5 Củ ca sĩ",
                action: "Hét ra lửa",
                object: "Inh Tai",
                story: "Jack 5 Củ ca sĩ cầm mic gào Hét ra lửa lên một nốt cao chót vót làm Inh Tai nhức óc khán giả."
        },
        {
                code: "Jb",
                person: "Võ Nguyên Giáp",
                action: "Phóng súng phóng lựu",
                object: "Người Khổng Lồ",
                story: "Võ Nguyên Giáp bình tĩnh ra lệnh ấn nút Phóng súng phóng lựu bay vèo vào gót chân của Người Khổng Lồ."
        },
        {
                code: "qc",
                person: "Chị Quế",
                action: "xé nát",
                object: "Quả Cầu",
                story: "Chị Quế mặc váy xòe chơi thể thao, khéo léo co chân xé nát trái Quả Cầu lông bay lên xuống."
        },
        {
                code: "qr",
                person: "anh Quý",
                action: "khoét",
                object: "Quả rứa",
                story: "Anh Quý dùng con dao nhọn tỉ mỉ xoay tròn khoét từng cái mắt nâu trên thân Quả rứa (thơm)."
        },
        {
                code: "qt",
                person: "anh Quang",
                action: "Cắn",
                object: "Quả Táo",
                story: "Anh Quang cầm Quả Táo đỏ mọng lên và há to miệng Cắn một miếng giòn tan (tạo hình logo Apple)."
        },
        {
                code: "qb",
                person: "Quỳnh anh",
                action: "nghiền xay nát",
                object: "Quả Bơ",
                story: "Quỳnh anh bỏ Quả Bơ sáp vào máy xay sinh tố cối lớn để nghiền xay nát làm món sinh tố bơ."
        },
        {
                code: "kc",
                person: "Khoa xuka",
                action: "bật nguồn",
                object: "Đầu TV K+",
                story: "Khoa xuka cầm điều khiển từ xa bấm nút đỏ bật nguồn khởi động cái Đầu TV K+ lên xem bóng đá ngoại hạng."
        },
        {
                code: "kr",
                person: "Khoát",
                action: "Gài lên áo",
                object: "Kính Râm",
                story: "Khoát điệu đà lấy Kính Râm đen xì ra và Gài lên áo lên cổ áo sơ mi cho ngầu."
        },
        {
                code: "kt",
                person: "Anh Khoái",
                action: "quấn",
                object: "Khăn Tắm",
                story: "Anh Khoái vừa tắm xong bước ra vội vàng lấy Khăn Tắm to sụ quấn quanh người che thân."
        },
        {
                code: "kb",
                person: "thầy Kiên",
                action: "Dò bằng siêu âm",
                object: "Kho Báu",
                story: "Thầy Kiên cầm máy dò kim loại đi rà trên bãi biển để Dò bằng siêu âm tín hiệu phát ra từ rương Kho Báu chôn vùi."
        }
],

    // Helper functions
    getAllCodes() {
        return [...this.rawData, ...this.specialCodes];
    },

    getByCode(code) {
        code = code.toUpperCase();
        const item = this.rawData.find(d => d.code === code) ||
            this.specialCodes.find(d => d.code.toUpperCase() === code);
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
