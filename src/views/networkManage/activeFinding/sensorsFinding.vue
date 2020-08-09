<style lang="less" module>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .content {
        flex: 1;
    }

    .bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        > button {
            height: 40px;
            line-height: 38px;
            font-size: 18px;
        }
    }
}
</style>

<template>
    <div :class="$style.container">
        <div :class="$style.top">
            <el-radio-group v-model="type">
                <el-radio-button :label="1">新发现</el-radio-button>
                <el-radio-button :label="2">已在白名单</el-radio-button>
            </el-radio-group>
            <el-button type="primary" icon="el-icon-plus" @click="addWhiteList" v-if="type === 1">加入白名单</el-button>
        </div>

        <div :class="$style.content" ref="content">
            <el-table v-if="tableShow" :data="dataList" border :max-height="tableMaxHeight" @selection-change="selectNode" ref="table">
                <el-table-column type="selection" width="60" v-if="type === 1"> </el-table-column>
                <el-table-column type="index" label="序号" width="60" v-if="type === 2"> </el-table-column>
                <el-table-column prop="equId" label="设备ID"> </el-table-column>
                <el-table-column prop="parentId" label="上级ID"> </el-table-column>
                <el-table-column prop="factory" label="厂商"> </el-table-column>
                <el-table-column prop="version" label="版本号"> </el-table-column>
            </el-table>
        </div>

        <div :class="$style.bottom">
            <button class="comBtn" @click="prev"><i class="el-icon-d-arrow-left"></i> 发现汇聚节点</button>
            <button class="comBtn" @click="back">继续发现 <i class="el-icon-d-arrow-right"></i></button>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import api from '@/api/activeFinding';

export default {
    props: ['stationId'],
    data() {
        return {
            tableShow: false,
            tableMaxHeight: 0,
            type: 1,
            newList: [], // 新发现列表
            registeredList: [], // 已在白名单
            selectedIds: []
        };
    },
    computed: {
        dataList() {
            return this.type === 1 ? this.newList : this.registeredList;
        }
    },
    methods: {
        selectNode(list) {
            this.selectedIds = list.map(item => item.equId);
        },
        async addWhiteList() {
            if (this.selectedIds.length === 0) {
                this.$message({ message: '清先选择需要加入白名单的传感器！', type: 'warning' });
                return false;
            }
            await api.addSensorWhiteList({
                stationId: this.stationId,
                equIdWhiteList: this.selectedIds
            });
            _.remove(this.newList, item => this.selectedIds.includes(item.equId));
            this.selectedIds = [];
            this.$refs.table.clearSelection();
            this.$message({ message: '加入白名单成功！', type: 'success' });
        },
        back() {
            this.$parent.reset();
        },
        prev() {
            this.$parent.prev();
        },
        async findSensorList() {
            const res = await api.findSensorList({ stationId: this.stationId });
            this.newList = res.newFinding || [];
            this.registeredList = res.registered || [];
            this.$parent.stepInfo[3].num = this.$parent.stepInfo[3].num || this.newList.length + this.registeredList.length;
        }
    },
    watch: {
        type() {
            this.tableShow = false;
            this.$nextTick(() => (this.tableShow = true));
        }
    },
    mounted() {
        this.tableMaxHeight = this.$refs.content.offsetHeight;
        this.tableShow = true;
        this.findSensorList();
    }
};
</script>
