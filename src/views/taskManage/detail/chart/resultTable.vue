<style lang='less' module>
.container {
    width: 100%;

    .innerTable {
        width: 100%;
        tr td:last-child {
            border-right: 0 none !important;
        }
        tr:last-child td {
            border-bottom: 0 none !important;
        }
        tr td {
            padding: 12px 20px !important;
            width: 25%;
        }
    }

    :global {
        .el-table .el-table__row > td,
        .el-table .el-table__row > td .cell {
            padding: 0;
        }
    }
}
</style>

<template>
    <div :class="$style.container">
        <el-table :data="data" border :max-height="tableMaxHeight > 0 ? tableMaxHeight : '-'">
            <el-table-column label="数据信息" min-width="15%">
                <template slot-scope="scope">
                    <p>{{ scope.row.fileName }}</p>
                    <p>监测点：{{ scope.row.monitorPosition }}</p>
                </template>
            </el-table-column>

            <el-table-column label="算法诊断结果" min-width="35%">
                <template slot-scope="scope">
                    <table :class="$style.innerTable" border="0" cellspacing="0">
                        <tr v-for="(item, index) in scope.row.diagnosisRes" :key="index">
                            <td>{{ item.algorithmName }}</td>
                            <td v-for="(val, j) in item.result" :key="j">{{ val.defectName }}：{{ val.defectVal }}</td>
                        </tr>
                    </table>
                </template>
            </el-table-column>

            <slot></slot>
        </el-table>
    </div>
</template>

<script>
export default {
    props: {
        tableMaxHeight: {
            type: Number,
            default: 0
        },
        data: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {};
    }
};
</script>