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

// 使用
// el-upload accept=".xlsx" action :multiple="false" :auto-upload="true" :before-upload="beforeUpload"

// async beforeUpload(file) {
//     this.equList = [];
//     let fileFormat = file.name.split('.');
//     let fileType = fileFormat[fileFormat.length - 1];
//     if (fileType !== 'xlsx') {
//         this.$notify({
//             title: '文件错误',
//             message: '文件类型错误,必须为.xlsx文件!',
//             type: 'error'
//         });
//     } else {
//         const tabJson = await xlsx2json(file);
//         if (tabJson && tabJson.length > 0) {
//             let xlsxData = tabJson[0].sheet;
//             if (xlsxData.length === 0) {
//                 this.$notify({
//                     title: '导入信息为空',
//                     message: '请填写导入设备内容',
//                     type: 'error'
//                 });
//                 return false;
//             }
//             let sensorData = [];

//             for (let i of xlsxData) {
//                 let item = {};
//                 for (let k in window.WENV.BATCH_ADD_SENSOR) {
//                     // 从全局配置文件获取导入模板的解析配置
//                     item[k] = i[window.WENV.BATCH_ADD_SENSOR[k]];
//                 }
//                 sensorData.push(item);
//             }
//             this.analysRes = await sensorApi.batchAddSensor({ sensorData });
//             if (this.analysRes.errorSensorList.length > 0) {
//                 this.errorModalShow = true;
//             }
//         }
//     }
//     return false; // 禁止调用element自动上传接口
// }
