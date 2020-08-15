<style lang="less" module>
.container {
    width: 100%;
    height: 100%;
    position: relative;

    .radio {
        position: absolute;
        top: 20px;
        left: 20px;
    }
}
</style>

<template>
    <div :class="$style.container">
        <reportTopology
            v-if="activeTopology === 1"
            :station-id="stationId"
                />
        <customTopology
            v-if="activeTopology === 2"
            :station-id="stationId"
                />

        <el-radio-group
            v-model="activeTopology"
            :class="$style.radio"
                >
            <el-radio :label="1">
                上报拓扑
            </el-radio>
            <el-radio :label="2">
                手动拓扑
            </el-radio>
        </el-radio-group>
    </div>
</template>

<script>
import reportTopology from './reportTopology';
import customTopology from './customTopology';

export default {
  components: { reportTopology, customTopology },
  props: {
    stationId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      activeTopology: 1
    };
  },
  methods: {}
};
</script>
