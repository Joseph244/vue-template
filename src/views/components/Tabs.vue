<style lang='less' module>
.tabs {
    height: 40px;
    display: flex;
    align-items: flex-end;
    color: #00ffff;

    dt {
        padding: 0 6px;
        height: 32px;
        line-height: 30px;
        border-bottom: 2px solid #046261;
    }

    dd {
        display: flex;
        height: 32px;
        line-height: 30px;
        cursor: pointer;

        > span {
            padding: 0 20px;
            background: #006666;
        }

        > i {
            width: 10px;
            border-bottom: 2px solid #046261;
        }

        &.active {
            color: #fcc400;
            font-weight: bold;
            height: 40px;
            line-height: 38px;
            font-size: 16px;
            > span {
                background: transparent;
                border: 2px solid #046261;
                border-bottom: 0 none;
            }
        }
    }

    &:after {
        display: block;
        content: '';
        flex: 1;
        border-bottom: 2px solid #046261;
    }
}
</style>
<template>
  <dl :class="$style.tabs">
    <dt><slot /></dt>
    <dd
      v-for="(item, index) in tabConfig"
      :key="index"
      :class="curTabIndex === index ? $style.active : ''"
      @click="tabChange(index)"
    >
      <span>{{ item.label }}</span>
      <i />
    </dd>
  </dl>
</template>
<script>
export default {
    name: 'Tabs',
    props: {
        tabConfig: {
            type: Array,
            default: () => {
                return [
                    {
                        label: '接入节点',
                        value: 'jrNodeList'
                    },
                    {
                        label: '汇聚节点',
                        value: 'hjNodeList'
                    },
                    {
                        label: '传感器',
                        value: 'sensorList'
                    }
                ];
            }
        }
    },
    data() {
        return {
            curTabIndex: 0
        };
    },
    computed: {},
    mounted() {
        this.tabChange(0);
    },
    created() {},
    methods: {
        tabChange(index) {
            this.curTabIndex = index;
            this.$emit('change', this.tabConfig[index]);
        }
    }
};
</script>