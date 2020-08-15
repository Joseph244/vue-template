<style lang="less" module>
@import './menuTree.less';
</style>

<template>
  <div :class="$style.container">
    <el-tree
      v-if="show"
      ref="tree"
      :data="treeData"
      node-key="key"
      :props="defaultProps"
      :accordion="true"
      :expand-on-click-node="false"
      :default-expanded-keys="expandKeys"
      :current-node-key="curSelected"
      @node-click="handleNodeClick"
    />
  </div>
</template>

<script>
import api from '@/api/topology';
import treeData from './treeData';

export default {
    data() {
        return {
            show: false,
            treeData: [],
            totalData: [],
            curSelected: '1',
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            expandKeys: ['1']
        };
    },
    mounted() {
        this.treeData = this.collapse([treeData]);
        this.show = true;
    },
    methods: {
        handleNodeClick(data) {
            if (this.curSelected === data.key) return false;
            this.curSelected = data.key;
            this.$emit('onSelect', data);
        },
        collapse(array, parent) {
            array.forEach((item, index) => {
                item.key = parent ? parent.key + '-' + (index + 1) : `${index + 1}`;
                item.parent = parent || null;
                this.totalData.push(item);
                if (item.children) this.collapse(item.children, item);
            });
            return array;
        },
        selectKey(key) {
            this.$refs['tree'].setCurrentKey(key);
            this.curSelected = key;
        },
        selectCity(name) {
            const target = this.totalData.find(item => item.type === 2 && item.name === name);
            if (target) this.selectKey(target.key);
        },
        selectStation(id) {
            const target = this.totalData.find(item => item.type === 5 && item.id === id);
            if (target) {
                const p = target.parent;
                const pp = p.parent;
                const ppp = pp.parent;
                // 强制刷新组件
                this.show = false;
                this.expandKeys = ['1', ppp.key, pp.key, p.key];
                this.curSelected = target.key;
                this.$nextTick(() => (this.show = true));
            }
        },
        async getTreeData() {
            const res = await api.getQueryTree({
                stationIdList: []
            });
        }
    }
};
</script>
