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

    .optBtn {
        margin-top: 30px;
        text-align: right;
    }
}
</style>

<template>
    <div :class="$style.container">
        <div :class="$style.top">
            <el-button type="primary" @click="add"><i class="el-icon-plus"></i> 新增严重等级</el-button>
        </div>
        <div :class="$style.content" ref="content">
            <el-table v-if="tableShow" :data="data" border :max-height="tableMaxHeight">
                <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
                <el-table-column prop="defectGradeName" label="严重等级"> </el-table-column>
                <el-table-column prop="defectGradeDesc" label="描述"> </el-table-column>
                <el-table-column prop="sort" label="排序"> </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="delItem(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog :title="`${editType === 1 ? '新增' : '编辑'}严重等级`" :visible.sync="visible" width="600px" @closed="close">
            <el-form :model="curInfo" :rules="rules" label-width="150px" ref="form">
                <el-form-item label="严重等级名称" prop="defectGradeName">
                    <el-input v-model.trim="curInfo.defectGradeName" placeholder="请输入严重等级名称" style="width: 320px"></el-input>
                </el-form-item>
                <el-form-item label="严重等级描述" prop="defectGradeDesc">
                    <el-input v-model.trim="curInfo.defectGradeDesc" type="textarea" :rows="2" placeholder="请输入严重等级描述" style="width: 320px"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model.trim="curInfo.sort" placeholder="请输入排序" style="width: 320px"></el-input>
                </el-form-item>
            </el-form>
            <div :class="$style.optBtn">
                <el-button type="primary" @click="visible = false">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import _ from 'lodash';
import systemApi from '@/api/system';
const defectGradeInfo = {
    defectGradeName: '',
    defectGradeDesc: '',
    sort: ''
};

export default {
    name: 'equUnit',
    data() {
        return {
            tableMaxHeight: 0,
            tableShow: false,
            data: [],
            visible: false,
            editType: 1,
            curInfo: {},
            rules: {
                defectGradeName: [{ required: true, message: '严重等级名称不能为空', trigger: 'blur' }]
            }
        };
    },
    methods: {
        close() {
            this.$refs['form'].resetFields();
        },
        add() {
            this.editType = 1;
            this.curInfo = _.cloneDeep(defectGradeInfo);
            this.visible = true;
        },
        edit(item) {
            this.editType = 2;
            this.curInfo = _.cloneDeep(item);
            this.visible = true;
        },
        submit() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    console.log(1);
                }
            });
        },
        async getDefectGradeList() {
            this.data = await systemApi.getDefectGradeList();
        },
        delItem({ defectGradeId, defectGradeName }) {
            this.$confirm({
                message: `确认删除设备类型【 ${defectGradeName} 】？`,
                yes: async () => {
                    await systemApi.deleteDefectGrade({ defectGradeId });
                    this.getDefectGradeList();
                },
                no: () => {}
            });
        }
    },
    mounted() {
        this.tableMaxHeight = this.$refs.content.offsetHeight;
        this.tableShow = true;
        this.getDefectGradeList();
    }
};
</script>