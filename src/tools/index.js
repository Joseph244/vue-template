/*
 * @Descripttion:
 * @version:
 * @Author: ZZF
 * @Date: 2020-06-08 15:31:51
 * @LastEditors: ZZF
 * @LastEditTime: 2020-06-12 09:39:44
 */
/**
 * @description: 日期时间格式化
 * @param {dateTime} 时间戳等可转化为Date类型的值
 * @param {fmt} 结果格式
 * @return:
 */
const dateFormat = (dateTime, fmt = 'yyyy-MM-dd hh:mm:ss') => {
    let date = new Date(dateTime);
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
};

/**
 * @description: url参数解析
 * @param {url}
 * @return:
 */
const getQueryObject = url => {
    url = url == null ? window.location.href : url;
    const search = url.substring(url.lastIndexOf('?') + 1);
    const obj = {};
    const reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1);
        let val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
};

// 过滤对象属性得到非空key的值
const filterNotNullObj = sourceObj => {
    let targetObj = {};
    let notNull = false; // 非空标志位
    if (Object.prototype.toString.call(sourceObj) === '[object Object]') {
        for (let key of Object.keys(sourceObj)) {
            if (sourceObj[key]) {
                targetObj[key] = sourceObj[key];
                notNull = true;
            }
        }
    }

    return notNull && targetObj;
};

export default {
    dateFormat,
    filterNotNullObj,
    getQueryObject
};
