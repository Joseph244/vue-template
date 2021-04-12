<style lang="less" module>
.sensorTypeCard {
    width: 840px;
    height: 400px;
    margin: 10px;
    padding: 70px 65px;
    font-size: 20px;
    border: 1px solid #00ffff;
    display: flex;
    .left {
        > div {
            font-size: 1.5em;
            width: 10em;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            // text-overflow: ellipsis;
            // display: inline-block;
            background: linear-gradient(to right, #0df5f52b, #0cf2f291);
            padding: 10px;
            color: #00ffff;
            border-radius: 5px;
            .nameMove {
                position: relative;
                display: inline-block;
                animation: labelMove 3s infinite alternate linear;
            }
            @keyframes labelMove {
                0% {
                    left: 0px;
                    transform: translate(0, 0);
                }

                100% {
                    left: 100%;
                    transform: translate(-100%, 0);
                }
            }
        }
        img {
            width: 240px;
            display: block;
            margin: auto;
        }
    }

    .right {
        font-size: 1em;
        margin-left: 100px;
        margin-top: -0.1em;
    }
    .name {
        font-size: 1.3em;
        margin-bottom: 20px;
    }
    .num {
        color: #00ffff;
        font-size: 2.5em;
        font-weight: bolder;
    }
}
</style>
<template>
    <div :class="$style.sensorTypeCard">
        <div :class="$style.left">
            <div>
                <span :class="{ [$style.nameMove]: ifMove }">{{ sensorInfo.sensorTypeName }}</span>
            </div>
            <img
                :src="`./sensorTypeImg/${sensorInfo.sensorTypeName}.png`"
                :alt="sensorInfo.sensorTypeName1"
                onerror="this.src='../sensorTypeImg/烟感传感器.png'"
                    />
        </div>
        <div :class="$style.right">
            <div>
                <span :class="$style.num">{{ sensorInfo.onlineCount }}</span><span>个</span>
            </div>
            <div :class="$style.name">
                在线总数
            </div>
            <div>
                <span :class="$style.num">{{ sensorInfo.offlineCount }}</span><span>个</span>
            </div>
            <div :class="$style.name">
                离线总数
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SensorTypeCard',
    props: {
        sensorInfo: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            ifMove: false
        };
    },
    mounted() {
        if (this.sensorInfo.sensorTypeName.length > 9) {
            this.ifMove = true;
        }
    }
};
</script>
