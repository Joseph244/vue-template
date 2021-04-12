import Vue from 'vue';
// import * as Sentry from '@sentry/browser';
// import { Vue as VueIntegration } from '@sentry/integrations';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import './styles/light/index.css';
import './styles/dark/index.css'; // element 主题

// 主题颜色变量字典表
import '@/styles/index.less';

import App from './App.vue';
import { router } from './router/index';
import store from './store/index.js';

import 'font-awesome/css/font-awesome.min.css';
import echarts from 'echarts';

import Bus from '@/tools/bus.js'; // 全局bus消息总线
import Global from './global.js'; // 应用内定制全局变量，组件内无需定义可直接this方式访问
import websocket from '../src/tools/websocket.js'; // websocket
import directives from './plugins/directives/index'; // 全局指令注册
import tools from './tools/index';
import { ComponentsLoader } from './views/components/loader';
// 自定义render组件
import confirm from './views/components/confirm';

Vue.prototype.$tools = tools;
Vue.prototype.$websocket = websocket;
Vue.prototype.$Bus = Bus;
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$myConfirm = confirm;

Vue.use(Global);
Vue.use(ComponentsLoader);
Vue.use(ElementUI, { size: 'small', zIndex: 100000 });
Vue.use(directives);

if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_SENTRY) {
    // Sentry.init({
    //     dsn: 'http://a19d20667d3740c3843275074526d9bc@192.168.78.247:9000/5',
    //     integrations: [new VueIntegration({ Vue, attachProps: true })],
    //     logErrors: true,
    //     release: process.env.VUE_APP_VERSION
    // });
}

new Vue({
    render: h => h(App),
    store,
    router: router
}).$mount('#app');
