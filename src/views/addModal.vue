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
        .innerTableContent {
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
            width: 220px;
        }
    }
}
</style>
<template>
    <el-dialog :class="$style.addModal" :visible.sync="addModalObj.show" width="700px" title="新增消息路由" :close-on-click-modal="false" @close="cancel">
        <el-form ref="addMessageRouterForm" :model="addMessageInfo" :rules="addMessageRouterRules" label-width="90px">
            <el-form-item label="路由名称" prop="name">
                <el-input
                    v-model="addMessageInfo.name"
                    oninput="value=value.replace(/,|\.|\^|\$|%|#|&|@/g, '')"
                    placeholder="请输入路由名称"
                    style="width: 374px"
                        />
            </el-form-item>
            <!-- ********************************************** 消息来源 ***********************************************************************-->
            <div class="box">
                <el-form-item label="消息来源" prop="sourceData">
                    <el-radio-group v-model="addMessageInfo.sourceData.dataType" class="equAddType" @change="changeSourceDataType">
                        <el-radio label="0">
                            设备数据
                        </el-radio>
                        <el-radio v-if="thirdPartyApp.length > 0" label="1">
                            第三方APP
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- 设备数据添加 -->
                <div v-if="addMessageInfo.sourceData.dataType === '0'" class="inlineRow">
                    <el-form-item>
                        <el-select v-model="sourceDataAddType" placeholder="请选择数据源" @change="changeEquDataType">
                            <el-option v-for="item in sourceDataTypes" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                        <el-select
                            v-if="sourceDataAddType === 'sensorTypes'"
                            v-model="addMessageInfo.sourceData.content.sensorTypeCode"
                            class="inlineInput"
                            placeholder="请选择传感器类型"
                            multiple
                            @change="selectSensorType"
                                >
                            <el-option v-for="item in sensorTypeList" :key="item.code" :label="item.name" :value="item.code" />
                        </el-select>
                        <el-button
                            v-if="sourceDataAddType === 'manualAddSensor'"
                            style="margin-left: 30px"
                            type="primary"
                            icon="el-icon-plus"
                            @click="addEquData()"
                                >
                            添加设备数据
                        </el-button>
                    </el-form-item>
                    <div v-if="sourceDataAddType === 'manualAddSensor'" style="padding: 0 20px">
                        <el-table class="innerTableContent" :highlight-current-row="true" :data="addMessageInfo.sourceData.content.sensorInfo">
                            <el-table-column align="center" label="序号" type="index" width="60" />
                            <el-table-column align="center" prop="sensorName" label="传感器名称" />

                            <el-table-column align="center" prop="name" label="操作" width="60">
                                <template slot-scope="scope">
                                    <el-button type="danger" icon="el-icon-delete" circle @click="delSensor(scope.row)" />
                                </template>
                            </el-table-column>
                        </el-table>
                        <innerModal :show.sync="innerVisible" @innerModalConfirm="innerModalConfirm" />
                    </div>
                </div>
                <!-- 第三方APP添加 -->
                <el-form v-else-if="addMessageInfo.sourceData.dataType === '1'" ref="thridAppSourceForm" :inline="true" :model="addMessageInfo.sourceData" :rules="thridAppSourceFormRules" label-width="90px" style="margin-left:88px;">
                    <el-form-item>
                        <el-select v-model="addMessageInfo.sourceData.content.appId" placeholder="请选择第三方APP" @change="sourceDataSelectApp">
                            <el-option v-for="item in thirdPartyApp" :key="item.id" :label="item.name" :value="item.id" />
                            <el-option key="mmmm" label="手动输入地址" :value="''" />
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="address" required>
                        <el-select
                            v-if="thridAppAddType === 'selectApp'"
                            v-model="addMessageInfo.sourceData.address"
                            placeholder="请选择主题"
                            @focus="selectSourceTopic"
                                >
                            <el-option v-for="item in selectedAppTopics" :key="item.topicId" :label="item.name" :value="item.address" />
                        </el-select>
                        <el-input v-else v-model="addMessageInfo.sourceData.address" class="inlineInput" placeholder="请填写App地址" />
                    </el-form-item>
                </el-form>
            </div>

            <!-- *******************************************************************消息目标******************************************************************** -->
            <div class="box">
                <el-form-item label="消息目标" prop="destinationData">
                    <el-radio-group v-model="addMessageInfo.destinationData.dataType" class="addTypeClass" @change="changeDestinationDataType">
                        <el-radio label="2">
                            物联管理云平台
                        </el-radio>
                        <el-radio label="3">
                            其他云平台
                        </el-radio>
                        <el-radio v-if="thirdPartyApp.length > 0" label="1">
                            第三方APP
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- 第三方app -->
                <el-form v-if="addMessageInfo.destinationData.dataType === '1'" ref="thridAppDesForm" :inline="true" :model="addMessageInfo.destinationData" :rules="thridAppDesFormRules" label-width="90px" style="margin-left:88px;">
                    <el-form-item>
                        <el-select v-model="addMessageInfo.destinationData.content.appId" placeholder="请选择第三方APP" @change="destinatTypeSelectApp">
                            <el-option v-for="item in thirdPartyApp" :key="item.id" :label="item.name" :value="item.id" />
                            <el-option label="手动输入地址" :value="''" />
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="address" required>
                        <el-select
                            v-if="thridAppAddType2 === 'selectApp'"
                            v-model="addMessageInfo.destinationData.address"
                            placeholder="请选择主题"
                            @focus="selectDestinTopic"
                                >
                            <el-option v-for="item in destinatSelectedAppTopics" :key="item.topicId" :label="item.name" :value="item.address" />
                        </el-select>
                        <el-input v-else v-model="addMessageInfo.destinationData.address" class="inlineInput" placeholder="请填写App地址" />
                    </el-form-item>
                </el-form>
                <!-- 其他云平台 -->
                <el-form ref="otherPlatform" :model="addMessageInfo.destinationData.content" :rules="otherPlatformRules" label-width="90px">
                    <div v-if="addMessageInfo.destinationData.dataType === '3'" class="inlineRow">
                        <el-form-item label="主机地址" prop="ipAddress" required>
                            <el-input v-model="addMessageInfo.destinationData.content.ipAddress">
                                <template slot="prepend">
                                    {{ destinationPrepend }}
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="端口号" prop="port" required>
                            <el-input v-model="addMessageInfo.destinationData.content.port" type="number" />
                        </el-form-item>
                        <el-form-item label="用户名" prop="userName">
                            <el-input v-model="addMessageInfo.destinationData.content.userName" />
                        </el-form-item>
                        <el-form-item label="密码" prop="pwd">
                            <el-input v-model="addMessageInfo.destinationData.content.pwd" />
                        </el-form-item>
                        <el-form-item label="目标地址" prop="topic" required>
                            <el-input v-model="addMessageInfo.destinationData.content.topic" />
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">
                取 消
            </el-button>
            <el-button v-preventReClick="2000" type="primary" @click="confirm">
                确 定
            </el-button>
        </div>
    </el-dialog>
