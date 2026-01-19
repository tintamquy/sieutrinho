
// Render PAO Excel table
function renderPAOExcelTable() {
    const table = document.getElementById('pao-excel-table');
    if (!table) return;

    // Get all PAO codes
    const numericCodes = [];
    for (let i = 0; i <= 99; i++) {
        numericCodes.push(String(i).padStart(2, '0'));
    }
    const specialCodes = ['JC', 'JR', 'JT', 'JB', 'QC', 'QR', 'QT', 'QB', 'KC', 'KR', 'KT', 'KB'];
    const allCodes = [...numericCodes, ...specialCodes];

    // Create table HTML
    let html = `
        <thead>
            <tr>
                <th>Mã</th>
                <th>👤 Person</th>
                <th>⚡ Action</th>
                <th>🎯 Object</th>
                <th>📖 Story</th>
            </tr>
        </thead>
        <tbody>
    `;

    allCodes.forEach(code => {
        const pao = getPAO(code);
        if (pao) {
            html += `
                <tr>
                    <td class="code-cell">${code}</td>
                    <td>${pao.person}</td>
                    <td>${pao.action}</td>
                    <td>${pao.object}</td>
                    <td style="text-align: left; max-width: 400px; white-space: normal; line-height: 1.4;">${pao.story || ''}</td>
                </tr>
            `;
        }
    });

    html += `
        </tbody>
    `;

    table.innerHTML = html;
}
