/**
 * 此处为前端配置文件，可在打包部署之后进行修改；
 * 访问方式为，在js中直接获取window.WENV.BATCH_ADD_SENSOR即可
 * */

window.WENV = (function() {
    return {
        // 批量导入传感器解析key-value配置：value为解析模板表头
        BATCH_ADD_SENSOR: {
            sensorNo: '传感器型号',
            sensorCode: '传感器标识（10进制）',
            sensorTypeName: '传感器类型名称',
            location: '安装位置',
            equId: '挂载电力设备ID',
            equName: '挂载电力设备名称',
            manufacturer: '生产厂家',
            phase: '相位',
            powerType: '取电方式（电池、感应）',
            interval: '采样间隔（秒）'
        }
    };
})();
