/*
 * @Descripttion:
 * @version:
 * @Author: ZZF
 * @Date: 2020-06-08 15:31:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-09 15:47:29
 */

import Vue from 'vue';

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import './styles/blueWhite/index.css';
import './styles/iot/index.css'; // element 主题

// 主题颜色变量字典表
import '@/styles/index.less';

import App from './App.vue';
import { router } from './router/index';
import store from './store/index.js';

import 'font-awesome/css/font-awesome.min.css';
import echarts from 'echarts';

import Bus from '@/tools/bus.js';
import websocket from '../src/tools/websocket.js';
import preventReClick from './plugins/directives/index'; //防多次点击，重复提交
import tools from './tools/index';

import { ComponentsLoader } from './views/components/loader';
Vue.use(ComponentsLoader);

Vue.use(ElementUI, { size: 'small', zIndex: 100000 });

Vue.prototype.$tools = tools;
Vue.prototype.$websocket = websocket;
Vue.prototype.$Bus = Bus;
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

new Vue({
    render: h => h(App),
    store,
    router: router
}).$mount('#app');
