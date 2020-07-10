<style lang="less" module>
@import './dataAtlas.less';
</style>

<template>
    <div :class="$style.container">
        <dl :class="$style.myTab">
            <dt>局放类型</dt>
            <dd v-for="(item, index) in data" :key="index" :class="curTabIndex === index ? $style.active : ''" @click="tabChange(index)">
                <span>{{ item.typeName }}</span>
                <i></i>
            </dd>
        </dl>

        <div :class="$style.opt">
            <el-button type="primary" @click="diagoseAll">一键全诊断</el-button>
            <!-- <el-button type="primary">上传数据</el-button> -->
        </div>

        <div :class="$style.top">
            <el-checkbox :value="selectedList.length > 0 && selectedList.length === dataList.length" @change="selectAll">全选</el-checkbox>
            <div :class="$style.instrument">
                <label>检测仪器：</label>
                <el-input v-model.trim="data[curTabIndex].monitorInstrument" style="width: 260px" @blur="saveInstrument(data[curTabIndex])" />
            </div>
        </div>

        <ul :class="$style.list">
            <li v-for="(item, index) in dataList" :key="index">
                <div :class="$style.item">
                    <el-checkbox :value="selectedList.includes(item.fileId)" @change="v => selectItem(v, item.fileId)"></el-checkbox>
                    <div :class="$style.info">
                        <div :class="$style.text">
                            <p>文件名：{{ item.fileName }}</p>
                            <span>采集时间：{{ item.fileTime }}</span>
                        </div>
                        <div :class="$style.status1" v-if="item.ifDiagnosis"><i class="el-icon-success"></i> 已诊断</div>
                        <div :class="$style.status2" v-else><i class="el-icon-error"></i> 未诊断</div>
                    </div>
                    <div :class="$style.position">
                        <label>检测位置：</label>
                        <el-input v-model.trim="item.monitorPosition" style="width: 200px" @blur="savePosition(item, index)" />
                        <transition name="el-fade-in-linear">
                            <div v-show="savePositionSuccessIndex.includes(index)" :class="$style.tip"><i class="el-icon-success"></i> 保存成功</div>
                        </transition>
                    </div>
                    <div :class="$style.btns">
                        <el-button
                            type="primary"
                            icon="el-icon-caret-bottom"
                            circle
                            :class="openIndexs.includes(index) ? $style.up : $style.down"
                            @click="open(index)"
                        ></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle @click="delFile(item.fileId)"></el-button>
                    </div>
                </div>
                <transUpDown>
                    <div :class="$style.result" v-if="openIndexs.includes(index)">
                        <atlasGraph :info="item" />
                    </div>
                </transUpDown>
            </li>
        </ul>

        <div :class="$style.bottom">
            <div :class="$style.left">
                <div :class="$style.title">
                    <label>请选择诊断算法</label>
                    <el-checkbox :value="selectedAlgorithm.length === algorithmList.length" @change="algorithmSelectAll">全选</el-checkbox>
                </div>

                <el-checkbox-group v-model="selectedAlgorithm">
                    <el-checkbox v-for="item in algorithmList" :label="item.id" :key="item.id">{{ item.name }}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div :class="$style.right">
                <el-button type="primary" size="large" @click="startDiagose">开始诊断</el-button>
            </div>
        </div>

        <diagnoseResToast :visible="resultToastVisible" :data="resultData" @onCancel="resultToastVisible = false" />
    </div>
</template>

<script>
import transUpDown from '../../components/collapse/transUpDown';
import atlasGraph from './chart/atlasGraph';
import diagnoseResToast from './chart/diagnoseResToast';
import diagnoseApi from '@/api/diagnose';

