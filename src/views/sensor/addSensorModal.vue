<style lang="less" module>
.addSensorModal {
    .required {
        color: @color-danger;
    }
    .valiTips {
        color: red;
        margin-bottom: 8px;
    }
    :global {
        .el-button--mini.is-circle {
            padding: 1px;
        }
    }
}
</style>
<template>
    <div :class="$style.addSensorModal">
        <el-dialog :visible.sync="modalObj.show" title="新增传感器" :close-on-click-modal="false" modal-append-to-body width="1300px" @close="cancel()">
            <p :class="$style.valiTips">Tips：可不选择电力设备，但如选择电力设备，则必须填写安装位置</p>
            <el-table :data="dataList">
                <el-table-column prop="sensorCode">
                    <template slot="header">
                        <span :class="$style.required">*</span>
                        <span>传感器标识</span>
                    </template>
                    <template slot-scope="scope">
                        <el-input size="mini" v-model="scope.row.sensorCode" placeholder="填写传感器标识"></el-input>
                    </template>
                </el-table-column>

                <el-table-column prop="sensorTypeName">
                    <template slot="header">
                        <!-- <span :class="$style.required">*</span> -->
                        <span>传感器类型</span>
                    </template>
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.sensorTypeId" clearable placeholder="选择传感器类型" @change="selectSensorType(scope.row)">
                            <el-option v-for="(item, index) in sensorTypes" :key="index" :label="item.sensorTypeName" :value="item.sensorTypeId"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="manufacturer" label="生产厂家">
                    <template slot-scope="scope">
                        <el-input size="mini" v-model="scope.row.manufacturer" placeholder="填写生产厂家"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="powerType" label="取电方式">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.powerType" filterable allow-create clearable placeholder="选填取电方式">
                            <el-option v-for="(item, index) in powerType" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="interval" width="90">
                    <template slot="header">
                        <span :class="$style.required">*</span>
                        <span>采样间隔</span>
                    </template>
                    <template slot-scope="scope">
                        <div class="el-input el-input--mini">
                            <input
                                style="width:56px;margin-right:2px;"
                                class="el-input__inner"
                                placeholder="单位/秒"
                                v-model="scope.row.interval"
                                v-input-number
                            />秒
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="equId" label="电力设备">
                    <template slot-scope="scope">
                        <!-- <el-select v-model="scope.row.equId" filterable clearable placeholder="绑定电力设备">
                            <el-option v-for="(item, index) in equList" :key="index" :label="item.equName" :value="item.equId"></el-option>
                        </el-select> -->
                        <el-cascader :options="equTreeData" v-model="scope.row.equId" clearable :props="cascaderProps" :show-all-levels="false"></el-cascader>
                    </template>
                </el-table-column>
                <el-table-column prop="location" label="相位" width="96">
                    <template slot-scope="scope">
                        <div class="el-input el-input--mini">
                            <el-select v-model="scope.row.phase" filterable allow-create clearable placeholder="相位">
                                <el-option label="A" value="A"></el-option>
                                <el-option label="B" value="B"></el-option>
                                <el-option label="C" value="C"></el-option>
                            </el-select>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="location" label="安装位置">
                    <template slot-scope="scope">
                        <div class="el-input el-input--mini">
                            <input class="el-input__inner" v-model.trim="scope.row.location" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="60">
                    <template slot="header">
                        <el-button type="primary" size="mini" icon="el-icon-plus" circle @click="handleAdd"></el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                            :disabled="dataList.length === 1"
                            type="danger"
                            size="mini"
                            icon="el-icon-minus"
                            circle
                            @click="handleDel(scope)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm" v-preventReClick="3000">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import sensorTypeApi from '@/api/sensorType';
import sensorApi from '@/api/sensor';
import equApi from '@/api/equ';
const sensor = {
    sensorCode: '',
    manufacturer: '',
    interval: 300,
    sensorTypeName: '',
    powerType: '',
    sensorTypeId: '',
    equId: null,
    location: null
};
// 必填项
const requiredPros = ['sensorCode', 'interval'];
export default {
    name: 'addSensorModal',
    props: {
        modalObj: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            sensorTypes: [],
            cascaderProps: {
                emitPath: false,
                value: 'id',
                label: 'name'
            },
            equTreeData: [],
            dataList: [JSON.parse(JSON.stringify(sensor))]
        };
    },
    computed: {
        ...mapState({
            powerType: state => state.dict.powerType
        })
    },
    methods: {
        selectSensorType(val) {
            val.sensorTypeName = this.sensorTypes.find(i => val.sensorTypeId === i.sensorTypeId).sensorTypeName;
        },
        handleAdd() {
            this.dataList.push(JSON.parse(JSON.stringify(sensor)));
        },
        handleDel(scope) {
            this.dataList.splice(scope.$index, 1);
        },
        cancel() {
            this.dataList = [JSON.parse(JSON.stringify(sensor))];
            this.modalObj.show = false;
        },
        async confirm() {
            // TODO： 验证属性是否完整
            for (let i of this.dataList) {
                for (let k of requiredPros) {
                    if (!i[k]) {
                        this.$message({
                            message: '请将星号项填写完整',
                            type: 'error'
                        });
                        return;
                    }
                    if (!/^[0-9]+$/.test(i.interval)) {
                        this.$message({
                            message: '采样间隔只可输入数字',
                            type: 'error'
                        });
                    }
                    if (i.equId && !i.location) {
                        this.$message({
                            message: '已选择电力设备所在行，必须填写安装位置',
                            type: 'error'
                        });
                        return;
                    }
                }
            }
            await sensorApi.add({ sensors: this.dataList });
            this.$notify({
                title: '成功',
                message: '传感器新增成功',
                type: 'success'
            });
            this.$parent.query && this.$parent.query();
            this.cancel();
        }
    },
    async created() {
        this.sensorTypes = await sensorTypeApi.query();
        this.equTreeData = await equApi.treeQuery();
    }
};
</script>
