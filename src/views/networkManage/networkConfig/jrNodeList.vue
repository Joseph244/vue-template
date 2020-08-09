<style lang="less" module>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .filter {
        padding: 15px 0;
        color: #00ffff;
    }
    .content {
        flex: 1;
        overflow: hidden;
        margin-bottom: 20px;

        .detail {
            display: flex;
            justify-content: space-between;
            padding: 10px 20px 0;
            color: #00fff6;
            font-size: 15px;

            .left {
                display: flex;

                > label {
                    color: #58f344;
                    margin-right: 10px;
                }
                > ul {
                    width: 720px;
                    overflow: hidden;
                    > li {
                        width: 240px;
                        float: left;
                        margin-bottom: 10px;
                    }
                }
            }
            .right {
                > span {
                    color: #58f344;
                    margin-right: 20px;
                }
                > a {
                    cursor: pointer;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
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
            &:first-child {
                width: 100%;
            }
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
        <div :class="$style.filter">
            <label>类型</label>
            <el-select clearable v-model="searchParams.panelType" placeholder="请选择接入节点类型" style="margin: 0 20px 0 10px" @change="search">
                <el-option v-for="(item, index) in panelTypeList" :key="index" :value="item.value" :label="item.name"></el-option>
            </el-select>
            <el-input v-model="searchParams.searchId" clearable placeholder="请输入设备ID" style="width: 300px" @keyup.enter.native="search">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
        </div>

        <div :class="$style.content" ref="content">
            <el-table v-if="tableShow" :data="data" border :max-height="tableMaxHeight">
                <el-table-column type="expand" width="50">
                    <template slot-scope="scope">
                        <div :class="$style.detail">
                            <div :class="$style.left">
                                <label>当前状态：</label>
                                <ul>
                                    <li><i class="fa fa-floppy-o"></i> 内存使用率：{{ scope.row.memory }}</li>
                                    <li><i class="fa fa-microchip"></i> 存储器使用率：{{ scope.row.storage }}</li>
                                    <li><i class="el-icon-cpu"></i> CPU使用率：{{ scope.row.cpu }}</li>
                                    <li><i class="el-icon-s-data"></i> 数据接入速率：{{ scope.row.dataRate }}</li>
                                    <li style="width: 480px"><i class="fa fa-play-circle"></i> 最近启动时间：{{ scope.row.bootTime }}</li>
                                </ul>
                            </div>
                            <div :class="$style.right">
                                <span><i class="el-icon-time"></i> 刷新时间：{{ scope.row.refreshTime }}</span>
                                <a @click="refreshInfo(scope.row)"><i class="el-icon-refresh-right"></i> 刷新</a>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="nodeId" label="设备ID"> </el-table-column>
                <el-table-column prop="panelType" label="设备类型">
                    <template slot-scope="scope">{{ PANELTYPES[scope.row.panelType] }}</template>
                </el-table-column>
                <el-table-column prop="stationName" label="站点名称"> </el-table-column>
                <el-table-column prop="cityName" label="城市名称"> </el-table-column>
                <el-table-column prop="parentId" label="父节点ID"> </el-table-column>
                <el-table-column prop="majorType" label="专业类型"> </el-table-column>
                <el-table-column prop="factory" label="厂商"> </el-table-column>
                <el-table-column prop="softwareVersion" label="软件版本"> </el-table-column>
                <el-table-column prop="hardwareVersion" label="硬件版本"> </el-table-column>
                <el-table-column prop="alertCount" label="告警数量"> </el-table-column>
                <el-table-column prop="onlineStatus" label="在线状态">
                    <template slot-scope="scope">{{ { 1: '在线', 0: '离线' }[scope.row.onlineStatus] }}</template>
                </el-table-column>
                <el-table-column label="操作" width="210" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="primary" size="mini" @click="config(scope.row)">配置</el-button>
                        <el-button type="primary" size="mini" @click="del(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-pagination
            background
            layout="total, prev, pager, next, sizes"
            :current-page="searchParams.currentPage"
            :page-size="searchParams.pageSize"
            @current-change="currentPage => search({ currentPage })"
            @size-change="pageSize => search({ currentPage: 1, pageSize })"
            :pager-count="5"
            :total="total"
        />

        <el-dialog :class="$style.toast" title="编辑接入节点" :visible.sync="editVisible" width="600px" @closed="close">
            <ul :class="$style.info">
                <li><label>设备ID：</label>{{ curInfo.nodeId }}</li>
                <li><label>站点名称：</label>{{ curInfo.stationName }}</li>
                <li><label>设备类型：</label>{{ PANELTYPES[curInfo.panelType] }}</li>
            </ul>
            <el-form :model="curInfo" :rules="rules" label-width="150px" ref="form">
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
import api from '@/api/networkConfigList';

export default {
    props: ['stationIdList'],
    data() {
        return {
            tableShow: false,
            tableMaxHeight: 0,
            searchParams: {
                panelType: '',
                searchId: '',
                currentPage: 1,
                pageSize: 20
            },
            panelTypeList: [],
            majorTypeList: [],
            total: 0,
            data: [],
            curInfo: {},
            editVisible: false,
            rules: {
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
    methods: {
        edit(item) {
            this.curInfo = { ...item };
            this.editVisible = true;
        },
        close() {
            this.$refs['form'].resetFields();
            this.editVisible = false;
        },
        submit() {
            this.$refs['form'].validate(async valid => {
                if (valid) {
                    await api.jrNode_edit({
                        nodeId: this.curInfo.nodeId,
                        panelType: this.curInfo.panelType,
                        majorType: this.curInfo.majorType,
                        softwareVersion: this.curInfo.softwareVersion,
                        hardwareVersion: this.curInfo.hardwareVersion,
                        factory: this.curInfo.factory,
                        access: this.curInfo.access,
                        flow: this.curInfo.flow,
                        ip: this.curInfo.ip
                    });
                    this.$message({ message: '接入节点编辑成功！', type: 'success' });
                    this.close();
                    this.search();
                }
            });
        },
        del(item) {
            this.$myConfirm({
                message: '确定删除当前接入节点么？',
                yes: async () => {
                    await api.jrNode_del({
                        nodeId: item.nodeId,
                        panelType: item.panelType
                    });
                    this.$message({ message: '接入节点删除成功！', type: 'success' });
                    if (this.data.length === 1 && this.searchParams.currentPage > 1) this.searchParams.currentPage--;
                    this.search();
                }
            });
        },
        async refreshInfo(item) {
            const res = await api.jrNode_queryStatus({
                nodeId: item.nodeId,
                panelType: item.panelType,
                stationId: item.stationId
            });
            Object.assign(item, res);
        },
        async search(params) {
            if (params) this.searchParams = { ...this.searchParams, ...params };
            if (this.stationIdList.length === 0) return false;
            const res = await api.jrNode_query({
                ...this.searchParams,
                stationIdList: this.stationIdList
            });
            this.data = res.dataList || [];
            this.total = res.total;
        },
        getPanelTypeList() {
            const array = [];
            for (const key in this.PANELTYPES) {
                array.push({ name: this.PANELTYPES[key], value: key });
            }
            this.panelTypeList = array;
        },
        getMajorTypeList() {
            const array = [];
            for (const key in this.MAJORTYPES) {
                array.push({ name: this.MAJORTYPES[key], value: key });
            }
            this.majorTypeList = array;
        },
        config(row) {
            if (row.nodeId) {
                row.panelType === 'MCB' && this.$router.push({ path: '/networkConfig/jrNodeMCB', query: { nodeId: row.nodeId } });
                row.panelType === 'DEVICE' && this.$router.push({ path: '/networkConfig/jrNodeDevice', query: { nodeId: row.nodeId } });
            } else {
                console.error('nodeId缺失', row);
            }
        }
    },
    watch: {
        stationIdList(val) {
            this.search();
        }
    },
    mounted() {
        this.tableMaxHeight = this.$refs.content.offsetHeight;
        this.tableShow = true;
        this.getPanelTypeList();
        this.getMajorTypeList();
        this.search();
    }
};
</script>
