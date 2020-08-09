<style lang="less" module>
.jrNodeMCB {
    > h3 {
        color: #00ffff;
        border-bottom: 1px solid #006666;
        padding-bottom: 10px;
    }

    .configInfo {
        display: grid;
        grid-template-columns: calc(50% - 10px) calc(50% - 10px);
        grid-column-gap: 20px;
        padding: 14px 0 0 20px;

        .left {
            .leftTitleRow {
                padding-bottom: 4px;
                border-bottom: 1px solid #006666;
                display: flex;
                justify-content: space-between;
                .title {
                    color: #00ffff;
                    font-size: 15px;
                    font-weight: bold;
                }
                &:not(:first-child) {
                    margin-top: 14px;
                }
            }

            .sensorWhiteListType {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                .sensorTypeTitle {
                    color: #00ffff;
                    font-size: 15px;
                    > span {
                        cursor: pointer;
                        &:hover {
                            color: @color-hover;
                        }
                        &:first-child::after {
                            content: '|';
                            color: #00ffff;
                            margin: 0 10px;
                        }
                    }
                }
                .templateDownload {
                    margin-right: 10px;
                    color: #059c9c;
                    text-decoration: underline;
                    font-style: italic;
                    cursor: pointer;
                    i {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div :class="$style.jrNodeMCB">
        <pageBread title="接入节点【主控】配置"></pageBread>
        <configBaseInfo :baseInfo="baseInfo" :runInfo="runInfo" @runInfoRefresh="runInfoRefresh" @reboot="reboot"></configBaseInfo>
        <h3>配置信息</h3>
        <div :class="$style.configInfo">
            <div :class="$style.left">
                <sendingParams @query="sendingParamsQuery" @setting="settingSendParams"></sendingParams>
                <div :class="$style.leftTitleRow">
                    <span :class="$style.title">汇聚节点白名单</span>
                    <span>
                        <el-button size="mini" type="success" @click="masterPanel_hjNodeWhiteList">查询</el-button>
                        <el-button size="mini" type="success" @click="resetWhiteList('mcbHjWhiteList')">重置</el-button>
                    </span>
                </div>
                <addItemSetting @setting="settingHjWhiteList"></addItemSetting>

                <div :class="$style.leftTitleRow">
                    <span :class="$style.title">传感器白名单</span>
                    <span>
                        <el-button size="mini" type="success" @click="sensorWhiteListQuery">查询</el-button>
                        <el-button size="mini" type="success" @click="resetWhiteList('mcbSensorWhiteList')">重置</el-button>
                    </span>
                </div>
                <div :class="$style.sensorWhiteListType">
                    <span :class="$style.sensorTypeTitle">
                        <span
                            :style="{ color: sensorType == item ? '#fcc400' : '' }"
                            v-for="item in Object.keys(SENSORTYPES)"
                            :key="item"
                            @click="selectSensorType(item)"
                            >{{ SENSORTYPES[item] }}</span
                        >
                    </span>
                    <span>
                        <a :class="$style.templateDownload" download="批量导入传感器模板.xlsx" href="/sensorTemplate.xlsx"
                            ><i class="el-icon-download"></i>传感器导入模板</a
                        >

                        <UploadParseExcel @excelData="batchAddSensorList">
                            <el-button size="mini" type="info">批量导入</el-button>
                        </UploadParseExcel>
                    </span>
                </div>
                <addItemSetting ref="sensorWhiteListRef" @setting="settingSensorWhiteList"></addItemSetting>
            </div>
            <logContent :logInfo="logInfo"></logContent>
        </div>
    </div>
</template>
<script>
import networkConfigApi from '@/api/networkConfig';
import configBaseInfo from './modules/configBaseInfo';
import logContent from './modules/logContent';
import addItemSetting from './modules/addItemSetting';
import sendingParams from './modules/sendingParams';
import pageBread from './modules/pageBread';
const whiteListType = {
    hjWhiteList: '汇聚节点白名单',
    sensorWhiteList: '传感器白名单'
};
let refreshStatusCount = 0;
export default {
    name: 'jrNodeMCB',
    components: { pageBread, configBaseInfo, logContent, addItemSetting, sendingParams },
    data() {
        return {
            baseInfo: {
                panelId: '',
                panelType: '',
                stationName: '',
                stationId: '',
                majorType: '',
                factory: '',
                softwareVersion: '',
                hardwareVersion: '',
                brotherId: ''
            },
            runInfo: {
                memory: '',
                cpu: '',
                storage: '',
                dataRate: '',
                bootTime: '',
                refreshTime: '',
                status: '',
                alertCount: ''
            },

            sensorType: 0,
            logInfo: []
        };
    },
    computed: {
        nodeId() {
            return this.$route.query.nodeId || null;
        }
    },
    methods: {
        // 微功耗or低功率
        batchAddSensorList(data) {
            console.log(data);
            let wgh = data.filter(i => i['传感器类型'] === '微功耗');
            let wghArr = [];
            for (let x of wgh) {
                wghArr.push(x['传感器ID']);
            }

            let dgl = data.filter(i => i['传感器类型'] === '低功率');
            let dglArr = [];
            for (let x of dgl) {
                dglArr.push(x['传感器ID']);
            }
            this.settingSensorWhiteList(wghArr, 0);
            this.settingSensorWhiteList(dglArr, 1);
        },
        async settingSendParams(params) {
            await networkConfigApi.sendingParamsSave({ ...params, nodeIdList: [{ nodeId: this.nodeId, brotherId: this.baseInfo.brotherId }], nodeType: 'MCB' });
            this.logInfo.push(`通讯参数设置:${JSON.stringify(params)}`);
            this.$notify({
                title: '成功',
                message: `通讯参数设置已下发`,
                type: 'success'
            });
        },
        selectSensorType(val) {
            this.$refs.sensorWhiteListRef.clearAll();
            this.sensorType = val;
        },
        async resetWhiteList(type) {
            await networkConfigApi.resetWhiteList({ resetType: type, nodeId: this.nodeId, brotherId: this.baseInfo.brotherId });
            this.logInfo.push(`${whiteListType[type]}白名单重置`);
            this.$notify({
                title: '成功',
                message: `${whiteListType[type]}重置命令已下发`,
                type: 'success'
            });
        },
        async reboot() {
            await networkConfigApi.jrNode_reboot({ nodeId: this.nodeId, brotherId: this.baseInfo.brotherId, panelType: 'MCB' });
            this.logInfo.push(`节点重启`);
            this.$notify({
                title: '成功',
                message: '节点重启中，请稍后',
                type: 'success'
            });
        },
        async settingHjWhiteList(whiteList) {
            await networkConfigApi.masterPanel_hjNodeWhiteListSet({ whiteList, nodeId: this.nodeId, brotherId: this.baseInfo.brotherId });
            this.logInfo.push(`汇聚节点白名单设置:${JSON.stringify(whiteList)}`);
            this.$notify({
                title: '成功',
                message: `汇聚节点白名单设置中，请稍后`,
                type: 'success'
            });
        },
        async settingSensorWhiteList(whiteList, sensorType) {
            let _st = sensorType || this.sensorType;
            await networkConfigApi.sensorWhiteListSet({ nodeId: this.nodeId, whiteList, brotherId: this.baseInfo.brotherId, sensorType: _st, nodeType: 'MCB' });
            this.logInfo.push(`${this.SENSORTYPES[_st]}传感器白名单设置:${JSON.stringify(whiteList)}`);
            this.$notify({
                title: '成功',
                message: `传感器白名单设置中，请稍后`,
                type: 'success'
            });
        },
        async sendingParamsQuery() {
            let data = await networkConfigApi.sendingParamsQuery({
                nodeIdList: [{ nodeId: this.nodeId, brotherId: this.baseInfo.brotherId }],
                nodeType: 'MCB'
            });
            this.logInfo.push(`通讯参数:${JSON.stringify(data)}`);
        },
        async masterPanel_hjNodeWhiteList() {
            let data = await networkConfigApi.masterPanel_hjNodeWhiteList({ nodeId: this.nodeId, brotherId: this.baseInfo.brotherId });
            this.logInfo.push(`汇聚节点白名单:${JSON.stringify(data)}`);
        },
        async sensorWhiteListQuery() {
            let data = await networkConfigApi.sensorWhiteListQuery({ nodeId: this.nodeId, brotherId: this.baseInfo.brotherId, nodeType: 'MCB' });
            this.logInfo.push(`传感器白名单: 微功率 ${JSON.stringify(data.wglSensorIds)};低功耗 ${JSON.stringify(data.wglSensorIds)}`);
        },
        async runInfoRefresh() {
            this.runInfo = await networkConfigApi.jrNode_statusInfoQuery({ stationId: this.baseInfo.stationId, nodeId: this.nodeId, panelType: 'MCB' });
            if (refreshStatusCount > 0) {
                this.logInfo.push(`节点状态信息刷新`);
            }
            refreshStatusCount++;
        }
    },
    async created() {
        this.baseInfo = await networkConfigApi.jrNode_basicInfoQuery({ nodeId: this.nodeId, panelType: 'MCB' });
        await this.runInfoRefresh();
    }
};
</script>
