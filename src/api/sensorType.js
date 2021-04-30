import axios from './index';

export default {
    query: data => axios.get('/sensorType/query', { data }),
    add: data => axios.post('/sensorType/add', { data }),
    edit: data => axios.post('/sensorType/edit', { data }),
    del: data => axios.post('/sensorType/delModel', { data }),
    pull: data => axios.post('/v1/subdeviceProfile/sync/request', { data }),
    editProperty: data => axios.post('/sensorType/editProperty', { data }),
    sensorTypeDetail: data => axios.get('/sensorType/sensorTypeDetail', { data }),
    pullAllModels: data => axios.post('/sensorType/pullAllModels', { data })
};
