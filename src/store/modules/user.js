import { getCookie } from '@/tools/storage';
import menuRoutes from '@/router/router.js';

/**
 * @description: 如果hidden = true,则不显示菜单
 * @param {type}
 * @return:
 */
export function filterAsyncRoutes(routes) {
    const res = [];

    routes.forEach(route => {
        const tmp = { ...route };
        if (!(tmp.meta && tmp.meta.hidden)) {
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
        routes: [],
        token: getCookie('TOKEN')
    },
    mutations: {
        SET_ROUTES: (state, routes = menuRoutes) => {
            const _arr = filterAsyncRoutes(routes);
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
