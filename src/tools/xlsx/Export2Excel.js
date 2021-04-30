/* eslint-disable */
require('script-loader!file-saver');
require('script-loader!./Blob'); //引用当前目录下的Blob.js模块
require('script-loader!xlsx-style/dist/xlsx.full.min');
//由于这几个文件不支持import引入，所以我们需要`script-loader`来将他们挂载到全局环境�
function generateArray(table) {
    var out = [];
    var rows = table.querySelectorAll('tr');
    var ranges = [];
    for (var R = 0; R < rows.length; ++R) {
        var outRow = [];
        var row = rows[R];
        var columns = row.querySelectorAll('td');
        for (var C = 0; C < columns.length; ++C) {
            var cell = columns[C];
            var colspan = cell.getAttribute('colspan');
            var rowspan = cell.getAttribute('rowspan');
            var cellValue = cell.innerText;
            if (cellValue !== '' && cellValue == +cellValue) cellValue = +cellValue;

            //Skip ranges
            ranges.forEach(function (range) {
                if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
                    for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
                }
            });

            //Handle Row Span
            if (rowspan || colspan) {
                rowspan = rowspan || 1;
                colspan = colspan || 1;
                ranges.push({ s: { r: R, c: outRow.length }, e: { r: R + rowspan - 1, c: outRow.length + colspan - 1 } });
            }
            //Handle Value
            outRow.push(cellValue !== '' ? cellValue : null);

            //Handle Colspan
            if (colspan) for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
        }
        out.push(outRow);
    }
    return [out, ranges];
}

function datenum(v, date1904) {
    if (date1904) v += 1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, widthList) {
    var ws = {};

    ws['!cols'] = [];
    for (var n = 0; n != data[0].length; ++n) {
        ws['!cols'].push({
            wpx: widthList[n] || 60
        });
    }

    var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
    for (var R = 0; R != data.length; ++R) {
        for (var C = 0; C != data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R;
            if (range.s.c > C) range.s.c = C;
            if (range.e.r < R) range.e.r = R;
            if (range.e.c < C) range.e.c = C;
            var cell = {
                v: data[R][C] || '',
                s: {
                    alignment: { horizontal: 'center', vertical: 'center', wrap_text: true }
                }
            };
            // if (cell.v == null) continue;
            var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

            if (typeof cell.v === 'number') cell.t = 'n';
            else if (typeof cell.v === 'boolean') cell.t = 'b';
            else if (cell.v instanceof Date) {
                cell.t = 'n';
                cell.z = XLSX.SSF._table[14];
                cell.v = datenum(cell.v);
            } else cell.t = 's';

            if (!R) {
                // 表头样式设置
                cell.s = {
                    font: { bold: true },
                    fill: { fgColor: { rgb: 'ffff00' } },
                    alignment: { horizontal: 'center', vertical: 'center', wrap_text: true }
                };
            }
            ws[cell_ref] = cell;
        }
    }
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    console.log(ws);
    return ws;
}

function Workbook() {
    if (!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
}

export function export_table_to_excel(id) {
    var theTable = document.getElementById(id);
    var oo = generateArray(theTable);
    var ranges = oo[1];

    /* original data */
    var data = oo[0];
    var ws_name = 'SheetJS';

    var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data);

    /* add ranges to worksheet */
    // ws['!cols'] = ['apple', 'banan'];
    ws['!merges'] = ranges;

    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' });

    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'test.xlsx');
}

export function export_json_to_excel(th, jsonData, defaultTitle, widthList) {
    /* original data */

    var data = jsonData;
    data.unshift(th);
    var ws_name = 'SheetJS';

    var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data, widthList);

    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' });
    var title = defaultTitle || '列表';
    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), title + '.xlsx');
}

// 参数采用json-children的结构实现树形结构的导出
function jsonTree2WS(data) {
    var ws = {};
    ws['!merges'] = [];
    // ws['!cols'] = [];
    // for (var n = 0; n < data[0].length; ++n) {
    //     ws['!cols'].push({
    //         wpx: 100
    //     });
    // }

    var range = { s: { c: 100, r: 100 }, e: { c: 0, r: 0 } };
    let nowRowLen = 0;
    for (let R = 0; R < data.length; ++R) {
        let childLength = data[R].sensorTypeList.length || 0;
        if (range.s.r > R) range.s.r = R;
        // if (range.s.c > C) range.s.c = 0;
        if (range.e.r < R) range.e.r = R;
        // if (range.e.c < C) range.e.c = 0;
        var cell = {
            v: data[R].stationName || 'AAAAA',
            t: 's'
        };
        var cell_ref = XLSX.utils.encode_cell({ c: 0, r: nowRowLen });
        let merge = {
            //合并单元�
            s: {
                //s为开�
                c: 0, //开始列
                r: nowRowLen //开始取值范�
            },
            e: {
                //e结束
                c: 0, //结束�
                r: nowRowLen + childLength //结束范围
            }
        };

        ws['!merges'].push(merge);
        ws[cell_ref] = cell;
        nowRowLen += childLength;
        // for (var C = 0; C != data[R].length; ++C) {

        //     if (range.s.r > R) range.s.r = R;
        //     if (range.s.c > C) range.s.c = C;
        //     if (range.e.r < R) range.e.r = R;
        //     if (range.e.c < C) range.e.c = C;

        //     var cell = {
        //         v: data[R][C] || '',
        //         s: {
        //             alignment: { horizontal: 'center', vertical: 'center', wrap_text: true }
        //         }
        //     };
        //     // if (cell.v == null) continue;
        //     var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

        //     if (typeof cell.v === 'number') cell.t = 'n';
        //     else if (typeof cell.v === 'boolean') cell.t = 'b';
        //     else if (cell.v instanceof Date) {
        //         cell.t = 'n';
        //         cell.z = XLSX.SSF._table[14];
        //         cell.v = datenum(cell.v);
        //     } else cell.t = 's';
        //     ws[cell_ref] = cell;
        // }
    }
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    console.log('ws', ws);
    return ws;
}
export function jsonTreeToExcel(jsonData, defaultTitle) {
    var ws_name = 'SheetJS';

    var wb = new Workbook(),
        ws = jsonTree2WS(jsonData);

    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' });
    var title = defaultTitle || '列表';
    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), title + '.xlsx');
}
