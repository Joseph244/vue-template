<style lang='less' module>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 15px 20px 20px;

    .top {
        text-align: right;
        margin-bottom: 15px;
    }

    .content {
        flex: 1;
        overflow: hidden;
    }
}
</style>

<template>
    <div :class="$style.container">
        <div :class="$style.top">
            <el-button type="primary"><i class="el-icon-plus"></i> 新增严重等级</el-button>
        </div>
        <div :class="$style.content" ref="content">
            <el-table v-if="tableShow" :data="data" border :max-height="tableMaxHeight">
                <el-table-column prop="index" label="序号" width="100" align="center"> </el-table-column>
                <el-table-column prop="defectGradeName" label="严重等级"> </el-table-column>
                <el-table-column prop="defectGradeDesc" label="描述"> </el-table-column>
                <el-table-column prop="sort" label="排序"> </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'equUnit',
    data() {
        return {
            tableMaxHeight: 0,
            tableShow: false,
            data: []
        };
    },
    methods: {},
    mounted() {
        this.tableMaxHeight = this.$refs.content.offsetHeight;
        this.tableShow = true;
    }
};
</script>