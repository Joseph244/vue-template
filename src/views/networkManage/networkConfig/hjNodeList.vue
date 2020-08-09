<style lang="less" module>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .filter {
        padding: 15px 0;
    }
    .content {
        flex: 1;
        overflow: hidden;
        margin-bottom: 20px;

        .detail {
            display: flex;
            justify-content: space-between;
            padding: 10px 20px;
            color: #00fff6;
            font-size: 15px;

            .left {
                display: flex;
                align-items: center;

                > label {
                    color: #58f344;
                    margin-right: 10px;
                }
                > div {
                    margin-right: 40px;
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
        <div :class="$style.filter">
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
                                <div><i class="el-icon-data-line"></i> 工作频点：{{ scope.row.frequency }}</div>
                                <div><i class="fa fa-signal"></i> 信号强度：{{ scope.row.signal }}</div>
                                <div><i class="fa fa-play-circle"></i> 最近启动时间：{{ scope.row.bootTime }}</div>
                            </div>
                            <div :class="$style.right">
                                <span><i class="el-icon-time"></i> 刷新时间：{{ scope.row.refreshTime }}</span>
                                <a @click="refreshInfo(scope.row)"><i class="el-icon-refresh-right"></i> 刷新</a>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="nodeId" label="设备ID"> </el-table-column>
                <el-table-column prop="stationName" label="站点名称"> </el-table-column>
                <el-table-column prop="parentId" label="父节点ID"> </el-table-column>
                <el-table-column prop="softwareVersion" label="软件版本"> </el-table-column>
                <el-table-column prop="hardwareVersion" label="硬件版本"> </el-table-column>
                <el-table-column prop="factory" label="厂商"> </el-table-column>
                <el-table-column prop="alertCount" label="告警数量"> </el-table-column>
                <el-table-column prop="onlineStatus" label="在线状态">
                    <template slot-scope="scope">{{ { 1: '在线', 0: '离线' }[scope.row.onlineStatus] }}</template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="primary" size="mini" @click="config(scope.row)">配置</el-button>
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

        <el-dialog :class="$style.toast" title="编辑汇聚节点" :visible.sync="editVisible" width="600px" @closed="close">
            <ul :class="$style.info">
                <li><label>设备ID：</label>{{ curInfo.nodeId }}</li>
                <li><label>站点名称：</label>{{ curInfo.stationName }}</li>
            </ul>
            <el-form :model="curInfo" :rules="rules" label-width="150px" ref="form">
                <el-form-item label="软件版本" prop="softwareVersion">
                    <el-input v-model.trim="curInfo.softwareVersion" placeholder="请输入软件版本" style="width: 320px"></el-input>
                </el-form-item>
                <el-form-item label="硬件版本" prop="hardwareVersion">
                    <el-input v-model.trim="curInfo.hardwareVersion" placeholder="请输入硬件版本" style="width: 320px"></el-input>
                </el-form-item>
                <el-form-item label="厂商" prop="factory">
                    <el-input v-model.trim="curInfo.factory" placeholder="请输入厂商" style="width: 320px"></el-input>
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
                searchId: '',
                currentPage: 1,
                pageSize: 20
            },
            total: 0,
            data: [],
            curInfo: {},
            editVisible: false,
            rules: {
                softwareVersion: [{ required: true, message: '软件版本不能为空', trigger: 'blur' }],
                hardwareVersion: [{ required: true, message: '硬件版本不能为空', trigger: 'blur' }],
                factory: [{ required: true, message: '厂商不能为空', trigger: 'blur' }]
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
                    await api.hjNode_edit({
                        nodeId: this.curInfo.nodeId,
                        softwareVersion: this.curInfo.softwareVersion,
                        hardwareVersion: this.curInfo.hardwareVersion,
                        factory: this.curInfo.factory
                    });
                    this.$message({ message: '汇聚节点编辑成功！', type: 'success' });
                    this.close();
                    this.search();
                }
            });
        },
        async refreshInfo(item) {
            const res = await api.hjNode_queryStatus({
                nodeId: item.nodeId,
                stationId: item.stationId
            });
            Object.assign(item, res);
        },
        async search(params) {
            if (params) this.searchParams = { ...this.searchParams, ...params };
            if (this.stationIdList.length === 0) return false;
            const res = await api.hjNode_query({
                ...this.searchParams,
                stationIdList: this.stationIdList
            });
            this.data = res.dataList || [];
            this.total = res.total;
        },
        config(row) {
            if (row.nodeId) {
                this.$router.push({ path: '/networkConfig/hjNodeConfig', query: { nodeId: row.nodeId } });
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
        this.search();
    }
};
</script>
