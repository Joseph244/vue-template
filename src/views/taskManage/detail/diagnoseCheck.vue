<style lang='less' module>
@import './diagnoseCheck.less';
</style>

<template>
    <div :class="$style.container">
        <dl :class="$style.myTab">
            <dt>局放类型</dt>
            <dd v-for="(item, index) in data" :key="index" :class="curTabIndex === index ? $style.active : ''" @click="tabChange(index)">
                <span>{{ item.type }}</span>
                <i></i>
            </dd>
        </dl>

        <div :class="$style.opt">
            <el-button type="primary" @click="trans2Defect">存为缺陷台账</el-button>
        </div>

        <div :class="$style.content" ref="content">
            <resultTable :tableMaxHeight="tableMaxHeight" :data="dataList" v-if="tableShow">
                <el-table-column label="诊断缺陷记录（勾选可保存到缺陷台账）">
                    <el-table-column label="缺陷类型" min-width="11%">
                        <template slot-scope="scope">
                            <div :class="$style.row">
                                <el-checkbox :value="selectedList.includes(scope.row.fileId)" @change="v => select(v, scope.row.fileId)"></el-checkbox>
                                <el-select v-model="scope.row.defectType" clearable placeholder="缺陷类型" style="flex: 1; margin-left: 20px">
                                    <el-option v-for="item in []" :key="item" :label="item" :value="item"> </el-option>
                                </el-select>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="缺陷等级" min-width="10%">
                        <template slot-scope="scope">
                            <div :class="$style.row">
                                <el-select v-model="scope.row.defectGrade" clearable placeholder="缺陷等级" style="width: 100%">
                                    <el-option v-for="item in []" :key="item" :label="item" :value="item"> </el-option>
                                </el-select>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="缺陷原因" min-width="24%">
                        <template slot-scope="scope">
                            <div :class="$style.row">
                                <el-select v-model="scope.row.defectReason" clearable placeholder="请选择缺陷原因" style="width: 100%">
                                    <el-option v-for="item in []" :key="item" :label="item" :value="item"> </el-option>
                                </el-select>
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>
            </resultTable>
        </div>
    </div>
</template>

<script>
import resultTable from './chart/resultTable';
import diagnoseApi from '@/api/diagnose';

export default {
    components: { resultTable },
    data() {
        return {
            tableMaxHeight: 0,
            tableShow: false,
            curTabIndex: 0,
            data: [],
            selectedList: [] // 选中的文件
        };
    },
    computed: {
        dataList() {
            return this.data[this.curTabIndex].dataList || [];
        }
    },
    methods: {
        tabChange(index) {
            this.selectedList = [];
            this.curTabIndex = index;
        },
        select(value, fileId) {
            const index = this.selectedList.indexOf(fileId);
            if (index === -1 && value) this.selectedList.push(fileId);
            if (index > -1 && !value) this.selectedList.splice(index, 1);
        },
        async trans2Defect() {
            if (this.selectedList.length === 0) {
                this.$message({ message: '请先选择诊断缺陷记录！', type: 'warning' });
                return false;
            }
            const selectedArray = this.dataList.filter(item => this.selectedList.includes(item.fileId));
            const targetArray = [];
            for (let i = 0; i < selectedArray.length; i++) {
                const item = selectedArray[i];
                if (!(item.defectType && item.defectGrade && item.defectReason)) {
                    this.$message({ message: '请给已选中的记录，填写缺陷参数！', type: 'warning' });
                    return false;
                }
                targetArray.push({
                    fileId: item.fileId,
                    defectType: item.defectType,
                    defectGrade: item.defectGrade,
                    defectReason: item.defectReason
                });
            }

            await diagnoseApi.trans2Defect({ list: targetArray });
            this.selectedList = [];
            this.getDiagoseResCheck();
        },
        async getDiagoseResCheck() {
            const res = await diagnoseApi.getFileDiagnoseResCheck({ taskId: this.taskId });
            res.map(item => {
                item.dataList.map(val => {
                    val.defectType = '1';
                    val.defectGrade = '2';
                    val.defectReason = '3';
                });
            });
            this.data = res;
        }
    },
    mounted() {
        this.getDiagoseResCheck();
        this.tableMaxHeight = this.$refs.content.offsetHeight;
        this.tableShow = true;
    }
};
</script>