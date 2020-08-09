import ContentArea from '@/views/layout/ContentArea.vue';

export const appRouter = [
    {
        path: '/',
        title: '首页',
        component: ContentArea,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                meta: {
                    hidden: true, // hidden 配置表示是子页面，不会校验权限，也不会作为左侧菜单显示
                    breadMenu: 'dashboard'
                },
                component: () => import('@/views/dashboard/index'),
                name: 'dashboard',
                icon: 'el-icon-s-home'
            }
        ]
    },
    {
        path: '/networkManage',
        name: 'networkManage',
        title: '网络管理',
        icon: 'el-icon-s-marketing',
        redirect: '/topology',
        component: ContentArea,
        children: [
            {
                path: '/topology',
                name: 'topology',
                title: '网络拓扑',
                component: resolve => {
                    require(['@/views/networkManage/topology/index.vue'], resolve);
                }
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export default appRouter;
