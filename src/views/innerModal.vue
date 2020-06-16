<style lang="less" module>
.innerModal {
    :global {
        .searchRow {
            width: 100%;
            margin-bottom: 1em;
        }
        .tableContent {
            .attrItem {
                padding: 0 10px;
            }
        }
    }
}
</style>
<template>
    <el-dialog
        :class="$style.innerModal"
        width="50%"
        title="设备数据"
        :visible.sync="show"
        :close-on-click-modal="false"
        @close="innerModalCancel"
        append-to-body
    >
        <div class="searchRow">
            <el-cascader
                style="width:100%"
                v-model="checkedEqu"
                :options="equTreeData"
                placeholder="请先选择电力设备"
                :props="{ value: 'label', emitPath: false, checkStrictly: true, expandTrigger: 'hover' }"
                clearable
                @change="getSensorsByEqu"
            ></el-cascader>
        </div>
        <el-table
            class="tableContent"
            v-loading="sensorLoading"
            :highlight-current-row="true"
            :max-height="500"
            :data="equSensorAttrsList"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column align="center" label="序号" type="index" width="60"></el-table-column>
            <!-- <el-table-column align="center" prop="sensorName" label="传感器标识"></el-table-column> -->
            <el-table-column align="center" prop="sensorNameDetail" label="传感器名称"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="innerModalCancel">取 消</el-button>
            <el-button type="primary" @click="innerModalConfirm">添 加</el-button>
        </div>
    </el-dialog>
</template>
<script>
import Api from '@/api/messageRoute.js';
export default {
    name: 'innerModal',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            attrShow: true,
            sensorLoading: false,
            checkedEqu: '',
            equTreeData: [],
            equSensorAttrsList: [],
            checkedData: new Map()
        };
    },
    created() {
        this.getEquTreeData();
    },
    methods: {
        // checkAttr(row) {
        //     let _attr = row.sensorAttr.filter(i => {
        //         return i.checked === true;
        //     });
        //     // 刷新dom
        //     this.attrShow = false;
        //     this.$nextTick(() => {
        //         this.attrShow = true;
        //     });
        //     let item = {
        //         ...row,
        //         sensorAttr: _attr
        //     };
        //     if (this.checkedData.has(item.sensorName)) {
        //         this.checkedData.delete(item.sensorName);
        //     }
        //     this.checkedData.set(item.sensorName, item);
        // },
        handleSelectionChange(rows) {
            this.checkedData.clear();
            for (let x of rows) {
                // for (let s of x.sensorAttr) {
                //     s.checked = true;
                // }

                // let item = {
                //     sensorAttr: x.sensorAttr,
                //     sensorName: x.sensorName,
                //     sensorNameDetail: x.sensorNameDetail
                // };x
                this.checkedData.set(x.sensorName, x);
            }
        },
        getEquTreeData() {
            Api.getEquTreeData().then(res => {
                this.equTreeData = res;
            });
        },
        getSensorsByEqu(equip) {
            this.sensorLoading = true;
            Api.getSensorsByEqu({ equip: equip }).then(res => {
                this.equSensorAttrsList = res;
                this.sensorLoading = false;
            });
        },
        innerModalCancel() {
            this.checkedEqu = '';
            this.equSensorAttrsList = [];
            this.$emit('update:show', false);
        },
        innerModalConfirm() {
            this.$emit('innerModalConfirm', this.checkedData);
            this.innerModalCancel();
        }
    }
};
</script>
