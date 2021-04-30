<style lang="less" module>
.activeFinding {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 10px;
    .firstRow {
        display: flex;
        justify-content: space-between;
        padding: 6px 0;
        margin-bottom: 5px;
    }
    .table {
        flex: 1;
        overflow: hidden;
        margin-bottom: 10px;
    }
}
</style>
<template>
    <div :class="$style.activeFinding">
        <div :class="$style.firstRow">
            <el-input slot="right" v-model="searchStr" suffix-icon="el-icon-search" clearable placeholder="传感器标识查询" style="width: 300px"> </el-input>
            <div>
                <el-button type="primary" :disabled="checkedRows.length === 0" @click="batchJoinSensors" v-preventReClick="2000">批量接入</el-button>
                <el-button icon="el-icon-tickets" type="primary" :disabled="dataList.length === 0" @click="exportList" v-preventReClick="2000">导出</el-button>
            </div>
        </div>
        <div :class="$style.table" v-loading="loading" ref="tableContent">
            <el-table :data="tableData" stripe :height="tableHeight" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="index" width="55">
                    <template slot="header">序号 </template>
                </el-table-column> -->
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="sensorCode" label="传感器标识"> </el-table-column>
                <el-table-column prop="sensorProperties" label="传感器属性">
                    <template slot-scope="scope">
                        {{ scope.row.sensorProperties }}
                    </template>
                </el-table-column>
                <el-table-column prop="sensorTypeName" label="传感器类型推荐"> </el-table-column>
                <el-table-column label="最近上报时间">
                    <template slot-scope="scope">
                        {{ dateFormat(scope.row.lastTime) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-connection" @click="register(scope.row)">接入</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <editSensorInfo :modalObj="modalObj" apiType="add" @confirm="query"></editSensorInfo>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import activeFindingApi from '@/api/activeFinding';
import editSensorInfo from '../sensor/editSensorInfo';
import export2Excel from '@/tools/xlsx/index';
import sensorApi from '@/api/sensor';

export default {
    name: 'activeFinding',
    components: {
        editSensorInfo
    },
    data() {
        return {
            modalObj: {
                title: '发现传感器接入',
                show: false,
                value: {
                    sensorTypeId: ''
                }
            },
            tableHeight: 0,
            searchStr: '',
            loading: true,
            checkedRows: [],
            dataList: []
        };
    },
    computed: {
        tableData() {
            if (this.searchStr) {
                return this.dataList.filter(i => {
                    return i.sensorCode.includes(this.searchStr);
                });
            } else {
                return this.dataList;
            }
        }
    },
    methods: {
        ...mapActions(['queryTotals']),
        handleSelectionChange(vals) {
            this.checkedRows = vals;
        },
        async batchJoinSensors() {
            await this.$confirm(
                '批量接入的传感器均不会挂载设备，可至【传感器接入】菜单下编辑接入,未知类型的传感器将不会接入；确认接入当前所选传感器?',
                '传感器接入',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            );
            let sensors = [];
            for (let i of this.checkedRows) {
                // 未知类型的传感器将不会接入
                if (!i.sensorTypeId) {
                    continue;
                }
                let k = {
                    interval: 300,
                    manufacturer: '',
                    powerType: '',
                    sensorCode: i.sensorCode,
                    sensorTypeId: i.sensorTypeId,
                    sensorTypeName: i.sensorTypeName,
                    equId: '',
                    phase: '',
                    location: ''
                };
                sensors.push(k);
            }

            await sensorApi.add({ sensors });
            this.$notify({
                title: '成功',
                message: '传感器接入成功',
                type: 'success'
            });
            this.queryTotals();
            this.query();
        },
        dateFormat(date) {
            return this.$tools.dateFormat(date);
        },
        register(row) {
            this.modalObj.show = true;
            this.modalObj.value = row;
        },
        exportList() {
            export2Excel(
                ['传感器标识', '传感器属性', '传感器类型', '数据最近上报时间'],
                ['sensorCode', 'sensorProperties', 'sensorTypeName', 'dataTime'],
                this.dataList,
                '传感器主动发现列表',
                [200, 400, 180, 120]
            );
        },
        async query() {
            this.loading = true;
            this.dataList = await activeFindingApi.sensorFinding();
            this.tableHeight = this.$refs.tableContent.offsetHeight;
            this.loading = false;
        }
    },
    created() {
        this.query();
    }
};
</script>
