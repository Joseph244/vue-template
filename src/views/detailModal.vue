<style lang="less" module>
.detailModal {
    :global {
        .detailRow {
            .title {
                display: inline-block;
                width: 120px;
                font-weight: bold;
                margin-bottom: 6px;
            }
        }
        .tableContent {
            margin: 1em 0;
            .attrItem {
                padding: 0 10px;
            }
            .attrItem:not(:last-child) {
                border-right: 1px dashed @border-color;
            }
        }
    }
}
</style>
<template>
    <!-- 查看详情 -->
    <el-dialog :class="$style.detailModal" :visible="show" title="消息路由详情" :close-on-click-modal="false" @close="closeDetailModal()">
        <!-- {{ detailInfo }} -->
        <template v-if="detailInfo && show">
            <div class="detailRow">
                <span class="title">消息路由名称</span>
                <span class="value">{{ detailInfo.name }}</span>
            </div>

            <div class="detailRow">
                <span class="title">消息来源</span>
                <span class="value">{{ messageSource(detailInfo) }}</span>
            </div>
            <el-table
                v-if="detailInfo.sourceData.content.sensorInfo.length > 0"
                class="tableContent"
                :highlight-current-row="true"
                :max-height="300"
                :data="detailInfo.sourceData.content.sensorInfo"
            >
                <el-table-column align="center" label="序号" type="index" width="60"></el-table-column>
                <!-- <el-table-column align="center" prop="sensorName" label="传感器标识"></el-table-column> -->
                <el-table-column align="center" prop="sensorNameDetail" label="传感器名称"></el-table-column>
            </el-table>
            <div class="detailRow">
                <span class="title">消息来源地址</span>
                <span class="value">{{ detailInfo.sourceData.address }}</span>
            </div>
            <div v-if="detailInfo.sourceData.appName" class="detailRow">
                <span class="title">第三方APP</span>
                <span class="value">{{ detailInfo.sourceData.appName }}</span>
            </div>

            <div class="detailRow">
                <span class="title">消息目标</span>
                <span class="value">{{ messageDesName(detailInfo) }}</span>
            </div>
            <div v-if="detailInfo.destinationData.address" class="detailRow">
                <span class="title">消息目标地址</span>
                <span class="value">{{ detailInfo.destinationData.address }}</span>
            </div>
            <div v-if="detailInfo.destinationData.content.ipAddress" class="detailRow">
                <span class="title">IP地址</span>
                <span class="value">{{ detailInfo.destinationData.content.ipAddress }}</span>
            </div>
            <div v-if="detailInfo.destinationData.content.port" class="detailRow">
                <span class="title">端口</span>
                <span class="value">{{ detailInfo.destinationData.content.port }}</span>
            </div>
            <div v-if="detailInfo.destinationData.content.userName" class="detailRow">
                <span class="title">用户名</span>
                <span class="value">{{ detailInfo.destinationData.content.userName }}</span>
            </div>
            <div v-if="detailInfo.destinationData.content.pwd" class="detailRow">
                <span class="title">密码</span>
                <span class="value">{{ detailInfo.destinationData.content.pwd }}</span>
            </div>
            <div v-if="detailInfo.destinationData.content.topic" class="detailRow">
                <span class="title">目标地址</span>
                <span class="value">{{ detailInfo.destinationData.content.topic }}</span>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDetailModal">关闭</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script>
export default {
    name: 'detailModal',
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
        messageSource(row) {},
        messageDesName(row) {},
        closeDetailModal() {
            this.$emit('update:show', false);
        }
    }
};
</script>
