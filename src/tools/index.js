/**
 * @description: 日期时间格式化
 * @param {dateTime} 时间戳等可转化为Date类型的值
 * @param {fmt} 结果格式
 * @return:
 */

//首先要对HTMLElement进行类型检查，因为即使在支持HTMLElement
//的浏览器中，类型却是有差别的，在Chrome,Opera中HTMLElement的
//类型为function，此时就不能用它来判断了
const isDOM =
    typeof HTMLElement === 'object'
        ? function(obj) {
              return obj instanceof HTMLElement;
          }
        : function(obj) {
              return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
          };
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

// 过滤对象属性得到非空key的值
const fullScreen = elem => {
    if (!elem) {
        elem = document.querySelector('body');
    } else if (!isDOM(elem)) {
        throw new Error('参数异常，不是DOM元素');
    }
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
};

export default {
    dateFormat,
    filterNotNullObj,
    getQueryObject,
    fullScreen
};
