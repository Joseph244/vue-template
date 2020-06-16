import axios from './index';

export default {
    //  消息路由-获取消息路由信息（以表格的形式展示）
    login: function(params) {
        return axios.get('/message/login', { data: params });
    }
};
