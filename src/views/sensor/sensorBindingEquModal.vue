<style lang="less" module>
.sensorBindingEquModal {
    .firstRow {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    :global {
        .el-form--inline {
            display: flex;
            justify-content: space-between;
            .el-form-item {
                margin-right: 0;
            }
        }
    }
}
</style>
<template>
    <div :class="$style.sensorBindingEquModal">
        <el-dialog :visible.sync="modalObj.show" title="挂载电力设备" :close-on-click-modal="false" width="640px" @close="cancel()">
            <div :class="$style.firstRow">
                <el-input
                    v-model="searchStr"
                    suffix-icon="el-icon-search"
                    clearable
                    placeholder="电力设备名称查询"
                    style="width: 300px"
                    @keyup.enter="search()"
                    @change="search()"
                >
                </el-input>
                <span>共{{ total }}个</span>
            </div>

            <el-table stripe :data="dataList" highlight-current-row @current-change="handleCurrentChange" ref="equTable" height="300px">
                <el-table-column type="index" width="50"> </el-table-column>
                <el-table-column prop="equId" label="电力设备ID"> </el-table-column>
                <el-table-column prop="equName" label="电力设备名称"> </el-table-column>
            </el-table>
            <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="80px" style="margin-top: 10px">
                <el-form-item label="安装位置" prop="location">
                    <el-input v-model="form.location"></el-input>
                </el-form-item>
                <el-form-item label="相位">
                    <el-select v-model="form.phase" placeholder="请选择相位">
                        <el-option label="A" value="A"></el-option>
                        <el-option label="B" value="B"></el-option>
                        <el-option label="C" value="C"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirmEvent" v-preventReClick="2000">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import equApi from '@/api/equ';
export default {
    name: 'sensorBindingEquModal',
    props: {
        modalObj: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            searchStr: '',
            total: 0,
            dataList: [],
            currentRow: null,
            form: {
                location: '',
                phase: ''
            },
            rules: {
                location: [{ required: true, message: '请填写安装位置', trigger: 'blur' }]
            }
        };
    },
    watch: {
        async 'modalObj.show'(val) {
            if (val) {
                await this.search();

                this.form = this.modalObj.value;
                // 自动选中当前传感器的挂载设备,并放在第一位
                if (this.dataList.length > 0 && this.modalObj.value.equId) {
                    let currentSelectedIndex = null;
                    let currentItem = null;
                    for (let i in this.dataList) {
                        if (this.dataList[i].equId === this.modalObj.value.equId) {
                            currentSelectedIndex = i;
                            currentItem = this.dataList[currentSelectedIndex];
                        }
                    }
                    this.dataList.splice(currentSelectedIndex, 1);
                    this.dataList.unshift(currentItem);
                    this.$refs.equTable.setCurrentRow(currentItem);
                }
            }
        }
    },
    methods: {
        async search() {
            this.currentRow = null;
            let { arrList, total } = await equApi.equList({ currentPage: -1, searchStr: this.searchStr });
            this.dataList = arrList;
            this.total = total;
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        cancel() {
            this.$refs['form'].resetFields();
            this.searchStr = '';
            this.form = {
                location: '',
                phase: ''
            };
            this.currentRow = null;
            this.modalObj.show = false;
        },
        confirmEvent() {
            if (!(this.currentRow && this.currentRow.equId)) {
                this.$message({
                    message: '请选择要挂载的电力设备',
                    type: 'error'
                });
                return;
            }
            this.$refs['form'].validate(valid => {
                if (valid) {
                    this.$emit('confirm', {
                        ...this.modalObj.value,
                        sensorCode: this.modalObj.value.sensorCode,
                        equId: this.currentRow.equId,
                        phase: this.form.phase,
                        location: this.form.location
                    });
                    this.cancel();
                } else {
                    return false;
                }
            });
        }
    },
    async created() {
        this.search();
    }
};
</script>
