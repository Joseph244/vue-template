<style lang='less' module>
@import './diagnoseResult.less';
.addEquInfo {
    display: flex;
    flex-direction: column;
    width: 100%;
    :global {
        .el-col {
            width: 100%;
        }
    }
}
</style>

<template>
    <div :class="$style.container">
        <dl :class="$style.myTab">
            <dt>局放类型</dt>
            <dd v-for="(item, index) in data" :key="index" :class="curTabIndex === index ? $style.active : ''" @click="curTabIndex = index">
                <span>{{ item.typeName }}</span>
                <i></i>
            </dd>
        </dl>

        <div :class="$style.opt">
            <el-button type="primary" @click="equVisible = true">转为设备诊断</el-button>
        </div>

        <div :class="$style.content" ref="content">
            <resultTable :tableMaxHeight="tableMaxHeight" :data="dataList" v-if="tableShow" />
        </div>

        <el-dialog title="设备信息" :visible="equVisible" width="600px" @close="close">
            <EquInfoSearch ref="equInfoSearch" :class="$style.addEquInfo" :taskId="taskId" @confirm="setTask"></EquInfoSearch>
            <div style="text-align: right;">
                <el-button type="primary" @click="close">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import resultTable from './chart/resultTable';
import diagnoseApi from '@/api/diagnose';

export default {
    components: { resultTable },
    props: ['taskId'],
    data() {
        return {
            tableMaxHeight: 0,
            tableShow: false,
            curTabIndex: 0,
            data: [],
            equVisible: false,
            equInfo: {
                department: '',
                station: '',
                bayUnit: '',
                voltageGrade: '',
                equTypeId: '',
                equName: '',
                unitId: '',
                company: ''
            },
            rules: {}
        };
    },
    computed: {
        dataList() {
            return this.data[this.curTabIndex].dataList || [];
        }
    },
    methods: {
        close() {
            this.equVisible = false;
        },
        submit() {
            this.$refs.equInfoSearch.confirmEqu();
        },
        async getDiagoseResList() {
            this.data = await diagnoseApi.getAllFileDiagnoseRes({ taskId: this.taskId });
        },
        async setTask(val) {
            this.close();
            this.$notify({
                title: '转为设备诊断成功',
                message: '可至设备诊断列表查看',
                type: 'success'
            });
        }
    },
    mounted() {
        this.getDiagoseResList();
        this.tableMaxHeight = this.$refs.content.offsetHeight;
        this.tableShow = true;
    }
};
</script>