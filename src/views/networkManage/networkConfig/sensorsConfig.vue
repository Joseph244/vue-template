<style lang="less" module>
.sensorsConfig {
    .container {
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-column-gap: 20px;
        grid-template-rows: 100%;
        color: #00ffff;
        .clearIcon {
            margin-left: 14px;
            cursor: pointer;
            &:hover {
                text-decoration: underline;
                color: @color-hover;
            }
        }
        .sensorsBox {
            .search {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                &::before {
                    content: '筛选：';
                    font-size: 16px;
                    font-weight: bold;
                    width: 5em;
                    display: inline-block;
                    line-height: 32px;
                }
            }
            .titleRow {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                padding-left: 6px;
            }
            .sensorItem {
                height: 72vh;
                overflow: auto;
            }
        }
        .configBox {
            .header {
                border-bottom: 1px solid #006666;
                display: flex;
                justify-content: space-between;
                > h3 {
                    color: #00ffff;
                    margin-bottom: 10px;
                }
            }

            .generalSetting {
                margin-bottom: 10px;
                padding: 10px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                align-items: center;
                grid-row-gap: 20px;
                grid-column-gap: 20px;
                border-bottom: 1px solid #006666;
            }
            .configItem {
                display: flex;
                align-items: center;
                > font {
                    display: inline-block;
                    width: 5em;
                }
                :global {
                    .el-input {
                        width: 60%;
                        margin-right: 20px;
                    }
                }
            }
            .btn {
                margin-top: 20px;
                grid-column-start: 1;
                grid-column-end: 3;
                text-align: center;
                :global {
                    .el-button {
                        padding: 6px 25px;
                        margin: 0 20px;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div :class="$style.sensorsConfig">
        <pageBread title="传感器配置"></pageBread>
        <div :class="$style.container">
            <div :class="$style.sensorsBox">
                <div :class="$style.search">
                    <el-select clearable v-model="queryParams.sensorType" placeholder="传感器类型筛选" @change="sensorNode_query">
                        <el-option v-for="item in Object.keys(SENSORTYPES)" :key="item" :label="SENSORTYPES[item]" :value="item"></el-option>
                    </el-select>
                    <el-input
                        v-model="queryParams.searchId"
                        clearable
                        placeholder="请输入传感器id查询"
                        style="width: 300px; margin-left: 20px;"
                        @keyup.enter.native="sensorNode_query"
                    >
                        <el-button slot="append" icon="el-icon-search" @click="sensorNode_query"></el-button>
                    </el-input>
                </div>

                <div :class="$style.titleRow">
                    <span>
                        <el-checkbox v-model="checkedAll" @change="allChecked">全选【{{ sensorList.length }}】</el-checkbox>
                        <i class="el-icon-circle-close" :class="$style.clearIcon" @click="allChecked(false)">清除</i>
                    </span>

                    <el-button size="mini" type="success" @click="reset">复位</el-button>
                </div>
                <div :class="$style.sensorItem">
                    <sensorConfigSensorItem v-for="item in sensorList" :key="item.sensorId" :sensorInfo="item"></sensorConfigSensorItem>
                </div>
                <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentChange"> </el-pagination>
            </div>
            <div :class="$style.configBox">
                <div :class="$style.header">
                    <h3>通用参数</h3>
                    <i class="el-icon-circle-close" style="margin-top: 13px;" :class="$style.clearIcon" @click="clearAllParams">清除</i>
                </div>
                <div :class="$style.generalSetting">
                    <div :class="$style.configItem">
                        <font>发送功率</font>
                        <el-input clearable v-model="sendingParams.sendingPower"></el-input>瓦
                    </div>
                    <div :class="$style.configItem">
                        <font>控制周期</font>
                        <el-input clearable v-model="sendingParams.controlPeriod"></el-input>秒
                    </div>
                    <div :class="$style.configItem">
                        <font>DRX周期</font>
                        <el-input clearable v-model="sendingParams.DRX"></el-input>秒
                    </div>
                    <div :class="$style.configItem">
                        <font>工作频点</font>
                        <el-input clearable v-model="sendingParams.freqPoint"></el-input>
                    </div>
                    <div :class="$style.configItem">
                        <font>上报周期</font>
                        <el-input clearable v-model="sendingParams.uploadPeriod"></el-input>秒
                    </div>
                    <div :class="$style.configItem">
                        <font>时间设置</font>
                        <el-date-picker clearable v-model="sendingParams.timeSetting" type="datetime" placeholder="选择日期时间" align="right">
                        </el-date-picker>
                    </div>
                    <div :class="$style.btn">
                        <el-button type="success" @click="sendingParamsQuery">查询</el-button>
                        <el-button type="success" @click="sendingParamsSave">设置</el-button>
                    </div>
                </div>
                <logContent style="height: 52vh;" :logInfo="logInfo"></logContent>
            </div>
        </div>
    </div>
</template>
<script>
import networkConfigApi from '@/api/networkConfig';
import pageBread from './modules/pageBread';
import logContent from './modules/logContent.vue';
import sensorConfigSensorItem from './modules/sensorConfigSensorItem.vue';
// 过滤对象属性得到非空key的值
import tools from '@/tools/index.js';
const _sendingParams = {
    sendingPower: '',
    controlPeriod: '',
    DRX: '',
    freqPoint: '',
    uploadPeriod: '',
    timeSetting: ''
};
export default {
    name: 'sensorsConfig',
    components: {
        pageBread,
        sensorConfigSensorItem,
        logContent
    },
    data() {
        return {
            checkedAll: false,
            sensorList: [],
            total: 0,
            sendingParams: JSON.parse(JSON.stringify(_sendingParams)),
            logInfo: [],
            queryParams: {
                currentPage: 1,
                pageSize: 20,
                searchId: '',
                sensorType: '',
                hjNodeId: ''
            },
            checkedSensors: []
        };
    },
    computed: {
        stationIdList() {
            return this.$route.query.stationIdList || [];
        }
    },
    methods: {
        clearAllParams() {
            this.sendingParams = JSON.parse(JSON.stringify(_sendingParams));
        },
        filterChecked() {
            return new Promise((resolve, reject) => {
                this.checkedSensors = [];
                for (let i of this.sensorList) {
                    if (i.checked) {
                        this.checkedSensors.push(i.nodeId);
                    }
                }
                if (this.checkedSensors.length === 0) {
                    this.$message.error('请勾选传感器');
                    reject(new Error('未勾选传感器'));
                }
                resolve();
            });
        },
        allChecked(val) {
            this.checkedAll = val;
            for (let i of this.sensorList) {
                i['checked'] = val;
            }
        },
        async sensorNode_query() {
            let res = await networkConfigApi.sensorNode_query({ stationIdList: this.stationIdList, ...this.queryParams });
            for (let i of res.dataList) {
                i['checked'] = false;
            }
            this.sensorList = res.dataList;

            this.total = res.total;
        },
        async reset() {
            await this.filterChecked();
            await networkConfigApi.sensorNode_reset({ sensorIds: this.checkedSensors });
            this.logInfo.push(`传感器重置：${this.checkedSensors}`);
            this.$notify({
                title: '成功',
                message: `传感器重置已下发`,
                type: 'success'
            });
        },
        async sendingParamsQuery() {
            await this.filterChecked();
            let res = await networkConfigApi.sendingParamsQuery({ nodeIdList: this.checkedSensors, nodeType: 'SENSOR' });
            this.logInfo.push(`查询传感器:${JSON.stringify(this.checkedSensors)};参数为：${JSON.stringify(res)}`);
        },
        async sendingParamsSave() {
            await this.filterChecked();
            let params = tools.filterNotNullObj(this.sendingParams);
            if (params) {
                await networkConfigApi.sendingParamsQuery({ nodeIdList: this.checkedSensors, ...params, nodeType: 'SENSOR' });
                this.logInfo.push(`设置传感器：${JSON.stringify(this.checkedSensors)}; \r\n 参数为：${JSON.stringify(params)}`);
            } else {
                this.$message.error('请填写要下发的参数');
            }
        },
        currentChange(val) {
            this.queryParams.currentPage = val;
            this.sensorNode_query();
        }
    },
    created() {
        this.sensorNode_query();
    }
};
</script>
