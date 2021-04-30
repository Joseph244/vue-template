<style lang="less" module>
.batchAddSensorModal {
    .titleRow {
        width: 100%;
        font-size: 16px;
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
        .tip {
            color: @color-primary;
            text-decoration: underline;
        }
        > span {
            display: inline-block;
        }
    }
    .seeErr {
        color: @color-warning;
        cursor: pointer;
    }
    :global {
        .el-button--mini.is-circle {
            padding: 1px;
        }
        .el-upload {
            width: 100%;
        }
    }
}
</style>
<template>
    <div :class="$style.batchAddSensorModal">
        <el-dialog :visible.sync="modalObj.show" title="批量导入传感器" :close-on-click-modal="false" width="600px" @close="cancel()">
            <div :class="$style.titleRow">
                <span> <span style="color: red">*</span>选择导入文件 </span>
                <span>
                    <a :class="$style.tip" download="传感器导入模板.xlsx" href="./传感器导入模板.xlsx">
                        <em>下载导入模板</em>
                    </a>
                </span>
            </div>
            <el-upload accept=".xlsx" style="margin-bottom:10px;" action :multiple="false" :auto-upload="true" :before-upload="beforeUpload">
                <el-input placeholder="选择导入文件"></el-input>
            </el-upload>

            <div :class="$style.titleRow">
                <span>解析结果</span>
                <a v-show="analysRes.errorSensorList.length > 0" @click="errorModalShow = true" :class="$style.seeErr">查看异常</a>
            </div>

            <el-table :data="dataList">
                <el-table-column prop="total" label="传感器总数"> </el-table-column>
                <el-table-column prop="rightSensorCount" label="有效传感器"> </el-table-column>
                <el-table-column prop="errorSensorCount" label="无效传感器"> </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="batchAddConfirm" v-preventReClick="2000">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="errorModalShow" title="批量导入传感器" :close-on-click-modal="false" width="600px" @close="cancelErrModal()">
            <el-table :data="analysRes.errorSensorList">
                <el-table-column prop="sensorCode" label="传感器标识"> </el-table-column>
                <el-table-column prop="errMsg" label="错误信息"> </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
import sensorApi from '@/api/sensor.js';
import xlsx2json from '@/tools/xlsx/xlsx2json.js';

export default {
    name: 'batchAdd',
    props: ['modalObj'],
    data() {
        return {
            xlsxData: [], // 导入文件解析内容
            analysRes: {
                total: 0,
                rightSensorList: [],
                errorSensorList: []
            },
            errorModalShow: false
        };
    },
    mounted() {},
    computed: {
        dataList() {
            return [
                {
                    total: this.analysRes.total,
                    rightSensorCount: this.analysRes.rightSensorList.length,
                    errorSensorCount: this.analysRes.errorSensorList.length
                }
            ];
        },
        confirmBtnFlag() {
            return this.fileList.length > 0 && this.analysRes.errorSensorList.length === 0;
        }
    },
    methods: {
        cancelErrModal() {
            this.errorModalShow = false;
        },
        cancel() {
            this.modalObj.show = false;
        },
        // beforeUpload(file) {
        //     let fileFormat = file.name.split('.');
        //     let fileType = fileFormat[fileFormat.length - 1];
        //     if (fileType !== 'xlsx') {
        //         this.$Notice.error({
        //             title: '文件类型错误,必须为.xlsx文件!',
        //             desc: ''
        //         });
        //     } else {
        //         this.batchAddSensorAnalysis(file);
        //     }
        //     return false; // 禁止调用element自动上传接口
        // },
        async beforeUpload(file) {
            this.equList = [];
            let fileFormat = file.name.split('.');
            let fileType = fileFormat[fileFormat.length - 1];
            if (fileType !== 'xlsx') {
                this.$notify({
                    title: '文件错误',
                    message: '文件类型错误,必须为.xlsx文件!',
                    type: 'error'
                });
            } else {
                const tabJson = await xlsx2json(file);
                if (tabJson && tabJson.length > 0) {
                    let xlsxJson = tabJson;
                    this.xlsxData = xlsxJson[0].sheet;
                    if (this.xlsxData.length === 0) {
                        this.$notify({
                            title: '导入信息为空',
                            message: '请填写导入设备内容',
                            type: 'error'
                        });
                        return false;
                    }
                    let sensorData = [];

                    for (let i of this.xlsxData) {
                        let item = {};
                        for (let k in window.WENV.BATCH_ADD_SENSOR) {
                            // 从全局配置文件获取导入模板的解析配置
                            item[k] = i[window.WENV.BATCH_ADD_SENSOR[k]];
                        }
                        sensorData.push(item);
                    }
                    this.analysRes = await sensorApi.batchAddSensor({ sensorData });
                    if (this.analysRes.errorSensorList.length > 0) {
                        this.errorModalShow = true;
                    }
                }
            }
            return false; // 禁止调用element自动上传接口
        },
        // async batchAddSensorAnalysis(file) {
        //     let fd = new FormData();
        //     fd.append('sensorTableFile', file); // 多文件需要建立一个数组传进去
        //     this.analysRes = await sensorApi.batchAddSensor(fd);
        //     if (this.analysRes.errorSensorList.length > 0) {
        //         this.errorModalShow = true;
        //     }
        // },
        async batchAddConfirm() {
            if (this.analysRes.rightSensorList.length > 0) {
                if (this.analysRes.errorSensorList.length > 0) {
                    await this.$confirm('此操作将忽略错误，将正确传感器导入', '确认导入传感器', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    });
                }
                await sensorApi.add({ sensors: this.analysRes.rightSensorList });
                this.$notify({
                    title: '成功',
                    message: '传感器新增成功',
                    type: 'success'
                });
                this.cancel();
                this.$parent.query && this.$parent.query();
            } else {
                await this.$confirm('无正确传感器，无法导入', '确认导入传感器', {
                    showConfirmButton: false,
                    cancelButtonText: '取消',
                    type: 'danger'
                });
            }
        }
    }
};
</script>
