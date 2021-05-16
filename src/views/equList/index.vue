<style lang="less" module>
.equList {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
    .firstRow {
        :global {
            .el-select {
                margin-left: 20px;
            }
        }
    }
    .content {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .table {
            flex: 1;
            overflow: hidden;
            margin-bottom: 15px;
        }
    }
    :global {
        .el-input {
            width: 200px;
        }
    }
}
</style>
<template>
    <div :class="$style.equList">
        <filterRow :class="$style.firstRow">
            <el-input
                v-model="searchParams.searchStr"
                suffix-icon="el-icon-search"
                clearable
                placeholder="设备名称查询"
                @change="query({ currentPage: 1 })"
                @keyup.enter.native="query({ currentPage: 1 })"
            >
            </el-input>
            <el-select v-model="searchParams.voltageId" clearable placeholder="电压等级查询" @change="v => query()">
                <el-option v-for="(item, index) in voltageList" :key="index" :label="item.voltage" :value="item.voltage"></el-option>
            </el-select>
            <el-select v-model="searchParams.equTypeId" clearable placeholder="设备类型查询" @change="v => query()">
                <el-option v-for="(item, index) in equTypeList" :key="index" :label="item.equType" :value="item.id"></el-option>
            </el-select>
            <el-select v-model="searchParams.bayUnitId" clearable placeholder="间隔单元查询" @change="v => query()">
                <el-option v-for="(item, index) in bayUnitList" :key="index" :label="item.bayUnitName" :value="item.bayUnitId"></el-option>
            </el-select>
            <span slot="right">
                <el-button icon="el-icon-upload" type="primary" @click="plantformPush" v-preventReClick="2000">平台上报</el-button>
                <el-button icon="el-icon-download" type="primary" @click="plantformPull">平台拉取</el-button>
                <el-button icon="el-icon-s-order" type="primary" @click="importEqus">批量导入</el-button>
                <el-button icon="el-icon-plus" type="primary" @click="add">新增</el-button>
            </span>
        </filterRow>
        <div :class="$style.content">
            <div :class="$style.table" v-loading="loading" ref="tableContent">
                <el-table :data="dataList" stripe ref="multipleTable" :height="tableHeight">
                    <el-table-column type="index" width="55">
                        <template slot="header">序号 </template>
                    </el-table-column>
                    <el-table-column prop="equId" label="设备ID"> </el-table-column>
                    <el-table-column prop="equName" label="设备名称"> </el-table-column>
                    <el-table-column prop="bayUnitName" label="间隔单元"> </el-table-column>
                    <el-table-column prop="equTypeName" label="设备类型"> </el-table-column>
                    <el-table-column prop="voltage" label="电压等级"> </el-table-column>

                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button type="warning" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
                            <el-button type="danger" icon="el-icon-delete" @click="del(scope.row)">删除</el-button>
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
        <batchImportEqus :modalObj="batchImportEqusModalObj" @confirm="query"></batchImportEqus>
    </div>
</template>
<script>
import equApi from '@/api/equ';
import { mapState, mapMutations, mapActions } from 'vuex';
import batchImportEqus from './importExcel2Json.vue';
import tableHeightMixin from '@/plugins/mixin/tableHeightResize';
export default {
    name: 'equList',
    mixins: [tableHeightMixin],
    components: {
        batchImportEqus
    },
    data() {
        return {
            addEditEquModalObj: {
                show: false
            },
            batchImportEqusModalObj: {
                show: false
            },
            searchParams: {
                searchStr: '',
                equTypeId: '',
                bayUnitId: '',
                voltageId: '',
                currentPage: 1,
                pageSize: 50
            },
            total: 0,
            loading: false,
            dataList: [],
            tableHeight: 0
        };
    },
    computed: {
        ...mapState({
            equTypeList: state => state.dict.equTypeList,
            bayUnitList: state => state.dict.bayUnitList,
            voltageList: state => state.dict.voltageList
        })
    },
    methods: {
        ...mapActions(['queryTotals']),
        importEqus() {
            this.batchImportEqusModalObj.show = true;
        },
        async plantformPull() {
            try {
                await this.$confirm('从云平台拉取设备台账, 是否继续?', '从云平台拉取设备台账', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                await equApi.pull();
                await this.$notify({
                    title: '成功',
                    message: '从云平台拉取设备台账命令已发送，稍候请刷新',
                    type: 'success'
                });
            } catch (err) {}
        },
        async plantformPush() {
            try {
                await this.$confirm('将所有设备台账推送云平台, 是否继续?', '推送设备台账到云平台', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                await equApi.push();
                await this.$notify({
                    title: '成功',
                    message: '设备台账向云端推送命令已发送，稍候请刷新',
                    type: 'success'
                });
            } catch (err) {}
        },

        add() {
            this.addEditEquModalObj.show = true;
        },
        edit(row) {
            this.addEditEquModalObj.show = true;
            this.addEditEquModalObj.value = row;
        },
        async del(row) {
            try {
                await this.$confirm('将删除当前电力设备, 是否继续?', '删除电力设备', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                await equApi.delEqu({ ids: [row.equId] });
                this.$Bus.$emit('init', 'queryVoltageList');
                this.$Bus.$emit('init', 'queryEquTypeList');
                this.$Bus.$emit('init', 'queryBayUnitList');
                this.queryTotals();
                this.$notify({
                    title: '成功',
                    message: '设备删除成功',
                    type: 'success'
                });
                this.query();
            } catch (err) {}
        },
        async query(params) {
            this.loading = true;
            const { total, arrList } = await equApi.equList({ ...this.searchParams, ...params });
            this.dataList = arrList;
            this.tableHeight = this.$refs.tableContent.offsetHeight;

            this.loading = false;
            this.total = total;
        }
    },
    created() {
        this.query();
    }
};
</script>
