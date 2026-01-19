// Major System Data Module
const MAJOR_SYSTEM_DATA = {
    // Raw data từ CSV
    rawData: [
        { number: '0', character: 'C', image: 'Cua', story: 'Số 0 tròn vo giống cái mai con Cua.' },
        { number: '1', character: 'T', image: 'Thuyền', story: 'Số 1 thẳng đứng như cột buồm của con Thuyền.' },
        { number: '2', character: 'N', image: 'Nón', story: 'Số 2 cong cong giống hình dáng chiếc Nón lá.' },
        { number: '3', character: 'M', image: 'Mỳ tôm', story: 'Số 3 xoăn tít như sợi Mỳ tôm.' },
        { number: '4', character: 'R,D,Đ', image: 'Dao', story: 'Số 4 sắc nhọn như lưỡi Dao.' },
        { number: '5', character: 'S', image: 'Sò', story: 'Số 5 uốn lượn giống vỏ con Sò.' },
        { number: '6', character: 'B', image: 'Bướm', story: 'Số 6 cuộn tròn như vòi con Bướm đang hút mật.' },
        { number: '7', character: 'P', image: 'Phao', story: 'Số 7 giống cái móc treo cái Phao bơi.' },
        { number: '8', character: 'H', image: 'Hổ', story: 'Số 8 giống hai mắt to tròn dữ tợn của con Hổ.' },
        { number: '9', character: 'G,L', image: 'Lá Bồ Đề', story: 'Số 9 có đuôi giống hình chiếc Lá Bồ Đề.' }
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
