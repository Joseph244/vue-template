<style lang='less' module>
.myTab {
    height: 40px;
    display: flex;
    align-items: flex-end;
    margin-bottom: 15px;

    dt {
        padding: 0 20px;
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
            border: 2px solid #046261;
        }

        > i {
            width: 10px;
            border-bottom: 2px solid #046261;
        }

        &.active {
            height: 40px;
            line-height: 38px;
            > span {
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

.content {
    height: 560px;
}
</style>

<template>
    <el-dialog title="设备信息" :visible="visible" width="1200px" @close="close">
        <dl :class="$style.myTab">
            <dt>局放类型</dt>
            <dd v-for="(item, index) in data" :key="index" :class="curTabIndex === index ? $style.active : ''" @click="curTabIndex = index">
                <span>{{ item.typeName }}</span>
                <i></i>
            </dd>
        </dl>
        <div :class="$style.content">
            <resultTable :tableMaxHeight="560" :data="dataList" />
        </div>
    </el-dialog>
</template>

<script>
import resultTable from './resultTable';

export default {
    components: { resultTable },
    props: ['visible', 'data'],
    data() {
        return {
            curTabIndex: 0
        };
    },
    computed: {
        dataList() {
            return this.data[this.curTabIndex].dataList || [];
        }
    },
    methods: {
        close() {
            this.curTabIndex = 0;
            this.$emit('onCancel');
        }
    },
    mounted() {}
};
</script>