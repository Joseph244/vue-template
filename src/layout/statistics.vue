<style lang="less" module>
.statistics {
    background: @background-dark;
    border-radius: @border-radius-base;
    padding: 8px 0;
    display: flex;
    > div {
        padding: 4px 0;
        margin: 0 10px;
        > i {
            color: @color-grey;
        }
        .icon {
            fill: @color-grey;
            height: 1em;
            width: 1em;
        }
        > label {
            margin: 0 5px;
            color: @color-grey;
        }
        > span {
            font-weight: bold;
            color: @color-light;
        }
    }
    .borderLine {
        border-top: 1px solid @border-color;
        border-bottom: 1px solid @border-color;
    }
}
</style>
<template>
    <div :class="$style.statistics">
        <div>
            <i class="el-icon-menu"></i>
            <label>传感器类型:</label>
            <span>{{ totals.sensorTypeTotal }}</span>
        </div>
        <div :class="$style.borderLine">
            <!-- <i class="el-icon-cpu"></i> -->
            <svgIcon :class="$style.icon" name="sensor" />
            <label>传感器:</label>
            <label>在线率:</label>
            <span>{{ onlineRate }}%</span>
            <label>在线数:</label>
            <span>{{ totals.sensorOnlineTotal }}</span>
            <label>总数:</label>
            <span>{{ totals.sensorTotal }}</span>
        </div>
        <div>
            <i class="el-icon-notebook-2"></i>
            <label>电力设备：</label>
            <span>{{ totals.equTotal }}</span>
        </div>
    </div>
</template>
<script>
import otherApi from '@/api/other';
import { mapState, mapActions } from 'vuex';
export default {
    name: 'statistics',
    data() {
        return {
            // totals: {
            //     sensorTypeTotal: 0,
            //     sensorTotal: 0,
            //     sensorOnlineTotal: 0,
            //     equTotal: 0
            // }
        };
    },
    computed: {
        ...mapState({
            totals: state => state.statistics.totals
        }),
        onlineRate() {
            return this.totals.sensorTotal ? Math.round((this.totals.sensorOnlineTotal / this.totals.sensorTotal) * 100) : 0;
        }
    },
    watch: {
        // totals(val) {
        //     debugger;
        // }
    },
    methods: {
        ...mapActions(['queryTotals'])
    },
    async created() {
        await this.queryTotals();
    }
};
</script>
