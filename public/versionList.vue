<style lang="less" module>
@import './versionList.less';
</style>

<template>
    <div :class="$style.container">
        <Table class="small" border :columns="columns" :data="dataList" :span-method="handleSpan" :row-class-name="rowClassName" @on-row-click="rowClick" />
    </div>
</template>

<script>
import { versionStatus } from '../appData';
import appListApi from '@api/appList';
import uploadPkg from '../../util/uploadPkg';

export default {
    props: ['appType', 'appName', 'data', 'editVersion', 'viewVersion', 'search', 'defaultLightVersion'],
    data() {
        return {
            columns: [
                {
                    title: '版本号',
                    align: 'center',
                    width: 150,
                    key: 'version'
                },
                {
                    title: '创建时间',
                    align: 'center',
                    width: 200,
                    key: 'createTime'
                },
                {
                    title: '版本特性',
                    key: 'features'
                },
                {
                    title: '容器名',
                    width: 200,
                    align: 'center',
                    key: 'containerName'
                },
                {
                    title: '应用安装包',
                    align: 'center',
                    width: 320,
                    render: (h, { row }) => {
                        const { fileName, index, totalPieces, disabled } = row.fileInfo;
                        const percent = Number(((index / totalPieces) * 100).toFixed(2));
                        return (
                            <div class={this.$style.upload}>
                                {totalPieces > 0 && index >= totalPieces && <span title={fileName}>{fileName}</span>}
                                {totalPieces > 0 && index < totalPieces && <i-progress percent={percent}>{percent}%</i-progress>}
                                {totalPieces === 0 && <p>请上传安装包！</p>}
                                <upload action="" show-upload-list={false} before-upload={file => this.handleUpload(file, row)}>
                                    <i-button type="primary" size="small" icon="ios-cloud-upload-outline" disabled={row.currentStatus !== 0 || disabled}>
                                        上传
                                    </i-button>
                                </upload>
                            </div>
                        );
                    }
                },
                {
                    title: '状态',
                    align: 'center',
                    width: 150,
                    render: (h, { row, index }) => {
                        const statusName = versionStatus[row.currentStatus];
                        if (row.currentStatus === 0) return <tag color="warning">{statusName}</tag>;
                        if (row.currentStatus === 1) return <tag color="primary">{statusName}</tag>;
                        if (row.currentStatus === 2) return <tag color="success">{statusName}</tag>;
                        if (row.currentStatus === 3) return <tag color="error">{statusName}</tag>;
                        if (row.currentStatus === 4) return <tag color="primary">{statusName}</tag>;
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 220,
                    render: (h, { row, index }) => (
                        <div class={this.$style.opt}>
                            <a class={this.$style.view} title="查看" onClick={() => this.viewVersion(row)}>
                                <icon type="md-eye" size="20" />
                                查看
                            </a>
                            <a
                                class={`${this.$style.edit} ${row.currentStatus !== 0 ? this.$style.disabled : ''}`}
                                title="编辑"
                                onClick={() => row.currentStatus === 0 && this.editVersion({ ...row, appType: this.appType })}
                            >
                                <icon type="md-create" size="20" />
                                编辑
                            </a>
                            <a
                                class={`${this.$style.delete} ${[1, 2, 4].includes(row.currentStatus) ? this.$style.disabled : ''}`}
                                title="删除"
                                onClick={() => ![1, 2, 4].includes(row.currentStatus) && this.deleteVersion(row)}
                            >
                                <icon type="md-trash" size="20" />
                                删除
                            </a>
                        </div>
                    )
                }
            ],
            lightVersion: this.defaultLightVersion
        };
    },
    computed: {
        dataList() {
            const array = [];
            this.data.map((item, i) => {
                item.imageParamsList.map((val, j) => {
                    array.push({
                        _i: i,
                        _j: j,
                        ...item,
                        paramsId: val.paramsId,
                        containerName: val.containerName,
                        fileInfo: val.fileInfo,
                        spanRow: j === 0,
                        spanRowNum: item.imageParamsList.length
                    });
                });
            });
            return array;
        }
    },
    methods: {
        rowClick(row) {
            this.lightVersion = row.version;
        },
        handleUpload(file, item) {
            uploadPkg(
                file,
                {
                    md5: item.fileInfo.md5,
                    index: item.fileInfo.index,
                    paramsId: item.paramsId,
                    appName: this.appName
                },
                (index, totalPieces, md5, fileName) => {
                    const fileInfo = this.data[item._i].imageParamsList[item._j].fileInfo;
                    fileInfo.md5 = md5;
                    fileInfo.fileName = fileName;
                    fileInfo.index = index;
                    fileInfo.totalPieces = totalPieces;
                    this.$set(fileInfo, 'disabled', index < totalPieces);
                }
            );
            return false;
        },
        deleteVersion({ versionId }) {
            this.$Modal.confirm({
                title: '温馨提示',
                content: '你确定要删除当前版本么？',
                onOk: async () => {
                    await appListApi.deleteVersion({ id: versionId });
                    this.$Notice.success({ title: '删除版本成功！', desc: '' });
                    this.search();
                }
            });
        },
        handleSpan({ row, column, rowIndex, columnIndex }) {
            if ([0, 1, 2, 5, 6].includes(columnIndex)) {
                return row.spanRow ? [row.spanRowNum, 1] : [0, 0];
            }
        },
        rowClassName(row, index) {
            const array = ['odd'];
            if (this.lightVersion === row.version) array.push(this.$style.light);
            return array.join(' ');
        }
    },
    watch: {
        defaultLightVersion(val) {
            this.lightVersion = val;
        }
    }
};
</script>
