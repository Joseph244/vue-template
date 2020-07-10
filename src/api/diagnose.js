import axios from './index';

export default {
    // 查看上传文件信息
    getFileInfo: data => axios.get('/equDiagnosis/taskFileInfo', { data }),
    // 查询任务文件所有诊断结果
    getAllFileDiagnoseRes: data => axios.get('/equDiagnosis/diagnosisAllRes', { data }),
    // 查询任务文件所有诊断复核
    getFileDiagnoseResCheck: data => axios.get('/equDiagnosis/diagnosisResCheck', { data }),
    // 删除上传文件
    deleteFile: data => axios.post('/equDiagnosis/delFile', { data }),
    // 查询文件prps，prpd
    getFileGraphData: data => axios.get('/equDiagnosis/fileGraphData', { data }),
    // 查询某个文件诊断结果
    getFileDiagnoseRes: data => axios.get('/equDiagnosis/diagnosisRes', { data }),
    // 保存检测仪器
    saveInstrument: data => axios.get('/equDiagnosis/saveInstrument', { data }),
    // 保存检测位置
    savePosition: data => axios.get('/equDiagnosis/savePosition', { data }),
    // 开始诊断
    startDiagnosis: data => axios.post('/equDiagnosis/startDiagnosis', { data }),
    // 上传诊断文件
    uploadDataFiles: data =>
        axios.post(
            '/equDiagnosis/uploadDataFiles',
            { data },
            {
                headers: {
                    'Content-Type': 'multiple/form-data'
                }
            }
        ),
    // 新建诊断任务 or 无设备诊断转换成设备诊断
    newTask: data => axios.post('/equDiagnosis/newTask', { data }),
    // 诊断复核，存为缺陷台账
    trans2Defect: data => axios.post('/equDiagnosis/trans2Defect', { data })
};
