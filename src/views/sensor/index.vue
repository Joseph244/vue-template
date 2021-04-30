<style lang="less" module>
.sensorView {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 10px;

    .content {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .table {
            flex: 1;
            overflow: hidden;
            margin-bottom: 10px;
            .onlineColor {
                color: @color-success;
            }
            .offlineColor {
                color: @color-warning;
            }
        }
    }
    .searchItem {
        width: 140px;
        margin-right: 20px;
    }
    :global {
        .sensorErrorPopover {
            color: white;
            label {
                color: @color-danger;
                font-weight: bold;
            }
            .sensorError {
                color: @color-danger;
                text-decoration: underline;
            }
        }
    }
}
</style>
<template>
    <div :class="$style.sensorView">
        <filterRow>
            <div>
                <el-select
                    v-model="searchParams.onlineStatus"
                    clearable
                    placeholder="是否在线"
                    @change="v => query({ currentPage: 1 })"
                    :class="$style.searchItem"
                >
                    <el-option v-for="(item, index) in sensorOnlineFilterArr" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-select
                    v-model="searchParams.ifMountEqu"
                    placeholder="是否挂载设备"
                    clearable
                    @change="v => query({ currentPage: 1 })"
                    :class="$style.searchItem"
                >
                    <el-option label="已挂载设备" :value="1"></el-option>
                    <el-option label="未挂载设备" :value="2"></el-option>
                </el-select>
                <el-cascader
                    placeholder="选择电力设备"
                    @change="filterEqu(equId)"
                    :options="equTreeData"
                    v-model="equId"
                    clearable
                    :props="cascaderProps"
                    :show-all-levels="false"
                    :class="$style.searchItem"
                ></el-cascader>
                <el-select
                    v-model="searchParams.registrationStatus"
                    clearable
                    placeholder="平台是否注册"
                    @change="v => query({ currentPage: 1 })"
                    :class="$style.searchItem"
                >
                    <el-option label="平台已注册" :value="1"></el-option>
                    <el-option label="平台未注册" :value="0"></el-option>
                </el-select>
                <el-select
                    v-model="searchParams.frameRegStatus"
                    clearable
                    placeholder="框架是否注册"
                    @change="v => query({ currentPage: 1 })"
                    :class="$style.searchItem"
                >
                    <el-option label="框架已注册" :value="1"></el-option>
                    <el-option label="框架未注册" :value="0"></el-option>
                </el-select>
                <el-select
                    v-model="searchParams.sensorErrorType"
                    clearable
                    placeholder="传感器异常状态"
                    @change="v => query({ currentPage: 1 })"
                    :class="$style.searchItem"
                >
                    <el-option v-for="k in Object.keys(sensorErrorTypeList)" :key="k" :value="k" :label="sensorErrorTypeList[k]"></el-option>
                </el-select>
                <el-input
                    slot="right"
                    v-model="searchParams.searchStr"
                    suffix-icon="el-icon-search"
                    clearable
                    placeholder="传感器标识查询"
                    style="width: 240px"
                    @change="query({ currentPage: 1 })"
                    @keyup.enter.native="query({ currentPage: 1 })"
                >
                </el-input>
            </div>
            <div slot="right">
                <el-button icon="el-icon-upload" type="primary" @click="plantformPush" v-preventReClick="2000">平台上报</el-button>
                <el-button icon="el-icon-download" type="primary" @click="plantformPull">平台拉取</el-button>
                <el-button icon="el-icon-upload2" type="primary" @click="batchImport">批量导入</el-button>
                <el-button icon="el-icon-plus" type="primary" @click="add">新增</el-button>
                <el-button :disabled="selectedRows.length == 0" type="primary" @click="exportSelected" autofocusicon="el-icon-download">导出</el-button>
                <el-button :disabled="selectedRows.length == 0" icon="el-icon-delete" type="primary" @click="delSelected()">删除</el-button>
            </div>
        </filterRow>

        <div :class="$style.content">
            <div :class="$style.table" v-loading="loading" ref="tableContent">
                <el-table :data="dataList" stripe ref="multipleTable" :height="tableHeight" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"> </el-table-column>
                    <el-table-column prop="sensorCode" label="传感器标识"> </el-table-column>
                    <el-table-column prop="sensorTypeName" label="传感器类型"> </el-table-column>
                    <el-table-column prop="equName" label="电力设备">
                        <template slot-scope="scope">
                            <span v-if="scope.row.equId">{{ scope.row.equName }}</span>
                            <span v-else :class="$style.offlineColor">暂未挂载电力设备</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="安装位置">
                        <template slot-scope="scope">
                            {{ scope.row.phase ? `${scope.row.location}-${scope.row.phase}` : scope.row.location }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="online" label="在线状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.online === 1" :class="$style.onlineColor">在线</span>
                            <span v-else :class="$style.offlineColor"> 离线</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="online" label="异常">
                        <template slot-scope="scope">
                            {{ sensorErrorTypeList[scope.row.sensorErrorType] }} || "无异常"
                            <!-- <el-popover popper-class="sensorErrorPopover" v-if="scope.row.sensorErrorType > 0" placement="top-start" trigger="hover">
                                <div v-if="scope.row.sensorErrorType == 2">
                                    {{ sensorErrorTypeList[scope.row.sensorErrorType] }}
                                    <div><label>框架属性：</label>{{ sensor.errorDetail.sensorTypeParams.join(',') }}</div>
                                    <div><label>当前属性：</label>{{ sensor.errorDetail.currentParams.join(',') }}</div>
                                </div>
                                <span v-else
                                    ><label>{{ sensorErrorTypeList[scope.row.sensorErrorType] }}：</label>{{ sensor.errorDetail }}</span
                                >
                                <a :class="$style.sensorError" slot="reference">{{ sensorErrorTypeList[scope.row.sensorErrorType] }}</a>
                            </el-popover>
                            <a v-else>无</a> -->
                        </template>
                    </el-table-column>
                    <el-table-column prop="frameStatus" label="框架注册">
                        <template slot-scope="scope">
                            <span v-if="scope.row.frameStatus === 1">已注册</span>
                            <span v-else :class="$style.offlineColor"> 未注册</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="registrationStatus" label="平台注册">
                        <template slot-scope="scope">
                            <span v-if="scope.row.registrationStatus === 1">已注册</span>
                            <span v-else :class="$style.offlineColor"> 未注册</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <!-- <el-button type="primary" @click="bindEqu(scope.row)">绑定设备</el-button> -->
                            <el-button type="warning" icon="el-icon-edit" @click="editSensor(scope.row)">编辑</el-button>
                            <el-button type="danger" icon="el-icon-delete" @click="delSelected(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <el-pagination
                background
                layout="total, prev, pager, next, sizes"
                :current-page.sync="searchParams.currentPage"
                :page-size.sync="searchParams.pageSize"
                :page-sizes="[20, 50, 100, 200]"
                @current-change="query"
                @size-change="query"
                :pager-count="5"
                :total="total"
                style="text-align: right"
            />
        </div>
        <addSensorModal :modalObj="addSensorModalObj"></addSensorModal>
        <editSensorInfo :modalObj="editSensorInfoObj"></editSensorInfo>
        <batchAddSensorModal :modalObj="batchAddSensorModalObj"></batchAddSensorModal>
        <!-- <sensorBindingEquModal :modalObj="sensorBindingEquModalObj" @confirm="confirmBindEqu"></sensorBindingEquModal> -->
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import export2Excel from '@/tools/xlsx/index';
import sensorApi from '@/api/sensor';
import equApi from '@/api/equ';
import batchAddSensorModal from './batchAddSensorModal';
import addSensorModal from './addSensorModal.vue';
import editSensorInfo from './editSensorInfo.vue';
import sensorBindingEquModal from './sensorBindingEquModal';
import tableHeightMixin from '@/plugins/mixin/tableHeightResize';
export default {
    name: 'sensorView',
    mixins: [tableHeightMixin],
    components: {
        addSensorModal,
        editSensorInfo,
        batchAddSensorModal
    },
    data() {
        return {
            sensorOnlineFilterArr: [
                {
                    label: '在线',
                    value: 1
                },
                {
                    label: '离线',
                    value: 2
                }
            ],
            sensorErrorTypeList: {
                1: '规约异常',
                2: '模型异常',
                3: '无异常'
            },
            cascaderProps: {
                emitPath: false,
                value: 'id',
                label: 'name'
            },
            equId: null, // 选中的设备id
            equTreeData: [],
            addSensorModalObj: {
                show: false
            },
            editSensorInfoObj: {
                title: '编辑传感器',
                show: false,
                value: {
                    sensorTypeId: null
                }
            },
            batchAddSensorModalObj: {
                show: false
            },
            sensorBindingEquModalObj: {
                show: false,
                value: null
            },
            searchParams: {
                onlineStatus: '',
                sensorErrorType: '',
                ifMountEqu: '', // 0 全部，1已挂载，2未挂载
                registrationStatus: '', // （2 全部，1 已注册，0未注册）
                frameRegStatus: '', // （2 全部，1 已注册，0未注册）
                currentPage: 1,
                pageSize: 50,
                searchStr: ''
            },
            loading: false,
            total: 0,
            dataList: [],
            selectedRows: [],
            tableHeight: 0
        };
    },
    computed: {},
    watch: {},
    methods: {
        ...mapActions(['queryTotals']),
        filterEqu(equId) {
            if (equId) {
                this.searchParams.ifMountEqu = 1;
            }

            this.query({ equId });
        },
        bindEqu(row) {
            this.sensorBindingEquModalObj.show = true;
            this.sensorBindingEquModalObj.value = JSON.parse(JSON.stringify(row));
        },
        async confirmBindEqu(val) {
            await sensorApi.sensorBindEqu(val);
            await this.$notify({
                title: '成功',
                message: '绑定设备成功',
                type: 'success'
            });
            this.query();
        },
        editSensor(row) {
            this.editSensorInfoObj.value = row;
            this.editSensorInfoObj.show = true;
        },

        batchImport() {
            this.batchAddSensorModalObj.show = true;
        },
        async plantformPush() {
            try {
                await this.$confirm('将所有传感器台账推送云平台, 是否继续?', '推送传感器台账到云平台', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                await sensorApi.push();
                await this.$notify({
                    title: '成功',
                    message: '传感器台账向云端推送命令已发送，稍候请刷新',
                    type: 'success'
                });
            } catch (err) {}
        },
        async plantformPull() {
            try {
                await this.$confirm('确认从平台拉取所有传感器, 是否继续?', '拉取传感器', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                await sensorApi.pull();
                this.$notify({
                    title: '成功',
                    message: '平台拉取传感器信息已发送，稍候请刷新',
                    type: 'success'
                });
            } catch (err) {}
        },

        add() {
            this.addSensorModalObj.show = true;
        },
        async exportSelected() {
            try {
                await this.$confirm('确认导出当前所选传感器, 是否继续?', '导出传感器', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                // TODO 导出文件
                export2Excel(
                    ['传感器标识', '传感器类型', '挂载电力设备', '安装位置', '相位', '在线状态'],
                    ['sensorCode', 'sensorTypeName', 'equName', 'location', 'phase', 'online'],
                    this.selectedRows,
                    '传感器导出列表',
                    [200, 200, 200, 120, 80, 80]
                );
            } catch (err) {
                this.$refs.multipleTable.clearSelection();
                this.selectedRows = [];
            }
        },
        async delSelected(val) {
            try {
                let sensors = [];
                let sns = [];
                if (val) {
                    this.selectedRows = [val];
                }
                await this.$confirm('此操作将删除所选传感器, 是否继续?', '删除传感器', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });

                for (let i of this.selectedRows) {
                    sensors.push(i.sensorCode);
                    i.sn && sns.push(i.sn);
                }
                await sensorApi.del({ sensors, sns });

                this.$notify({
                    title: '成功',
                    message: '传感器删除成功',
                    type: 'success'
                });
                this.query();
            } catch (err) {
                this.$refs.multipleTable.clearSelection();
                this.selectedRows = [];
            }
        },

        handleSelectionChange(rows) {
            this.selectedRows = rows;
        },
        async query(params) {
            this.loading = true;
            let p = JSON.parse(JSON.stringify({ ...this.searchParams, ...params }));
            !p.ifMountEqu && (p.ifMountEqu = 0);
            p.registrationStatus === '' && (p.registrationStatus = 2);
            p.frameRegStatus === '' && (p.frameRegStatus = 2);
            let { total, list } = await sensorApi.query({ ...p });
            this.dataList = list;
            this.total = total;
            this.loading = false;
            this.tableHeight = this.$refs.tableContent.offsetHeight;
            this.queryTotals();
        }
    },
    async created() {
        this.query();
        this.equTreeData = await equApi.treeQuery({ mountedSensor: 1 });
    }
};
</script>
