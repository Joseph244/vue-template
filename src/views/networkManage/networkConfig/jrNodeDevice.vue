<style lang="less" module>
.jrNodeDevice {
    > h3 {
        color: #00ffff;
        border-bottom: 1px solid #006666;
        padding-bottom: 8px;
        margin-bottom: 10px;
    }
    .bread {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 4px 0;
        border-bottom: 1px dashed rgba(0, 153, 153, 0.4);
        .breadTitle {
            color: #00ffff;
            text-decoration: underline;
            i {
                margin-right: 4px;
            }
        }
    }

    .servermanage {
    }
}
</style>
<template>
    <div :class="$style.jrNodeDevice">
        <pageBread title="接入节点【边缘】配置"></pageBread>
        <configBaseInfo :baseInfo="baseInfo" :runInfo="runInfo" @runInfoRefresh="runInfoRefresh" @reboot="reboot"></configBaseInfo>
        <h3>服务应用管理【{{ total }}】</h3>
        <div :class="$style.servermanage">
            <el-table ref="singleTable" :data="serverList" highlight-current-row style="width: 100%;">
                <el-table-column type="index" label="序号" width="50"> </el-table-column>
                <el-table-column prop="appName" label="服务/应用/组件名称"> </el-table-column>
                <el-table-column prop="containername" label="容器名称"> </el-table-column>
                <el-table-column prop="typeCode" label="类型">
                    <template slot-scope="scope">
                        {{ serverTypeDict[scope.row.typeCode] }}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 1" style="color: #66cc33;"> <i class="el-icon-video-play"></i>运行 </span>
                        <span v-if="scope.row.status == 2" style="color: #ff0000;"> <i class="el-icon-switch-button"></i>关机 </span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="160"> </el-table-column>
                <el-table-column label="操作" width="260">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status == 2" size="mini" type="success" @click="edgePanel_serverControl(scope.row, 'start')">开机</el-button>
                        <el-button size="mini" v-if="scope.row.status == 1" type="danger" @click="edgePanel_serverControl(scope.row, 'stop')">关机</el-button>
                        <el-button size="mini" type="warning" @click="edgePanel_serverControl(scope.row, 'restart')">重启</el-button>
                        <el-upload
                            :http-request="httpRequest"
                            action
                            :multiple="false"
                            :show-file-list="false"
                            style="display: inline-block; margin-left: 10px;"
                        >
                            <el-button size="mini" type="info" @click="selectRow(scope.row)">上传配置</el-button>
                        </el-upload>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import pageBread from './modules/pageBread';
import networkConfigApi from '@/api/networkConfig';
import configBaseInfo from './modules/configBaseInfo';
const cmdDict = {
    start: '开机',
    stop: '关机',
    restart: '重启'
};
export default {
    name: 'jrNodeDevice',
    components: { pageBread, configBaseInfo },
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
                brotherId: '',
                totalStorage: '',
                totalMem: ''
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
            serverList: [],
            total: 0,
            serverTypeDict: {
                1: '框架',
                2: '内置应用',
                3: '第三方应用'
            },
            row: null
        };
    },
    computed: {
        nodeId() {
            return this.$route.query.nodeId || null;
        }
    },
    methods: {
        selectSensorType(val) {
            this.$refs.sensorWhiteListRef.clearAll();
            this.sensorType = val;
        },
        httpRequest(e) {
            let file = e.file; // 文件信息
            if (!file) {
                // 没有文件
                return false;
            }
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = e => {
                let base64 = e.target.result;
                console.log('Base64：' + base64);
                base64 = base64.substring(base64.indexOf(',') + 1); // 去除base64头
                this.edgePanel_serverConfig(file.name, base64);
            };
        },
        selectRow(row) {
            this.row = row;
        },
        // 文件内容转为base64上传
        async edgePanel_serverConfig(fileName, configInfo) {
            await networkConfigApi.edgePanel_serverConfig({
                nodeId: this.nodeId,
                brotherId: this.baseInfo.brotherId,
                appName: this.row.appName,
                fileName,
                configInfo
            });
            this.$notify({
                title: '成功',
                message: `【${this.row.appName}】配置上传成功`,
                type: 'success'
            });
        },
        async edgePanel_serverControl(row, cmd) {
            await networkConfigApi.edgePanel_serverControl({ nodeId: this.nodeId, brotherId: this.baseInfo.brotherId, containerName: row.containername, cmd });
            this.$notify({
                title: `容器：【${row.containername}】`,
                message: `${cmdDict[cmd]}成功`,
                type: 'success'
            });
        },
        async edgePanel_queryServerList() {
            const res = await networkConfigApi.edgePanel_queryServerList({ nodeId: this.nodeId, brotherId: this.baseInfo.brotherId, panelType: 'DEVICE' });
            this.serverList = res.containerList;
            this.total = res.total;
        },
        async reboot() {
            await networkConfigApi.jrNode_reboot({ nodeId: this.nodeId, brotherId: this.baseInfo.brotherId, panelType: 'DEVICE' });
            this.$notify({
                title: '成功',
                message: '节点重启中，请稍后',
                type: 'success'
            });
        },
        async runInfoRefresh() {
            this.runInfo = await networkConfigApi.jrNode_statusInfoQuery({ stationId: this.baseInfo.stationId, nodeId: this.nodeId, panelType: 'DEVICE' });
        }
    },
    async created() {
        this.baseInfo = await networkConfigApi.jrNode_basicInfoQuery({ nodeId: this.nodeId, panelType: 'DEVICE' });
        await this.runInfoRefresh();
        await this.edgePanel_queryServerList();
    }
};
</script>
