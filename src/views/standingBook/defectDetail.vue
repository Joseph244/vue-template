<style lang="less" module>
@import './defectDetail.less';
</style>

<template>
    <div :class="$style.container">
        <el-button type="primary" :class="$style.back" @click="back"><i class="el-icon-arrow-left"></i> 返回</el-button>

        <h2>设备信息</h2>
        <ul :class="$style.top">
            <li>设备单位：<span>123</span></li>
            <li>变电站：</li>
            <li>间隔单元：</li>
            <li>设备电压等级：</li>
            <li>设备类型：</li>
            <li>厂家：</li>
            <li>设备名称：</li>
            <li>设备部件：</li>
        </ul>

        <h2>
            修复情况
            <span :class="$style.status">已修复</span>
        </h2>
        <ul :class="$style.list">
            <li v-for="(item, index) in dataList" :key="index">
                <div :class="$style.item">
                    <div :class="$style.info">
                        <div :class="$style.text">
                            <p>检测时间：<span>211</span></p>
                            <p>修复事件：<span>211</span></p>
                        </div>
                        <div :class="$style.level">缺陷等级：<span>211</span></div>
                        <div :class="$style.fix">
                            <label>修复方式：</label>
                            <span>
                                小动小动物的瓦打我打我我打小动物的瓦打我打我我打小动物的瓦打我打我我打小动物的瓦打我打我我打小动物的瓦打我打我我打小动物的瓦打我打我我打小动小动物的瓦打我打我我打小动物的瓦打我打我我打小动物的瓦打我打我我打小动物的瓦打我打我我打小动物的瓦打我打我我打小动物的瓦打我打我我打物的瓦打我打我我打物的瓦打我打我我打
                            </span>
                        </div>
                    </div>

                    <div :class="$style.btns">
                        <el-button
                            type="primary"
                            icon="el-icon-caret-bottom"
                            circle
                            :class="openIndexs.includes(index) ? $style.up : $style.down"
                            @click="open(index)"
                        ></el-button>
                    </div>
                </div>
                <transUpDown>
                    <div :class="$style.result" v-if="openIndexs.includes(index)">
                        <defectGraph />
                    </div>
                </transUpDown>
            </li>
        </ul>
    </div>
</template>

<script>
import transUpDown from '../components/collapse/transUpDown';
import defectGraph from './defectGraph';

export default {
    components: { transUpDown, defectGraph },
    data() {
        return {
            dataList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            openIndexs: []
        };
    },
    methods: {
        open(index) {
            const i = this.openIndexs.indexOf(index);
            if (i > -1) this.openIndexs.splice(i, 1);
            else this.openIndexs.push(index);
        },
        back() {}
    }
};
</script>
