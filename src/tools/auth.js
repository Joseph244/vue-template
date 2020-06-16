/*
 * @Descripttion:
 * @version:
 * @Author: ZZF
 * @Date: 2020-06-09 16:37:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-09 16:37:24
 */
import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    return Cookies.set(TokenKey, token);
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}
