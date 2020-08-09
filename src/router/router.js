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
            },
            {
                path: '/networkConfig',
                name: 'networkConfig',
                title: '网络配置',
                component: resolve => {
                    require(['@/views/networkManage/networkConfig/index.vue'], resolve);
                }
            },
            {
                path: '/networkConfig/jrNodeMCB',
                name: 'jrNodeMCB',
                title: '-接入节点主控配置',
                meta: {
                    // hidden: true,   // hidden 配置表示是子页面，不会校验权限，也不会作为左侧菜单显示
                    // breadMenu: 'networkConfig'
                },
                component: resolve => {
                    require(['@/views/networkManage/networkConfig/jrNodeMCB.vue'], resolve);
                }
            },
            {
                path: '/networkConfig/jrNodeDevice',
                name: 'jrNodeDevice',
                title: '-接入节点边缘配置',
                meta: {
                    // hidden: true,
                    // breadMenu: 'networkConfig'
                },
                component: resolve => {
                    require(['@/views/networkManage/networkConfig/jrNodeDevice.vue'], resolve);
                }
            },
            {
                path: '/networkConfig/hjNodeConfig',
                name: 'hjNodeConfig',
                title: '-汇聚节点配置',
                meta: {
                    // hidden: true,
                    // breadMenu: 'networkConfig'
                },
                component: resolve => {
                    require(['@/views/networkManage/networkConfig/hjNodeConfig.vue'], resolve);
                }
            },
            {
                path: '/networkConfig/sensorsConfig',
                name: 'sensorsConfig',
                title: '-传感器批量配置',
                meta: {
                    // hidden: true,
                    // breadMenu: 'networkConfig'
                },
                component: resolve => {
                    require(['@/views/networkManage/networkConfig/sensorsConfig.vue'], resolve);
                }
            },
            {
                path: '/activeFinding',
                name: 'activeFinding',
                title: '主动发现',
                component: resolve => {
                    require(['@/views/networkManage/activeFinding/index.vue'], resolve);
                }
            },
            {
                path: '/activeFinding/jrNodeFinding',
                name: 'jrNodeFinding',
                title: '-接入节点发现',
                meta: {
                    // hidden: true,
                    // breadMenu: 'activeFinding'
                },
                component: resolve => {
                    require(['@/views/networkManage/activeFinding/jrNodeFinding.vue'], resolve);
                }
            },
            {
                path: '/activeFinding/hjNodeFinding',
                name: 'hjNodeFinding',
                title: '-汇聚节点发现',
                meta: {
                    // hidden: true,
                    // breadMenu: 'activeFinding'
                },
                component: resolve => {
                    require(['@/views/networkManage/activeFinding/hjNodeFinding.vue'], resolve);
                }
            },
            {
                path: '/activeFinding/sensorsFinding',
                name: 'sensorsFinding',
                title: '-传感器发现',
                meta: {
                    // hidden: true,
                    // breadMenu: 'activeFinding'
                },
                component: resolve => {
                    require(['@/views/networkManage/activeFinding/sensorsFinding.vue'], resolve);
                }
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export default appRouter;
