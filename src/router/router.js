import Main from '@/views/Main';

export const appRouter = [
    {
        path: '/',
        title: '首页',
        component: Main,
        redirect: 'test',
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                icon: 'el-icon-s-home',
                meta: {
                    hidden: true, // hidden 配置表示是子页面，不会校验权限，也不会作为左侧菜单显示
                    breadMenu: 'dashboard' // 面包屑显示的菜单名
                },
                component: () => import('@/views/dashboard/index')
            },
            {
                path: '/test',
                name: 'test',
                title: '测试页面',
                component: resolve => {
                    require(['@/views/demo/test/index.vue'], resolve);
                }
            },
            {
                path: '/docx',
                name: 'docx',
                title: '测试页面',
                component: resolve => {
                    require(['@/views/demo/test/docx.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/demo',
        name: 'demo',
        title: '页面案例',
        icon: 'el-icon-s-marketing',
        component: Main,
        children: [
            {
                path: '/css3Animation',
                name: 'css3Animation',
                title: 'css3固定动画',
                component: resolve => {
                    require(['@/views/demo/css3Animation/index.vue'], resolve);
                }
            },
            {
                path: '/vueDraggable',
                name: 'vueDraggable',
                title: '拖拽组件',
                component: resolve => {
                    require(['@/views/demo/vueDraggable/index.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/networkManage',
        name: 'networkManage',
        title: '网络管理',
        icon: 'el-icon-s-marketing',
        redirect: '/topology',
        component: Main,
        children: [
            {
                path: '/topology',
                name: 'topology',
                title: '网络拓扑',
                component: resolve => {
                    require(['@/views/demo/topology/index.vue'], resolve);
                }
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export default appRouter;
