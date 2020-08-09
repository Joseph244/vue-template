<style lang="less" module>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 80px;

    label {
        font-size: 24px;
        font-weight: bold;
        color: #ffc600;
    }

    .cascader {
        width: 500px;
        margin: 0 40px;
        :global {
            .el-input {
                font-size: 20px;
            }
            .el-input .el-input__inner {
                height: 60px;
                line-height: 60px;
                font-weight: bold;
                &:hover {
                    border-color: #00ffff;
                }
            }
        }
    }

    .btn {
        height: 60px;
        line-height: 58px;
        font-size: 24px;
        width: 190px;
        letter-spacing: 3px;
    }
}
</style>

<template>
    <div :class="$style.container">
        <label>请选择发现范围</label>
        <el-cascader
            :class="$style.cascader"
            v-model="value"
            :props="props"
            :options="options"
            separator="  /  "
            size="medium"
            placeholder="请选择变电站"
            @change="handleChange"
        />
        <button class="comBtn" :class="$style.btn" @click="submit"><i class="el-icon-thumb"></i> 开始发现</button>
    </div>
</template>

<script>
import cityData from '../topology/cityData';
import api from '@/api/activeFinding';

export default {
    data() {
        return {
            value: [],
            options: [],
            props: {
                value: 'id',
                label: 'name'
            },
            stationId: null
        };
    },
    methods: {
        handleChange() {
            this.stationId = this.$parent.stationId = this.value[2];
        },
        async submit() {
            if (!this.stationId) {
                this.$message({ message: '清先选择需要主动发现的站！', type: 'warning' });
                return false;
            }
            this.$parent.stationInfo = await api.getStationInfo({ stationId: this.stationId });
            this.$parent.next();
        },
        collapse(array, parent) {
            array.forEach((item, index) => {
                item.id = item.id || (parent ? parent.id + '-' + (index + 1) : `${index + 1}`);
                if (item.stationList) item.children = item.stationList;
                if (item.children) this.collapse(item.children, item);
            });
            return array;
        }
    },
    created() {
        this.options = this.collapse([cityData]);
    }
};
</script>
