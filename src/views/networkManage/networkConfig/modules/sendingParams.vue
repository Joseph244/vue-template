<style lang="less" module>
.sendingParams {
    .leftTitleRow {
        padding-bottom: 4px;
        border-bottom: 1px solid #006666;
        display: flex;
        justify-content: space-between;
        .title {
            color: #00ffff;
            font-size: 15px;
            font-weight: bold;
        }
        &:not(:first-child) {
            margin-top: 14px;
        }
    }
    .generalSetting {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        margin-bottom: 20px;
        border: 1px solid #00cccc;

        .innerItem {
            margin: 10px;
            display: flex;
            align-items: center;
            flex-flow: row wrap;
            font {
                min-width: 4em;
                display: inline-block;
            }
            :global {
                .el-input {
                    width: 160px;
                    margin-right: 20px;
                }
            }
        }
    }
    .settingBtn {
        padding: 0 10px;
        min-width: 4em;
        text-align: center;
        display: flex;
        justify-content: center;
        color: #00cccc;
        box-shadow: 0 0 10px currentColor inset;
        outline: 1px solid currentColor;
        align-items: center;
        cursor: pointer;
        &:hover {
            color: @color-hover;
        }
    }
}
</style>
<template>
    <div :class="$style.sendingParams">
        <div :class="$style.leftTitleRow">
            <span :class="$style.title">通讯参数</span>
            <el-button size="mini" type="success" @click="query">查询</el-button>
        </div>
        <div :class="$style.generalSetting">
            <div :class="$style.innerItem">
                <span>
                    <font>频点通道</font>
                    <el-input clearable v-model="generalSettings.freqAccess"></el-input>
                </span>
                <span v-if="nodeType === 'MCB'">
                    <font>通道号</font>
                    <el-input clearable v-model="generalSettings.accessNO"></el-input>
                </span>
                <span>
                    <font>发送功率(瓦)</font>
                    <el-input clearable v-model="generalSettings.sendingPower"></el-input>
                </span>
            </div>
            <div :class="$style.settingBtn" @click="setting">设置</div>
        </div>
    </div>
</template>
<script>
// 过滤对象属性得到非空key的值
import tools from '@/tools/index.js';
export default {
    name: 'sendingParams',
    props: {
        nodeType: {
            type: String,
            default: 'MCB'
        }
    },
    data() {
        return {
            generalSettings: {
                accessNO: '',
                freqAccess: '',
                sendingPower: ''
            }
        };
    },
    methods: {
        query() {
            this.$emit('query');
        },
        setting() {
            let params = tools.filterNotNullObj(this.generalSettings);

            // 没有填写就不下发
            if (params) {
                this.$emit('setting', params);
            } else {
                this.$message.error('请填写要下发的参数');
            }
        }
    },
    created() {}
};
</script>
