import Vue from 'vue';
import ElementUI from 'element-ui';
// 主题样式配置(~THEME为webpack全局配置的alias变量)
import '~THEME';
import '@/styles/common.css'; // 全局公共样式

import App from './App.vue';
import { router } from './router/index';
import store from './store/index.js';
// svg 图标
import '@/assets/svg';
// import 'font-awesome/css/font-awesome.min.css';
import echarts from 'echarts';
import 'echarts-gl';
import './styles/echartsTheme/index.js'; // echarts 主题

import Bus from '@/tools/bus.js'; // 全局bus消息总线
import Global from './global.js'; // 应用内定制全局变量，组件内无需定义可直接this方式访问
import websocket from '../src/tools/websocket.js'; // websocket
import directives from './plugins/directives/index'; // 全局指令注册
import tools from './tools/index';
import { ComponentsLoader } from '@/components/loader'; // 全局组件注册
// 自定义render组件
import confirm from '@/components/confirm';

Vue.prototype.$tools = tools;
Vue.prototype.$websocket = websocket;
Vue.prototype.$Bus = Bus;
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
// Vue.prototype.$myConfirm = confirm;

Vue.use(Global);
Vue.use(ComponentsLoader);
Vue.use(ElementUI, { size: 'small', zIndex: 100000 });
Vue.use(directives);

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app');
