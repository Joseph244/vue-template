function export2Excel(heardArray, keyArray, dataArray, xlsxName = '列表excel', widthList = []) {
    require.ensure([], () => {
        // const heardArray = ['组名', '创建时间']; // 自定义列名
        // const keyArray = ['a', 'b']; // 对应字段
        // const dataArray = [{ a: 'hhh', b: 'xxx' }, { a: 'ccc', b: 'ddd' }, { a: 'zzz', b: 'fff' }];
        // eslint-disable-next-line camelcase
        const { export_json_to_excel } = require('./Export2Excel');
        const data = formatJson(keyArray, dataArray);
        export_json_to_excel(heardArray, data, xlsxName, widthList); // 导出文件名称
    });
}

function formatJson(keyArray, jsonData) {
    return jsonData.map(v => keyArray.map(j => v[j]));
}

function jsonTree2Excel(jsonTree) {
    const { jsonTreeToExcel } = require('./Export2Excel');
    jsonTreeToExcel(jsonTree);
}

export default export2Excel;
