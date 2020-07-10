<style lang="less" module>
.equInfoSearch {
    border-bottom: 1px solid #00fff6;
    margin-bottom: 15px;

    .content {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        label {
            margin-right: 15px;
        }
        .right {
            // min-width: 180px;
            margin-bottom: 20px;
        }
    }
    // 必填字段前星号
    .isRequired:before {
        margin-left: -12px;
        content: '*';
        color: #fb726a;
        margin-right: 4px;
    }

    :global {
        .el-col {
            margin-bottom: 20px;
        }
        .el-select {
            width: calc(100% - 6em);
        }
    }
}
</style>
<template>
    <div :class="$style.equInfoSearch">
        <div :class="$style.content" ref="equSearchComp">
            <el-row :gutter="20">
                <el-col :span="6">
                    <label :class="{ [$style.isRequired]: isRequiredFun('department') }">设备单位</label>
                    <el-select
                        :allow-create="allowCreate"
                        @change="selectDepartment(searchParams.department, dict.departmentList)"
                        filterable
                        clearable
                        v-model="searchParams.department"
                        no-data-text="暂无信息，可直接输入添加"
                        :placeholder="placeholdStr('设备单位')"
                    >
                        <el-option v-for="item in dict.departmentList" :key="item" :label="item" :value="item"> </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <label :class="{ [$style.isRequired]: isRequiredFun('station') }">变电站名</label>
                    <el-select
                        :allow-create="allowCreate"
                        clearable
                        filterable
                        v-model="searchParams.station"
                        @change="selectDepartment(searchParams.station, dict.stationList)"
                        :placeholder="placeholdStr('变电站名')"
                    >
                        <el-option v-for="item in dict.stationList" :key="item" :label="item" :value="item"> </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <label :class="{ [$style.isRequired]: isRequiredFun('bayUnit') }">间隔单元</label>
                    <el-select
                        :allow-create="allowCreate"
                        clearable
                        filterable
                        v-model="searchParams.bayUnit"
                        @change="selectDepartment(searchParams.bayUnit, dict.bayUnitList)"
                        :placeholder="placeholdStr('间隔单元')"
                    >
                        <el-option v-for="item in dict.bayUnitList" :key="item" :label="item" :value="item"> </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <label :class="{ [$style.isRequired]: isRequiredFun('voltageGrade') }">电压等级</label>
                    <el-select
                        :allow-create="allowCreate"
                        clearable
                        filterable
                        v-model="searchParams.voltageGrade"
                        @change="selectDepartment(searchParams.voltageGrade, dict.voltageGradeList)"
                        :placeholder="placeholdStr('电压等级')"
                    >
                        <el-option v-for="(item, index) in dict.voltageGradeList" :key="index" :label="item" :value="item"> </el-option>
                    </el-select>
                </el-col>

                <el-col :span="6">
                    <label :class="{ [$style.isRequired]: isRequiredFun('company') }">设备厂家</label>
                    <el-select
                        :allow-create="allowCreate"
                        clearable
                        filterable
                        v-model="searchParams.company"
                        @change="selectDepartment(searchParams.company, dict.companyList)"
                        :placeholder="placeholdStr('设备厂家')"
                    >
                        <el-option v-for="item in dict.companyList" :key="item" :label="item" :value="item"> </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <label :class="{ [$style.isRequired]: isRequiredFun('equTypeId') }">设备类型</label>
                    <el-select
                        clearable
                        filterable
                        v-model="searchParams.equTypeId"
                        placeholder="请选择设备类型"
                        @change="selectEquType"
                        @clear="selectEquType"
                    >
                        <el-option v-for="item in dict.equTypeList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <label :class="{ [$style.isRequired]: isRequiredFun('equId') }">设备名称</label>
                    <el-select
                        :allow-create="allowCreate"
                        clearable
                        filterable
                        v-model="searchParams.equId"
                        @change="selectDepartment(searchParams.equId, dict.equList)"
                        :placeholder="placeholdStr('设备名称')"
                    >
                        <el-option v-for="item in dict.equList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>
                </el-col>
                <el-col v-if="hasUnit" :span="6">
                    <label :class="{ [$style.isRequired]: isRequiredFun('unitId') }">设备部件</label>
                    <el-select clearable v-model="searchParams.unitId" no-data-text="暂无信息，请先选择设备类型" placeholder="请选择设备部件">
                        <el-option v-for="item in equUnitList" :key="item.unitId" :label="item.unitName" :value="item.unitId"> </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <div :class="$style.right">
                <template v-if="btnType == 'search'">
                    <el-button type="primary" icon="el-icon-close" plain @click="clearSearch"> 清 空 </el-button>
                    <el-button type="primary" icon="el-icon-search" plain @click="searchEvent"> 查 询 </el-button>
                </template>
                <el-button v-if="btnType == 'add'" type="primary" icon="el-icon-check" plain @click="confirmEqu"> 确 定 </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import systemApi from '@/api/system.js';
