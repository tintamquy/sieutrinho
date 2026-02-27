// Alphabet System Data Module
const ALPHABET_SYSTEM_DATA = {
    // Raw data từ CSV
    rawData: [
        { number: '1', character: 'A', image: 'Áo', story: 'Chữ A có dáng xòe ra giống cái Áo.' },
        { number: '2', character: 'B', image: 'Bò', story: 'Chữ B có hai bụng tròn giống bụng con Bò béo tốt.' },
        { number: '3', character: 'C', image: 'Cờ', story: 'Chữ C cong cong hình lá Cờ bay trong gió.' },
        { number: '4', character: 'D', image: 'Diều', story: 'Chữ D căng phồng giống cánh Diều gặp gió.' },
        { number: '5', character: 'E', image: 'Em bé', story: 'Chữ E giống Em bé đang nằm trong nôi.' },
        { number: '6', character: 'F', image: 'ếch', story: 'Chữ F giống con ếch đang ngồi chồm hỗm.' },
        { number: '7', character: 'G', image: 'Ghi-ta', story: 'Chữ G tròn giống thùng đàn Ghi-ta.' },
        { number: '8', character: 'H', image: 'Trực thăng', story: 'Chữ H có hình dáng giống như một chiếc Trực thăng (Helicopter).' },
        { number: '9', character: 'I', image: 'Kem', story: 'Chữ I thẳng đứng giống que Kem.' },
        { number: '10', character: 'J', image: 'Chuối', story: 'Chữ J cong cong giống quả Chuối.' },
        { number: '11', character: 'K', image: 'Tắc Kè', story: 'Chữ K giống con Tắc Kè đang bám tường.' },
        { number: '12', character: 'L', image: 'Loa', story: 'Chữ L giống cái Loa phát thanh.' },
        { number: '13', character: 'M', image: 'Muỗi', story: 'Chữ M giống cánh con Muỗi đang bay.' },
        { number: '14', character: 'N', image: 'Nơ', story: 'Chữ N gấp khúc giống cái Nơ xinh xắn.' },
        { number: '15', character: 'O', image: 'Ong', story: 'Chữ O tròn vo như tổ Ong.' },
        { number: '16', character: 'P', image: 'Pho-mát', story: 'Chữ P giống miếng Pho-mát trên que tăm.' },
        { number: '17', character: 'Q', image: 'Quà tặng', story: 'Chữ Q giống hộp Quà tặng có dây ruy băng.' },
        { number: '18', character: 'R', image: 'Rùa', story: 'Chữ R giống con Rùa đang vươn cổ.' },
        { number: '19', character: 'S', image: 'Sách', story: 'Chữ S uốn lượn giống gáy quyển Sách mở.' },
        { number: '20', character: 'T', image: 'Tủ', story: 'Chữ T vuông vức giống cái Tủ đứng.' },
        { number: '21', character: 'U', image: 'Ủng', story: 'Chữ U hõm xuống giống đôi Ủng.' },
        { number: '22', character: 'V', image: 'Voi', story: 'Chữ V giống hai cái ngà Voi.' },
        { number: '23', character: 'W', image: 'Dưa hấu', story: 'Chữ W zíc zắc giống vân quả Dưa hấu.' },
        { number: '24', character: 'X', image: 'Xe ô-tô', story: 'Chữ X giống cái vô lăng Xe ô-tô.' },
        { number: '25', character: 'Y', image: 'Yếm', story: 'Chữ Y giống dây cái Yếm.' },
        { number: '26', character: 'Z', character: 'Z', image: 'Ngựa vằn', story: 'Chữ Z vằn vện giống Ngựa vằn.' }
    ],

    // Helper functions
    getAllCharacters() {
        return this.rawData.map(item => item.character);
    },

    getByNumber(number) {
        return this.rawData.find(item => item.number === String(number)) || null;
    },

    getByCharacter(char) {
        char = char.toUpperCase();
        return this.rawData.find(item => item.character === char) || null;
    },

    getRandomItem() {
        return this.rawData[Math.floor(Math.random() * this.rawData.length)];
    }
};

// Export để sử dụng trong HTML
if (typeof window !== 'undefined') {
    window.ALPHABET_SYSTEM_DATA = ALPHABET_SYSTEM_DATA;
}
