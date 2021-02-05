import Axios from 'axios'; // 此处引入axios官方文件
import { Notification } from 'element-ui';

const axios = Axios.create({
    baseURL: process.env.VUE_APP_BASEURL || '',
    timeout: 30000
});

// Promise全局异常捕获
// window.addEventListener('unhandledrejection', function(e) {
//     console.error(e);
// });

// 添加请求拦截器
axios.interceptors.request.use(
    function(config) {
        if (config.method.toLocaleLowerCase() === 'post' || config.method.toLocaleLowerCase() === 'put') {
            // 参数统一处理，请求都使用data传参
            config.data = config.data.data;
        } else if (config.method.toLocaleLowerCase() === 'get' || config.method.toLocaleLowerCase() === 'delete') {
            // 参数统一处理
            config.params = config.data;
        } else {
            alert('不允许的请求方法：' + config.method);
        }
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function(response) {
        // 接口数据处理
        if (response.data === 'Not Found') {
            // 由于不存在的接口有时候会返回Not Found，所以做了特殊处理
            Notification({
                title: response.config.url,
                message: '资源不存在',
                type: 'error'
            });
        } else if (response.status == 200 || response.status == 304) {
            // 自定义约定接口返回{code: xxx, data: xxx, msg:'err message'}
            // code:200 数据正常； ！200 数据获取异常
            if (response.data.code == 200) {
                if (response.config.method.toLocaleLowerCase() === 'post' || response.config.method.toLocaleLowerCase() === 'put') {
                    Notification({
                        title: '成功',
                        message: response.data.msg,
                        type: 'success'
                    });
                }
                return response.data.data;
            } else if (response.data.code == 401) {
                Notification({
                    title: '认证异常',
                    message: '登录状态已过期，请重新登录！',
                    type: 'error'
                });
                window.location.href = window.location.origin;
            } else {
                Notification({
                    title: '操作失败',
                    message: response.data.msg,
                    type: 'error'
                });
                return Promise.reject(response.data);
            }
        } else {
            Notification({
                title: response.config.url,
                message: '服务器繁忙，请稍后重试！',
                type: 'error'
            });
        }
    },
    function(error) {
        Notification({
            title: '接口异常',
            message: error.message,
            type: 'error'
        });
        return Promise.reject(error);
    }
);
export default axios;
