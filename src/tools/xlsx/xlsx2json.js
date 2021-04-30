import XLSX from 'xlsx';
const xlsx2json = file => {
    return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = e.target.result;
            let wb = XLSX.read(data, {
                type: 'binary'
            });
            const result = [];
            wb.SheetNames.forEach(sheetName => {
                result.push({
                    sheetName: sheetName,
                    sheet: XLSX.utils.sheet_to_json(wb.Sheets[sheetName])
                });
            });
            resolve(result);
        };
        // reader.readAsBinaryString(file.raw)
        reader.readAsBinaryString(file); // 传统input方法
    });
};

export default xlsx2json;
