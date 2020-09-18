<style lang="less" module>
.createKeyframeAnimation {
    display: flex;
    flex-wrap: wrap;
}
</style>
<style lang="less" scoped>
@keyframes blink {
    0% {
        background-color: rgba(0, 0, 0, 0);
    }
    50% {
        background-color: rgba(76, 70, 47, 0.8);
    }
    100% {
        background-color: rgba(0, 0, 0, 0);
    }
}
</style>
<template>
    <div :class="$style.createKeyframeAnimation">
        <sensorCard
            v-for="(sensor, index) in sensorCardList"
            :key="sensor.physical.sensorId"
            :class="$style.sensorCardAll"
            :style="{
                margin: '5px',
                border: '3px solid ' + cardBordBgSetting(sensor.physical).borderColor,
                backgroundColor: cardBordBgSetting(sensor.physical).backgroungColor,
                animation: 'cardIn 0.3s linear,' + cardBordBgSetting(sensor.physical).animation,
                animationDelay: (index - 1) * 0.4 + 's',
                animationFillMode: 'both'
            }"
            :index="index"
            :sensor-info="sensor"
                />
    </div>
</template>
<script>
import sensorCard from './sensorCard.vue';
const styleDict = {
    normal: {
        borderColor: 'rgba(18, 145, 140, 0.8)',
        backgroungColor: 'rgba(4, 50, 49, 0.8)'
    },
    alert: {
        borderColor: 'rgba(18, 145, 140, 0.8)',
        backgroungColor: 'rgba(76, 70, 47, 0.8)',
        animation: 'blink 1s infinite'
    },
    unable: {
        borderColor: 'rgba(62, 98, 97, 0.8)',
        backgroungColor: 'rgba(4, 62, 61, 0)'
    },
    offline: {
        borderColor: 'rgba(118, 128, 128, 0.8)',
        backgroungColor: 'rgba(4, 50, 49, 0.8)'
    }
};
export default {
    name: 'CreateKeyframeAnimation',
    components: {
        sensorCard
    },
    data() {
        return {
            sensorCardList: []
        };
    },
    created() {
        this.queryData();
    },
    methods: {
        queryData() {
            let list = [
                {
                    sensorId: 1,
                    sensorName: '2号电容器200开关柜_电容器200开关柜二次柜_机械特性传感器_25876a010000042',
                    sensorTypeName: '机械特性传感器',
                    sensorNo: '25876a010000042',
                    able: 1,
                    online: 1,
                    funValueArr: [
                        { funName: '分位移开距', dataUnit: 'mm', funNo: 'fwykj', recentVal: '' },
                        { funName: '机构行程曲线', dataUnit: 'mm', funNo: 'jgxcqx', recentVal: '' },
                        { funName: '分闸线圈电流', dataUnit: 'A', funNo: 'openCoilCurrent', recentVal: '' },
                        { funName: '合闸速度', dataUnit: 'm/s', funNo: 'closingSpeed', recentVal: '' },
                        { funName: '合闸时间', dataUnit: 'sec', funNo: 'closingTime', recentVal: '' },
                        { funName: '分闸时间', dataUnit: 'sec', funNo: 'openingTime', recentVal: '' },
                        { funName: '分闸速度', dataUnit: 'm/s', funNo: 'openingSpeed', recentVal: '' },
                        { funName: '开关分合位置', dataUnit: '', funNo: 'kgfhwz', recentVal: '' },
                        { funName: '储能电机电流', dataUnit: 'A', funNo: 'motorCurrent', recentVal: '' },
                        { funName: '合位移开距', dataUnit: 'mm', funNo: 'hwykj', recentVal: '' },
                        { funName: '合位移开距（角度）', dataUnit: '°', funNo: 'hwykjAngle', recentVal: '' },
                        { funName: '机构动作次数', dataUnit: '计数', funNo: 'jgdzcs', recentVal: '' },
                        { funName: '合闸线圈电流', dataUnit: 'A', funNo: 'closeCoilCurrent', recentVal: '' },
                        { funName: '分位移开距（角度）', dataUnit: '°', funNo: 'fwykjAngle', recentVal: '' }
                    ],
                    lastconnected: '2020-08-10 12:31:21',
                    power: 100
                },
                {
                    sensorId: 21676,
                    sensorName: '2号电容器200开关柜_出线电缆桩头A相_温度传感器_XP00028BEA',
                    sensorTypeName: '温度传感器',
                    able: 1,
                    online: 1,
                    funValueArr: [{ funName: '温度值', dataUnit: '℃', funNo: 'temp', recentVal: '' }],
                    lastconnected: '2020-08-10 12:31:21',
                    power: 0
                },
                {
                    sensorId: 21674,
                    sensorName: '2号电容器200开关柜_出线电缆桩头C相_温度传感器_XP00028BE5',
                    sensorTypeName: '温度传感器',
                    able: 1,
                    online: 1,
                    alert: 1,
                    funValueArr: [
                        { funName: '温度值', dataUnit: '℃', funNo: 'temp', recentVal: 34 },
                        { funName: '湿度值', dataUnit: '%', funNo: 'humity', recentVal: 30 }
                    ],
                    lastconnected: '2020-08-10 12:31:21',
                    power: '0',
                    detectStatus: 0,
                    externalMemberCount: 1,
                    equEventCount: 0
                }
            ];
            this.sensorCardsInfo(list);
        },
        // 工作台实时卡片信息
        sensorCardsInfo(list) {
            this.sensorCardList = [];
            for (let j of list) {
                let item = {
                    physical: {
                        able: j.able,
                        alert: j.alert,
                        online: j.online,
                        power: j.power,
                        sensorId: j.sensorId,
                        sensorName: j.sensorName,
                        sensorTypeName: j.sensorTypeName,
                        recentTime: j.lastconnected
                    },
                    runState: j.funValueArr
                };
                this.sensorCardList.push(item);
            }
        },
        // 卡片样式根据传感器状态自动选择
        cardBordBgSetting(sensor) {
            if (!sensor.able) {
                return styleDict.unable;
            }
            if (!sensor.online) {
                return styleDict.offline;
            }
            if (sensor.alert) {
                return styleDict.alert;
            }
            return styleDict.normal;
        }
    }
};
</script>
