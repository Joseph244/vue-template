import axios from './index';

export default {
    // 获取站详情信息
    getStationInfo: data => axios.get('/reportedTopoloy/stationInfo', { data }),
    // 获取右侧全局筛选树
    getQueryTree: data => axios.post('/reportedTopoloy/treeStructureNavigation/query', { data }),
    // 省市站拓扑
    getCityTree: data => axios.post('/reportedTopoloy/ProvinceTree/query', { data }),
    // 站内拓扑
    getStationTree: data => axios.post('/reportedTopoloy/stationTreeStructure/query', { data }),
    // 获取手动拓扑
    getMyTree: data => axios.get('/manualTopoloy/treeStructure/query', { data }),
    // 保存手动拓扑
    saveMyTree: data => axios.post('/manualTopoloy/treeStructure/upload', { data })
};
