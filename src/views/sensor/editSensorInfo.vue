<style lang="less" module>
.editSensorInfo {
    :global {
        .el-input {
            width: 300px;
        }
    }
}
</style>
<template>
    <div :class="$style.editSensorInfo">
        <el-dialog :visible.sync="modalObj.show" :title="modalObj.title" :close-on-click-modal="false" width="500px" @close="cancel()">
            <el-form v-if="modalObj.show" ref="form" :model="form" :rules="rules" label-width="100px" style="margin-top: 10px">
                <el-form-item label="传感器标识" prop="sensorCode">
                    <!-- <el-input v-model="form.sensorCode" clearable></el-input> -->
                    {{ form.sensorCode }}
                </el-form-item>
                <el-form-item label="传感器类型" prop="sensorTypeId">
                    <el-select v-if="!modalObj.value.sensorTypeId" v-model="form.sensorTypeId" placeholder="请选择传感器类型">
                        <el-option v-for="(item, index) in senserTypeList" :key="index" :label="item.sensorTypeName" :value="item.sensorTypeId"></el-option>
                    </el-select>
                    <template v-else>
                        <span v-if="form.sensorTypeId">{{ form.sensorTypeName }}</span>
                        <span v-else style="color:red">未注册传感器类型</span>
                    </template>
                </el-form-item>

                <el-form-item label="生产厂家" prop="manufacturer">
                    <el-input v-model="form.manufacturer" clearable></el-input>
                </el-form-item>

                <el-form-item label="取电方式">
                    <el-select v-model="form.powerType" filterable allow-create clearable placeholder="选填取电方式">
                        <el-option v-for="(item, index) in myPowerType" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="采样间隔/秒" prop="interval">
                    <el-input v-model.number="form.interval" placeholder="请输入采样间隔" clearable></el-input>
                </el-form-item>

                <el-form-item prop="equId" label="电力设备">
                    <el-cascader :options="equTreeData" v-model="form.equId" clearable :props="cascaderProps" :show-all-levels="false"></el-cascader>
                </el-form-item>
                <el-form-item prop="location" label="相位" width="96">
                    <div class="el-input el-input--mini">
                        <el-select v-model="form.phase" filterable allow-create clearable placeholder="相位">
                            <el-option label="A" value="A"></el-option>
                            <el-option label="B" value="B"></el-option>
                            <el-option label="C" value="C"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item prop="location" label="安装位置">
                    <div class="el-input el-input--mini">
                        <input class="el-input__inner" v-model.trim="form.location" />
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" v-preventReClick="3000" @click="confirmEvent">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import sensorTypeApi from '@/api/sensorType';
import sensorApi from '@/api/sensor';
import equApi from '@/api/equ';

export default {
    name: 'editSensorInfo',
    props: {
        modalObj: {
            type: Object,
            required: true
        },
        apiType: {
            type: String,
            default: 'edit'
        }
    },
    data() {
        var validInterval = (rule, value, callback) => {
            if (!isNaN(value)) {
                callback();
            } else {
                callback(new Error('采样间隔只可输入数字'));
            }
        };
        return {
            cascaderProps: {
                emitPath: false,
                value: 'id',
                label: 'name'
            },
            form: { sensorTypeId: '' },
            rules: {
                sensorCode: [{ required: true, message: '请填写传感器编码', trigger: 'blur' }],
                // equId: [{ required: true, message: '请选择绑定电力设备', trigger: 'change' }],
                interval: [
                    { required: true, message: '请填写采样间隔', trigger: 'blur' },
                    { required: true, message: '请填写采样间隔', trigger: 'change' }
                    // { validator: validInterval, trigger: 'blur' },
                    // { validator: validInterval, trigger: 'change' }
                ]
            },
            senserTypeList: [],
            equTreeData: []
        };
    },
    watch: {
        'modalObj.show'(val) {
            if (val) {
                this.form = {
                    sensorTypeId: '',
                    interval: '',
                    ...JSON.parse(JSON.stringify(this.modalObj.value))
                };
            }
        }
    },
    computed: {
        ...mapState({
            powerType: state => state.dict.powerType
        }),
        myPowerType() {
            if (this.form.powerType && !this.powerType.includes(this.form.powerType)) {
                return [...this.powerType, this.form.powerType];
            } else {
                return this.powerType;
            }
        }
    },
    methods: {
        confirmEvent() {
            this.$refs['form'].validate(async valid => {
                if (valid) {
                    if (this.form.equId && !this.form.location) {
                        this.$message({
                            message: '已挂载电力设备的传感器，必须填写安装位置',
                            type: 'error'
                        });
                        return;
                    }
                    // 主动返现页面过来是要新增，传感器页面过来是编辑
                    if (this.apiType === 'add') {
                        await sensorApi.add({ sensors: [this.form] });
                        this.$notify({
                            title: '成功',
                            message: '传感器接入成功',
                            type: 'success'
                        });
                    } else {
                        // 若以前没有传感器类型但是现在有，则表示是绑定传感器类型的flag = true
                        await sensorApi.sensorBindEqu({
                            ...this.form,
                            bindSensorTypeFlag: !!(!this.modalObj.value.sensorTypeId && this.form.sensorTypeId)
                        });
                        this.$notify({
                            title: '成功',
                            message: '传感器信息修改成功',
                            type: 'success'
                        });
                    }

                    this.$parent.query && this.$parent.query();
                    this.cancel();
                } else {
                    return false;
                }
            });
        },
        cancel() {
            this.$refs['form'].resetFields();
            this.modalObj.show = false;
        }
    },
    async created() {
        this.senserTypeList = await sensorTypeApi.query();
        this.equTreeData = await equApi.treeQuery();
    }
};
</script>
