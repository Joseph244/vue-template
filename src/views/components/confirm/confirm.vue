<style lang="less" module>
@import './confirm.less';
</style>

<template>
    <el-dialog
        :class="$style.container"
        :visible.sync="visible"
        :title="title"
        width="400px"
            >
        <div :class="$style.msg">
            <i
                class="el-icon-warning"
                :class="$style.icon"
                    ></i>
            {{ message }}
        </div>

        <div
            slot="footer"
            :class="$style.btns"
                >
            <el-button
                type="primary"
                @click="cancel"
                    >
                取消
            </el-button>
            <el-button
                type="primary"
                plain
                @click="submit"
                    >
                确认
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            title: '提示',
            visible: false,
            message: '',
            yes: () => {},
            no: () => true
        };
    },
    watch: {
        visible(val) {
            if (!val) {
                setTimeout(() => {
                    this.$destroy(true);
                    this.$el.parentNode.removeChild(this.$el); // 从DOM里将这个组件移除
                }, 500);
            }
        }
    },
    methods: {
        submit() {
            this.yes();
            this.close();
        },
        cancel() {
            const res = this.no();
            if (res === true || res === undefined) this.close();
        },
        close() {
            this.visible = false;
        }
    }
};
</script>
