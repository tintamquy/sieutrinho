// Major System Data Module
const MAJOR_SYSTEM_DATA = {
    // Raw data từ CSV
    rawData: [
        { number: '0', character: 'C', image: 'Cua' },
        { number: '1', character: 'T', image: 'Tàu' },
        { number: '2', character: 'N', image: 'Nón' },
        { number: '3', character: 'M', image: 'Mỳ' },
        { number: '4', character: 'R,D,Đ', image: 'Dao' },
        { number: '5', character: 'S', image: 'Sò' },
        { number: '6', character: 'B', image: 'Bàn' },
        { number: '7', character: 'P', image: 'Phao' },
        { number: '8', character: 'H', image: 'Hổ' },
        { number: '9', character: 'G,L', image: 'Lá' }
    ],

    // Helper functions
    getAllNumbers() {
        return this.rawData.map(item => item.number);
    },

    getByNumber(number) {
        return this.rawData.find(item => item.number === String(number)) || null;
    },

    getByCharacter(char) {
        char = char.toUpperCase();
        return this.rawData.find(item => {
            const characters = item.character.split(',').map(c => c.trim());
            return characters.includes(char);
        }) || null;
    },

    getRandomItem() {
        return this.rawData[Math.floor(Math.random() * this.rawData.length)];
    }
};

// Export để sử dụng trong HTML
if (typeof window !== 'undefined') {
    window.MAJOR_SYSTEM_DATA = MAJOR_SYSTEM_DATA;
}
