/*
 * @Descripttion:
 * @version:
 * @Author: ZZF
 * @Date: 2020-06-08 15:31:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-09 09:38:41
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import routers from './router';
import store from '../store/index'; // 导入vuex

Vue.use(VueRouter);
// 无须过滤，每个人都能访问的免费路由
const freeRoutes = ['error-403', 'error-404', 'error-500', 'waitingOpenPage'];

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

/**
 * @description: 所访问路由在route.js中没有配置显示敬请期待
 * @param {goRouteName} 即将跳转到的路由name
 * @return: true:存在，false: 不存在
 */
let ifRoutExitFlag = function(goRouteName) {
    let allRoute = routers;
    let exitFlag = false;

    function searchChildren(routeName, allRoute = []) {
        for (let i of allRoute) {
            if (i.name === routeName) {
                exitFlag = true;
                return;
            } else {
                if (i.children && i.children.length > 0) {
                    searchChildren(routeName, i.children);
                }
            }
        }
    }
    searchChildren(goRouteName, allRoute);
    return exitFlag;
};

/**
 * @description:  检查用户是否具有将要访问路由的权限
 * @param {goRouteName} 即将跳转到的路由name
 * @return: true: 有权限，false：无权限
 */
const checkMenuPower = goRouteName => {
    let menusRoutes = store.state.user.menuArr; // 用户具有权限的路由多级数组
    let passRoutes = [...freeRoutes];
    // 数组拉平
    for (let i of menusRoutes) {
        i.name && passRoutes.push(i.name);
        if (i.children) {
            for (let j of i.children) {
                j.name && passRoutes.push(j.name);
            }
        }
    }
    // 无菜单权限，则返回无权限
    if (passRoutes.includes(goRouteName)) {
        return true;
    } else {
        return false;
    }
};

export const router = new VueRouter(RouterConfig);

// router.beforeEach((to, from, next) => {
//     // 无路由的页面敬请期待
//     if (ifRoutExitFlag(to.name)) {
//         // 校验是否具有当前路由权限
//         if (checkMenuPower(to.name)) {
//             next();
//         } else {
//             next('/403');
//         }
//     } else {
//         next('/waitingOpen/waitingOpenPage');
//     }
// });

// router.afterEach(to => {
//     window.scrollTo(0, 0);
// });
