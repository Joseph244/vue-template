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
            <el-button type="primary" @click="add"><i class="el-icon-plus"></i> 新增电力设备类型</el-button>
        </div>
        <div :class="$style.content" ref="content">
            <el-table v-if="tableShow" :data="dataList" :span-method="handleSpan" border :max-height="tableMaxHeight">
                <el-table-column prop="index" label="序号" width="100" align="center"> </el-table-column>
                <el-table-column prop="equTypeName" label="电力设备类型"> </el-table-column>
                <el-table-column prop="unitName" label="部件名称"> </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="delItem(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog :title="`${editType === 1 ? '新增' : '编辑'}电力设备类型`" :visible.sync="visible" width="600px" @closed="close">
            <el-form :class="$style.form" :model="curInfo" :rules="rules" label-width="150px" ref="form">
                <el-form-item label="电力设备类型" prop="equTypeName">
                    <el-input v-model.trim="curInfo.equTypeName" placeholder="请输入电力设备类型" style="width: 320px"></el-input>
                </el-form-item>
                <div v-for="(item, index) in curInfo.unitList" :key="index">
                    <el-form-item
                        :label="index === 0 ? '部件名称' : ''"
                        :prop="`unitList.${index}.unitName`"
                        :rules="[{ required: true, message: '部件名称不能为空', trigger: 'blur' }]"
                    >
                        <div :class="$style.flex">
                            <el-input v-model.trim="item.unitName" placeholder="请输入部件名称" style="width: 320px"></el-input>
                            <a :class="$style.btn" v-if="index === 0" @click="addUnit"><i class="el-icon-circle-plus"></i></a>
                            <a :class="$style.btn" v-else @click="delUnit(index)"><i class="el-icon-remove"></i></a>
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

const equUnitInfo = {
    equTypeName: '',
    unitList: [
        {
            unitId: -1,
            unitName: ''
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
                equTypeName: [{ required: true, message: '电力设备类型不能为空', trigger: 'blur' }]
            }
        };
    },
    computed: {
        dataList() {
            const array = [];
            this.data.map((item, i) => {
                const unitList = item.unitList || [];
                unitList.map((value, j) => {
                    array.push({
                        index: i + 1,
                        ...item,
                        ...value,
                        spanRow: j === 0,
                        spanRowNum: unitList.length
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
            this.curInfo = _.cloneDeep(equUnitInfo);
            this.visible = true;
        },
        edit(item) {
            this.editType = 2;
            this.curInfo = _.cloneDeep(item);
            this.visible = true;
        },
        addUnit() {
            this.curInfo.unitList.push({ unitId: -1, unitName: '' });
        },
        delUnit(index) {
            this.curInfo.unitList.splice(index, 1);
        },
        submit() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    console.log(1);
                }
            });
        },
        async getEquUnitList() {
            this.data = await systemApi.getEquUnitList();
        },
        handleSpan({ row, column, rowIndex, columnIndex }) {
            if ([0, 1, 3].includes(columnIndex)) {
                return row.spanRow ? [row.spanRowNum, 1] : [0, 0];
            }
        },
        delItem({ equTypeId, equTypeName }) {
            this.$confirm({
                message: `确认删除设备类型【 ${equTypeName} 】？`,
                yes: async () => {
                    await systemApi.deleteEquUnit({ equTypeId });
                    this.getEquUnitList();
                },
                no: () => {}
            });
        }
    },
    mounted() {
        this.tableMaxHeight = this.$refs.content.offsetHeight;
        this.tableShow = true;
        this.getEquUnitList();
    }
};
</script>