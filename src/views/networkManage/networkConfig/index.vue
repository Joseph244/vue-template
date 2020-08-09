<style lang="less" module>
.networkconfig {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;

    .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-right: 15px;
        overflow: hidden;

        .bread {
            padding: 0 0 10px;
            border-bottom: 1px solid #12918c;
            margin-bottom: 10px;
            display: flex;
            align-items: center;

            > label {
                font-size: 18px;
                font-weight: bold;
                color: #00fff6;
                margin-right: 10px;
            }

            &::before {
                display: block;
                content: '';
                width: 5px;
                height: 20px;
                background: #00ddd5;
                margin-right: 10px;
            }
        }

        .content {
            flex: 1;
            overflow: hidden;
        }
    }

    .tree {
        border: 1px solid #046261;
        width: 240px;
        overflow: auto;
        padding: 20px;
    }
}
</style>

<template>
    <div :class="$style.networkconfig">
        <div :class="$style.main">
            <div :class="$style.bread">
                <label>当前位置：</label>
                <el-breadcrumb separator-class="el-icon-arrow-right" separator="→">
                    <el-breadcrumb-item v-for="(item, index) in breadArray" :key="index">{{ item }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <Tabs @change="tabChange"></Tabs>
            <div :class="$style.content">
                <component :is="nowComponent" :stationIdList="stationIdList"></component>
            </div>
        </div>

        <div :class="$style.tree">
            <el-tree
                node-key="key"
                :data="treeData"
                :props="defaultProps"
                :accordion="true"
                :expand-on-click-node="false"
                :current-node-key="curSelectedNodeKey"
                :default-expanded-keys="['1']"
                @node-click="handleNodeClick"
                ref="tree"
            />
        </div>
    </div>
</template>

<script>
import jrNodeList from './jrNodeList';
import hjNodeList from './hjNodeList';
import sensorList from './sensorList';
import treeData from '../topology/treeData';

export default {
    name: 'networkconfig',
    components: {
        jrNodeList,
        hjNodeList,
        sensorList
    },
    data() {
        return {
            nowComponent: 'jrNodeList',
            breadArray: [],
            treeData: [],
            curSelectedNodeKey: '1',
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            stationIdList: []
        };
    },
    methods: {
        tabChange(val) {
            this.nowComponent = val.value;
        },
        handleNodeClick(node) {
            if (this.curSelectedNodeKey === node.key) return false;
            this.curSelectedNodeKey = node.key;
            this.getBreadInfo(node);
            this.getStationIdList(node);
        },
        getBreadInfo(node) {
            const loop = item => {
                array.push(item.name);
                item.parent && loop(item.parent);
            };
            const array = [];
            loop(node);
            this.breadArray = array.reverse();
        },
        getStationIdList(node) {
            const array = [];
            this.collapse(node, array);
            this.stationIdList = array;
        },
        // 尾调用递归，获取节点下所以stationId数组
        collapse(node, array) {
            if (node.type === 5) array.push(node.id);
            node.children && node.children.forEach(item => this.collapse(item, array));
        },
        initTreeData(array, parent) {
            array.forEach((item, index) => {
                item.key = parent ? parent.key + '-' + (index + 1) : `${index + 1}`;
                item.parent = parent || null;
                if (item.children) this.initTreeData(item.children, item);
            });
            return array;
        }
    },
    mounted() {
        this.treeData = this.initTreeData([treeData]);
        this.getBreadInfo(this.treeData[0]);
        this.getStationIdList(this.treeData[0]);
    }
};
</script>
