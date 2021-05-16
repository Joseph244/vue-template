import axios from './index';

export default {
    treeQuery: data => axios.get('/equ/treeQuery', { data }),
    equList: data => axios.get('/equ/equList', { data }),
    edit: data => axios.post('/equ/edit', { data }),
    delEqu: data => axios.post('/equ/delEqu', { data }),
    equTypeList: data => axios.get('/equ/equTypeList', { data }),
    voltageList: data => axios.get('/equ/voltageList', { data }),
    bayUnitList: data => axios.get('/equ/bayUnitList', { data }),
    equsSync: data => axios.post('/equ/equsSync', { data }),
    addEqu: data => axios.post('/equ/addEqu', { data }),
    batchAddEqu: data => axios.post('/equ/batchAddEqu', { data }),
    pull: data => axios.post('/v1/equipment/sync/request', { data }),
    push: data => axios.post('/edge2Cloud/equ/edgePush', { data })
};
