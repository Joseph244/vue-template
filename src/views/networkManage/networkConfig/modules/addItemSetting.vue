<style lang="less" module>
.addItemSetting {
    min-height: 134px;
    display: flex;
    justify-content: space-between;

    margin-top: 10px;
    border: 1px solid #00cccc;

    .inner {
        margin: 10px;
        display: flex;
        flex-flow: row wrap;
        :global {
            .el-input {
                width: 126px;
                margin: 4px 10px 4px 0;
                .el-input-group__append {
                    padding: 0 6px;
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
        font-weight: bold;
        box-shadow: 0 0 10px currentColor inset;
        outline: 1px solid currentColor;
        align-items: center;
        cursor: pointer;
    }
    .settingBtn:hover {
        color: @color-hover;
    }
    .plusIcon {
        margin-left: 10px;
        margin-top: 8px;
        color: #00ffff;
        font-size: 22px;
        cursor: pointer;
    }
    .removeIcon {
        color: #ea522b;
        font-size: 16px;
        cursor: pointer;
    }
}
</style>
<template>
    <el-tooltip class="item" effect="dark" content="回车新建项，Tab切换输入" :hide-after="3000" placement="top">
        <div :class="$style.addItemSetting">
            <div :class="$style.inner">
                <el-input
                    v-for="(item, index) in whiteList"
                    :key="index"
                    clearable
                    v-model="whiteList[index]"
                    placeholder="传感器ID"
                    @keyup.enter.native="addWhiteList"
                >
                    <template slot="append">
                        <i class="el-icon-remove" :class="$style.removeIcon" @click="removeItem(index)"></i>
                    </template>
                </el-input>
                <i class="el-icon-circle-plus" :class="$style.plusIcon" @click="addWhiteList"></i>
            </div>

            <div :class="$style.settingBtn" @click="setting">设置</div>
        </div>
    </el-tooltip>
</template>
<script>
export default {
    name: 'addItemSetting',
    data() {
        return {
            whiteList: ['']
        };
    },
    methods: {
        clearAll() {
            this.whiteList = [''];
        },
        setting() {
            let arr = this.whiteList.filter(i => {
                return i;
            });
            this.$emit('setting', arr);
        },
        addWhiteList() {
            this.whiteList.push('');
        },
        removeItem(index) {
            this.whiteList.splice(index, 1);
        }
    },
    created() {}
};
</script>
