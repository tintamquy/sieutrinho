// Alphabet System Data Module
const ALPHABET_SYSTEM_DATA = {
    // Raw data từ CSV
    rawData: [
        { number: '1', character: 'A', image: 'Áo' },
        { number: '2', character: 'B', image: 'Bò' },
        { number: '3', character: 'C', image: 'Cờ' },
        { number: '4', character: 'D', image: 'Diều' },
        { number: '5', character: 'E', image: 'Em bé' },
        { number: '6', character: 'F', image: 'Cá' },
        { number: '7', character: 'G', image: 'Gà' },
        { number: '8', character: 'H', image: 'Hoa' },
        { number: '9', character: 'I', image: 'Kem' },
        { number: '10', character: 'J', image: 'Chuối' },
        { number: '11', character: 'K', image: 'Tắc Kè' },
        { number: '12', character: 'L', image: 'Loa' },
        { number: '13', character: 'M', image: 'Muỗi' },
        { number: '14', character: 'N', image: 'Nơ' },
        { number: '15', character: 'O', image: 'Ong' },
        { number: '16', character: 'P', image: 'Phô mai' },
        { number: '17', character: 'Q', image: 'Quà' },
        { number: '18', character: 'R', image: 'Rau' },
        { number: '19', character: 'S', image: 'Sách' },
        { number: '20', character: 'T', image: 'Tủ' },
        { number: '21', character: 'U', image: 'Ủng' },
        { number: '22', character: 'V', image: 'Tất Vớ' },
        { number: '23', character: 'W', image: 'Dưa hấu' },
        { number: '24', character: 'X', image: 'Xe' },
        { number: '25', character: 'Y', image: 'Yếm' },
        { number: '26', character: 'Z', image: 'ngựa vằn' }
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
