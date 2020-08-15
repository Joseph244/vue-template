<style lang="less" module>
.sensorTypeCard {
    width: 840px;
    height: 400px;
    margin: 10px;
    padding: 70px 65px;
    font-size: 20px;
    background: url('../../../images/sensorTypeCard_bg.png') no-repeat;
    background-size: cover;
    display: flex;
    .left {
        > label {
            font-size: 1.5em;
            width: 10em;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: inline-block;
            background: linear-gradient(to right, #0df5f52b, #0cf2f291);
            padding: 10px 30px;
            color: #00ffff;
            border-radius: 5px;
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
<template functional>
    <div :class="$style.sensorTypeCard">
        <div :class="$style.left">
            <label>{{ props.sensorInfo.sensorTypeName }}</label>
            <img
                :src="`./sensorTypeImg/${props.sensorInfo.sensorTypeName}.png`"
                :alt="props.sensorInfo.sensorTypeName1"
                onerror="this.src='../sensorTypeImg/烟感传感器.png'"
            />
        </div>
        <div :class="$style.right">
            <div>
                <span :class="$style.num">{{ props.sensorInfo.onlineCount }}</span
                ><span>个</span>
            </div>
            <div :class="$style.name">
                在线总数
            </div>
            <div>
                <span :class="$style.num">{{ props.sensorInfo.offlineCount }}</span
                ><span>个</span>
            </div>
            <div :class="$style.name">
                离线总数
            </div>
        </div>
    </div>
</template>
<script>