import { addEquInfo } from '@/api/standingBook.js';

const _searchParams = {
    department: '',
    station: '',
    bayUnit: '',
    voltageGrade: '',
    equTypeId: '',
    company: '',
    equId: '',
    unitId: ''
};
// TODO:不可为空字段
const mustHaveProperties = {
    // department: '设备单位',
    // station: '变电站',
    // bayUnit: '间隔单元',
    // voltageGrade: '电压等级',
    // company: '设备厂家',
    //  equTypeId: '设备类型',
    // equId: '设备名称',
    // unitId: '设备部件'
};
export default {
    name: 'EquInfoSearch',
    props: {
        // 是否可以添加
        allowCreate: {
            type: Boolean,
            default: false
        },
        btnType: {
            type: String,
            default: ''
        },
        hasUnit: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            searchParams: { ..._searchParams }, // 解构单层简单数据类型浅拷贝
            unitId: '',
            equUnitList: [],
            ifNewEqu: false // 是否为新增设备
        };
    },
    computed: {
        dict() {
            return this.$store.state.dict.searchEquDict;
        }
    },
    mounted() {},
    methods: {
        placeholdStr(name) {
            if (this.allowCreate) {
                return `请选择${name}(可输入)`;
            }
            return `请选择${name}`;
        },
        selectDepartment(val, list) {
            let _arr = [];
            for (let i of list) {
                i.id ? _arr.push(i.id) : _arr.push(i);
            }
            if (!_arr.includes(val)) {
                this.ifNewEqu = true;
            }
        },
        clearSearch() {
            this.searchParams = JSON.parse(JSON.stringify(_searchParams));
            this.searchEvent();
        },
        searchEvent() {
            this.$emit('searchEvent', this.searchParams);
        },
        selectEquType(equTypeId) {
            if (this.hasUnit) {
                this.searchParams.unitId = '';
                this.equUnitList = [];
                equTypeId && this.getEquUnitList(equTypeId);
            }
        },
        async getEquUnitList(equTypeId) {
            let res = await systemApi.getEquUnitList({ equTypeId });
            this.equUnitList = res.length > 0 ? res[0].unitList : [];
        },
        // 校验字段是否必填
        isRequiredFun(labelName) {
            if (Object.keys(mustHaveProperties).includes(labelName)) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * @description 校验设备信息对象属性是否填写完整，并提示
         * @returns {Boolean} 返回校验结果,true表示校验通过,false未通过
         *
         */
        validateData() {
            for (let i of Object.keys(this.searchParams)) {
                if (Object.keys(mustHaveProperties).includes(i)) {
                    if (!this.searchParams[i]) {
                        this.$message({ message: `请填写${mustHaveProperties[i]}`, type: 'error' });
                        return false;
                    }
                }
            }
            return true;
        },
        async confirmEqu() {
            if (this.validateData()) {
                if (this.ifNewEqu) {
                    // 新建设备：清除equId，转换为equName
                    let { equId } = await addEquInfo({ ...this.searchParams, equId: null, equName: this.searchParams.equId });
                    this.$emit('confirm', { equId, unitId: this.searchParams.unitId });
                } else {
                    this.$emit('confirm', { equId: this.searchParams.equId, unitId: this.searchParams.unitId });
                }
            }
        }
    }
};
</script>

<style>
</style>