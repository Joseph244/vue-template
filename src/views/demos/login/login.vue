<style lang="less" module>
@import './login.less';
</style>

<template>
    <div :class="$style.container">
        <div :class="$style.content">
            <i :class="$style.topLine"></i>
            <h2>边缘计算管理系统</h2>
            <span>Edge computing management system</span>

            <div :class="$style.main">
                <el-form :class="$style.accountLogin" :model="loginData" :rules="rules" ref="loginForm">
                    <el-form-item :class="$style.formItem" prop="account">
                        <el-input :class="$style.loginInput" v-model="loginData.account" placeholder="请输入用户名" @keyup.enter.native="handleSubmit()">
                            <i :class="$style.accountIcon" slot="prepend"></i>
                        </el-input>
                    </el-form-item>

                    <el-form-item :class="$style.formItem" prop="pwd">
                        <el-input
                            :class="$style.loginInput"
                            v-model="loginData.pwd"
                            :type="isShowPsw ? 'text' : 'password'"
                            placeholder="请输入密码"
                            @keyup.enter.native="handleSubmit()"
                        >
                            <i :class="$style.pwdIcon" slot="prepend"></i>
                            <a :class="$style.eye" @click="isShowPsw = !isShowPsw" slot="suffix">
                                <i class="el-input__icon fa fa-eye" v-if="isShowPsw"></i>
                                <i class="el-input__icon fa fa-eye-slash" v-else></i>
                            </a>
                        </el-input>
                    </el-form-item>

                    <el-form-item :class="$style.formItem" prop="verifyCode">
                        <el-input
                            :class="$style.loginInput"
                            v-model="loginData.verifyCode"
                            placeholder="请输入验证码"
                            @keyup.enter.native="handleSubmit()"
                            style="padding-right: 100px"
                        >
                            <i :class="$style.verifyIcon" slot="prepend"></i>
                        </el-input>
                        <div :class="$style.verify" id="verify" @click="verCode"></div>
                    </el-form-item>

                    <el-button :class="$style.submitBtn" @click="handleSubmit" long>登录</el-button>
                </el-form>
            </div>
        </div>

        <!-- <div :class="$style.sysLogo"></div> -->
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import api from '@/api/login';

export default {
    data() {
        return {
            loginData: {
                account: '',
                pwd: '',
                verifyCode: ''
            },
            isShowPsw: false,
            verify: null,
            verifyCode: '',
            rules: {
                account: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
                pwd: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
                verifyCode: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                    // {
                    //     validator: (rule, value, callback) => {
                    //         if (value === '') {
                    //             callback(new Error('验证码不能为空'));
                    //         } else if (!this.verify.validate(value)) {
                    //             callback(new Error('验证码输入不正确'));
                    //         } else {
                    //             callback();
                    //         }
                    //     },
                    //     trigger: 'blur'
                    // }
                ]
            }
        };
    },

    methods: {
        eyeChange() {
            this.isShowPsw = !this.isShowPsw;
        },
        handleSubmit() {
            this.$refs.loginForm.validate(async valid => {
                if (valid) {
                    const res = await api.login({
                        account: this.$crypto.encryption(this.loginData.account),
                        pwd: this.$crypto.encryption(this.loginData.pwd),
                        verCode: this.$crypto.encryption(this.loginData.verifyCode)
                    });
                    if (res.code !== 200) {
                        this.$notify({
                            title: '接口请求异常',
                            message: res.msg,
                            type: 'error'
                        });
                        this.loginData.verifyCode = '';
                        this.verCode();
                    } else {
                        Cookies.set('token', res.data);
                        this.$router.push('/myApp');
                    }
                }
            });
        },
        async verCode() {
            let _res = await api.verCode();
            let jiemi = this.$crypto.decryption(_res, 'key2');

            if (jiemi.code == 200) {
                this.verifyCode = jiemi.data;
                // console.log('code',this.verifyCode)
                if (this.verify) {
                    this.verify.refresh(this.verifyCode);
                } else {
                    this.verify = new window.GVerify({ id: 'verify', code: this.verifyCode });
                }
            }
        },
        async tokenCheck() {
            const token = Cookies.get('token');
            if (token) {
                await api.tokenValidate({ token });
                this.$router.push('/myApp');
            }
        }
    },
    async mounted() {
        this.tokenCheck();
        this.verCode();
    }
};
</script>
