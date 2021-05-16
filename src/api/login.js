import axios from './index';

export default {
    // 登录
    getLoginConfig: params => axios.get('/login/config', { params }),
    // 登录
    login: params => axios.post('/login/login', params),
    // token认证
    tokenValidate: params => axios.get('/login/tokenValidate', { params }),
    // 登出
    logout: params => axios.post('/login/logout', params),
    // 后端生成验证码
    verCode: params => axios.get('/login/verCode', { params })
};
