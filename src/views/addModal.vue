<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZZF
 * @Date: 2020-06-08 15:31:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-08 16:59:32
-->
<style lang="less" module>
.addModal {
    :global {
        .box {
            border-top: 1px dashed @border-color;
        }
        .equAddType {
            margin-top: 9px;
            display: block;
        }

        .inlineRow {
            .addTypeClass {
                margin-top: 9px;
                display: block;
            }
        }
        .tableContent {
            margin-top: -10px;
            margin-bottom: 1em;
            .attrItem {
                padding: 0 10px;
            }
            .attrItem:not(:last-child) {
                border-right: 1px dashed @border-color;
            }
        }
        .inlineInput {
            margin-left: 30px;
            width: 50%;
        }
    }
}
</style>
<template>
    <el-dialog :class="$style.addModal" :visible.sync="addModalObj.show" title="新增消息路由" :close-on-click-modal="false" @close="closeModal()">
        <el-form :model="addMessageInfo" :rules="addMessageRouterRules" ref="addMessageRouterForm" label-width="90px">
            <el-form-item label="路由名称" prop="name">
                <el-input v-model="addMessageInfo.name" placeholder="请输入路由名称"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm" v-preventReClick>确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import Api from '@/api/messageRoute.js';

export default {
    name: 'addModal',
    props: {
        addModalObj: {
            type: Object,
            required: true
        }
    },
    components: {},
    data() {
        // let validateSourceData = (rule, value, callback) => {
        //     if (!value.dataType) {
        //         callback(new Error('请选择消息来源'));
        //     } else {
        //         callback();
        //     }
        // };

        return {
            addMessageInfo: {},
            addMessageRouterRules: {
                // name: [{ required: true, message: '请输入消息路由名称', trigger: 'blur' }],
                // sourceData: [{ validator: validateSourceData, trigger: 'change' }]
            }
        };
    },
    created() {},
    methods: {
        cancel() {
            // this.$refs['addMessageRouterForm'].resetFields();
            this.addModalObj.show = false;
        },
        confirm() {
            console.log('click');
            this.$refs['addMessageRouterForm'].validate(valid => {
                if (valid) {
                    Api.addInformationRoute(this.addMessageInfo).then(() => {
                        this.$emit('success');
                        this.cancel();
                    });
                }
            });
        }
    }
};
</script>
