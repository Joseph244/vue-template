import axios from './index';

export default {
    /**
     * @description网络配置列表页
     */
    // （已订）获取接入节点信息列表
    jrNode_query: data => {
        for (let i = 0; i < 2000000000; i++) {
            let x = 0;
            x += i;
        }
        return axios.get('http://rap2api.taobao.org/app/mock/87055/substation/voltageNum', { data });
    },
    // （已订）获取汇聚节点信息列表
    hjNode_query: data => axios.get('/networkConfig/hjNode/query', { data }),
    // 获取传感器列表
    sensorNode_query: data => axios.post('/networkConfig/sensorNode/query', { data }),
    /**
     * @description接入节点主控配置页
     */
    // （已订）接入节点基本信息获取
    jrNode_basicInfoQuery: data => axios.get('/networkConfig/jrNode/basicInfoQuery', { data }),
    // （已订）接入节点状态信息获取
    jrNode_statusInfoQuery: data => axios.get('/networkConfig/jrNode/statusInfoQuery', { data }),

    // 接入节点配置-汇聚节点白名单查询
    masterPanel_hjNodeWhiteList: data => axios.get('/networkConfig/hjNode/masterPanel/hjNodeWhiteList', { data }),

    // 接入节点重启
    jrNode_reboot: data => axios.post('/networkConfig/jrNode/reboot', { data }),

    // 接入节点配置-汇聚节点白名单设置
    masterPanel_hjNodeWhiteListSet: data => axios.post('/networkConfig/jrNode/masterPanel/hjNodeWhiteListSet', { data }),

    // 传感器白名单查询
    sensorWhiteListQuery: data => axios.get('/networkConfig/sensorWhiteListQuery', { data }),
    // 传感器白名单设置
    sensorWhiteListSet: data => axios.post('/networkConfig/sensorWhiteListSet', { data }),
    // 白名单重置（汇聚节点，传感器）
    resetWhiteList: data => axios.post('/networkConfig/resetWhiteList', { data }),

    // 通讯参数查询
    sendingParamsQuery: data => axios.post('/networkConfig/sendingParamsQuery', { data }),
    // 接入节点配置-主控通讯参数保存
    sendingParamsSave: data => axios.post('/networkConfig/sendingParamsSave', { data }),

    /**
     * @description接入节点边缘配置页
     */
    // 接入节点重启
    edgePanel_queryServerList: data => axios.get('/networkConfig/jrNode/edgePanel/queryServerList', { data }),
    // 接入节点重启
    edgePanel_serverControl: data => axios.post('/networkConfig/jrNode/edgePanel/serverControl', { data }),
    // 接入节点-边缘板服务上传配置
    edgePanel_serverConfig: data => axios.post('/networkConfig/jrNode/edgePanel/serverConfig', { data }),
    /**
     * @description汇聚节点配置
     */
    // （已定）汇聚节点基本信息获取
    hjNode_basicInfo: data => axios.get('/networkConfig/hjNode/basicInfo', { data }),
    // （已定）汇聚节点状态信息获取
    hjNode_statusInfo: data => axios.get('/networkConfig/hjNode/statusInfo', { data }),
    /**
     * @description传感器配置
     */
    sensorNode_reset: data => axios.post('/networkConfig/sensorNode/reset', { data })
};
