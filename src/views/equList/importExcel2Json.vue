<style lang="less" module>
.batchImportEqus {
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
    :global {
        .el-upload {
            width: 100%;
            .el-input {
                width: 100%;
            }
        }
    }
}
</style>
<template>
    <div :class="$style.batchImportEqus">
        <el-dialog :visible.sync="modalObj.show" title="批量导入设备信息" :close-on-click-modal="false" width="600px" @close="cancel()">
            <div :class="$style.titleRow">
                <span> <span style="color: red">*</span>选择导入文件 </span>
                <span>
                    <a :class="$style.tip" download="设备导入模板.xlsx" href="./设备导入模板.xlsx">
                        <em>下载导入模板</em>
                    </a>
                </span>
            </div>
            <el-upload
                accept=".xlsx"
                ref="upload"
                style="margin-bottom:10px;"
                action
                :multiple="false"
                :file-list="fileList"
                :auto-upload="true"
                :on-change="fileChange"
                :on-remove="fileRemove"
                :before-upload="beforeUpload"
            >
                <el-input placeholder="选择导入文件"></el-input>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirmEvent" v-preventReClick="2000">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import xlsx2json from '@/tools/xlsx/xlsx2json.js';
import equApi from '@/api/equ';
export default {
    name: 'batchImportEqus',
    props: {
        modalObj: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            fileList: [],
            equList: []
        };
    },
    methods: {
        async confirmEvent() {
            // this.$refs.upload.submit();
            // const file = content.file;
            // let file = file.files[0] // 使用传统的input方法需要加上这一步
            // const types = file.name.split('.')[1];
            // const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types);
            // if (!fileType) {
            //     this.$message('格式错误！请重新选择');
            //     return;
            // }
            await equApi.batchAddEqu({ equList: this.equList });
            this.$notify({
                title: '成功',
                message: '电力设备批量导入成功',
                type: 'success'
            });
            this.cancel();
            this.$emit('confirm');
        },
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
                    this.xlsxJson = tabJson;
                    let dataList = this.xlsxJson[0].sheet;
                    if (dataList.length === 0) {
                        this.$notify({
                            title: '导入信息为空',
                            message: '请填写导入设备内容',
                            type: 'error'
                        });
                        return false;
                    }
                    for (let i of dataList) {
                        let _p = {
                            equName: i['设备名称'],
                            equId: i['设备ID'],
                            bayUnitName: i['间隔单元名称'],
                            voltage: i['电压等级'],
                            bayUnitId: i['间隔单元ID'],
                            substationId: i['所属站房ID'],
                            substationName: i['所属站房名称'],
                            equTypeId: i['设备类型编码'],
                            equTypeName: i['设备类型名称']
                        };
                        this.equList.push(_p);
                    }
                }
            }
            return false; // 禁止调用element自动上传接口
        },
        fileChange(file, fileList) {
            this.fileList = [];
            this.fileList.push(file);
        },
        fileRemove(file, fileList) {
            this.equList = [];
            this.fileList = [];
        },
        cancel() {
            this.modalObj.show = false;
            this.equList = [];
            this.fileList = [];
        }
    },
    created() {}
};
</script>
