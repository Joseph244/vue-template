/**
 * 此处为前端配置文件，可在打包部署之后进行修改；
 * 访问方式为，在js中直接获取window.WENV.BIGTITLE即可
 * */

window.WENV = (function() {
    return {
        REFRESH: {
            STATION_SPEED: '5s', // 变电站轮播间隔（建议不超过10秒）
            ALERT_SPEED: '5s', // 右下告警轮播间隔（建议不超过10秒）
            REFRESH_left11: 86400000, // 1day
            REFRESH_left12: 86400000, // 1day
            REFRESH_left13: 5000, // left1-3 饼图切换显示柱图间隔
            REFRESH_left21: 3600000, // 1hour
            REFRESH_left31: 21600000, // 6hour
            ANIMATE_SENSORTYPECARD: '8s', // 右侧传感器类型卡片上滑时间设置
            ANIMATE_EQUTYPECARD: '5s', // 右侧电力设备类型卡片上滑时间设置
            REFRESH_API_RIGHT1: 600000, // 右侧传感器类型卡片接口重新获取时间（建议最小是ANIMATE_SENSORTYPECARD的5倍以上）
            REFRESH_API_RIGHT2: 600000, // 右侧传感器类型卡片接口重新获取时间（建议最小是ANIMATE_EQUTYPECARD的5倍以上）
            REFRESH_right3: 3600000
        },
        BIGTITLE: '泰州物联网融合驾驶舱',
        // 各个站的描述信息
        STATIONDESC: {
            palceholder: '默认描述', // 默认描述
            寺巷变: '寺巷变描述',
            新街变: '新街变描述',
            罡阳变: '罡阳变描述',
            白马变: '白马变描述',
            新区变: '新区变描述',
            白新线: '白新线描述',
            鲍徐变: '鲍徐变描述',
            徐庄变: '徐庄变描述'
        }
    };
})();
