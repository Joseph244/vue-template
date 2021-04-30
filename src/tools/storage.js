import Cookies from 'js-cookie';
// 取sessionStorage
export function getSessionItem(key) {
    const _a = window.sessionStorage.getItem(key);
    const _b = JSON.parse(_a);
    return _b || null;
}

export function getCookie(key) {
    const _a = Cookies.get(key);
    return _a || null;
}

export function setCookie(key, val) {
    const _a = Cookies.set(key, val);
    return _a || null;
}

// 存储到localStorage
export function setLocalStorageItem(key, info) {
    window.localStorage.setItem(key, JSON.stringify(info));
}

// 取localStorage
export function getLocalStorageItem(key) {
    const _a = window.localStorage.getItem(key);
    const _b = JSON.parse(_a);
    return _b || null;
}
