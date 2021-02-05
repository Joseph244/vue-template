<style lang="less" module>
.innerModal {
    .searchRow {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 1em;
    }
    :global {
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
        width="30%"
        title="设备数据"
        :visible.sync="show"
        :close-on-click-modal="false"
        append-to-body
        @close="innerModalCancel"
            >
        <div :class="$style.searchRow">
            <el-cascader
                v-model="checkedEqu"
                filterable
                :options="equTreeData"
                placeholder="由电力设备筛选"
                :props="{ value: 'sensors', emitPath: false, checkStrictly: true, expandTrigger: 'hover' }"
                clearable
                @change="getSensorsByEqu"
                    />
            <div>
                <el-input
                    v-model.trim="searchStr"
                    style="width: 300px"
                    placeholder="传感器名称筛选"
                    clearable
                    @keyup.enter.native="getSensorsByEqu()"
                    @clear="getSensorsByEqu()"
                        >
                    <el-button slot="append" type="primary" icon="el-icon-search" @click="getSensorsByEqu()" />
                </el-input>
            </div>
        </div>
        <el-table
            v-loading="sensorLoading"
            class="tableContent"
            empty-text="请先选择电力设备查询传感器"
            :highlight-current-row="true"
            :max-height="500"
            :data="equSensorAttrsList"
            @selection-change="handleSelectionChange"
                >
            <el-table-column type="selection" width="55" />
            <!-- <el-table-column align="center" label="序号" type="index" width="60"></el-table-column> -->
            <!-- <el-table-column align="center" prop="sensorName" label="传感器标识"></el-table-column> -->
            <el-table-column align="center" prop="sensorName" label="传感器名称" />
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="innerModalCancel">
                取 消
            </el-button>
            <el-button type="primary" @click="innerModalConfirm">
                添 加
            </el-button>
        </div>
    </el-dialog>
</template>
<script>
import Api from '@/api/messageRoute.js';
export default {
    name: 'InnerModal',
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
            searchStr:"",
            equSensorAttrsList: [],
            checkedData: new Map()
        };
    },
    created() {
        this.getEquTreeData();
    },
    methods: {
        handleSelectionChange(rows) {
            this.checkedData.clear();
            for (let x of rows) {
                this.checkedData.set(x.sensorName, x);
            }
        },
        pushSensors(sensors){
            for(let desc of sensors){
                let temp = []
                desc.equipment && (temp.push(desc.equipment))
                desc.location && (temp.push(desc.location))
                desc.type && (temp.push(desc.type))
                desc.code && (temp.push(desc.code))
                let sensorName = temp.join('-')
                if(!this.searchStr){
                    this.equSensorAttrsList.push({sensorName, typecode:desc.typecode, sensorCode: desc.code});
                }else{
                    
                    if(sensorName.includes(this.searchStr)){
                        this.equSensorAttrsList.push({sensorName, typecode:desc.typecode, sensorCode: desc.code});
                    }
                }
            }
        },
        getEquTreeData() {
            this.sensorLoading = true
            Api.getEquTreeData().then(res => {
                this.equTreeData = res;
                this.equSensorAttrsList = []
                for(let i of this.equTreeData){
                    this.pushSensors(i.sensors)
                }
                
                this.sensorLoading = false
            });
        },
        getSensorsByEqu() {
            this.equSensorAttrsList = [];
            // 不存在就查询全部
            if(!this.checkedEqu){
                for(let i of this.equTreeData){
                    this.pushSensors(i.sensors)
                }
            }else{
                this.pushSensors(this.checkedEqu)
            }
            
        },
        innerModalCancel() {
            // this.checkedEqu = '';
            // this.equSensorAttrsList = [];
            this.$emit('update:show', false);
        },
        innerModalConfirm() {
            this.$emit('innerModalConfirm', this.checkedData);
            this.innerModalCancel();
        }
    }
};
</script>
