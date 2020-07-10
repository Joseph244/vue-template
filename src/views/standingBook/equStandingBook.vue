<style lang="less" module>
.equStandingBook {
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    .search {
        padding: 20px 0 0 10px;
        border-bottom: 1px solid #00fff6;
        margin-bottom: 15px;
        .title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            color: @color-primary;
        }
        .searchItem {
            float: left;
            margin: 0 15px 20px 0;
            width: 20%;
            > label {
                margin-right: 15px;
                // color: @color-info;
            }
        }
        .right {
            float: right;
            width: auto;
        }
    }
    .content {
        flex: 1;
        margin-bottom: 40px;
    }
    .pagenation {
        margin-top: 10px;
        position: fixed;
        bottom: 15px;
    }
}
</style>
<template>
    <div :class="$style.equStandingBook">
        <div :class="$style.search">
            <div :class="$style.title">检索项：</div>
            <div :class="$style.searchItem">
                <label>设备单位</label>
                <el-select clearable v-model="searchParams.department" placeholder="请选择设备单位">
                    <el-option v-for="item in dict.departmentList" :key="item" :label="item" :value="item"> </el-option>
                </el-select>
            </div>
            <div :class="$style.searchItem">
                <label>变电站名</label>
                <el-select clearable v-model="searchParams.station" placeholder="请选择变电站">
                    <el-option v-for="item in dict.stationList" :key="item" :label="item" :value="item"> </el-option>
                </el-select>
            </div>
            <div :class="$style.searchItem">
                <label>间隔单元</label>
                <el-select clearable v-model="searchParams.bayUnit" placeholder="请选择间隔单元">
                    <el-option v-for="item in dict.bayUnitList" :key="item" :label="item" :value="item"> </el-option>
                </el-select>
            </div>
            <div :class="$style.searchItem">
                <label>电压等级</label>
                <el-select clearable v-model="searchParams.voltageGrade" placeholder="请选择电压等级">
                    <el-option v-for="(item, index) in dict.voltageGradeList" :key="index" :label="item" :value="item"> </el-option>
                </el-select>
            </div>
            <div :class="$style.searchItem">
                <label>设备类型</label>
                <el-select clearable v-model="searchParams.equTypeId" placeholder="请选择设备类型">
                    <el-option v-for="item in dict.equTypeList" :key="item.equTypeId" :label="item.equTypeName" :value="item.equTypeId"> </el-option>
                </el-select>
            </div>
            <div :class="$style.searchItem">
                <label>设备厂家</label>
                <el-select clearable v-model="searchParams.company" placeholder="请选择设备厂家">
                    <el-option v-for="item in dict.companyList" :key="item" :label="item" :value="item"> </el-option>
                </el-select>
            </div>
            <div :class="$style.searchItem">
                <label>设备名称</label>
                <el-select clearable v-model="searchParams.equName" filterable placeholder="请选择设备名称">
                    <el-option v-for="item in dict.equList" :key="item" :label="item" :value="item.value"> </el-option>
                </el-select>
            </div>

            <div :class="[$style.searchItem, $style.right]">
                <el-button type="primary" icon="el-icon-close" plain @click="clearSearch"> 清 空 </el-button>
                <el-button type="primary" icon="el-icon-search" plain @click="queryEquList"> 查 询 </el-button>
            </div>
        </div>

        <div :class="$style.content" ref="content">
            <el-table v-if="tableShow" :data="dataList" border :max-height="tableHeight">
                <el-table-column type="index" label="序号" width="60" align="center"> </el-table-column>
                <el-table-column prop="department" label="设备单位" align="center"> </el-table-column>
                <el-table-column prop="station" label="变电站" align="center"> </el-table-column>
                <el-table-column prop="bayUnit" label="间隔单元" align="center"> </el-table-column>
                <el-table-column prop="voltageGrade" label="电压等级" align="center"> </el-table-column>
                <el-table-column prop="equTypeName" label="设备类型" align="center"> </el-table-column>

                <el-table-column prop="company" label="厂家" align="center"> </el-table-column>
                <el-table-column prop="equName" label="设备名称" align="center"> </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="diagnoseHistoryByEqu(scope.row)">诊断历史</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-pagination
            :class="$style.pagenation"
            background
            layout="total, prev, pager, next"
            :current-page.sync="searchParams.currentPage"
            @current-change="queryEquList"
            :pager-count="5"
            :total="total"
        >
        </el-pagination>
    </div>
</template>
<script>
import { queryEquList } from '@/api/standingBook.js';

const _searchParams = {
    currentPage: 1,
    pageSize: 20, // 每页条数固定20条
    department: '',
    station: '',
    bayUnit: '',
    voltageGrade: '',
    equTypeId: '',
    company: '',
    equName: ''
};
export default {
    name: 'equStandingBook',
    data() {
        return {
            searchParams: JSON.parse(JSON.stringify(_searchParams)),
            tableShow: false,
            tableHeight: 0,
            total: 0,
            dataList: []
        };
    },
    computed: {
        dict() {
            return this.$store.state.dict.searchEquDict;
        }
    },
    mounted() {
        this.tableHeight = this.$refs.content.offsetHeight;
        this.tableShow = true;
        this.queryEquList();
        this.equDict();
    },
    methods: {
        async queryEquList() {
            const data = await queryEquList(this.searchParams);
            this.dataList = data.equList;
            this.total = data.total;
        },

        clearSearch() {
            this.searchParams = JSON.parse(JSON.stringify(_searchParams));
            this.queryEquList();
        },
        diagnoseHistoryByEqu(item) {
            this.$router.push({
                name: 'equDiagnose',
                params: {
                    equName: item.equName
                }
            });
        }
    }
};
</script>
