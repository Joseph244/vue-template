<style lang='less' module>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 15px 20px 20px;

    .top {
        text-align: right;
        margin-bottom: 15px;
        .searchItem {
            float: left;
            label {
                margin-right: 10px;
            }
        }
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
            <div :class="$style.searchItem">
                <label>局放类型</label>
                <el-select v-model="searchParams.jfTypeId" clearable placeholder="请选择局放类型" @change="getAlgorithmList">
                    <el-option v-for="item in jfTypes" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
            <el-button type="primary" @click="add"><i class="el-icon-plus"></i> 新增算法</el-button>
        </div>
        <div :class="$style.content" ref="content">
            <el-table v-if="tableShow" :data="data" border :max-height="tableMaxHeight">
                <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
                <el-table-column prop="algorithmName" label="算法名称"> </el-table-column>
                <el-table-column prop="algorithmUrl" label="算法接口地址"> </el-table-column>
                <el-table-column prop="algorithmType" label="接入类型" width="120"> </el-table-column>
                <el-table-column prop="algorithmFactory" label="算法厂家"> </el-table-column>
                <el-table-column prop="connectTime" label="接入时间" width="160"> </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="delItem(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog :title="`${editType === 1 ? '新增' : '编辑'}算法`" :visible.sync="visible" width="600px" @closed="close">
            <el-form :model="curInfo" :rules="rules" label-width="150px" ref="form">
                <el-form-item label="算法名称" prop="algorithmName">
                    <el-input v-model.trim="curInfo.algorithmName" placeholder="请输入算法名称" style="width: 320px"></el-input>
                </el-form-item>
                <el-form-item label="算法接口地址" prop="algorithmUrl">
                    <el-input v-model.trim="curInfo.algorithmUrl" placeholder="请输入算法接口地址" style="width: 320px"></el-input>
                </el-form-item>
                <el-form-item label="接入类型" prop="algorithmType">
                    <el-input v-model.trim="curInfo.algorithmType" placeholder="请输入接入类型" style="width: 320px"></el-input>
                </el-form-item>
                <el-form-item label="算法厂家" prop="algorithmFactory">
                    <el-input v-model.trim="curInfo.algorithmFactory" placeholder="请输入算法厂家" style="width: 320px"></el-input>
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
const algorithmInfo = {
    algorithmName: '',
    algorithmUrl: '',
    algorithmType: '',
    algorithmFactory: ''
};

export default {
    name: 'equUnit',
    data() {
        return {
            searchParams: {
                jfTypeId: null
            },
            tableMaxHeight: 0,
            tableShow: false,
            data: [],
            visible: false,
            editType: 1,
            curInfo: {},
            rules: {
                algorithmName: [{ required: true, message: '算法名称不能为空', trigger: 'blur' }]
            }
        };
    },
    computed: {
        jfTypes() {
            return this.$store.state.dict.jfTypes;
        }
    },
    methods: {
        close() {
            this.$refs['form'].resetFields();
        },
        add() {
            this.editType = 1;
            this.curInfo = _.cloneDeep(algorithmInfo);
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
        async getAlgorithmList() {
            this.data = await systemApi.getAlgorithmList({ algorithmTypeId: this.searchParams.jfTypeId });
        },
        delItem({ algorithmId, algorithmName }) {
            this.$confirm({
                message: `确认删除设备类型【 ${algorithmName} 】？`,
                yes: async () => {
                    await systemApi.deleteAlgorithm({ algorithmId });
                    this.getAlgorithmList();
                },
                no: () => {}
            });
        }
    },
    mounted() {
        this.tableMaxHeight = this.$refs.content.offsetHeight;
        this.tableShow = true;
        this.getAlgorithmList();
    }
};
</script>