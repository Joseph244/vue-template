import axios from './index';

export default {
    unitEdit: data => axios.post('/system/unit/edit', { data }),
    unitGet: data => axios.get('/system/unit/get', { data }),
    unitAdd: data => axios.post('/system/unit/add', { data }),
    unitDelete: data => axios.post('/system/unit/delete', { data }),
    systemTotals: data => axios.get('/system/totals', { data })
};
