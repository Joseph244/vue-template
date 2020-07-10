/*
 * @Descripttion:
 * @version:
 * @Author: ZZF
 * @Date: 2020-06-08 16:17:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-09 14:26:42
 */

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
                hidden: true,
                component: () => import('@/views/dashboard/index'),
                name: 'dashboard',
                icon: 'el-icon-s-home'
            }
        ]
    },
    {
        path: '/taskManage',
        name: 'taskManage',
        title: '诊断任务管理',
        icon: 'el-icon-s-marketing',
        redirect: '/equDiagnose',
        component: ContentArea,
        children: [
            {
                path: '/noEquDiagnose',
                name: 'noEquDiagnose',
                title: '无设备诊断',
                component: resolve => {
                    require(['@/views/taskManage/noEquDiagnose.vue'], resolve);
                }
            },
            {
                path: '/newEquDiagnose',
                name: 'newEquDiagnose',
                title: '新建设备诊断',
                // hidden: true,
                component: resolve => {
                    require(['@/views/taskManage/newEquDiagnose.vue'], resolve);
                }
            },
            {
                path: '/equDiagnose',
                name: 'equDiagnose',
                title: '设备诊断',
                component: resolve => {
                    require(['@/views/taskManage/equDiagnose.vue'], resolve);
                }
            },
            {
                path: '/noEquDiagnoseDetail/:taskId',
                name: 'noEquDiagnoseDetail',
                title: '无设备诊断详情',
                // hidden: true,
                component: resolve => {
                    require(['@/views/taskManage/noEquDiagnoseDetail.vue'], resolve);
                }
            },
            {
                path: '/equDiagnoseDetail/:taskId',
                name: 'equDiagnoseDetail',
                title: '设备诊断详情',
                // hidden: true,
                component: resolve => {
                    require(['@/views/taskManage/equDiagnoseDetail.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/standingBook',
        name: 'standingBook',
        title: '诊断台账管理',
        icon: 'el-icon-s-order',
        redirect: '/defectStandingBook',
        component: ContentArea,
        children: [
            {
                path: '/defectStandingBook',
                name: 'defectStandingBook',
                title: '缺陷台账',
                component: resolve => {
                    require(['@/views/standingBook/defectStandingBook.vue'], resolve);
                }
            },
            {
                path: '/equStandingBook',
                name: 'equStandingBook',
                title: '设备台账',
                component: resolve => {
                    require(['@/views/standingBook/equStandingBook.vue'], resolve);
                }
            },
            {
                path: '/defectDetail',
                name: 'defectDetail',
                title: '缺陷详情',
                // hidden: true,
                component: resolve => {
                    require(['@/views/standingBook/defectDetail.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/systemSetting',
        name: 'systemSetting',
        title: '系统管理',
        icon: 'el-icon-s-tools',
        redirect: '/equUnit',
        component: ContentArea,
        children: [
            {
                path: '/equUnit',
                name: 'equUnit',
                title: '设备部件设置',
                component: resolve => {
                    require(['@/views/systemSetting/equUnit.vue'], resolve);
                }
            },
            {
                path: '/defectType',
                name: 'defectType',
                title: '缺陷类型设置',
                component: resolve => {
                    require(['@/views/systemSetting/defectType.vue'], resolve);
                }
            },
            {
                path: '/alertGrade',
                name: 'alertGrade',
                title: '严重等级设置',
                component: resolve => {
                    require(['@/views/systemSetting/alertGrade.vue'], resolve);
                }
            },
            {
                path: '/algorithm',
                name: 'algorithm',
                title: '算法接入',
                component: resolve => {
                    require(['@/views/systemSetting/algorithm.vue'], resolve);
                }
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export default appRouter;
