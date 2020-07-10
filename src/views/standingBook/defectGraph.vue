<style lang="less" module>
.container {
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
            margin-bottom: 15px;

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
            .nohead .el-table__header-wrapper {
                display: none;
            }
        }
    }
}
</style>

<template>
    <div :class="$style.container">
        <prpd />
        <prps />
        <div :class="$style.result">
            <div :class="$style.title">诊断结果</div>
            <el-table class="nohead" :data="dataList" border style="margin-bottom: 15px">
                <el-table-column prop="name" align="center"></el-table-column>
                <el-table-column v-for="(item, index) in new Array(colunmNum)" :key="index" :prop="`defect${index}`"> </el-table-column>
            </el-table>
            <div :class="$style.title">缺陷信息</div>
            <el-table :data="defectList" border>
                <el-table-column label="缺陷类型" prop="defectType" align="center"></el-table-column>
                <el-table-column label="缺陷描述" prop="defectName" align="center"></el-table-column>
                <el-table-column label="缺陷原型" prop="defectReason" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import prpd from '../taskManage/detail/chart/prpd';
import prps from '../taskManage/detail/chart/prps';

export default {
    components: { prpd, prps },
    data() {
        return {
            list: [
                {
                    algoriphmName: '算法1',
                    defectList: [
                        { defectName: 'a', defectVal: '1' },
                        { defectName: 'b', defectVal: '2' },
                        { defectName: 'c', defectVal: '3' }
                    ]
                },
                {
                    algoriphmName: '算法2',
                    defectList: [
                        { defectName: 'd', defectVal: '4' },
                        { defectName: 'e', defectVal: '5' },
                        { defectName: 'f', defectVal: '6' }
                    ]
                }
            ],
            colunmNum: 3,
            defectList: [{ defectType: 'xx', defectName: 'd', defectReason: 'xxx' }]
        };
    },
    computed: {
        dataList() {
            const dataArray = [];
            this.list.map(item => {
                const obj = { name: item.algoriphmName };
                item.defectList.map((value, index) => (obj[`defect${index}`] = `${value.defectName}：${value.defectVal}`));
                dataArray.push(obj);
            });
            return dataArray;
        }
    },
    mounted() {}
};
</script>