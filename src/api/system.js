import axios from './index';

export default {
    //  设备部件
    getEquUnitList: data => axios.get('/system/queryEquUnit', { data }),
    saveEquUnit: data => axios.post('/system/editEquUnit', { data }),
    deleteEquUnit: data => axios.get('/system/deleteEquUnit', { data }),

    // 缺陷类型
    getDefectTypeList: data => axios.get('/system/queryDefectType', { data }),
    saveDefectType: data => axios.post('/system/editDefectType', { data }),
    deleteDefectType: data => axios.get('/system/deleteDefectType', { data }),

    // 严重等级
    getDefectGradeList: data => axios.get('/system/queryDefectGrade', { data }),
    saveDefectGrade: data => axios.post('/system/editDefectGrade', { data }),
    deleteDefectGrade: data => axios.get('/system/deleteDefectGrade', { data }),

    // 算法接入
    getAlgorithmList: data => axios.get('/system/queryAlgorithm', { data }),
    saveAlgorithm: data => axios.post('/system/editAlgorithm', { data }),
    deleteAlgorithm: data => axios.get('/system/deleteAlgorithm', { data })
};
