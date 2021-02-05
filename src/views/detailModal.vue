<style lang="less" module>
.detailModal {
    .detailRow {
        padding: 10px 16px;
        border: 1px solid @background-primary;
        background: @background-dark;
        border-radius: 5px;
        margin-bottom: 20px;
        .title {
            font-weight: bold;
            margin-bottom: 6px;
            position: relative;
            top: -23px;
            margin-bottom: 6px;
            background: @background-black;
            padding: 3px 10px;
            border-radius: 3px;
            display: inline-block;
            width: 106px;
            text-align: center;
        }
        .value{
            margin-top: -15px;
            display: block;
        }
        .flexC{
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            >div:not(:last-child){
                margin: 0 10px 10px 0;
            }
        }
        .tag{
            margin-right: 4px;
            margin-bottom: 4px;
        }
    }
    .tableContent {
        margin-top: 10px;
        .attrItem {
            padding: 0 10px;
        }
        .attrItem:not(:last-child) {
            border-right: 1px dashed @border-color;
        }
    }
    :global{
        .el-table .el-table__body tbody tr td{
            height: 40px;
            line-height: 40px;
        }
    }
}
</style>
<template>
    <!-- 查看详情 -->
    <el-dialog :class="$style.detailModal" :visible="show" title="消息路由详情" width="600px" :close-on-click-modal="false" @close="closeDetailModal()">
        <!-- {{ detailInfo }} -->
        <template v-if="detailInfo && show">
            <div :class="$style.detailRow">
                <span :class="$style.title" style="font-weight: bold;">消息路由名称</span>
                <span :class="$style.value">{{ detailInfo.name }}</span>
            </div>
            

            <div :class="$style.detailRow">
                <span :class="$style.title">消息来源</span>
                <span :class="$style.value">
                    <template v-if="messageSource(detailInfo).style === 'tag'">
                        <!-- {{ messageSource(detailInfo).type}} -->
                        <el-tag
                            v-for="item in messageSource(detailInfo).value"
                            :key="item"
                            :class="$style.tag"
                            :type="item"
                            size="mini"
                            effect="plain"
                                >
                            {{ item }}
                        </el-tag>
                    </template>
                    <template v-else-if="messageSource(detailInfo).style === 'box-num'">
                        <el-tag size="medium" type="warning" effect="plain">
                            {{ messageSource(detailInfo).type }}: {{ messageSource(detailInfo).value }}个
                        </el-tag>
                    </template>
                    <template v-else>
                        <el-tag size="medium" type="success" effect="plain">
                            {{ messageSource(detailInfo).value }}
                        </el-tag>
                    </template>
                </span>

                <!-- <el-table
                    v-if="detailInfo.sourceData.content.sensorInfo.length > 0"
                    :class="$style.tableContent"
                    :highlight-current-row="true"
                    :max-height="300"
                    :data="detailInfo.sourceData.content.sensorInfo"
                >
                    <el-table-column align="center" label="序号" type="index" width="60"></el-table-column>
                    <el-table-column align="center" prop="sensorName" label="传感器名称"></el-table-column>
                </el-table> -->
                <div v-if="detailInfo.sourceData.content.sensorInfo.length > 0" style="display:flex;flex-wrap: wrap;margin:10px 0;max-height: 223px;overflow: auto;">
                    <el-card v-for="(item,index) in detailInfo.sourceData.content.sensorInfo" :key="index" shadow="always" style="margin:0 4px 4px 0;">
                        {{ item.sensorName }}
                    </el-card>
                </div>
                <TwoLineCard v-if="detailInfo.sourceData.address" style="width: 100%;margin-top:10px;" title="消息来源地址" :value="detailInfo.sourceData.address" />
                <!-- <el-table
                    v-if="detailInfo.sourceData.content.sensorTypeName && detailInfo.sourceData.content.sensorTypeName.length > 0"
                    :class="$style.tableContent"
                    :highlight-current-row="true"
                    :max-height="300"
                    :data="detailInfo.sourceData.content.sensorTypeName"
                >
                    <el-table-column align="center" label="序号" type="index" width="60"></el-table-column>
                    <el-table-column align="center" label="传感器类型">
                        <template slot-scope="scope">
                            {{scope.row}}
                        </template>
                    </el-table-column>
                </el-table> -->
            </div>
            
            <!-- <div v-if="detailInfo.sourceData.address" :class="$style.detailRow">
                <span :class="$style.title">消息来源地址</span>
                <span :class="$style.value">{{ detailInfo.sourceData.address }}</span>
            </div> -->
            <div v-if="detailInfo.sourceData.appName" :class="$style.detailRow">
                <span :class="$style.title">第三方APP</span>
                <span :class="$style.value">{{ detailInfo.sourceData.appName }}</span>
            </div>

            <div :class="$style.detailRow">
                <span :class="$style.title">消息目标</span>
                <span :class="$style.value">
                    <div>{{ messageDesName(detailInfo) }}</div>
                    <div :class="$style.flexC">
                        <TwoLineCard v-if="detailInfo.destinationData.address" style="width: 100%" title="消息目标地址" :value="detailInfo.destinationData.address" />
                        <TwoLineCard v-if="detailInfo.destinationData.content.ipAddress" title="IP地址" :value="detailInfo.destinationData.content.ipAddress" />
                        <TwoLineCard v-if="detailInfo.destinationData.content.port" title="端口" :value="detailInfo.destinationData.content.port" />
                        <TwoLineCard v-if="detailInfo.destinationData.content.userName" title="用户名" :value="detailInfo.destinationData.content.userName" />
                        <TwoLineCard v-if="detailInfo.destinationData.content.pwd" title="密码" :value="detailInfo.destinationData.content.pwd" />
                        <TwoLineCard v-if="detailInfo.destinationData.content.topic" title="目标地址" :value="detailInfo.destinationData.content.topic" />
                    </div>
                   
                </span>
            </div>
            

            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDetailModal">
                    关闭
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script>
import util from './util';
import TwoLineCard from './twoLineCard';

export default {
    name: 'DetailModal',
    components:{
        TwoLineCard
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        detailInfo: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            // 字典映射
            sourceDataType: {
                '0': '设备数据',
                '1': '第三方APP'
            },
            destinationDataType: {
                '1': '第三方App',
                '2': '物联管理云平台',
                '3': '其他云平台'
            }
        };
    },
    methods: {
        messageSource(row) {
            return util.messageSource(row);
        },
        messageDesName(row) {
            return util.messageDesName(row);
        },
        closeDetailModal() {
            this.$emit('update:show', false);
        }
    }
};
</script>
