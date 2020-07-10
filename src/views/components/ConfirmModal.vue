<template>
    <!-- 删除确认弹框 -->
    <div :class="$style.confirmModal">
        <el-dialog :visible.sync="confirmModalObj.show" :title="title" :close-on-click-modal="false" @on-cancel="cancel()">
            <div :class="$style.content">
                <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                <div>
                    <div style="color: #519fee;margin-bottom:1em">
                        {{ operateTip }}
                        <span style="color: #ffa62e;font-weight: bold;">
                            {{ msg }}
                        </span>
                    </div>
                    <div style="color: #fb726a;">{{ desc }}</div>
                </div>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: ['confirmModalObj', 'msg', 'desc'],
    data() {
        return {
            title: 'WARNING 注意',
            operateTip: '您即将执行的操作：'
        };
    },
    methods: {
        cancel() {
            this.confirmModalObj.show = false;
        },
        confirm() {
            this.$emit('iot-confirm', this.confirmModalObj.value);
            this.confirmModalObj.show = false;
        }
    }
};
</script>
<style lang="less" module>
.confirmModal {
    :global {
        .el-dialog {
            width: 600px;
        }
    }
    .content {
        height: 140px;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
            font-size: 50px;
            color: @color-danger;
            margin-right: 30px;
        }
    }
}
</style>
