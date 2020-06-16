import axios from './index';

export default {
    //  消息路由-获取消息路由信息（以表格的形式展示）
    getMessageRouteInfo: function(params) {
        return axios.get('/message/getMessageRouteInfo', { data: params });
    },
    /*
     *消息路由-删除某个消息路由
     */
    deleteInformationRoute: function(params) {
        return axios.post('/message/deleteInformationRoute', { data: params });
    },
    /*
     *  消息路由-获取电力设备树结构
     */
    getEquTreeData: function() {
        return axios.get('/message/getEquTreeData');
    },
    /*
     * 消息路由-获取电力设备下的传感器列表
     */
    getSensorsByEqu: function(params) {
        return axios.get('/message/getSensorsByEqu', { data: params });
    },
    /**
     *获取全部传感器类型
     */
    getAllSensorTypes() {
        return axios.get('/message/getAllSensorTypes');
    },
    /*
     *消息路由-获取第三方App地址
     */
    getThirdPartyAppInfo: function() {
        return axios.get('/message/getThirdPartyAppInfo');
    },
    /*
     *消息路由-添加某个消息路由
     */
    addInformationRoute: function(params) {
        return axios.post('/message/addInformationRoute', { data: params });
    }
};
