<style lang="less" module>
.container {
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    label {
        margin-right: 15px;
    }
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
        }
        .time {
            float: left;
            margin: 0 15px 20px 0;
        }
        .right {
            float: right;
            width: auto;
        }
    }

    .filter {
        padding: 0 15px 0 10px;
        margin-bottom: 15px;
        .repair {
            float: left;
            width: 20%;
        }
        .time {
            float: left;
        }
        .btn {
            float: right;
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
    .dialog {
        .msg {
        }
        .container {
            background-color: @background-color-base;
            border: 1px solid @border-color;
            margin: 10px 0;
            .infoItem {
                display: flex;
                margin-bottom: 10px;
                div {
                    width: 50%;
                }
                label {
                    width: 60px;
                    display: inline-block;
                    font-weight: bold;
                    color: @color-text-primary;
                    margin-right: 10px;
                }
            }
        }
        .solution {
            label {
                font-size: 1.1em;
                font-weight: bold;
                margin-bottom: 5px;
                display: inline-block;
            }
        }
    }
}
</style>

<template>
    <div :class="$style.container">
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
                <el-select clearable v-model="searchParams.equTypeId" @change="changeEquTypeId" placeholder="请选择设备类型">
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
            <div :class="$style.searchItem">
                <label>设备部件</label>
                <el-select clearable v-model="searchParams.unitId" filterable placeholder="请选择设备部件">
                    <el-option v-for="item in equTypeUnitList" :key="item.unitId" :label="item.unitName" :value="item.unitId"> </el-option>
                </el-select>
            </div>
            <div :class="$style.searchItem">
                <label>是否修复</label>
                <el-select v-model="searchParams.status" clearable placeholder="选择修复状态" @change="defectList">
                    <el-option v-for="item in repairStatusDict" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
            <div :class="$style.time">
                <label>诊断时间</label>
                <el-date-picker
                    v-model="searchParams.time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    clearable
                    @change="defectList"
                >
                </el-date-picker>
            </div>

            <div :class="[$style.searchItem, $style.right]">
                <el-button type="primary" icon="el-icon-close" plain @click="clearSearch"> 清 空 </el-button>
                <el-button type="primary" icon="el-icon-search" plain @click="defectList"> 查 询 </el-button>
            </div>
        </div>

        <!-- <div :class="$style.filter">
            <div :class="$style.repair">
                <label>是否修复</label>
                <el-select v-model="searchParams.status" clearable placeholder="选择修复状态" @change="defectList">
                    <el-option v-for="item in repairStatusDict" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
            <div :class="$style.time">
                <label style="margin-left: 15px">诊断时间</label>
                <el-date-picker
                    v-model="searchParams.time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    clearable
                    @change="defectList"
                >
                </el-date-picker>
            </div>
            <el-button type="primary" plain :class="$style.btn">缺陷录入</el-button>
        </div> -->

        <div :class="$style.content" ref="content">
            <el-table v-if="tableShow" :data="dataList" :span-method="handleSpan" border :max-height="tableMaxHeight">
                <el-table-column prop="index" label="序号" width="80" align="center"> </el-table-column>
                <el-table-column prop="department" label="设备单位"> </el-table-column>
                <el-table-column prop="station" label="变电站"> </el-table-column>
                <el-table-column prop="company" label="厂家"> </el-table-column>
                <el-table-column prop="equName" label="设备名称"> </el-table-column>
                <el-table-column prop="unitName" label="设备部件"> </el-table-column>
                <el-table-column prop="defectTypeName" label="缺陷类型"> </el-table-column>
                <el-table-column prop="status" width="100" label="状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status === 1" type="danger">未修复</el-tag>
                        <el-tag v-if="scope.row.status === 2" type="info">已修复</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="time" label="检测时间"> </el-table-column>
                <el-table-column label="操作" width="240" align="center">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini" @click="repairEvent(scope.row)">缺陷修复</el-button>
                        <el-button type="primary" size="mini">查看</el-button>
                        <el-button type="danger" size="mini" @click="delItem(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-pagination
            :class="$style.pagenation"
            background
            layout="total, prev, pager, next"
            :current-page.sync="searchParams.currentPage"
            @current-change="defectList"
            :pager-count="5"
            :total="total"
        >
        </el-pagination>
        <el-dialog title="缺陷修复" :visible.sync="repairDialogVisible" width="30%" :class="$style.dialog" :before-close="repairDialogClose">
            <h3 :class="$style.msg">确认修复当前缺陷？</h3>
            <!-- <span>{{ repairContent }}</span> -->
            <div :class="$style.container">
                <div :class="$style.infoItem">
                    <div>
                        <label>设备名称:</label>
                        <span :class="$style.highlight">{{ repairContent.equName }}</span>
                    </div>
                    <div>
                        <label>设备部件:</label>
                        <span :class="$style.highlight">{{ repairContent.unitName }}</span>
                    </div>
                </div>
                <div :class="$style.infoItem">
                    <div>
                        <label>设备单位:</label>
                        <span>{{ repairContent.department }}</span>
                    </div>
                    <div>
                        <label>变电站:</label>
                        <span>{{ repairContent.station }}</span>
                    </div>
                </div>

                <div :class="$style.infoItem">
                    <label>缺陷类型:</label>
                    <span>{{ repairContent.defectTypeName }}</span>
                </div>
                <div :class="$style.infoItem">
                    <label>缺陷原因:</label>
                    <span>{{ repairContent.reasonContent }}</span>
                </div>
            </div>
            <div :class="$style.solution">
                <label>修复方法</label>
                <el-input type="textarea" :rows="3" placeholder="请输入修复方法" v-model="repairContent.solution"> </el-input>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="repairDialogClose">取 消</el-button>
                <el-button type="primary" @click="repairConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { defectList, repireDefect, delDefect } from '@/api/standingBook.js';

const _searchParams = {
    currentPage: 1,
    pageSize: 20,
    department: '',
    station: '',
    bayUnit: '',
    voltageGrade: '',
    equTypeId: '',
    company: '',
    equName: '',
    unitId: '',
    status: '',
    time: null
};
const _repairContent = {
    department: '',
    station: '',
    bayUnit: '',
    voltageGrade: '',
    equTypeName: '',
    company: '',
    equName: '',
    solution: ''
};
export default {
    data() {
        return {
            searchParams: JSON.parse(JSON.stringify(_searchParams)),
            repairStatusDict: [
                {
                    label: '未修复',
                    value: 1
                },
                {
                    label: '已修复',
                    value: 2
                }
            ],
            data: [],
            total: 0,
            tableShow: false,
            repairDialogVisible: false,
            repairContent: JSON.parse(JSON.stringify(_repairContent)),
            equTypeUnitList: []
        };
    },
    computed: {
        dataList() {
            const array = [];
            this.data.map((item, i) => {
                const unitList = item.unit || [];
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
        },
        dict() {
            return this.$store.state.dict.searchEquDict;
        }
    },
    mounted() {
        this.tableMaxHeight = this.$refs.content.offsetHeight;
        this.tableShow = true;
        this.defectList();
    },
    methods: {
        handleSpan({ row, column, rowIndex, columnIndex }) {
            if ([0, 1, 2, 3, 4].includes(columnIndex)) {
                return row.spanRow ? [row.spanRowNum, 1] : [0, 0];
            }
        },
        changeEquTypeId() {
            for (let i of this.dict.equTypeList) {
                if (i.equTypeId === this.searchParams.equTypeId) {
                    this.equTypeUnitList = i.unitList;
                    return;
                }
            }
        },
        async defectList() {
            const _data = await defectList(this.searchParams);
            this.data = _data.dataList;
            this.total = _data.total;
        },
        repairEvent(item) {
            this.repairContent = item;
            this.repairDialogVisible = true;
        },
        async repairConfirm() {
            await repireDefect({ defectId: this.repairContent.defectId, solution: this.repairContent.solution });
            this.repairDialogVisible = false;
            this.$notify({
                title: '成功',
                message: '缺陷修复成功',
                type: 'success'
            });
            this.defectList();
        },
        repairDialogClose() {
            this.repairDialogVisible = false;
            this.repairContent = JSON.parse(JSON.stringify(_repairContent));
        },
        clearSearch() {
            this.searchParams = JSON.parse(JSON.stringify(_searchParams));
            this.equTypeUnitList = [];
            this.defectList();
        },
        delItem({ defectId }) {
            this.$confirm({
                message: `确认删除当前缺陷？`,
                yes: async () => {
                    await delDefect({ defectId });
                    this.defectList();
                },
                no: () => {}
            });
        }
    }
};
</script>