export default {
    components: { transUpDown, atlasGraph, diagnoseResToast },
    props: ['taskId'],
    data() {
        return {
            // 局放类型Tab
            curTabIndex: 0,
            // 文件列表
            data: [],
            openIndexs: [], // 展开的文件
            selectedList: [], // 选中的文件
            savePositionSuccessIndex: [],
            // 算法类型
            algorithmList: [
                { id: 1, name: '高频诊断算法1' },
                { id: 2, name: '高频诊断算法2' },
                { id: 3, name: '高频诊断算法3' }
            ],
            selectedAlgorithm: [],
            // 诊断结果弹层
            resultToastVisible: false,
            resultData: {}
        };
    },
    computed: {
        dataList() {
            return this.data[this.curTabIndex].dataList || [];
        }
    },
    methods: {
        tabChange(index) {
            this.curTabIndex = index;
            this.openIndexs = [];
        },
        async open(index) {
            const i = this.openIndexs.indexOf(index);
            if (i > -1) {
                this.openIndexs.splice(i, 1);
            } else {
                this.openIndexs.push(index);
            }
        },
        selectItem(value, fileId) {
            const index = this.selectedList.indexOf(fileId);
            if (index === -1 && value) this.selectedList.push(fileId);
            if (index > -1 && !value) this.selectedList.splice(index, 1);
        },
        selectAll(value) {
            if (value) this.selectedList = this.dataList.map(item => item.fileId);
            else this.selectedList = [];
        },
        algorithmSelectAll(val) {
            this.selectedAlgorithm = val ? this.algorithmList.map(item => item.id) : [];
        },
        delFile(fileId) {
            this.$confirm({
                message: '你确定要删除此文件么？',
                yes: async () => {
                    await diagnoseApi.deleteFile({ fileId });
                    this.$message({ message: '删除文件成功', type: 'success' });
                    this.getFileList();
                }
            });
        },
        // 失去焦点保存检测仪器
        async saveInstrument(item) {
            if (item.monitorInstrument === item.oldMonitorInstrument) return false;
            await diagnoseApi.saveInstrument({ type: item.type, taskId: this.taskId });
            item.oldMonitorInstrument = item.monitorInstrument;
            this.$message({ message: '检测仪器保存成功', type: 'success' });
        },
        // 失去焦点保存检测位置
        async savePosition(item, index) {
            if (item.monitorPosition === item.oldMonitorPosition) return false;
            await diagnoseApi.savePosition({ fileId: item.fileId, position: item.monitorPosition });
            item.oldMonitorPosition = item.monitorPosition;
            // 展示保存成功tip
            this.savePositionSuccessIndex.push(index);
            // 一秒后tip消失
            setTimeout(() => {
                this.savePositionSuccessIndex.splice(this.savePositionSuccessIndex.indexOf(index), 1);
            }, 1000);
        },
        // 一键诊断
        async diagoseAll() {
            this.$confirm({
                message: '一键诊断耗时较长，你确定一键诊断么？',
                yes: async () => {
                    const loading = this.$loading({
                        lock: true,
                        text: '文件诊断中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.5)'
                    });
                    try {
                        this.resultData = await diagnoseApi.startDiagnosis({ taskId: this.taskId });
                        this.resultToastVisible = true;
                    } finally {
                        loading.close();
                    }
                }
            });
        },
        // 开始诊断
        async startDiagose() {
            if (this.selectedList.length === 0) {
                this.$message({ message: '请先选择需要诊断的文件！', type: 'warning' });
                return false;
            }
            if (this.selectedAlgorithm.length === 0) {
                this.$message({ message: '请先选择诊断算法！', type: 'warning' });
                return false;
            }
            const loading = this.$loading({
                lock: true,
                text: '文件诊断中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            });
            try {
                this.resultData = await diagnoseApi.startDiagnosis({ taskId: this.taskId });
                this.resultToastVisible = true;
            } finally {
                loading.close();
            }
        },
        async getFileList() {
            const res = await diagnoseApi.getFileInfo({ taskId: this.taskId });
            res.map(item => {
                item.oldMonitorInstrument = item.monitorInstrument;
                item.dataList.map(val => (val.oldMonitorPosition = val.monitorPosition));
            });
            this.data = res;
        }
    },
    mounted() {
        this.getFileList();
    }
};
</script>