</template>
<script>
import Api from '@/api/messageRoute.js';
import innerModal from './innerModal';
const sourceData = {
    dataType: '0',
    content: {
        sensorTypeCode: [],
        sensorInfo: [], // 选中传感器列表
        appId: '',
        appName: ''
    },
    address: ''
};
const destinationData = {
    dataType: '2',
    content: {
        appId: '',
        appName: '',
        ipAddress: '',
        port: '',
        userName: '',
        pwd: '',
        topic: ''
    },
    address: ''
};
const initAddData = {
    name: '',
    sourceData,
    destinationData
};
const sourceDataAddressStartStr = '/t/router/app/output/';
const destinationDataAddressStartStr = '/t/router/app/input/';
export default {
    name: 'AddModal',
    components: {
        innerModal
    },
    props: {
        addModalObj: {
            type: Object,
            required: true
        }
    },
    data() {
        let validateSourceData = (rule, value, callback) => {
            if (!value.dataType) {
                callback(new Error('请选择消息来源'));
            } else {
                callback();
            }
        };
        let validateDestinationData = (rule, value, callback) => {
            if (!value.dataType) {
                callback(new Error('请选择消息目标'));
            } else {
                callback();
            }
        };
        let validateSourceAddress = (rule, value, callback) => {
            if (
                    !(
                        value.startsWith(sourceDataAddressStartStr) &&
                        value.length > sourceDataAddressStartStr.length
                    )
                ) {
                callback(new Error(`地址必须以${sourceDataAddressStartStr}开头`));
            } else {
                callback();
            }
        };
        let validateDesAddress = (rule, value, callback) => {
            if (
                    !(
                        value.startsWith(destinationDataAddressStartStr) &&
                        value.length > destinationDataAddressStartStr.length
                    )
            ) {
                callback(new Error(`地址必须以${destinationDataAddressStartStr}开头`));
            } else {
                callback();
            }
        };

        return {
            // 消息来源
            sourceDataAddType: 'all', // 设备数据添加方式
            sourceDataTypes: [
                { name: '选择所有传感器', id: 'all' },
                { name: '选择传感器类型', id: 'sensorTypes' },
                { name: '单独选择传感器', id: 'manualAddSensor' }
            ],
            thridAppAddType: 'selectApp', // 第三方App添加方式
            // 消息目标
            thridAppAddType2: 'selectApp', // 第三方App添加方式
            sensorTypeList: [],

            addMessageRouterRules: {
                name: [{ required: true, message: '请输入消息路由名称', trigger: 'blur' }],
                sourceData: [{ validator: validateSourceData, trigger: 'change' }],
                destinationData: [{ validator: validateDestinationData, trigger: 'chenge' }]
            },
            thridAppSourceFormRules: {
                address: [{ required: true, message: '主题为必填项', trigger: 'blur' },
                { required: true, message: '主题为必填项', trigger: 'change' },
                { validator: validateSourceAddress, trigger: 'change' },
                ],
            },
            thridAppDesFormRules: {
                address: [{ required: true, message: '主题为必填项', trigger: 'blur' },
                { required: true, message: '主题为必填项', trigger: 'change' },
                { validator: validateDesAddress, trigger: 'change' },
                ],
            },
            otherPlatformRules:{
                ipAddress: [{ required: true, message: '请输入主机地址', trigger: 'blur' }],
                port: [{ required: true, message: '请输入端口号', trigger: 'blur' }],
                topic: [{ required: true, message: '请输入目标地址', trigger: 'blur' }],
            },
            destinationPrepend: 'tcp://',
            addMessageInfo: JSON.parse(JSON.stringify(initAddData)),
            thridAppRuleForm: {},
            thirdPartyApp: [],
            selectedAppTopics: [], // 消息来源-第三方app主题
            destinatSelectedAppTopics: [], // 消息目标-第三方app主题
            innerVisible: false,
            equipTypeTree: [] //电力设备树信息，
        };
    },
    created() {
        Api.getAllSensorTypes().then(res => {
            this.sensorTypeList = res;
        });
        Api.getThirdPartyAppInfo().then(res => {
            this.thirdPartyApp = res;
        });
    },
    methods: {
        selectSourceTopic() {
            if (this.selectedAppTopics.length === 0) {
                this.$message.error('当前选择APP暂无可选主题，不可添加消息路由');
            }
        },
        selectDestinTopic() {
            if (this.destinatSelectedAppTopics.length === 0) {
                this.$message.error('当前选择APP暂无可选主题，不可添加消息路由');
            }
        },
        changeEquDataType(val) {
            if (val === 'batchAdd') {
                this.addMessageInfo.sourceData.content.sensorInfo = [];
            } else {
                this.addMessageInfo.sourceData.content.sensorTypeCode = [];
            }
        },

        selectSensorType(val) {
            if (val === 'all') {
                this.addMessageInfo.sourceData.content.sensorInfo = [];
            }
        },
        // 数据源切换时候归零源数据结构
        changeSourceDataType(val) {
            this.addMessageInfo.sourceData = JSON.parse(JSON.stringify(sourceData));
            this.addMessageInfo.sourceData.dataType = val;
            this.addMessageInfo.sourceData.content.sensorTypeCode = [];
            // 第三方APP时候，自动选择第一个app
            if (val === '1' && this.thridAppAddType === 'selectApp') {
                this.addMessageInfo.sourceData.content.appId = this.thirdPartyApp[0].id;
                this.sourceDataSelectApp(this.addMessageInfo.sourceData.content.appId);
            } else {
                this.sourceDataAddType = 'all';
            }
        },
        // 消息目标切换时候归零目标数据结构
        changeDestinationDataType(val) {
            this.addMessageInfo.destinationData = JSON.parse(JSON.stringify(destinationData));
            this.addMessageInfo.destinationData.dataType = val;

            // 第三方APP时候，自动选择第一个app
            if (val === '1' && this.thridAppAddType2 === 'selectApp') {
                this.addMessageInfo.destinationData.content.appId = this.thirdPartyApp[0].id;
                this.destinatTypeSelectApp(this.addMessageInfo.destinationData.content.appId);
            }
        },
        // 消息来源:topic中type=1;
        sourceDataSelectApp(val) {
            // 手动输入地址
            if (val === '') {
                this.thridAppAddType = 'manualAppAddress';
                this.addMessageInfo.sourceData.content.appId = '';
                this.addMessageInfo.sourceData.content.appName = '';
                // 格式校验加头
                this.addMessageInfo.sourceData.address = sourceDataAddressStartStr;
            } else {
                this.thridAppAddType = 'selectApp';
                this.addMessageInfo.sourceData.address = '';
                const app = this.thirdPartyApp.filter(i => {
                    return i.id === val;
                })[0];
                this.addMessageInfo.sourceData.content.appName = app.name;
                // topic 过滤type=1的
                const topics = app.topicInfos;
                this.selectedAppTopics = topics.filter(x => {
                    return x.type === 1;
                });
                if (this.selectedAppTopics.length === 0) {
                    this.$message.error('当前选择APP暂无可选主题，不可添加消息路由');
                }
            }
        },
        // 消息目标:使用type=0
        destinatTypeSelectApp(val) {
            // 手动输入地址
            if (val === '') {
                this.thridAppAddType2 = 'manualAppAddress';
                this.addMessageInfo.destinationData.content.appId = '';
                this.addMessageInfo.destinationData.content.appName = '';
                // 格式校验加头
                this.addMessageInfo.destinationData.address = destinationDataAddressStartStr;
            } else {
                this.thridAppAddType2 = 'selectApp';
                this.addMessageInfo.destinationData.address = '';
                const app = this.thirdPartyApp.filter(i => {
                    return i.id === val;
                })[0];
                const topics = app.topicInfos;
                this.addMessageInfo.destinationData.content.appName = app.name;
                this.destinatSelectedAppTopics = topics.filter(x => {
                    return x.type === 0;
                });
                if (this.destinatSelectedAppTopics.length === 0) {
                    this.$message.error('当前选择APP暂无可选主题，不可添加消息路由');
                }
            }
        },
        // 获取电力设备树结构
        getSensorTree() {
            Api.getSensorTree(res => {
                if (res.code == 200) {
                    this.equipTypeTree = res.data;
                } else {
                    this.$message.error('获取电力设备树结构失败');
                }
            });
        },
        addEquData() {
            this.innerVisible = true;
        },
        cancel() {
            this.$refs['addMessageRouterForm'].resetFields();
            this.addMessageInfo.name = '';
            this.addMessageInfo.sourceData = JSON.parse(JSON.stringify(sourceData));

            this.addMessageInfo.destinationData = JSON.parse(JSON.stringify(destinationData));

            this.sourceDataAddType = 'all';
            this.thridAppAddType = 'selectApp';
            this.thridAppAddType2 = 'selectApp';
            this.addModalObj.show = false;
        },
        async confirm() {
            let valid = await this.validaPromise('addMessageRouterForm')
            let k = await this.validateMessageInfoSource()
            let d = await this.validateMessageInfoDes()
            if (valid && k && d) {
                let params = JSON.parse(JSON.stringify(this.addMessageInfo))
                if (params.destinationData.content.ipAddress) {
                    !params.destinationData.content.ipAddress.includes(this.destinationPrepend)
                        ? (params.destinationData.content.ipAddress =
                                this.destinationPrepend + params.destinationData.content.ipAddress)
                        : '';
                }

                Api.addInformationRoute(params).then(() => {
                    this.$emit('success');
                    this.cancel();
                });
            }
        },
        // 校验上传消息路由数据是否合格
        async validateMessageInfoSource() {
            if (this.addMessageInfo.sourceData.dataType === '0') {
                if (
                    this.sourceDataAddType != 'all' &&
                    this.addMessageInfo.sourceData.content.sensorTypeCode.length == 0 &&
                    this.addMessageInfo.sourceData.content.sensorInfo.length === 0
                ) {
                    this.$message.error('请选择设备');
                    return false;
                }
            }
            if (this.addMessageInfo.sourceData.dataType === '1') {
                return  await this.validaPromise('thridAppSourceForm')
            }
            return true;
        },
        // 校验上传消息路由数据是否合格
        async validateMessageInfoDes() {
            if (this.addMessageInfo.destinationData.dataType === '1') {
                return  await this.validaPromise('thridAppDesForm')
            }
            if (this.addMessageInfo.destinationData.dataType === '3') {
                return  await this.validaPromise('otherPlatform')
            }
            return true;
        },
        validaPromise(refname){
            return new Promise((resolve) => {
                this.$refs[refname].validate(valid => {
                    if(valid){
                        resolve(true)
                    }
                    resolve(false)
                })
            })
        },
        innerModalConfirm(data) {
            // 添加去重
            for (let x of this.addMessageInfo.sourceData.content.sensorInfo) {
                if (!data.has(x.sensorName)) {
                    data.set(x.sensorName, x);
                }
            }
            // map 转数组
            let arr = [];
            data.forEach(x => {
                arr.push(x);
            });

            this.addMessageInfo.sourceData.content.sensorInfo = arr;
        },
        delSensor(row) {
            this.addMessageInfo.sourceData.content.sensorInfo = this.addMessageInfo.sourceData.content.sensorInfo.filter(i => {
                return row.sensorName !== i.sensorName;
            });
        }
    }
};
</script>
