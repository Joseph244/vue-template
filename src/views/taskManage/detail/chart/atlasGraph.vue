<style lang="less" module>
.container {
    height: 341px;
    display: flex;
    align-items: center;
    border-top: 1px solid #166d70;
    padding: 20px 40px;

    .result {
        flex: 1;
        overflow: hidden;

        .title {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #00ffff;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 30px;

            &::before,
            &:after {
                display: block;
                content: '';
                width: 30%;
                height: 2px;
            }

            &::before {
                background-image: linear-gradient(to left, #00ffff, transparent);
                margin-right: 20px;
            }
            &::after {
                background-image: linear-gradient(to right, #00ffff, transparent);
                margin-left: 20px;
            }
        }

        :global {
            .el-table__header-wrapper {
                display: none;
            }
        }
    }
}
</style>

<template>
    <div :class="$style.container">
        <prpd :phase="graphData.phase" :phaseAmps="graphData.phaseAmps" />
        <prps :cycleAmps="graphData.cycleAmps" />
        <div :class="$style.result">
            <div :class="$style.title">诊断结果</div>
            <el-table :data="dataList" border>
                <el-table-column prop="name" align="center"></el-table-column>
                <el-table-column v-for="(item, index) in new Array(colunmNum)" :key="index" :prop="`defect${index}`"> </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import prpd from './prpd';
import prps from './prps';
import diagnoseApi from '@/api/diagnose';

export default {
    components: { prpd, prps },
    props: ['info'],
    data() {
        return {
            graphData: {
                phase: [],
                phaseAmps: [],
                cycleAmps: []
            },
            resData: [],
            colunmNum: 0
        };
    },
    computed: {
        dataList() {
            const dataArray = [];
            this.resData.map(item => {
                const obj = { name: item.algorithmName };
                item.result.map((value, index) => (obj[`defect${index}`] = `${value.defectName}：${value.defectVal}`));
                dataArray.push(obj);
            });
            return dataArray;
        }
    },
    methods: {
        async getGraphInfo() {
            const res = await diagnoseApi.getFileGraphData({ fileId: this.info.fileId });
            this.graphData = res.prpsprpd;
        },
        async getResInfo() {
            this.resData = await diagnoseApi.getFileDiagnoseRes({ fileId: this.info.fileId });
            this.colunmNum = this.resData[0].result.length;
        }
    },
    mounted() {
        const self = this;
        this.getResInfo();
        setTimeout(() => {
            self.getGraphInfo();
        }, 400);
    }
};
</script>