const fs = require('fs');

const csvContent = fs.readFileSync('PAOQ-2.0.csv', 'utf8');
const lines = csvContent.split(/\r?\n/).filter(line => line.trim() !== '');

const rawData = [];
const specialCodes = [];

// Skip header (index 0)
// The structure is Mã,P (Person),A (Action),O (Object),Q (Quote/Sound)
// We need to handle quotes in CSV properly if they exist...
// Since there might be commas inside quotes, let's use a simple CSV parser.
function parseCSVLine(text) {
    let ret = [];
    let state = 0; // 0: unquoted, 1: quoted
    let value = "";
    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        if (state === 0) {
            if (c === ',') {
                ret.push(value);
                value = "";
            } else if (c === '"') {
                state = 1;
            } else {
                value += c;
            }
        } else if (state === 1) {
            if (c === '"') {
                if (i + 1 < text.length && text[i + 1] === '"') {
                    value += '"'; // escaped quote
                    i++;
                } else {
                    state = 0;
                }
            } else {
                value += c;
            }
        }
    }
    ret.push(value);
    return ret;
}

for (let i = 1; i < lines.length; i++) {
    const parts = parseCSVLine(lines[i]);
    if (parts.length < 5) continue;
    let code = parts[0].trim();
    const person = parts[1].trim();
    const action = parts[2].trim();
    const object = parts[3].trim();
    const quote = parts[4].trim();

    const entry = { code, person, action, object, quote };

    // Format code for 0-99 to be "00", "01", ..., "99" based on index
    // Wait, let's just make it simple. If it's a number and its length is 1, and it's within the first 100 items...
    // Let's check the code:
    // If it's a plain number, let's see. If i <= 100, then it's numeric 0-99, so pad start with 0 if length is 1.
    if (i <= 100) {
        if (/^\d+$/.test(code) && code.length === 1) {
            code = "0" + code;
        }
        entry.code = code;
        rawData.push(entry);
    } else {
        // Special codes
        // Some of them are 0-9 again at the end of the file.
        specialCodes.push(entry);
    }
}

const fileContent = `// PAOQ Data Module - Parse và quản lý dữ liệu PAOQ System
const PAOQ_DATA = {
    // Raw data từ CSV
    rawData: ${JSON.stringify(rawData, null, 8)},

    // Special codes
    specialCodes: ${JSON.stringify(specialCodes, null, 8)},

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
`;

fs.writeFileSync('paoq-data.js', fileContent, 'utf8');
console.log('Successfully created paoq-data.js');
