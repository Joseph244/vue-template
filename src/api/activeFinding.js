import axios from './index';

export default {
    sensorFinding: data => axios.get('/activeFinding/sensorFinding', { data })
};
