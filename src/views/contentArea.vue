<style lang="less" module>
.messageRoute {
    padding: 0 14px;
    height: 100%;
    overflow: auto;
    position: relative;
    :global {
        .container {
            margin-top: 10px;
            height: calc(100% - 116px);
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
        .tableContent {
            width: 100%;
        }
       
        .el-tag, .el-tag--plain, .el-tag--plain.el-tag--warning, .el-tag--plain.el-tag--success{
            background-color: transparent;
        }
        .el-badge__content.is-fixed{
            top: 18px;
            background-color: @color-hover;
        }
        .el-table .cell{
            line-height: unset;
        }
    }
    .tag{
        border-radius: 10px;
    }
    .box-num{
        margin-top: 10px;
        margin-right: 40px;
    }
}
</style>
<template>
    <div :class="$style.messageRoute">
        <filterRow>
            <el-input
                v-model.trim="queryParams.keyWord"
                style="width: 300px"
                placeholder="请输入消息路由名称进行查询"
                clearable
                @keyup.enter.native="getMessageRouteInfo"
                @clear="getMessageRouteInfo"
                    >
                <el-button slot="append" type="primary" icon="el-icon-search" @click="getMessageRouteInfo" />
            </el-input>
            <div slot="right">
                <el-button icon="el-icon-plus" type="primary" @click="addMessageRoute">
                    新增消息路由
                </el-button>
            </div>
        </filterRow>
        <div ref="tableContent" v-loading="tableLoading" class="container">
            <el-table class="tableContent" :highlight-current-row="true" :max-height="tableHeight" :data="tableDataList">
                <el-table-column align="center" label="序号" type="index" width="60" />
                <el-table-column align="center" prop="name" label="消息路由名称" />
                <el-table-column align="center" label="消息来源">
                    <template slot-scope="scope">
                        <template v-if="messageSource(scope.row).style === 'tag'">
                            <!-- {{ messageSource(scope.row).type}} -->
                            <el-tag
                                v-for="item in messageSource(scope.row).value"
                                :key="item"
                                :class="$style.tag"
                                :type="item"
                                size="mini"
                                effect="plain"
                                    >
                                {{ item }}
                            </el-tag>
                        </template>
                        <template v-else-if="messageSource(scope.row).style === 'box-num'">
                            <!-- <el-tag size="medium" type="warning"  effect="plain">
                               {{  messageSource(scope.row).type }}: {{  messageSource(scope.row).value }}个
                            </el-tag> -->
                            <el-badge :value="messageSource(scope.row).value" :class="$style.box_num">
                                <el-tag size="medium" type="warning" effect="plain">
                                    {{ messageSource(scope.row).type }}
                                </el-tag>
                            </el-badge>
                        </template>
                        <template v-else>
                            <el-tag size="medium" type="success" effect="plain">
                                {{ messageSource(scope.row).value }}
                            </el-tag>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="sensorPos" label="消息目标">
                    <template slot-scope="scope">
                        {{ messageDesName(scope.row) }}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="name" label="操作" width="220">
                    <template slot-scope="scope">
                        <el-button size="small" type="success" @click="routeDetail(scope.row)">
                            详情
                        </el-button>
                        <el-button size="small" type="danger" @click="delSensor(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <el-pagination
            :current-page="queryParams.currentPage"
            :page-size="queryParams.pageSize"
            :page-sizes="[20, 50, 100]"
            :pager-count="5"
            :total="tableTotal"
            layout="total, sizes, prev, pager, next, jumper"
            style="position: absolute; left: 40px; bottom: 10px"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
                />
        <ConfirmModal :confirm-modal-obj="confirmModalObj" :msg="confirmModalObj.msg" desc="" @iot-confirm="delConfirm" />
        <detailModal :show.sync="detailModalVisible" :detail-info="detailModalInfo" />
        <addModal :add-modal-obj="addModalObj" @success="addSuccess" />
    </div>
</template>
<script>
import Api from '@/api/messageRoute.js';
import filterRow from './filterRow';
import detailModal from './detailModal';
import addModal from './addModal';
import util from './util';
export default {
    name: 'ContentArea',
    components: {
        detailModal,
        addModal,
        filterRow
    },
    data() {
        return {
            rules: {},
            tableLoading: false,
            tableHeight: 0,
            queryParams: {
                currentPage: 1,
                pageSize: 17,
                keyWord: ''
            },
            tableDataList: [],
            tableTotal: 0,
            confirmModalObj: {
                show: false,
                value: null,
                msg: '删除消息路由'
            },
            detailModalVisible: false,
            detailModalInfo: {},
            addModalObj: {
                show: false
            }
        };
    },
    created() {
        this.getMessageRouteInfo();
    },
    mounted(){
        window.addEventListener('resize', this.resizeHeight);
    },
    destroyed() {
        window.removeEventListener('resize', this.$chartMixinResize);
    },
    methods: {
        resizeHeight(){
            this.$nextTick(() => (this.tableHeight = this.$refs.tableContent.offsetHeight));
        },
        messageSource(row) {
            return util.messageSource(row);
        },
        messageDesName(row) {
            return util.messageDesName(row);
        },
        // 获取电力设备下的传感器列表
        getMessageRouteInfo() {
            this.tableLoading = true;
            Api.getMessageRouteInfo(this.queryParams).then(res => {
                this.tableDataList = res.sensorInfo;
                this.tableTotal = res.total;
                this.$nextTick(() => (this.tableHeight = this.$refs.tableContent.offsetHeight));
                this.tableLoading = false;
            });
        },
        delSensor(item) {
            this.confirmModalObj.show = true;
            this.confirmModalObj.value = item;
            this.confirmModalObj.msg = `删除消息路由[${item.name}]`;
        },
        delConfirm(val) {
            Api.deleteInformationRoute({
                id: val.id
            }).then(() => {
                if (this.queryParams.currentPage > 1 && this.tableDataList.length == 1) {
                    this.queryParams.currentPage -= 1;
                }
                this.getMessageRouteInfo();
            });
        },
        routeDetail(val) {
            this.detailModalVisible = true;
            this.detailModalInfo = val;
        },
        addMessageRoute() {
            this.addModalObj.show = true;
        },
        addSuccess() {
            this.getMessageRouteInfo();
        },
        handleSizeChange(val) {
            this.queryParams.pageSize = val;
            this.getMessageRouteInfo();
        },
        handleCurrentChange(val) {
            this.queryParams.currentPage = val;
            this.getMessageRouteInfo();
        }
    }
};
</script>
