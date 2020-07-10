import axios from './index';

export default {
    equTypeDefects: data => axios.get('/stats/equTypeDefects', { data }),
    companyDefects: data => axios.get('/stats/companyDefects', { data }),
    defectTotal: data => axios.get('/stats/defectTotal', { data }),
    departmentStationDefects: data => axios.get('/stats/departmentStationDefects', { data })
};
