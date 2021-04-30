import ContentArea from '@/views/layout/ContentArea.vue';

export const appRouter = [
    {
        path: '/sensorMenu',
        name: 'sensorMenu',
        title: '传感器接入',
        icon: 'el-icon-connection',
        redirect: '/sensor',
        component: ContentArea,
        children: [
            {
                path: '/sensor',
                name: 'sensor',
                title: '传感器接入',
                component: resolve => {
                    require(['@/views/sensor/index.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/sensorConfigMenu',
        name: 'sensorConfigMenu',
        title: '传感器配置',
        icon: 'el-icon-edit-outline',
        redirect: '/sensorConfig',
        component: ContentArea,
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
        component: ContentArea,
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
    {
        path: '/exportExcel',
        name: 'exportExcel',
        title: '导出excel',
        icon: 'el-icon-search',
        redirect: '/test',
        component: ContentArea,
        children: [
            {
                path: '/exportExcel',
                name: 'exportExcel',
                title: '导出excel',
                component: resolve => {
                    require(['@/views/exportExcel/index.vue'], resolve);
                }
            }
            // {
            //     path: '/vueDraggable',
            //     name: 'vueDraggable',
            //     title: '拖拽组件',
            //     component: resolve => {
            //         require(['@/views/demo/vueDraggable/index.vue'], resolve);
            //     }
            // },
        ]
    },
    {
        path: '/',
        name: 'demos',
        title: 'DEMOS',
        icon: 'el-icon-collection',
        redirect: '/tableHeightMixin',
        component: ContentArea,
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

// 所有上面定义的路由都要写在下面的routers里
export default appRouter;
