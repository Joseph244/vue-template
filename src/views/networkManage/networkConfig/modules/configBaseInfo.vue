<style lang="less" module>
.configBaseInfo {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-column-gap: 20px;
    h3 {
        color: #00ffff;
    }
    .infoContent {
        @padLeft: 50px;
        .firstLine {
            display: flex;
            justify-content: space-between;
            margin-left: -50px;
            padding-bottom: 4px;
            border-bottom: 1px solid #006666;
            :global {
                .el-button {
                    font-weight: bold;
                    padding: 6px 15px;
                    color: #00ffff;
                    background: none;
                    box-shadow: 0 0 10px #00ffff inset;
                    i {
                        font-weight: bold;
                    }
                }
            }
            .refresh {
                color: #00ffff;
                font-size: 20px;
                cursor: pointer;
            }
            .refresh:hover {
                color: @color-hover;
            }
        }

        padding-left: @padLeft;
        padding-bottom: 20px;

        > span {
            display: inline-block;
            margin: 1em 0;
            font {
                font-weight: bold;
                color: #00cccc;
                display: inline-block;
                width: 7em;
                padding-right: 1em;
            }
        }

        span:not(:first-child) {
            width: 50%;
        }
    }
}
</style>
<template>
    <div :class="$style.configBaseInfo">
        <div :class="$style.infoContent">
            <div :class="$style.firstLine">
                <h3>基本信息</h3>
                <el-button v-if="canReboot" type="primary" icon="el-icon-switch-button" @click="reboot">重启</el-button>
            </div>

            <span style="width: 100%;"><font>站点名称</font>{{ baseInfo.stationName }} </span>
            <span><font>节点ID</font>{{ baseInfo.nodeId }}</span>
            <span v-if="baseInfo.parentId"><font>父节点</font>{{ baseInfo.parentId }}</span>
            <span v-if="baseInfo.panelType"><font>节点类型</font>{{ PANELTYPES[baseInfo.panelType] }} </span>
            <span v-if="baseInfo.majorType"><font>专业类别</font>{{ MAJORTYPES[baseInfo.majorType] }}</span>
            <span><font>厂商</font>{{ baseInfo.factory }}</span>
            <span><font>软件版本</font>{{ baseInfo.softwareVersion }}</span>
            <span><font>硬件版本</font>{{ baseInfo.hardwareVersion }}</span>
        </div>
        <div :class="$style.infoContent">
            <div :class="$style.firstLine">
                <h3>状态信息</h3>
                <el-button icon="el-icon-refresh" @click="runInfoRefresh">刷新</el-button>
                <!-- <i class="el-icon-refresh" :class="$style.refresh" @click="runInfoRefresh"></i> -->
            </div>

            <span
                ><font>在线状态</font>
                <span style="color: #33cc33;" v-if="runInfo.status">在线</span>
                <span style="color: #ff3300;" v-else>离线</span>
            </span>
            <span><font>告警数量</font>{{ runInfo.alertCount }}</span>

            <span v-if="mem"><font>内存使用率</font>{{ mem }} M </span>
            <span v-if="runInfo.cpu"><font>CPU使用率</font>{{ runInfo.cpu }}</span>
            <span v-if="storage"><font>存储占用率</font>{{ storage }} G</span>
            <span v-if="runInfo.dataRate"><font>数据接入速率</font>{{ runInfo.dataRate }}</span>

            <span v-if="runInfo.frequency"><font>工作频点</font>{{ runInfo.frequency }}</span>
            <span v-if="runInfo.signal"><font>信号强度</font>{{ runInfo.signal }}</span>
            <span><font>启动时间</font>{{ runInfo.bootTime }}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'configBaseInfo',
    props: {
        canReboot: {
            type: Boolean,
            default: true
        },
        baseInfo: {
            type: Object,
            required: true
        },
        runInfo: {
            type: Object,
            required: true
        }
    },
    computed: {
        mem() {
            if (this.runInfo.memory && this.baseInfo.totalMem) {
                let percent = ((this.runInfo.memory / this.baseInfo.totalMem) * 100).toFixed(2);
                return percent + '% / ' + this.baseInfo.totalMem;
            } else {
                return '';
            }
        },
        storage() {
            if (this.runInfo.storage && this.baseInfo.totalStorage) {
                return this.runInfo.storage + ' / ' + this.baseInfo.totalStorage;
            } else {
                return '';
            }
        }
    },
    data() {
        return {};
    },
    methods: {
        reboot() {
            // this.$msgbox({
            //     title: '重启',
            //     message: `确认重启当前节点？`,
            //     showCancelButton: true,
            //     type: 'warning '
            // })
            //     .then(async () => {
            //         this.$emit('reboot');
            //     })
            //     .catch(() => {});
            this.$myConfirm({
                title: '重启',
                message: `确认重启当前节点？`,
                yes: () => {
                    this.$emit('reboot');
                }
            });
        },
        runInfoRefresh() {
            this.$emit('runInfoRefresh');
        }
    }
};
</script>
