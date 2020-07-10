<style lang="less" module>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .search {
        overflow: hidden;
        padding: 20px 20px 0;
        border-bottom: 1px solid #00fff6;
        margin-bottom: 20px;

        .searchItem {
            float: left;
            margin: 0 15px 20px 0;
            > label {
                margin-right: 15px;
            }
        }
    }

    .content {
        flex: 1;
        padding: 0 20px;
    }
}
</style>

<template>
    <div :class="$style.container">
        <div :class="$style.search">
            <div :class="$style.searchItem">
                <label>局放类型</label>
                <el-select v-model="searchParams.equCompany" placeholder="请选择设备单位">
                    <el-option v-for="item in []" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
            <div :class="$style.searchItem">
                <label>变电站名</label>
                <el-select v-model="searchParams.equCompany" placeholder="请选择变电站">
                    <el-option v-for="item in []" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
            <div :class="$style.searchItem">
                <label>间隔单元</label>
                <el-select v-model="searchParams.equCompany" placeholder="请选择间隔单元">
                    <el-option v-for="item in []" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
            <div :class="$style.searchItem">
                <label>设备类型</label>
                <el-select v-model="searchParams.equCompany" placeholder="请选择设备类型">
                    <el-option v-for="item in []" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
            <!-- <div :class="$style.searchItem">
                <label>设备名称</label>
                <el-select v-model="searchParams.equCompany" placeholder="请选择设备名称">
                    <el-option v-for="item in []" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div> -->
            <div :class="$style.searchItem">
                <label>诊断时间</label>
                <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div :class="$style.searchItem">
                <el-input placeholder="设备名称关键字查询" v-model="searchParams.searchStr" style="width: 360px" @keyup.enter.native="search">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </div>
            <div :class="$style.searchItem" style="float: right;">
                <el-button type="primary" @click="addDiagnose"><i class="el-icon-plus"></i> 新建诊断</el-button>
            </div>
        </div>

        <div :class="$style.content" ref="content">
            <el-table v-if="tableShow" :data="dataList" :span-method="handleSpan" border :max-height="tableMaxHeight">
                <el-table-column prop="index" label="序号" width="80" align="center"> </el-table-column>
                <el-table-column prop="department" label="设备单位"> </el-table-column>
                <el-table-column prop="station" label="变电站"> </el-table-column>
                <el-table-column prop="company" label="厂家"> </el-table-column>
                <el-table-column prop="equName" label="设备名称"> </el-table-column>
                <el-table-column prop="unitName" label="设备部件"> </el-table-column>
                <el-table-column prop="defectTypeName" label="缺陷类型"> </el-table-column>
                <el-table-column prop="status" label="状态"> </el-table-column>
                <el-table-column prop="time" label="检测时间"> </el-table-column>
                <el-table-column label="操作" width="240" align="center">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini">缺陷修复</el-button>
                        <el-button type="primary" size="mini" @click="equDiagnoseDetail(scope.row)">查看</el-button>
                        <el-button type="danger" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchParams: {
                equCompany: '',
                searchStr: ''
            },
            value1: [],
            data: [
                {
                    department: 'aaa',
                    station: 'vvv',
                    company: 'bbb',
                    equName: 'cc',
                    unitTaskList: [
                        {
                            unitName: '11',
                            defectTypeName: '111',
                            status: '1',
                            time: '2020-01-04'
                        },
                        {
                            unitName: '22',
                            defectTypeName: '222',
                            status: '1',
                            time: '2020-01-04'
                        }
                    ]
                }
            ],
            tableShow: false
        };
    },
    computed: {
        dataList() {
            const array = [];
            this.data.map((item, i) => {
                const unitList = item.unitTaskList || [];
                unitList.map((value, j) => {
                    array.push({
                        index: i + 1,
                        ...item,
                        ...value,
                        spanRow: j === 0,
                        spanRowNum: unitList.length
                    });
                });
            });
            return array;
        }
    },
    methods: {
        search() {
            console.log(123);
        },
        handleSpan({ row, column, rowIndex, columnIndex }) {
            if ([0, 1, 2, 3, 4].includes(columnIndex)) {
                return row.spanRow ? [row.spanRowNum, 1] : [0, 0];
            }
        },
        addDiagnose() {
            this.$router.push({
                name: 'newEquDiagnose'
            });
        },
        equDiagnoseDetail(item) {
            this.$router.push({
                name: 'equDiagnoseDetail',
                params: item
            });
        }
    },
    mounted() {
        this.tableMaxHeight = this.$refs.content.offsetHeight;
        this.tableShow = true;
        this.searchParams.equName = this.$route.params.equName || ''; // 获取路由传递的查询参数
    }
};
</script>
