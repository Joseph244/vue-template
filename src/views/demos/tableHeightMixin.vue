<style lang="less" module>
.equTypeDict {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    .table {
        flex: 1;
        overflow: hidden;
        margin-bottom: 10px;
        .onlineColor {
            color: @color-success;
        }
        .offlineColor {
            color: @color-warning;
        }
    }
}
</style>
<template>
    <div :class="$style.equTypeDict">
        <div :class="$style.table" v-loading="loading" ref="tableContent">
            <el-table :data="dataList" stripe ref="elTable" :height="tableHeight">
                <el-table-column type="index" width="55">
                    <template slot="header">
                        序号
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID"> </el-table-column>
                <el-table-column prop="equType" label="设备类型"> </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import equApi from '@/api/equ';
import tableHeightMixin from '@/plugins/mixin/tableHeightResize';
export default {
    name: 'equTypeDict',
    mixins: [tableHeightMixin],
    data() {
        return {
            dataList: [],
            loading: false,
        };
    },
    async created() {
        console.info(this.PANELTYPES)    // 访问全局变量
        this.globalFun()  // 调用全局方法
        
        this.loading = true;
        this.dataList = await equApi.equTypeList();
        this.tableHeight = this.$refs.tableContent.offsetHeight;
        this.loading = false;
    }
};
</script>
