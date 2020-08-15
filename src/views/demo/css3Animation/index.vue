<style lang="less" module>
.right1 {
    width: 3440px;
    --speed: 5s;

    .label {
        font-size: 30px;
        text-align: center;
        margin: 10px 0;
        width: 100%;
        a {
            color: #00fff3;
            position: relative;
            padding: 14px 24px;
            background: rgba(5, 180, 180, 0.25);
            z-index: 1;
        }

        // &::before,
        // &::after {
        //     background: url('../../../images/banner.png') no-repeat;
        //     background-size: contain;
        //     content: '';
        //     width: 40%;
        //     height: 2em;
        //     display: inline-block;
        //     position: relative;
        //     vertical-align: top;
        //     margin: 0.5em 1em 0 1em;
        // }
    }
    .wrap {
        width: 100%;
        height: 830px;
        overflow: hidden;
    }
    .content {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        overflow: hidden;

        &.animate1 {
            margin-top: -420px;
            transition: all 1s;
        }

        &.animate {
            animation: right1Slide var(--speed) linear infinite;
        }

        @keyframes right1Slide {
            20%,
            80% {
                margin-top: 0px;
            }

            100% {
                margin-top: -420px;
            }
        }
    }
}
</style>
<template>
    <div ref="right1" :class="$style.right1">
        <div :class="$style.label">
            <a>传感器类型<edgeBorder color="#00fff3"/></a>
        </div>

        <div :class="$style.wrap">
            <div ref="con" :class="{ [$style.content]: true, [$style.animate]: animate }">
                <sensorTypeCard v-for="(item, index) in sensorCardList" :key="index" :sensor-info="item" />
            </div>
        </div>
    </div>
</template>
<script>
import sensorTypeCard from './sensorTypeCard.vue';

export default {
    name: 'RIGHT1',
    components: {
        sensorTypeCard
    },
    data() {
        return {
            apiLoop: null,
            animate: false,
            sensorCardList: []
        };
    },
    mounted() {
        // 设置速度
        this.$refs.right1.style.setProperty('--speed', '3s');

        if (this.apiLoop) clearInterval(this.apiLoop);
        this.sensorTypeCards();
        this.apiLoop = setInterval(() => {
            this.sensorTypeCards();
        }, window.WENV.REFRESH.REFRESH_API_RIGHT1);

        // 动画回调
        this.$refs.con.addEventListener('webkitAnimationIteration', () => {
            let items = this.sensorCardList.splice(0, 4);
            this.sensorCardList.push(...items);
        });
    },
    destroyed() {
        clearInterval(this.apiLoop);
    },
    methods: {
        async sensorTypeCards() {
            // let data = await Api.sensorTypeCards();  // 接口获取数据
            this.sensorCardList = [
                {
                    sensorTypeName: '温度传感器',
                    onlineCount: '1148',
                    offlineCount: 1028,
                    total: '2176'
                },
                {
                    sensorTypeName: '温湿度传感器',
                    onlineCount: '515',
                    offlineCount: 57,
                    total: '572'
                },
                {
                    sensorTypeName: '设备温度传感器',
                    onlineCount: '250',
                    offlineCount: 290,
                    total: '540'
                },
                {
                    sensorTypeName: '特高频局放传感器',
                    onlineCount: '122',
                    offlineCount: 45,
                    total: '167'
                },
                {
                    sensorTypeName: '避雷器监测传感器',
                    onlineCount: '54',
                    offlineCount: 57,
                    total: '111'
                },
                {
                    sensorTypeName: '避雷器泄漏电流传感器',
                    onlineCount: '29',
                    offlineCount: 58,
                    total: '87'
                },
                {
                    sensorTypeName: '导线风偏传感器',
                    onlineCount: '38',
                    offlineCount: 27,
                    total: '65'
                },
                {
                    sensorTypeName: '倾斜角度传感器',
                    onlineCount: '42',
                    offlineCount: 3,
                    total: '45'
                },
                {
                    sensorTypeName: '水浸传感器',
                    onlineCount: '18',
                    offlineCount: 1,
                    total: '19'
                },
                {
                    sensorTypeName: '烟感传感器',
                    onlineCount: '13',
                    offlineCount: 1,
                    total: '14'
                },
                {
                    sensorTypeName: '避雷器泄漏电流',
                    onlineCount: '12',
                    offlineCount: 0,
                    total: '12'
                },
                {
                    sensorTypeName: '电机控制传感器',
                    onlineCount: '1',
                    offlineCount: 6,
                    total: '7'
                },
                {
                    sensorTypeName: '水位传感器',
                    onlineCount: '5',
                    offlineCount: 2,
                    total: '7'
                },
                {
                    sensorTypeName: '机械特性传感器',
                    onlineCount: '1',
                    offlineCount: 6,
                    total: '7'
                },
                {
                    sensorTypeName: '微功率绝缘子泄漏电流传感器',
                    onlineCount: '3',
                    offlineCount: 4,
                    total: '7'
                },
                {
                    sensorTypeName: '振动传感器',
                    onlineCount: '3',
                    offlineCount: 0,
                    total: '3'
                },
                {
                    sensorTypeName: '气象传感器',
                    onlineCount: '2',
                    offlineCount: 1,
                    total: '3'
                },
                {
                    sensorTypeName: '微功率导线电流传感器',
                    onlineCount: '3',
                    offlineCount: 0,
                    total: '3'
                },
                {
                    sensorTypeName: '铁芯夹件电流传感器',
                    onlineCount: '3',
                    offlineCount: 0,
                    total: '3'
                },
                {
                    sensorTypeName: '噪声传感器',
                    onlineCount: '3',
                    offlineCount: 0,
                    total: '3'
                },
                {
                    sensorTypeName: 'SF6密度继电传感器',
                    onlineCount: '2',
                    offlineCount: 0,
                    total: '2'
                },
                {
                    sensorTypeName: '高频电流传感器',
                    onlineCount: '0',
                    offlineCount: 1,
                    total: '1'
                }
            ];
            this.animate = this.sensorCardList.length > 8;
        }
    }
};
</script>
