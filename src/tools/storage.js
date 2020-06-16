export function getSessionItem(key) {
    const _a = window.sessionStorage.getItem(key);
    const _b = JSON.parse(_a);
    return _b || null;
}
