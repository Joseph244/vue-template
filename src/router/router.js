import Main from '@/views/main.vue';

const menuRoutes = [
    {
        path: '/sensorConfigMenu',
        name: 'sensorConfigMenu',
        title: '传感器配置',
        icon: 'el-icon-edit-outline',
        redirect: '/sensorConfig',
        component: Main,
        children: [
            {
                path: '/sensorConfig',
                name: 'sensorConfig',
                title: '传感器配置',
                component: resolve => {
                    require(['@/views/sensorConfig/index.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/equListMenu',
        name: 'equListMenu',
        title: '列表与导入',
        icon: 'el-icon-date',
        redirect: '/equList',
        component: Main,
        children: [
            {
                path: '/equList',
                name: 'equList',
                title: '列表与导入',
                component: resolve => {
                    require(['@/views/equList/index.vue'], resolve);
                }
            }
        ]
    },
    // {
    //     path: '/exportExcel',
    //     name: 'exportExcel',
    //     title: '导出excel',
    //     icon: 'el-icon-search',
    //     redirect: '/test',
    //     component: Main,
    //     children: [
    //         {
    //             path: '/exportExcel',
    //             name: 'exportExcel',
    //             title: '导出excel',
    //             component: resolve => {
    //                 require(['@/views/exportExcel/index.vue'], resolve);
    //             }
    //         },
    // {
    //     path: '/vueDraggable',
    //     name: 'vueDraggable',
    //     title: '拖拽组件',
    //     component: resolve => {
    //         require(['@/views/demo/vueDraggable/index.vue'], resolve);
    //     }
    // },
    //     ]
    // },
    {
        path: '/',
        name: 'demos',
        title: 'DEMOS',
        icon: 'el-icon-collection',
        redirect: '/tableHeightMixin',
        component: Main,
        children: [
            {
                path: '/tableHeightMixin',
                name: 'tableHeightMixin',
                title: '表格自适应',
                component: resolve => {
                    require(['@/views/demos/tableHeightMixin.vue'], resolve);
                }
            },
            {
                path: '/echartsResize',
                name: 'echartsResize',
                title: 'echarts自适应',
                component: resolve => {
                    require(['@/views/demos/echartsResize.vue'], resolve);
                }
            },
            {
                path: '/echartsMap',
                name: 'echartsMap',
                title: 'echartsMap',
                component: resolve => {
                    require(['@/views/demos/echartsMap.vue'], resolve);
                }
            },
            {
                path: '/spriteComp',
                name: 'spriteComp',
                title: '雪碧图',
                component: resolve => {
                    require(['@/views/demos/spriteComp.vue'], resolve);
                }
            },
            {
                path: '/test',
                name: 'test',
                title: '测试页面',
                component: resolve => {
                    require(['@/views/demo/test/index.vue'], resolve);
                }
            }
        ]
    }
];

const loginPage = {
    path: '/login',
    name: '登录',
    component: resolve => {
        require(['@/views/demos/login/login.vue'], resolve);
    }
};
// 所有上面定义的路由都要写在下面的routers里
export const routes = [...menuRoutes, loginPage];
export default menuRoutes;
