import Vue from 'vue';
import { Message } from 'element-ui';
import VueRouter from 'vue-router';
import { routes } from './router';
import store from '../store/index'; // 导入vuex
import { setCookie, getCookie } from '@/tools/storage'; // 导入vuex

Vue.use(VueRouter);
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
// 无须过滤，每个人都能访问的免费路由
const freeRoutes = ['error-403', 'error-404', 'error-500', 'waitingOpenPage'];

// 路由配置
const RouterConfig = {
    // mode: 'history',  // 'hash'
    routes
};

/**
 * @description: 所访问路由在route.js中没有配置显示敬请期待
 * @param {goRouteName} 即将跳转到的路由name
 * @return: true:存在，false: 不存在
 */
let ifRoutExitFlag = function(goRouteName) {
    let allRoute = routes;
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

// 增加登陆拦截，token校验
const tokenCheck = (to, from, next) => {
    if (process.env.NODE_ENV === 'production') {
        // 判断是否登录
        if (to.query.token) {
            setCookie('TOKEN', to.query.token);
        }
        if (!getCookie('TOKEN')) {
            Message.error('您的登录状态已过期，请重新登录！');
            window.location = 'http://192.168.78.104:3001/login';
        } else {
            next();
        }
    } else {
        next();
    }
};
const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
    // 无路由的页面敬请期待
    // if (ifRoutExitFlag(to.name)) {
    //     // 校验是否具有当前路由权限
    //     if (checkMenuPower(to.name)) {
    //         next();
    //     } else {
    //         next('/403');
    //     }
    // } else {
    //     next('/waitingOpen/waitingOpenPage');
    // }

    // TODO: 暂时不开启token认证
    next();
    // tokenCheck(to, from, next)
});

router.afterEach(to => {
    window.scrollTo(0, 0);
});

export { router };
