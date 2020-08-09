import axios from './index';

export default {
    // 获取站信息
    getStationInfo: data => axios.get('/reportedTopoloy/stationInfo', { data }),

    // 获取连级选项
    getStationOption: data => axios.get('/reportedTopoloy/ProvinceTree/query', { data }),

    // 接入节点
    findJrList: data => axios.get('/activeFinding/jrNode/finding', { data }), // 列表
    registeJrNode: data => axios.post('/activeFinding/jrNode/register', { data }), // 注册
    addJrNode: data => axios.post('/activeFinding/jrNode/add', { data }), // 手动添加

    // 汇聚节点
    findHjList: data => axios.get('/activeFinding/hjNode/finding', { data }), // 列表
    addHjWhiteList: data => axios.post('/activeFinding/hjNode/add2WhiteList', { data }), // 加入白名单

    // 传感器
    findSensorList: data => axios.get('/activeFinding/hjNode/finding', { data }), // 列表
    addSensorWhiteList: data => axios.post('/activeFinding/hjNode/add2WhiteList', { data }) // 加入白名单
};
