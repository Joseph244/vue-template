<style lang="less" module>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;

    .top {
        margin-bottom: 20px;

        .stationInfo {
            display: flex;
            align-items: center;
            justify-content: space-around;
            height: 60px;
            background: rgba(0, 0, 0, 0.25);
            font-size: 16px;

            > li {
                color: #ffffff;
                > label {
                    color: #00f0f0;
                }
            }
        }

        .step {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px 0;
            border-bottom: 1px solid #00fff6;

            > li {
                display: flex;
                align-items: center;
                justify-content: center;

                > div {
                    width: 120px;
                    height: 130px;
                    border: 1px #00ffff solid;
                    box-shadow: rgb(0, 255, 247) 0px 0px 10px inset;
                    border-radius: 8px;
                    background-color: rgba(156, 224, 222, 0.1);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: #00fff6;

                    &.active {
                        border: 1px solid #daba4b;
                        color: #daba4b;
                        background-color: rgba(210, 186, 75, 0.1);
                        box-shadow: inset 0px 0px 10px #daba4b;
                    }

                    > div {
                        height: 56px;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        > img {
                            width: 56px;
                            height: 56px;
                        }

                        > b {
                            font-size: 20px;
                            margin-left: 5px;
                        }
                    }

                    > span {
                        font-size: 18px;
                        margin-top: 10px;
                        font-weight: bold;
                    }
                }

                > i {
                    width: 46px;
                    height: 19px;
                    background: url(../../../images/activeFinding/arrow.png);
                    margin: 0 60px;
                }
            }
        }
    }

    .content {
        flex: 1;
        overflow: hidden;
    }
}
</style>

<template>
    <div :class="$style.container">
        <div :class="$style.top">
            <ul :class="$style.stationInfo">
                <li><label>选中站点：</label>{{ stationInfo.name || '-' }}</li>
                <li><label>所在城市：</label>{{ stationInfo.city || '-' }}</li>
                <li><label>电压等级：</label>{{ stationInfo.voltage || '-' }}</li>
                <li><label>专业类型：</label>{{ MAJORTYPES[stationInfo.type] || '-' }}</li>
            </ul>

            <ul :class="$style.step">
                <li v-for="(item, index) in stepInfo" :key="index">
                    <div :class="curStep === index + 1 ? $style.active : 0">
                        <div>
                            <img :src="curStep === index + 1 ? item.src2 : item.src1" />
                            <b>{{ item.num }}</b>
                        </div>
                        <span>{{ item.name }}</span>
                    </div>
                    <i v-if="index < 3" />
                </li>
            </ul>
        </div>

        <div :class="$style.content">
            <selectArea v-if="curStep === 1" />
            <jrNodeFinding :stationId="stationId" v-if="curStep === 2" />
            <hjNodeFinding :stationId="stationId" v-if="curStep === 3" />
            <sensorsFinding :stationId="stationId" v-if="curStep === 4" />
        </div>
    </div>
</template>

<script>
import selectArea from './selectArea';
import jrNodeFinding from './jrNodeFinding';
import hjNodeFinding from './hjNodeFinding';
import sensorsFinding from './sensorsFinding';

export default {
    components: { selectArea, jrNodeFinding, hjNodeFinding, sensorsFinding },
    data() {
        return {
            curStep: 1,
            jrNum: '',
            hjNum: '',
            cgqNum: '',
            stepInfo: [
                {
                    name: '范围选择',
                    src1: require('../../../images/activeFinding/fwxz-1.png'),
                    src2: require('../../../images/activeFinding/fwxz-2.png')
                },
                {
                    name: '接入节点',
                    src1: require('../../../images/activeFinding/jrjd-1.png'),
                    src2: require('../../../images/activeFinding/jrjd-2.png'),
                    num: ''
                },
                {
                    name: '汇聚节点',
                    src1: require('../../../images/activeFinding/hjjd-1.png'),
                    src2: require('../../../images/activeFinding/hjjd-2.png'),
                    num: ''
                },
                {
                    name: '传感器',
                    src1: require('../../../images/activeFinding/cgq-1.png'),
                    src2: require('../../../images/activeFinding/cgq-2.png'),
                    num: ''
                }
            ],
            stationId: '',
            stationInfo: {}
        };
    },
    methods: {
        next() {
            this.curStep++;
        },
        prev() {
            this.curStep--;
        },
        reset() {
            this.curStep = 1;
            this.stationInfo = {};
            this.stepInfo[1].num = '';
            this.stepInfo[2].num = '';
            this.stepInfo[3].num = '';
        }
    }
};
</script>
