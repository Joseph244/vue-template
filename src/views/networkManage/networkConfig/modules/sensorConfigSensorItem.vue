<style lang="less" module>
.sensorConfigSensorItem {
    display: flex;
    align-items: center;
    color: #00ffff;
    border: 1px solid #00ffff;
    margin-bottom: 8px;
    padding: 6px;
    cursor: pointer;
    font {
        font-weight: bold;
    }
    .status {
        margin-top: 6px;
        font-size: 12px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
}
</style>
<template>
    <div :class="$style.sensorConfigSensorItem" @click="sensorInfo.checked = !sensorInfo.checked">
        <el-checkbox v-model="sensorInfo.checked" style="margin-right: 1em;"></el-checkbox>
        <div>
            <div>
                <span>
                    <font>{{ sensorInfo.nodeId }}</font>
                    (厂商：{{ sensorInfo.factory }} &emsp;版本：{{ sensorInfo.version }})
                </span>
            </div>
            <div :class="$style.status">
                <span
                    >状态：
                    <span v-if="sensorInfo.onlineStatus">在线</span>
                    <span v-else style="color: grey;">离线</span>
                </span>
                <span>信号：{{ sensorInfo.signal }}</span>
                <span>电量：{{ sensorInfo.power }}</span>
            </div>
        </div>
    </div>
</template>
<script>
// import {} from '@/api'
export default {
    name: 'sensorConfigSensorItem',
    props: {
        sensorInfo: {
            type: Object,
            required: true
        }
    },
    data() {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    created() {}
};
</script>
