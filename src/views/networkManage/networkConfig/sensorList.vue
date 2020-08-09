<style lang="less" module>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .filter {
        padding: 15px 0;
        color: #00ffff;
        .opt {
            float: right;
        }
    }

    .content {
        flex: 1;
        overflow: hidden;
        margin-bottom: 20px;

        .detail {
            display: flex;
            justify-content: space-between;
            padding: 10px 20px;
            color: #00fff6;
            font-size: 15px;

            .left {
                display: flex;
                align-items: center;

                > label {
                    color: #58f344;
                    margin-right: 10px;
                }
                > div {
                    margin-right: 40px;
                }
            }
            .right {
                > span {
                    color: #58f344;
                    margin-right: 20px;
                }
                > a {
                    cursor: pointer;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
</style>

<template>
    <div :class="$style.container">
        <div :class="$style.filter">
            <label>类型</label>
            <el-select clearable v-model="searchParams.sensorType" placeholder="请选择传感器类型" style="margin: 0 20px 0 10px" @change="search">
                <el-option v-for="(item, index) in sensorTypeList" :key="index" :value="item.value" :label="item.name"></el-option>
            </el-select>
            <el-input v-model="searchParams.searchId" clearable placeholder="请输入设备ID" style="width: 300px" @keyup.enter.native="search">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
            <div :class="$style.opt">
                <el-button type="primary" @click="resetSensor">复位</el-button>
                <el-button type="primary" @click="config">批量配置</el-button>
            </div>
        </div>

        <div :class="$style.content" ref="content">
            <el-table v-if="tableShow" :data="data" border :max-height="tableMaxHeight" @selection-change="selectSensor" ref="table">
                <el-table-column type="expand" width="50">
                    <template slot-scope="scope">
                        <div :class="$style.detail">
                            <div :class="$style.left">
                                <label>当前状态：</label>
                                <div><i class="fa fa-signal"></i> 信号强度：{{ scope.row.signal }}</div>
                                <div><i class="fa fa-battery-half"></i> 剩余电量：{{ scope.row.power }}</div>
                            </div>
                            <div :class="$style.right">
                                <span><i class="el-icon-time"></i> 刷新时间：{{ scope.row.refreshTime }}</span>
                                <a @click="refreshInfo(scope.row)"><i class="el-icon-refresh-right"></i> 刷新</a>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="50"> </el-table-column>
                <el-table-column prop="nodeId" label="设备ID"> </el-table-column>
                <el-table-column prop="sensorType" label="设备类型"> </el-table-column>
                <el-table-column prop="stationName" label="站点名称"> </el-table-column>
                <el-table-column prop="parentId" label="父节点ID"> </el-table-column>
                <el-table-column prop="version" label="版本"> </el-table-column>
                <el-table-column prop="factory" label="厂商"> </el-table-column>
                <el-table-column prop="onlineStatus" label="在线状态">
                    <template slot-scope="scope">{{ { 1: '在线', 0: '离线' }[scope.row.onlineStatus] }}</template>
                </el-table-column>
            </el-table>
        </div>

        <el-pagination
            background
            layout="total, prev, pager, next, sizes"
            :current-page="searchParams.currentPage"
            :page-size="searchParams.pageSize"
            @current-change="currentPage => search({ currentPage })"
            @size-change="pageSize => search({ currentPage: 1, pageSize })"
            :pager-count="5"
            :total="total"
        />
    </div>
</template>

<script>
import api from '@/api/networkConfigList';

export default {
    props: ['stationIdList'],
    data() {
        return {
            tableShow: false,
            tableMaxHeight: 0,
            searchParams: {
                sensorType: '',
                searchId: '',
                currentPage: 1,
                pageSize: 20
            },
            sensorTypeList: [],
            total: 0,
            data: [],
            selectedSensorIds: []
        };
    },
    methods: {
        selectSensor(list) {
            this.selectedSensorIds = list.map(item => item.nodeId);
        },
        async resetSensor() {
            if (this.selectedSensorIds.length === 0) {
                this.$message({ message: '清先选择需要复位的传感器！', type: 'warning' });
                return false;
            }
            await api.sensorNode_reset({
                sensorIds: this.selectedSensorIds
            });
            this.selectedSensorIds = [];
            this.$refs.table.clearSelection();
            this.$message({ message: '传感器复位成功！', type: 'success' });
        },
        async refreshInfo(item) {
            const res = await api.sensorNode_queryStatus({
                nodeId: item.nodeId,
                stationId: item.stationId
            });
            Object.assign(item, res);
        },
        async search(params) {
            if (params) this.searchParams = { ...this.searchParams, ...params };
            if (this.stationIdList.length === 0) return false;
            const res = await api.sensorNode_query({
                ...this.searchParams,
                stationIdList: this.stationIdList
            });
            this.data = res.dataList || [];
            this.total = res.total;
        },
        getSensorTypeList() {
            const array = [];
            for (const key in this.SENSORTYPES) {
                array.push({ name: this.SENSORTYPES[key], value: key });
            }
            this.sensorTypeList = array;
        },
        config(row) {
            if (this.stationIdList) {
                this.$router.push({ path: '/networkConfig/sensorsConfig', query: { stationIdList: this.stationIdList } });
            } else {
                console.error('stationIdList缺失', row);
            }
        }
    },
    watch: {
        stationIdList(val) {
            this.search();
        }
    },
    mounted() {
        this.tableMaxHeight = this.$refs.content.offsetHeight;
        this.tableShow = true;
        this.getSensorTypeList();
        this.search();
    }
};
</script>
