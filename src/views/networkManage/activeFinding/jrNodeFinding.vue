<style lang="less" module>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .content {
        flex: 1;
    }

    .bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        > button {
            height: 40px;
            line-height: 38px;
            font-size: 18px;
        }
    }
}

.toast {
    .info {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        justify-content: space-between;
        padding: 5px 100px;
        background: #075856;
        margin-bottom: 20px;

        > li {
            line-height: 40px;
            display: flex;
            > label {
                font-size: 16px;
                width: 80px;
                text-align: right;
                color: #00ffff;
            }
        }
    }
    .optBtn {
        text-align: center;
        margin: 30px 0 20px;
    }
    :global {
        .el-dialog__body {
            padding: 0;
        }
    }
}
</style>

<template>
    <div :class="$style.container">
        <div :class="$style.top">
            <el-radio-group v-model="type">
                <el-radio-button :label="1">新发现</el-radio-button>
                <el-radio-button :label="2">已注册</el-radio-button>
            </el-radio-group>
            <el-button type="primary" icon="el-icon-plus" @click="add" v-if="type === 2">手动添加</el-button>
        </div>

        <div :class="$style.content" ref="content">
            <el-table v-if="tableShow" :data="dataList" border :max-height="tableMaxHeight" ref="table">
                <el-table-column type="index" label="序号" width="60"> </el-table-column>
                <el-table-column prop="equId" label="设备ID"> </el-table-column>
                <el-table-column prop="stationName" label="站点名称"> </el-table-column>
                <el-table-column prop="panelType" label="设备类型">
                    <template slot-scope="scope">{{ PANELTYPES[scope.row.panelType] }}</template>
                </el-table-column>
                <el-table-column prop="factory" label="厂商"> </el-table-column>
                <el-table-column prop="softwareVersion" label="软件版本"> </el-table-column>
                <el-table-column prop="hardwareVersion" label="硬件版本"> </el-table-column>
                <el-table-column label="操作" align="center" width="120" v-if="type === 1">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="registe(scope.row)">注册</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div :class="$style.bottom">
            <button class="comBtn" @click="prev"><i class="el-icon-d-arrow-left"></i> 范围选择</button>
            <button class="comBtn" @click="next">发现汇聚节点 <i class="el-icon-d-arrow-right"></i></button>
        </div>

        <el-dialog :class="$style.toast" :title="toastType === 1 ? '注册新发现接入节点' : '编辑接入节点'" :visible.sync="visible" width="600px" @closed="close">
            <ul :class="$style.info">
                <li><label>站点名称：</label>{{ curInfo.stationName }}</li>
                <li><label>设备类型：</label>{{ PANELTYPES[curInfo.panelType] }}</li>
                <li v-if="toastType === 1" style="width: 100%"><label>设备ID：</label>{{ curInfo.equId }}</li>
            </ul>
            <el-form :model="curInfo" :rules="rules" label-width="150px" ref="form">
                <template v-if="toastType === 2">
                    <el-form-item label="设备ID" prop="panelId">
                        <el-input v-model.trim="curInfo.panelId" placeholder="请输入设备ID" style="width: 320px"></el-input>
                    </el-form-item>
                    <el-form-item label="专业类别" prop="majorType">
                        <el-select v-model="curInfo.majorType" placeholder="请选择专业类别" style="width: 320px">
                            <el-option v-for="(item, index) in majorTypeList" :key="index" :value="item.value" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="软件版本" prop="softwareVersion">
                        <el-input v-model.trim="curInfo.softwareVersion" placeholder="请输入软件版本" style="width: 320px"></el-input>
                    </el-form-item>
                    <el-form-item label="硬件版本" prop="hardwareVersion">
                        <el-input v-model.trim="curInfo.hardwareVersion" placeholder="请输入硬件版本" style="width: 320px"></el-input>
                    </el-form-item>
                    <el-form-item label="厂商" prop="factory">
                        <el-input v-model.trim="curInfo.factory" placeholder="请输入厂商" style="width: 320px"></el-input>
                    </el-form-item>
                </template>
                <el-form-item label="平台通道" prop="access">
                    <el-radio-group v-model="curInfo.access">
                        <el-radio :label="1">4GNPN</el-radio>
                        <el-radio :label="2">内网固定IP</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="流量套餐" prop="flow" v-if="curInfo.access === 1">
                    <el-input v-model.trim="curInfo.flow" placeholder="请输入流量套餐" style="width: 320px">
                        <template slot="append">GB/月</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="内网IP地址" prop="ip" v-if="curInfo.access === 2">
                    <el-input v-model.trim="curInfo.ip" placeholder="请输入内网IP地址" style="width: 320px"></el-input>
                </el-form-item>
            </el-form>
            <div :class="$style.optBtn">
                <el-button type="primary" @click="close">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import api from '@/api/activeFinding';

