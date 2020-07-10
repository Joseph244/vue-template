<style lang="less" module>
.UploadMutiFIles {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    :global {
        .el-upload-list__item-name [class^='el-icon'] {
            color: #00ffff;
        }
    }
    .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .elUpload {
            display: flex;
            flex-direction: column;

            :global {
                // TODO: 选择文件之后高度不自动变大，而是出现滚动条
                .el-upload-list {
                    // flex: 1;
                    // max-height: 100%;
                    // overflow: auto;
                }

                .el-upload-dragger {
                    background-color: #034b4a;
                    border: 1px dashed #00ffff;
                }
            }
        }
        .elUploadDisabled {
            :global {
                .el-upload-dragger {
                    cursor: not-allowed;
                    background-color: #002f2d;
                    border: 1px dashed #c0c4cc;
                }
                .el-upload__text em {
                    color: #c0c4cc;
                }
            }
        }
        .tip {
            text-align: center;
            color: #00ffff;
        }
        .submit {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 20px;
            button {
                width: 360px;
            }
        }
    }

    .right {
        width: auto;
        border: 1px solid #00fff6;
        overflow: auto;
        padding-bottom: 10px;
        .title {
            font-size: 15px;
            font-weight: bold;
            margin-bottom: 10px;
            color: @color-info;
        }
        .reUploadBtn {
            float: right;
            margin-top: 1em;
        }
    }
}
</style>
<template>
    <div :class="$style.UploadMutiFIles">
        <div :class="$style.left">
            <el-upload
                ref="upload"
                :disabled="disabled"
                :data="taskIdObj"
                :class="{ [$style.elUploadDisabled]: disabled, [$style.elUpload]: !disabled }"
                drag
                multiple
                accept=".dat"
                :file-list="fileList"
                action="equDiagnosis/uploadDataFiles"
                :auto-upload="false"
                :on-change="fileChange"
                :on-progress="uploadProgress"
                :on-error="uploadError"
                :on-success="uploadSuccess"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                    <em>{{ text }}</em>
                </div>
                <div v-show="!disabled" :class="$style.tip" slot="tip">只能上传.dat文件,支持多文件同时上传</div>
            </el-upload>

            <div :class="$style.submit" v-show="fileList.length > 0 && unSuccessFiles.length > 0 && !disabled">
                <el-button size="small" type="success" @click="submitUpload">确认上传</el-button>
            </div>
        </div>
        <div v-if="errFileList.length > 0" :class="$style.right">
            <li :class="$style.title">
                上传失败文件：
            </li>
            <li v-for="file in errFileList" :key="file.uid">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <a class="el-upload-list__item-name" @click="handleClick(file)"> <i class="el-icon-document"></i>{{ file.name }} </a>
            </li>
            <li :class="$style.reUploadBtn">
                <el-button size="small" type="success" @click="reUpload">重新上传</el-button>
            </li>
        </div>
    </div>
</template>
<script>
import diagnoseApi from '@/api/diagnose.js';
export default {
    name: 'UploadMutiFIles',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        dataInfo: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            loading: null,
            taskId: null,
            file: null,
            fileList: [],
            unSuccessFiles: [], // 未上传文件
            errFileList: [], // 上传失败的文件
            taskIdObj: {
                //  文件上传附带参数
                taskId: null
            }
        };
    },
    computed: {
        text() {
            if (this.disabled) {
                return '请先完成上述步骤';
            } else {
                return '将文件拖到此处，或点击选取文件';
            }
        }
    },
    methods: {
        fileChange(file, fileList) {
            this.fileList = fileList;
            this.unSuccessFiles = fileList.filter(i => {
                return i.status != 'success';
            });

            const uploadingFiles = fileList.filter(i => {
                return i.status == 'uploading';
            });

            if (fileList.length > 0 && uploadingFiles.length === 0 && this.unSuccessFiles.length == 0) {
                this.loading.close();
            }
        },
        uploadProgress(event, file, fileList) {},
        // 文件上传失败就会从列表中删除,放在异常文件列表中
        uploadError(err, file, fileList) {
            this.errFileList.push(file);
            // this.$notify({
            //     title: file.name,
            //     message: '文件上传异常',
            //     type: 'error'
            // });
        },
        uploadSuccess(response, file, fileList) {},
        // 确认上传文件
        async submitUpload() {
            this.loading = this.$loading({
                lock: true,
                text: '文件上传解析中，请稍候... ...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

            // taskId不存在就重新获取
            if (!this.taskId) {
                const newTaskRes = await diagnoseApi.newTask({ equId: this.dataInfo.equId, unitId: this.dataInfo.unitId });
                this.taskId = newTaskRes.taskId;
                this.$emit('nextStep', this.taskId);
            }
            this.taskIdObj = { taskId: this.taskId };

            this.$nextTick(() => {
                this.$refs.upload.submit();
            });
        },
        // 重新上传文件
        async reUpload() {
            for (let i of this.errFileList) {
                let formData = new FormData();
                formData.append('files', i);
                formData.append('taskId', this.taskId);
                await diagnoseApi.uploadDataFiles(formData);
                i.status = 'success';
                this.fileList.push(i);
                this.errFileList.splice(this.errFileList.indexOf(i), 1);
                this.fileChange(i, this.fileList);
            }
        }
        // selectFile() {
        //     let temp = document.querySelector('#fileUpload');
        //     this.file = temp.files[0];
        //     [this.fname, this.fext] = this.file.name.split('.');
        //     this.upload(0);
        // },
        // async upload(index = 0) {
        //     let start = index * chunkSize;
        //     if (start > this.file.size) {
        //         return;
        //     }
        //     let blob = this.file.slice(start, start + chunkSize);
        //     let blobName = '${fname}.${index}.${fext}';
        //     let blobFile = new File([blob], blobName);

        //     let formData = new FormData();
        //     formData.append('files', blobFile);
        //     await uploadDataFiles(formData);
        //     this.upload(++index);
        // },
    },
    created() {}
};
</script>
