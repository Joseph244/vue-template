<style lang="less" module>
@import './index.less';
</style>

<template>
  <div :class="$style.container">
    <div :class="$style.top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>全网（江苏省）</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(item, index) in breadArray"
          :key="index"
        >
          {{ item }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div :class="$style.content">
      <div :class="$style.topology">
        <cityTopology
          v-if="activeTopology === 1"
          ref="city"
          @onSelect="cityTopologySelect"
        />
        <stationTopology
          v-if="activeTopology === 2"
          :station-id="curStationId"
        />
      </div>
      <menuTree
        ref="menu"
        @onSelect="menuSelect"
      />
    </div>
  </div>
</template>

<script>
import menuTree from './menuTree';
import cityTopology from './cityTopology';
import stationTopology from './stationTopology';
import api from '@/api/topology';

export default {
    components: { menuTree, cityTopology, stationTopology },
    data() {
        return {
            activeTopology: 1,
            breadArray: [],
            curStationId: null
        };
    },
    methods: {
        cityTopologySelect(item) {
            // 点击城市
            if (item.depth === 1) {
                if (item.isSelected) {
                    this.breadArray = [item.name];
                    this.$refs['menu'].selectCity(item.name);
                } else {
                    this.breadArray = [];
                    this.$refs['menu'].selectKey(null);
                }
            }
            // 点击变电站
            if (item.depth === 2) {
                this.curStationId = item.id;
                this.getStationInfo(item.id);
                this.activeTopology = 2;
                this.$refs['menu'].selectStation(item.id);
            }
        },
        menuSelect(item) {
            // 点击省份
            if (item.type === 1) {
                this.breadArray = [];
                this.activeTopology = 0;
                this.$nextTick(() => (this.activeTopology = 1));
            }
            // 点击城市
            if (item.type === 2) {
                // 面包屑变化
                this.breadArray = [item.name];
                // 拓扑变化
                if (this.activeTopology === 1) this.$refs['city'].selectCity(2, item.name);
                if (this.activeTopology === 2) {
                    this.activeTopology = 1;
                    this.$nextTick(() => this.$refs['city'].selectCity(2, item.name));
                }
            }
            // 点击变电站
            if (item.type === 5) {
                this.curStationId = item.id;
                this.getStationInfo(item.id);
                this.activeTopology = 2;
            }
        },
        async getStationInfo(stationId) {
            const res = await api.getStationInfo({ stationId });
            this.breadArray = [res.city, res.type === 1 ? '输电' : '变电', res.voltage, res.name];
        }
    }
};
</script>