const defaultInfo = {
    panelType: 'DEVICE',
    panelId: '',
    majorType: '',
    softwareVersion: '',
    hardwareVersion: '',
    factory: '',
    access: 1,
    flow: '',
    ip: ''
};

export default {
    props: ['stationId'],
    data() {
        return {
            tableShow: false,
            tableMaxHeight: 0,
            type: 1,
            newList: [], // 新发现列表
            registeredList: [], // 已注册列表
            majorTypeList: [],
            curInfo: {},
            visible: false,
            toastType: 1, // 1注册，2编辑
            rules: {
                panelId: [{ required: true, message: '设备ID不能为空', trigger: 'blur' }],
                majorType: [{ required: true, message: '专业类别不能为空', trigger: 'change' }],
                softwareVersion: [{ required: true, message: '软件版本不能为空', trigger: 'blur' }],
                hardwareVersion: [{ required: true, message: '硬件版本不能为空', trigger: 'blur' }],
                factory: [{ required: true, message: '厂商不能为空', trigger: 'blur' }],
                access: [{ required: true, message: '平台通道不能为空', trigger: 'blur' }],
                flow: [{ required: true, message: '流量套餐不能为空', trigger: 'blur' }],
                ip: [{ required: true, message: '内网IP不能为空', trigger: 'blur' }]
            }
        };
    },
    computed: {
        dataList() {
            return this.type === 1 ? this.newList : this.registeredList;
        }
    },
    methods: {
        registe(item) {
            this.curInfo = { access: 1, flow: '', ip: '', ...item };
            this.toastType = 1;
            this.visible = true;
        },
        add() {
            this.curInfo = { ...defaultInfo };
            this.toastType = 2;
            this.visible = true;
        },
        submit() {
            this.$refs['form'].validate(async valid => {
                if (valid) {
                    this.toastType === 1 ? this.registeSubmit() : this.addSubmit();
                }
            });
        },
        async registeSubmit() {
            await api.registeJrNode({
                stationId: this.stationId,
                equIdWhite: {
                    equId: this.curInfo.equId,
                    access: this.curInfo.access,
                    flow: this.curInfo.flow,
                    ip: this.curInfo.ip
                }
            });
            this.$message({ message: '接入节点注册成功！', type: 'success' });
            this.close();
            this.findJrList();
        },
        async addSubmit() {
            await api.addJrNode({
                stationId: this.stationId,
                panelType: this.curInfo.panelType,
                panelId: this.curInfo.panelId,
                majorType: this.curInfo.majorType,
                softwareVersion: this.curInfo.softwareVersion,
                hardwareVersion: this.curInfo.hardwareVersion,
                factory: this.curInfo.factory,
                access: this.curInfo.access,
                flow: this.curInfo.flow,
                ip: this.curInfo.ip
            });
            this.$message({ message: '手动添加接入节点成功！', type: 'success' });
            this.close();
            this.findJrList();
        },
        next() {
            this.$parent.next();
        },
        prev() {
            this.$parent.reset();
        },
        close() {
            this.$refs['form'].resetFields();
            this.visible = false;
        },
        getMajorTypeList() {
            const array = [];
            for (const key in this.MAJORTYPES) {
                array.push({ name: this.MAJORTYPES[key], value: key });
            }
            this.majorTypeList = array;
        },
        async findJrList() {
            const res = await api.findJrList({ stationId: this.stationId });
            this.newList = res.newFinding || [];
            this.registeredList = res.registered || [];
            this.$parent.stepInfo[1].num = this.$parent.stepInfo[1].num || this.newList.length + this.registeredList.length;
        }
    },
    watch: {
        type() {
            this.tableShow = false;
            this.$nextTick(() => (this.tableShow = true));
        }
    },
    mounted() {
        this.tableMaxHeight = this.$refs.content.offsetHeight;
        this.tableShow = true;
        this.getMajorTypeList();
        this.findJrList();
    }
};
</script>
