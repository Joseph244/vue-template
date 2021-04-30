<style lang="less" module>
.container {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 10px;
    .filter {
        :global {
            .el-select {
                margin-right: 20px;
            }
        }
    }

    .content {
        flex: 1;
        overflow: hidden;
        margin-bottom: 15px;
        :global {
            .el-table .el-table__body tbody tr td:nth-last-child(3) {
                border-right: 1px solid @sConfig-border-color;
            }
        }
        .cmdOpt {
            display: flex;
            align-items: center;
            :global {
                .el-radio-group {
                    font-size: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: baseline;
                }
            }
        }
    }
}
</style>

<template>
    <div :class="$style.container">
        <filterRow>
            <div :class="$style.filter">
                <el-select
                    :value="searchParams.sensorTypeId"
                    filterable
                    clearable
                    placeholder="传感器类型"
                    @change="sensorTypeId => searchList({ sensorTypeId, currentPage: 1 })"
                >
                    <el-option v-for="(item, index) in sensorTypeList" :key="index" :value="item.sensorTypeId" :label="item.sensorTypeName"></el-option>
                </el-select>
                <!-- <el-select
                    :value="searchParams.bayUnitId"
                    filterable
                    clearable
                    placeholder="间隔单元"
                    @change="bayUnitId => searchList({ bayUnitId, currentPage: 1 })"
                >
                    <el-option v-for="(item, index) in bayUnitList" :key="index" :value="item.bayUnitId" :label="item.bayUnitName"></el-option>
                </el-select>
                <el-select
                    :value="searchParams.equTypeId"
                    filterable
                    clearable
                    placeholder="设备类型"
                    @change="equTypeId => searchList({ equTypeId, currentPage: 1 })"
                >
                    <el-option v-for="(item, index) in equTypeList" :key="index" :value="item.id" :label="item.equType"></el-option>
                </el-select> -->
                <el-select
                    :value="searchParams.onlineStatus"
                    filterable
                    clearable
                    placeholder="在线状态"
                    @change="onlineStatus => searchList({ onlineStatus, currentPage: 1 })"
                >
                    <el-option :value="1" label="在线" />
                    <el-option :value="0" label="离线" />
                </el-select>
            </div>
            <el-input
                slot="right"
                v-model="searchParams.searchStr"
                suffix-icon="el-icon-search"
                clearable
                placeholder="传感器标识查询"
                style="width: 300px"
                @change="searchList({ currentPage: 1 })"
                @keyup.enter.native="searchList({ currentPage: 1 })"
            >
            </el-input>
        </filterRow>

        <div :class="$style.content" ref="tableContent" v-loading="loading">
            <el-table :data="dataList" width="100%" :height="tableHeight" :span-method="handleSpan">
                <el-table-column prop="_i" label="序号" width="80" align="center">
                    <template slot-scope="scope">
                        {{ searchParams.pageSize * (searchParams.currentPage - 1) + scope.row._i + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="sensorCode" label="传感器标识" align="center"></el-table-column>
                <el-table-column prop="sensorType" label="传感器类型" align="center"></el-table-column>
                <el-table-column prop="equName" label="电力设备" align="center"></el-table-column>
                <el-table-column prop="location" label="安装位置" align="center"></el-table-column>
                <el-table-column prop="onlineStatus" label="在线状态" align="center" width="100">
                    <template slot-scope="scope">
                        <font color="#a2f701" v-if="scope.row.onlineStatus === 1">在线</font>
                        <font color="#87a4a4" v-if="scope.row.onlineStatus === 0">离线</font>
                    </template>
                </el-table-column>
                <el-table-column label="最近数据" align="center" width="160">
                    <template v-if="scope.row.realData.length > 0" slot-scope="scope">
                        <div v-for="(item, index) in scope.row.realData" :key="index">
                            {{ item.propertyName && item.propertyName + ':' }}{{ item.propertyVal }} {{ item.dataUnit }}
                        </div>
                    </template>
                    <div v-else>暂无数据</div>
                </el-table-column>
                <el-table-column prop="cmd.columnDisplayName" label="命令类型" style="border-left: 1px solid red;" align="center" width="160"></el-table-column>
                <el-table-column label="下发参数" align="center" width="330">
                    <template slot-scope="scope">
                        <!-- <el-switch
                            v-if="scope.row.cmd.type === 1"
                            v-model="scope.row.cmd.value"
                            @change="saveCmd(scope.row)"
                            :active-value="1"
                            :inactive-value="2"
                            active-color="#00abaa"
                            inactive-color="#849c9c"
                            active-text="开启"
                            inactive-text="关闭"
                        ></el-switch> -->
                        <el-radio-group
                            v-if="scope.row.cmd.type === 1"
                            :disabled="scope.row.onlineStatus === 0"
                            v-model="scope.row.cmd.value"
                            @change="saveCmd(scope.row)"
                        >
                            <el-radio :label="1">开启</el-radio>
                            <el-radio :label="2">关闭</el-radio>
                        </el-radio-group>
                        <template v-if="scope.row.cmd.type > 1">
                            <div :class="$style.cmdOpt">
                                <template>
                                    <el-radio-group v-model="scope.row.cmd.type" @change="chageCmdType(scope.row)" :disabled="scope.row.onlineStatus === 0">
                                        <el-radio :label="2">单参数</el-radio>
                                        <el-radio :label="3">上下限</el-radio>
                                    </el-radio-group>
                                </template>
                                <!-- <el-input v-if="scope.row.cmd.type === 2" v-model="scope.row.cmd.value" placeholder="命令参数" /> -->
                                <el-tooltip :content="scope.row.onlineStatus === 0 ? '离线传感器不可下发' : '参数必须为数字'" placement="top">
                                    <div v-if="scope.row.cmd.type === 2" class="el-input el-input--small">
                                        <input
                                            class="el-input__inner"
                                            v-model="scope.row.cmd.value"
                                            placeholder="输入命令参数"
                                            :disabled="scope.row.onlineStatus === 0"
                                            v-input-number
                                        />
                                    </div>
                                    <div v-else style="display: flex;align-items: center;">
                                        <el-input v-model="scope.row.cmd.value1" placeholder="下限" />
                                        &nbsp;~&nbsp;
                                        <el-input v-model="scope.row.cmd.value2" placeholder="上限" />
                                    </div>
                                </el-tooltip>

                                <el-button
                                    style="margin-left: 10px"
                                    type="primary"
                                    @click="saveCmd(scope.row)"
                                    :disabled="scope.row.onlineStatus === 0"
                                    :title="scope.row.onlineStatus === 0 ? '离线传感器不可下发配置' : ''"
                                    v-preventReClick="2000"
                                >
                                    下发
                                </el-button>
                            </div>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-pagination
            background
            :page-sizes="[20, 50, 100, 200]"
            :current-page.sync="searchParams.currentPage"
            :page-size.sync="searchParams.pageSize"
            @current-change="searchList"
            @size-change="searchList"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            :pager-count="5"
            style="text-align: right"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import sensorTypeApi from '@/api/sensorType.js';
import sensorApi from '@/api/sensor.js';
import tableHeightMixin from '@/plugins/mixin/tableHeightResize';
export default {
    mixins: [tableHeightMixin],
    data() {
        return {
            loading: true,
            tableHeight: 0,
            searchParams: {
                currentPage: 1,
                pageSize: 20,
                sensorTypeId: '',
                // bayUnitId: '',
                // equTypeId: '',
                onlineStatus: '',
                searchStr: ''
            },
            data: [],
            total: 0,
            sensorTypeList: []
        };
    },
    computed: {
        ...mapState({
            equTypeList: state => state.dict.equTypeList,
            bayUnitList: state => state.dict.bayUnitList,
            voltageList: state => state.dict.voltageList
        }),
        dataList() {
            const array = [];
            this.data.map((item, i) => {
                item.cmdList.map((val, j) => {
                    array.push({
                        _i: i,
                        ...item,
                        cmd: val,
                        spanRow: j === 0,
                        spanRowNum: item.cmdList.length
                    });
                });
            });
            return array;
        }
    },
    methods: {
        chageCmdType(row) {
            row.value = '';
            row.value1 = '';
            row.value2 = '';
        },
        async saveCmd(item) {
            if (item.cmd.type === 2) {
                if (!item.cmd.value) {
                    this.$message({
                        message: '命令参数不能为空！',
                        type: 'error'
                    });
                    return;
                }
                if (isNaN(item.cmd.value)) {
                    this.$message({
                        message: '命令参数只能为数字！',
                        type: 'error'
                    });
                    return;
                }
            }
            if (item.cmd.type === 3) {
                if (!item.cmd.value1 || !item.cmd.value2) {
                    this.$message({
                        message: '命令参数不能为空！',
                        type: 'error'
                    });
                    return;
                }
                if (isNaN(item.cmd.value1) || isNaN(item.cmd.value2)) {
                    this.$message({
                        message: '命令参数只能为数字！',
                        type: 'error'
                    });
                    return;
                }
                if (+item.cmd.value1 >= +item.cmd.value2) {
                    this.$message({
                        message: '下限值不可大于等于上限',
                        type: 'error'
                    });
                    return;
                }
            }
            const params = {
                sensorId: item.sensorId,
                sensorCode: item.sensorCode,
                columnCode: item.cmd.columnCode,
                columnId: item.cmd.columnId,
                type: item.cmd.type
            };
            if (item.cmd.type < 3) {
                params.value = [item.cmd.value];
            } else {
                params.value = [item.cmd.value1, item.cmd.value2];
            }
            await sensorApi.saveSensorCmd(params);
            this.$notify({
                title: '成功',
                message: '下发命令成功',
                type: 'success'
            });
        },
        // 列表检索
        async searchList(params = {}) {
            this.loading = true;
            this.searchParams = { ...this.searchParams, ...params };
            const res = await sensorApi.getSensorCmdList(this.searchParams);
            this.total = res.count;
            this.data = res.list;
            this.loading = false;
        },

        handleSpan({ row, column, rowIndex, columnIndex }) {
            if ([0, 1, 2, 3, 4, 5, 6].includes(columnIndex)) {
                return row.spanRow ? [row.spanRowNum, 1] : [0, 0];
            }
        }
    },
    async mounted() {
        this.$nextTick(() => (this.tableHeight = this.$refs.tableContent.offsetHeight));
        this.searchList();
        this.sensorTypeList = await sensorTypeApi.query();
    }
};
</script>
