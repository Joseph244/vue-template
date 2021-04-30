import axios from './index';

export default {
    query: data => axios.get('/sensor/query', { data }),
    realData: data => axios.get('/sensor/realData', { data }),
    historyData: data => axios.get('/sensor/historyData', { data }),
    sensorBindEqu: data => axios.post('/sensor/sensorBindEqu', { data }),
    add: data => axios.post('/sensor/add', { data }),
    del: data => axios.post('/sensor/delSensor', { data }),
    pull: data => axios.post('/v1/subdevice/sync/request', { data }),
    push: data => axios.post('/edge2Cloud/sensor/edgePush', { data }),
    batchAddSensor: data => axios.post('/sensor/batchAddSensor', { data }),
    getSensorCmdList: data => axios.get('/sensor/configList', { data }),
    saveSensorCmd: data => axios.post('/sensor/sendCmd', { data })
};
