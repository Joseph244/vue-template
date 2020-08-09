import Cookies from 'js-cookie';
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
