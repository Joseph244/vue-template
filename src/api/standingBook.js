import axios from './index';

/*
 * 查询设备台账
 */
export function queryEquList(data) {
    return axios.get('/standingBook/equList', { data });
}

/*
 * 缺陷列表
 */
export function defectList(data) {
    return axios.post('/standingBook/defectList', { data });
}
/*
 * 缺陷修复
 */
export function repireDefect(data) {
    return axios.post('/standingBook/repireDefect', { data });
}
/*
 * 缺陷删除
 */
export function delDefect(data) {
    return axios.post('/standingBook/delDefect', { data });
}
/**
 * 新建设备
 */
export function addEquInfo(data) {
    return axios.post('/standingBook/addEquInfo', { data });
}

/**
 * 设备填选
 */
export function equDict() {
    return axios.get('/standingBook/equDict');
}
