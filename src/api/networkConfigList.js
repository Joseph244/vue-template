import axios from './index';

export default {
    // 接入节点列表
    jrNode_query: data => axios.post('/networkConfig/jrNode/query', { data }),
    jrNode_queryStatus: data => axios.get('/networkConfig/jrNode/statusInfoQuery', { data }),
    jrNode_edit: data => axios.post('/networkConfig/jrNode/edit', { data }),
    jrNode_del: data => axios.post('/networkConfig/jrNode/delNode', { data }),

    // 汇聚节点列表
    hjNode_query: data => axios.post('/networkConfig/hjNode/query', { data }),
    hjNode_queryStatus: data => axios.get('/networkConfig/hjNode/statusInfo', { data }),
    hjNode_edit: data => axios.post('/networkConfig/hjNode/edit', { data }),

    // 传感器列表
    sensorNode_query: data => axios.post('/networkConfig/sensorNode/query', { data }),
    sensorNode_queryStatus: data => axios.get('/networkConfig/sensorStatusInfo/query', { data }),
    sensorNode_reset: data => axios.post('/networkConfig/sensorNode/reset', { data })
};
