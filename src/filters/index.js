/*
 * @Descripttion:
 * @version:
 * @Author: ZZF
 * @Date: 2020-06-09 16:00:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-09 16:18:58
 */
/**
 * 首字母大写
 * @example <div>{{ "abcd" | uppercaseFirst }}</div>  --->  Abcd
 * @param {String} string
 */
export function uppercaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * 数字量转换
 * @example 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
    const si = [
        { value: 1e18, symbol: 'E' },
        { value: 1e15, symbol: 'P' },
        { value: 1e12, symbol: 'T' },
        { value: 1e9, symbol: 'G' },
        { value: 1e6, symbol: 'M' },
        { value: 1e3, symbol: 'k' }
    ];
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol;
        }
    }
    return num.toString();
}
