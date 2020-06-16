/*
 * @Descripttion:
 * @version:
 * @Author: ZZF
 * @Date: 2020-06-09 11:30:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-09 11:51:25
 */
import routers from '@/router/router.js';

/**
 * @description: 如果hidden = true,则不显示菜单
 * @param {type}
 * @return:
 */
export function filterAsyncRoutes(routes) {
    const res = [];

    routes.forEach(route => {
        const tmp = { ...route };
        if (!tmp.hidden) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children);
            }
            res.push(tmp);
        }
    });

    return res;
}
const userStore = {
    state: {
        routes: []
    },
    mutations: {
        SET_ROUTES: (state, routes = routers) => {
            const _arr = filterAsyncRoutes(routes);
            console.log('routes', _arr);
            state.routes = _arr;
        }
    },
    actions: {
        // generateRoutes({ commit }, accessedRoutes = routes) {
        //     return new Promise(resolve => {
        //         commit('SET_ROUTES', accessedRoutes);
        //         resolve(accessedRoutes);
        //     });
        // }
    }
};
export default userStore;
