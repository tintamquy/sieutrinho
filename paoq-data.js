// PAOQ Data Module - Parse và quản lý dữ liệu PAOQ System
const PAOQ_DATA = {
    // Raw data từ CSV
    rawData: [
        {
                "code": "00",
                "person": "Shaggy",
                "action": "Vuốt Ve",
                "object": "Con Chó",
                "quote": "\"Scooby-Doo!\" (tiếng gâu gâu)"
        },
        {
                "code": "01",
                "person": "Lão Tử",
                "action": "Cưỡi phi nước đại",
                "object": "Con Trâu",
                "quote": "\"Biết đủ là đủ, biết đủ không nhục\" (tiếng bò rống ngộ nghĩnh)"
        },
        {
                "code": "02",
                "person": "Sonic",
                "action": "Nhổ Lông",
                "object": "Con Nhím",
                "quote": "\"Gotta go fast!\" (âm thanh thu thập vòng vàng)"
        },
        {
                "code": "03",
                "person": "Jack Sparrow",
                "action": "Nướng",
                "object": "Con Mực",
                "quote": "\"Savvy?\" (tiếng Kraken gầm)"
        },
        {
                "code": "04",
                "person": "Voldemort",
                "action": "Thôi Miên",
                "object": "Con Rắn",
                "quote": "\"Avada Kedavra\" (tiếng rắn rít Xà Ngữ)"
        },
        {
                "code": "05",
                "person": "The Rock",
                "action": "Vật Ngã",
                "object": "Cá Sấu",
                "quote": "\"If you smell what The Rock is cooking!\" (tiếng nện xuống thảm rầm rầm)"
        },
        {
                "code": "06",
                "person": "Thor",
                "action": "Đập",
                "object": "Cái Búa",
                "quote": "\"Bring me Thanos!\" (sấm sét ầm ầm)"
        },
        {
                "code": "07",
                "person": "Albert Einstein",
                "action": "Viết",
                "object": "Cục Phấn",
                "quote": "\"E=mc2\" (tiếng lạch cạch viết bảng)"
        },
        {
                "code": "08",
                "person": "Trư Bát Giới",
                "action": "Mổ bụng",
                "object": "Con Heo",
                "quote": "\"Đại sư huynh!\" (tiếng ủn ỉn)"
        },
        {
                "code": "09",
                "person": "Wall-E",
                "action": "Dẫm lên",
                "object": "Con Gián",
                "quote": "\"Waaall-E\" (âm thanh máy móc)"
        },
        {
                "code": "10",
                "person": "Angry Birds (Red)",
                "action": "Ấp",
                "object": "Tổ Chim",
                "quote": "\"Hee-yah!\" (tiếng ná cao su ném)"
        },
        {
                "code": "11",
                "person": "Caesar (Planet of the Apes)",
                "action": "Gãi",
                "object": "Tinh Tinh",
                "quote": "\"Ape not kill ape.\"  -Giọng nói trầm đục (Guttural Voice): \"Ape... not... kill... ape.\""
        },
        {
                "code": "12",
                "person": "Freddy Krueger",
                "action": "Đè xuống",
                "object": "Tấm Nệm",
                "quote": "\"One, two, Freddy's coming for you\" (tiếng móng sắt cào rách vải)"
        },
        {
                "code": "13",
                "person": "Captain America",
                "action": "Cạy cửa",
                "object": "Thang Máy",
                "quote": "\"Before we get started, does anyone want to get out?\" (tiếng kính vỡ)"
        },
        {
                "code": "14",
                "person": "Vulture (Spiderman)",
                "action": "Đổ đầy",
                "object": "Túi Rác",
                "quote": "\"The world's changing. It's time we change too.\" -Tiếng đổ phế liệu (Clattering): \"Rầm... loảng xoảng... keng!\""
        },
        {
                "code": "15",
                "person": "Vincent van Gogh",
                "action": "Cầm cọ khuấy mạnh",
                "object": "Thùng Sơn",
                "quote": "\"Nghệ thuật là nỗi đau\" (tiếng cọ quệt)"
        },
        {
                "code": "16",
                "person": "Dora Khám Phá",
                "action": "Đeo trước ngực",
                "object": "Túi Balo",
                "quote": "\"Balo Balo!\" (nhạc Dora)"
        },
        {
                "code": "17",
                "person": "Star-Lord (Guardians of the Galaxy)",
                "action": "Bịt tai",
                "object": "Tai Phôn",
                "quote": "\"Hey (hey) What's the matter with your head? yeah...\" tiếng nhạc"
        },
        {
                "code": "18",
                "person": "Harry Potter",
                "action": "giật dây còi",
                "object": "Tàu Hỏa",
                "quote": "\"Hogwarts Express!\" (tiếng còi tàu tu tu)"
        },
        {
                "code": "19",
                "person": "Black Panther",
                "action": "Húc",
                "object": "Tê Giác",
                "quote": "\"Wakanda Forever!\" (tiếng gầm rú)"
        },
        {
                "code": "20",
                "person": "Walter White (Heisenberg)",
                "action": "Chưng cất",
                "object": "Nước Cất",
                "quote": "\"I am the danger!\" (tiếng dung dịch đun sôi sục sục)"
        },
        {
                "code": "21",
                "person": "Superman",
                "action": "Bay ra khỏi",
                "object": "Nhà Tù",
                "quote": "\"Up, up and away!\" (tiếng gạch đá vỡ uỳnh uỳnh)"
        },
        {
                "code": "22",
                "person": "Peter Parker",
                "action": "Bắn tơ từ tay",
                "object": "Người Nhện",
                "quote": "Sức mạnh càng lớn, trách nhiệm càng nhiều \"Tè te tè té te\" (tiếng bắn tơ phập phập)"
        },
        {
                "code": "23",
                "person": "Gordon Ramsay",
                "action": "Chấm",
                "object": "Nước Mắm",
                "quote": "\"It's raw!\" (tiếng rót róc rách)"
        },
        {
                "code": "24",
                "person": "Super Mario",
                "action": "Hái",
                "object": "Nấm Rơm",
                "quote": "\"It's-a me, Mario!\" (tiếng ting ting ăn nấm)"
        },
        {
                "code": "25",
                "person": "Tần Thủy Hoàng",
                "action": "ngậm mãi như ninja",
                "object": "Nhân Sâm",
                "quote": "\"Trẫm muốn trường sinh bất lão\" (tiếng gươm rút khỏi vỏ)"
        },
        {
                "code": "26",
                "person": "Frodo Baggins",
                "action": "đeo vào ngón áp út",
                "object": "Nhẫn Bạc",
                "quote": "\"The Ring is mine\" (tiếng thì thầm thì thào)"
        },
        {
                "code": "27",
                "person": "Green Goblin",
                "action": "Ném",
                "object": "Nổ Pháo",
                "quote": "\"Godspeed, Spider-Man!\" (tiếng cười điên dại Khặc khặc!)"
        },
        {
                "code": "28",
                "person": "Joker",
                "action": "Tiêm",
                "object": "Nghiện Hút",
                "quote": "\"Why so serious?\" (điệu cười man rợ)"
        },
        {
                "code": "29",
                "person": "Master Roshi (Quy Lão)",
                "action": "Đẩy xe lăn",
                "object": "Người già",
                "quote": "\"Kamehameha!\" (tiếng chống gậy cộc cộc)"
        },
        {
                "code": "30",
                "person": "Harley Quinn",
                "action": "tô sơn",
                "object": "Móng Chân",
                "quote": "\"Puddin!\" (tiếng cười điên dại hề hước)"
        },
        {
                "code": "31",
                "person": "Anonymous Hacker",
                "action": "Dùng tua vít vặn",
                "object": "Máy Tính",
                "quote": "\"We do not forgive. We do not forget.\" -Tiếng quạt tản nhiệt: \"Vù... vù... rè rè...\""
        },
        {
                "code": "32",
                "person": "Beethoven",
                "action": "ngoáy tai",
                "object": "Màng Nhĩ",
                "quote": "\"Khúc giao hưởng số 5\" (Tèn ten ten tén)"
        },
        {
                "code": "33",
                "person": "Nick Fury",
                "action": "Moi",
                "object": "Móc Mắt",
                "quote": "\"I still have one good eye\" (tiếng tháo bịt mắt)"
        },
        {
                "code": "34",
                "person": "Gene Kelly",
                "action": "Che ô chùm",
                "object": "Mưa Rào",
                "quote": "\"Singing in the rain\" (tiếng mưa rào rào)"
        },
        {
                "code": "35",
                "person": "Iron Man",
                "action": "Uốn cong",
                "object": "Móc Sắt",
                "quote": "\"I am Iron Man\" (tiếng động cơ phản lực vù vù)"
        },
        {
                "code": "36",
                "person": "Tom Cruise",
                "action": "Lái",
                "object": "Máy Bay",
                "quote": "\"I feel the need... the need for speed!\" (tiếng động cơ gầm rú)"
        },
        {
                "code": "37",
                "person": "Vito Corleone (The Godfather)",
                "action": "Xả Nã súng Tommy",
                "object": "Ma Phia",
                "quote": "\"I'm gonna make him an offer he can't refuse\" (tiếng nhạc Godfather)"
        },
        {
                "code": "38",
                "person": "Miley Cyrus",
                "action": "Liếm",
                "object": "Màn Hình TV",
                "quote": "\"I came in like a wrecking ball\" nhạc"
        },
        {
                "code": "39",
                "person": "Deadpool",
                "action": "Chui",
                "object": "Máy Giặt",
                "quote": "\"Maximum effort!\" (tiếng vắt đồ rào rào)"
        },
        {
                "code": "40",
                "person": "Leatherface (Texas Chainsaw)",
                "action": "Kéo máy cưa lia qua lại",
                "object": "Răng Cưa",
                "quote": "\"Grrrrrrr\" (tiếng cưa máy rú ầm ầm)"
        },
        {
                "code": "41",
                "person": "Hằng Nga",
                "action": "Đan",
                "object": "Rổ Tre",
                "quote": "\"Chú Cuội đâu rồi?\" (tiếng lạch cạch đan rổ)"
        },
        {
                "code": "42",
                "person": "Hannibal Lecter",
                "action": "Nhồi",
                "object": "Ruột Non",
                "quote": "\"Hello, Clarice\" (tiếng húp xì xụp)"
        },
        {
                "code": "43",
                "person": "Salt Bae",
                "action": "Rắc đều",
                "object": "Rắc Muối",
                "quote": "Salt Bae \"Rắc rắc\" (tiếng thả muối lách tách)"
        },
        {
                "code": "44",
                "person": "Tarzan",
                "action": "Đu",
                "object": "Ròng Rọc",
                "quote": "\"A-a-a-a-a-a\" (tiếng đu dây vèo vèo)"
        },
        {
                "code": "45",
                "person": "Lý Tiểu Long",
                "action": "Múa",
                "object": "Rồng Sắt (gậy)",
                "quote": "\"Be water, my friend\" (tiếng múa côn vù vù)"
        },
        {
                "code": "46",
                "person": "Optimus Prime",
                "action": "Lắp Ráp",
                "object": "Rô Bốt",
                "quote": "\"Autobots, roll out!\" (tiếng biến hình ầm ầm)"
        },
        {
                "code": "47",
                "person": "Aquaman",
                "action": "giăng lưới",
                "object": "Rô Phi",
                "quote": "\"Ta là vua Atlantis\" (tiếng cá quẫy tõm tõm)"
        },
        {
                "code": "48",
                "person": "Popeye",
                "action": "Bóp nát bằng 1 tay",
                "object": "Rau Hẹ",
                "quote": "\"I am what I am!\" (tiếng bóp nát hộp rau chân vịt)"
        },
        {
                "code": "49",
                "person": "Dominic Toretto",
                "action": "Vặn Ga",
                "object": "Rồ Ga",
                "quote": "\"Family\" (tiếng nẹt pô vroom vroom)"
        },
        {
                "code": "50",
                "person": "Mr. Bean",
                "action": "Hút",
                "object": "Sữa Chua",
                "quote": "\"Teddy!\" (tiếng mút thìa chùn chụt)"
        },
        {
                "code": "51",
                "person": "Simba",
                "action": "Quất Roi",
                "object": "Sư Tử",
                "quote": "\"Hakuna Matata\" (tiếng gầm Grào)"
        },
        {
                "code": "52",
                "person": "Hamlet",
                "action": "Hôn má",
                "object": "Sọ Người",
                "quote": "\"To be, or not to be\" (tiếng xương kêu răng rắc)"
        },
        {
                "code": "53",
                "person": "Frankenstein",
                "action": "Khâu vá",
                "object": "Sứt môi",
                "quote": "\"Victor, I forgive you\" (tiếng rên rỉ gầm gừ)"
        },
        {
                "code": "54",
                "person": "Minions",
                "action": "Ngửi",
                "object": "Sầu Riêng",
                "quote": "\"Banana!\" (tiếng cười he he he)"
        },
        {
                "code": "55",
                "person": "Edward Scissorhands",
                "action": "Xoay gọt vỏ lốc xoáy",
                "object": "quả Su Su",
                "quote": "\"I am not complete\" (tiếng móng tay kéo cắt lách cách)"
        },
        {
                "code": "56",
                "person": "Silver Surfer",
                "action": "Lướt sóng",
                "object": "Sóng Biển",
                "quote": "\"To me, my board!\" (tiếng sóng vỗ ào ạt)"
        },
        {
                "code": "57",
                "person": "Pikachu",
                "action": "cắm điện vào mồm",
                "object": "Sạc Pin",
                "quote": "\"Pika Pikachu!\" (tiếng điện giật xẹt xẹt)"
        },
        {
                "code": "58",
                "person": "Bugs Bunny",
                "action": "Nhai",
                "object": "Su Hào",
                "quote": "\"What's up, Doc?\" (tiếng nhai củ cải rồm rộp)"
        },
        {
                "code": "59",
                "person": "Michael Jackson",
                "action": "moonwalk lau nhà",
                "object": "Sàn Gỗ",
                "quote": "\"Hee-hee!\" (tiếng giày trượt moonwalk xoẹt xoẹt)"
        },
        {
                "code": "60",
                "person": "Indiana Jones",
                "action": "Kẹp kìm",
                "object": "Bọ Cạp",
                "quote": "\"Càng to càng ít độc, con nhỏ mới đáng sợ\". -Tiếng kìm kẹp (Clamping): \"Cạch... răng rắc!\""
        },
        {
                "code": "61",
                "person": "Zoro",
                "action": "Xỏ kiếm xuyên qua",
                "object": "Bông Tai",
                "quote": "Santoryu! (tiếng kiếm xoẹt)"
        },
        {
                "code": "62",
                "person": "Donald Trump",
                "action": "bẻ",
                "object": "Bắp Ngô",
                "quote": "\"Make America Great Again\" (tiếng bẻ ngô rắc rắc)"
        },
        {
                "code": "63",
                "person": "Casper",
                "action": "Vồ như vồ ếch",
                "object": "Bóng Ma",
                "quote": "\"I am friendly ghost\" (tiếng vù vù u ám)"
        },
        {
                "code": "64",
                "person": "Michael Jordan",
                "action": "Úp rổ",
                "object": "Bóng Rổ",
                "quote": "\"I can accept failure, but I can't accept not trying\" (tiếng tưng bóng pụp pụp)"
        },
        {
                "code": "65",
                "person": "Hoa Đà",
                "action": "Bắt mạch",
                "object": "Bác Sĩ",
                "quote": "\"Để ta xem mạch tượng\" (tiếng nhịp tim đập thì thịch)"
        },
        {
                "code": "66",
                "person": "Pennywise (IT)",
                "action": "Bơm phồng",
                "object": "Bóng Bay",
                "quote": "\"You'll float too\" (tiếng nổ lốp bốp)"
        },
        {
                "code": "67",
                "person": "Bill Gates",
                "action": "Gõ 10 ngón",
                "object": "Bàn Phím",
                "quote": "\"Phần mềm là ma thuật\" (tiếng lạch cạch gõ phím)"
        },
        {
                "code": "68",
                "person": "Đại tướng Võ Nguyên Giáp",
                "action": "bắt tay",
                "object": "Tượng Bác Hồ",
                "quote": "\"Tôi sống ngày nào, cũng là vì đất nước ngày đó\" (tiếng nhạc Tiến Quân Ca vang dội)"
        },
        {
                "code": "69",
                "person": "Bob Marley",
                "action": "Ôm",
                "object": "Bình Ga",
                "quote": "\"Don't worry about a thing\" (tiếng xịt ga xì xì)"
        },
        {
                "code": "70",
                "person": "Sniper PUBG (Ghillie Suit)",
                "action": "Nhảy dù cùng",
                "object": "Phi Công",
                "quote": "\"Winner winner chicken dinner!\" (tiếng dù bung phập)"
        },
        {
                "code": "71",
                "person": "Gandalf",
                "action": "Dán bùa lên",
                "object": "Phù Thủy",
                "quote": "\"You shall not pass!\" (tiếng gậy gõ cộc cộc)"
        },
        {
                "code": "72",
                "person": "Wreck-It Ralph",
                "action": "dùng khoan phá nhà",
                "object": "Phá Nhà",
                "quote": "\"I'm gonna wreck it!\" (tiếng đổ vỡ ầm ầm)"
        },
        {
                "code": "73",
                "person": "Thomas Edison",
                "action": "Sút bóng vào",
                "object": "Phát Minh bóng đèn",
                "quote": "\"Thiên tài là 1% cảm hứng\" (tiếng bóng đèn sáng bíp)"
        },
        {
                "code": "74",
                "person": "Marilyn Monroe",
                "action": "Vỗ bôi phấn phủ mặt",
                "object": "Phấn Rôm",
                "quote": "\"Happy birthday Mr. President\" (tiếng vỗ phấn bụp bụp)"
        },
        {
                "code": "75",
                "person": "Geralt of Rivia (The Witcher)",
                "action": "Xếp chân kiết già",
                "object": "Pháp Sư",
                "quote": "\"Toss a coin to your Witcher\" (tiếng thi triển ấn phép)"
        },
        {
                "code": "76",
                "person": "Hòa Thân",
                "action": "Xòe Đếm",
                "object": "Phong Bì",
                "quote": "\"Khò khò... toàn là bạc thật!\" - tiếng cổ cầm"
        },
        {
                "code": "77",
                "person": "Đường Tăng",
                "action": "Lạy 5 vóc chạm chân",
                "object": "Phật Pháp",
                "quote": "\"Nam mô A Di Đà Phật\" (tiếng gõ mõ lốc cốc)"
        },
        {
                "code": "78",
                "person": "Ghost Rider",
                "action": "châm lửa",
                "object": "Phóng Hỏa",
                "quote": "\"Look into my eyes\" (tiếng lửa cháy phừng phừng)"
        },
        {
                "code": "79",
                "person": "Bà Tweedy (Chicken Run)",
                "action": "Hót bằng xẻng",
                "object": "Phân Gà",
                "quote": "Lũ gà đang ủ mưu! (tiếng cạo xẻng rột rột)"
        },
        {
                "code": "80",
                "person": "Kwang Soo (Running Man)",
                "action": "Dắt cổ",
                "object": "Hươu Cao Cổ",
                "quote": "\"Phản bội! Phản bội!\" (tiếng hươu kêu)"
        },
        {
                "code": "81",
                "person": "Shrek",
                "action": "Chảy nước mắt",
                "object": "Hành Tây",
                "quote": "\"Ogres are like onions!\" (tiếng nhai chóp chép)"
        },
        {
                "code": "82",
                "person": "Ratatouille Linguini",
                "action": "nếm",
                "object": "Hạt Nêm",
                "quote": "\"Anyone can cook!\" (tiếng chép miệng hít hà)"
        },
        {
                "code": "83",
                "person": "Dracula",
                "action": "Ói",
                "object": "Hộc Máu",
                "quote": "\"I want to suck your blood\" (tiếng khạc máu khụ khụ)"
        },
        {
                "code": "84",
                "person": "Thành Long (Jackie Chan)",
                "action": "Nhảy santo leo qua",
                "object": "Hàng Rào",
                "quote": "\"Wa-cha!\" (tiếng trèo rào sột soạt)"
        },
        {
                "code": "85",
                "person": "King Leonidas (300)",
                "action": "Đá xuống",
                "object": "Hố Sâu",
                "quote": "\"This is Sparta!\" (Tiếng thét và tiếng rơi vọng lại Aaaaaa...)"
        },
        {
                "code": "86",
                "person": "Võ Tắc Thiên",
                "action": "Choàng Mặc",
                "object": "Hoàng Bào",
                "quote": "\"Miễn lễ\" (tiếng vải bay phần phật)"
        },
        {
                "code": "87",
                "person": "Sơn Tùng M-TP",
                "action": "Cúi xuống nhặt",
                "object": "Hoa Phượng",
                "quote": "\"Chắc ai đó sẽ về\" (âm thanh huýt sáo giai điệu)"
        },
        {
                "code": "88",
                "person": "Venom",
                "action": "Xịt khử mùi",
                "object": "Miệng Hôi Hám",
                "quote": "\"We are Venom\" (tiếng nhểu dãi tỏng tỏng)"
        },
        {
                "code": "89",
                "person": "Thạch Sanh",
                "action": "xới tung",
                "object": "Hạt Gạo",
                "quote": "\"Niêu cơm thần\" (tiếng xới cơm sột soạt)"
        },
        {
                "code": "90",
                "person": "John Cena",
                "action": "Kẹp cổ (Chokehold)",
                "object": "Gà Chọi",
                "quote": "\"You can't see me!\" (tiếng gáy o o o)"
        },
        {
                "code": "91",
                "person": "Thanos",
                "action": "Đấm bằng",
                "object": "Găng Tay",
                "quote": "\"I am inevitable\" (tiếng búng tay tách)"
        },
        {
                "code": "92",
                "person": "Tôn Ngộ Không",
                "action": "Biến dài",
                "object": "Gậy Như Ý",
                "quote": "\"Lão Tôn tới đây!\" (tiếng vung gậy vù vù)"
        },
        {
                "code": "93",
                "person": "Gollum (Chúa Nhẫn)",
                "action": "Móc lưỡi câu",
                "object": "Giun Móc",
                "quote": "My precious! (tiếng giun ngọ nguậy nhóp nhép)"
        },
        {
                "code": "94",
                "person": "Pinocchio",
                "action": "Trà sát",
                "object": "Giấy Giáp",
                "quote": "\"Mũi tôi đang dài ra!\" (tiếng chà rèn rẹt)"
        },
        {
                "code": "95",
                "person": "Homer Simpson",
                "action": "tựa lưng",
                "object": "Ghế Sofa",
                "quote": "\"D'oh!\" (tiếng nệm lún cái xịch)"
        },
        {
                "code": "96",
                "person": "Storm (X-Men)",
                "action": "quạt ba tiêu",
                "object": "Gió Bão",
                "quote": "\"Sấm sét hãy nổi lên!\" (tiếng gió rít ù ù)"
        },
        {
                "code": "97",
                "person": "Nelson Mandela",
                "action": "cởi gông",
                "object": "Giải Phóng",
                "quote": "\"Tự do không thể chia cắt\" (tiếng hò reo vang dội)"
        },
        {
                "code": "98",
                "person": "Mr. Beast",
                "action": "Quay phim",
                "object": "Máy Ghi Hình",
                "quote": "\"Trong video này...\" (tiếng bấm máy bíp bíp)"
        },
        {
                "code": "99",
                "person": "Nobita",
                "action": "treo lên dây phơi",
                "object": "Ga Giường",
                "quote": "\"tại sao mắt lại ở phía trước\"  - Tiếng sụt sịt (Sniffing): \"Hức... hức...\""
        }
],

    // Special codes
    specialCodes: [
        {
                "code": "Jc",
                "person": "Neo (Ma trận)",
                "action": "Giật rút dây",
                "object": "Giắc Cắm",
                "quote": "\"I know Kung Fu\" (tiếng tuốt cáp điện xoẹt xoẹt)"
        },
        {
                "code": "Jr",
                "person": "Steve Jobs",
                "action": "Chạm nhẹ đầu ngón",
                "object": "Iphone",
                "quote": "\"One more thing...\" (tiếng chuông iPhone marimba)"
        },
        {
                "code": "Jt",
                "person": "Bao Tô Bà (Tuyệt đỉnh Kungfu)",
                "action": "Hét sư tử hống",
                "object": "Inh Tai",
                "quote": "\"Đóng tiền nhà chưa hả?!\" (tiếng vỡ kính xoảng)"
        },
        {
                "code": "Jb",
                "person": "Jinx LOL",
                "action": "phóng tên lửa",
                "object": "Người Khổng Lồ",
                "quote": "\"Bye-bye!\" (tiếng \"Kaboom!\")"
        },
        {
                "code": "qc",
                "person": "Hercules",
                "action": "Vác lên vai",
                "object": "Quả Cầu",
                "quote": "\"I can go the distance!\" \"Hnnnnnn... GHHH!\" (Tiếng gồng mình, nghiến răng khi dồn lực vào vai)."
        },
        {
                "code": "qr",
                "person": "Pikotaro (PPAP)",
                "action": "cắm bút",
                "object": "Quả rứa",
                "quote": "\"PPAP!\" (âm thanh bút đâm phập)"
        },
        {
                "code": "qt",
                "person": "Bạch Tuyết",
                "action": "Cắn",
                "object": "Quả Táo",
                "quote": "\"Gương kia ngự ở trên tường\" (tiếng cắn táo rộp rộp)"
        },
        {
                "code": "qb",
                "person": "Ant-Man",
                "action": "nghiền nát",
                "object": "Quả Bơ",
                "quote": "\"It's a taco!\"  - tiếng máy xay"
        },
        {
                "code": "kc",
                "person": "Bình luận viên Quang Huy",
                "action": "bật nguồn",
                "object": "Đầu TV K+",
                "quote": "\"Vàooooooooooo!\" (tiếng bật TV lạch cạch)"
        },
        {
                "code": "kr",
                "person": "Men In Black (Will Smith)",
                "action": "Cài",
                "object": "Kính Râm",
                "quote": "\"Nhìn vào đây\" (tiếng xịt xóa trí nhớ flash!)"
        },
        {
                "code": "kt",
                "person": "Xuka",
                "action": "quấn",
                "object": "Khăn Tắm",
                "quote": "\"Á á á! Đồ Nobita biến thái!\" (tiếng tát bốp)"
        },
        {
                "code": "kb",
                "person": "Nami (One Piece)",
                "action": "Cầm la bàn dò tìm",
                "object": "Kho Báu",
                "quote": "\"Tiền của ta!\" (tiếng vàng rơi leng keng)"
        },
        {
                "code": "0",
                "person": "Maleficent (Angelina Jolie)",
                "action": "Rót/Đổ (Pouring)",
                "object": "Cốc",
                "quote": "\"Well, well... what a glittering assemblage!\" - \"Róc rách... xèo xèo...\" – Tiếng chất lỏng ma thuật chảy vào cốc và tiếng khói bốc lên."
        },
        {
                "code": "1",
                "person": "Tào Tháo",
                "action": "bắn ngàn tên vào",
                "object": "thuyền",
                "quote": "\"Thà ta phụ thiên hạ chứ không để thiên hạ phụ ta\" (tiếng mũi tên cắm phập phập)"
        },
        {
                "code": "2",
                "person": "Raiden (Mortal)",
                "action": "Đội chụp xuống",
                "object": "Nón lá việt",
                "quote": "\"Thunder take you!\" (tiếng sấm chớp đùng đoàng)"
        },
        {
                "code": "3",
                "person": "Naruto",
                "action": "Gắp đũa húp xì xụp",
                "object": "mỳ tôm",
                "quote": "Dattebayo! (tiếng húp mỳ sột soạt)"
        },
        {
                "code": "4",
                "person": "Rambo",
                "action": "Liếc mài dao dạo rực",
                "object": "dao",
                "quote": "Mission accomplished (tiếng mài xẹt xẹt)"
        },
        {
                "code": "5",
                "person": "Nàng tiên cá Ariel",
                "action": "Cạy nắp vỏ trai",
                "object": "sò huyết",
                "quote": "I want to be where the people are.-  Tiếng bật mở (Popping): \"Cạch... phụp!\""
        },
        {
                "code": "6",
                "person": "The Collector",
                "action": "ghim cắm",
                "object": "bướm",
                "quote": "If he catches you, he's gonna make you wish you were dead. Tiếng kim đâm (Piercing): \"Phập... sột...\""
        },
        {
                "code": "7",
                "person": "Vịt Donald",
                "action": "Mặc phao bơi lạch bạch",
                "object": "Phao",
                "quote": "Quack quack! (tiếng lạch bạch xì xộp)"
        },
        {
                "code": "8",
                "person": "Võ Tòng",
                "action": "chém đao",
                "object": "Hổ",
                "quote": "\"Rượu ngon!\" (tiếng gầm rú tuyệt vọng gào gào)"
        },
        {
                "code": "9",
                "person": "Po (Kung Fu Panda)",
                "action": "Lấy bụng mỡ hất văng",
                "object": "gấu",
                "quote": "Skadoosh! (tiếng mỡ rung núng nính)"
        }
],

    // Helper functions
    getAllCodes() {
        return [...this.rawData, ...this.specialCodes];
    },

    getByCode(code) {
        return this.getAllCodes().find(item => item.code === code.toString()) || null;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PAOQ_DATA;
}
