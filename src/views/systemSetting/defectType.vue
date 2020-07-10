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

    .form {
        min-height: 210px;
        max-height: 560px;
        overflow: auto;

        .flex {
            display: flex;
            align-items: center;

            .btn {
                margin-left: 20px;
                font-size: 20px;
                cursor: pointer;
                color: #fcc400;
            }
        }
    }

    .optBtn {
        margin-top: 20px;
        text-align: right;
    }
}
</style>

<template>
    <div :class="$style.container">
        <div :class="$style.top">
            <el-button type="primary" @click="add"><i class="el-icon-plus"></i> 新增缺陷类型</el-button>
        </div>
        <div :class="$style.content" ref="content">
            <el-table v-if="tableShow" :data="dataList" :span-method="handleSpan" border :max-height="tableMaxHeight">
                <el-table-column prop="index" label="序号" width="100" align="center"> </el-table-column>
                <el-table-column prop="defectTypeName" label="缺陷名称"> </el-table-column>
                <el-table-column prop="reasonContent" label="缺陷原因"> </el-table-column>
                <el-table-column prop="defectTypeDesc" label="缺陷特征描述"> </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="delItem(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog :title="`${editType === 1 ? '新增' : '编辑'}缺陷类型`" :visible.sync="visible" width="600px" @closed="close">
            <el-form :class="$style.form" :model="curInfo" :rules="rules" label-width="150px" ref="form">
                <el-form-item label="缺陷类型名称" prop="defectTypeName">
                    <el-input v-model.trim="curInfo.defectTypeName" placeholder="请输入缺陷名称" style="width: 320px"></el-input>
                </el-form-item>
                <el-form-item label="缺陷类型描述" prop="defectTypeDesc">
                    <el-input v-model.trim="curInfo.defectTypeDesc" type="textarea" :rows="2" placeholder="请输入缺陷描述" style="width: 320px"></el-input>
                </el-form-item>
                <div v-for="(item, index) in curInfo.defectTypeReasonList" :key="index">
                    <el-form-item
                        :label="index === 0 ? '缺陷类型原因' : ''"
                        :prop="`defectTypeReasonList.${index}.reasonContent`"
                        :rules="[{ required: true, message: '缺陷类型原因不能为空', trigger: 'blur' }]"
                    >
                        <div :class="$style.flex">
                            <el-input v-model.trim="item.reasonContent" placeholder="请输入缺陷类型原因" style="width: 320px"></el-input>
                            <a :class="$style.btn" v-if="index === 0" @click="addReason"><i class="el-icon-circle-plus"></i></a>
                            <a :class="$style.btn" v-else @click="delReason(index)"><i class="el-icon-remove"></i></a>
                        </div>
                    </el-form-item>
                </div>
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
const defectTypeInfo = {
    defectTypeName: '',
    defectTypeDesc: '',
    defectTypeReasonList: [
        {
            reasonId: -1,
            reasonContent: ''
        }
    ]
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
                defectTypeName: [{ required: true, message: '缺陷类型名称不能为空', trigger: 'blur' }]
            }
        };
    },
    computed: {
        dataList() {
            const array = [];
            this.data.map((item, i) => {
                const reasonList = item.defectTypeReasonList || [];
                reasonList.map((value, j) => {
                    array.push({
                        index: i + 1,
                        ...item,
                        ...value,
                        spanRow: j === 0,
                        spanRowNum: reasonList.length
                    });
                });
            });
            return array;
        }
    },
    methods: {
        close() {
            this.$refs['form'].resetFields();
        },
        add() {
            this.editType = 1;
            this.curInfo = _.cloneDeep(defectTypeInfo);
            this.visible = true;
        },
        edit(item) {
            this.editType = 2;
            this.curInfo = _.cloneDeep(item);
            this.visible = true;
        },
        addReason() {
            this.curInfo.defectTypeReasonList.push({ reasonId: -1, reasonContent: '' });
        },
        delReason(index) {
            this.curInfo.defectTypeReasonList.splice(index, 1);
        },
        submit() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    console.log(1);
                }
            });
        },
        handleSpan({ row, column, rowIndex, columnIndex }) {
            if ([0, 1, 3, 4].includes(columnIndex)) {
                return row.spanRow ? [row.spanRowNum, 1] : [0, 0];
            }
        },
        async getDefectTypeList() {
            this.data = await systemApi.getDefectTypeList();
        },
        delItem({ defectTypeId, defectTypeName }) {
            this.$confirm({
                message: `确认删除设备类型【 ${defectTypeName} 】？`,
                yes: async () => {
                    await systemApi.deleteDefectType({ defectTypeId });
                    this.getDefectTypeList();
                },
                no: () => {}
            });
        }
    },
    mounted() {
        this.tableMaxHeight = this.$refs.content.offsetHeight;
        this.tableShow = true;
        this.getDefectTypeList();
    }
};
</script>