<style lang="less" module>
@import './sensorCard.less';
</style>
<template>
    <div :class="$style.sensorCard">
        <slot></slot>
        <div v-if="!loading" :class="$style.sensor_cardContent">
            <div style="width: 100%; height: 20%; display: table;">
                <span :class="$style.content_top">
                    <span :class="$style.sensorTitle" :style="{ color: cardColor(details.physical.able) }" :title="details.physical.sensorName">{{
                        details.physical.sensorName
                    }}</span>
                    <!-- 电量判断 -->
                    <img v-if="details.physical.power <= 20" :class="$style.power" src="../../../images/perceptiveInfo/battery0.png" />
                    <img v-else :class="$style.power" src="../../../images/perceptiveInfo/battery100.png" />
                </span>
                <div :class="$style.triangleTopright" :style="{ color: cardColor(details.physical.online) }"></div>
            </div>

            <div :class="$style.sensorProperty">
                <transition @before-enter="beforeEnter" @enter="enter">
                    <div
                        v-if="transFlag"
                        ref="cdWrapper"
                        :class="$style.cardContent"
                        :style="{
                            color: cardColor(details.physical.online)
                        }"
                            >
                        <div v-for="(run, index2) in details.runState" :key="index2" :class="$style.property">
                            <!-- :style="{ animation: details.runState.length <= 2 ? 'none' : '' }" -->
                            <div :class="$style.fun">
                                <div :title="run.funName">
                                    <!-- <span :class="$style.index">[{{ index2 + 1 }}]</span> -->
                                    {{ run.funName }}
                                </div>
                                <div>{{ run.funNo }}</div>
                            </div>

                            <template v-if="details.physical.sensorTypeName && details.physical.sensorTypeName.includes('局放')">
                                <div :class="$style.value">
                                    <span v-if="run.recentVal === ''" :title="run.recentVal" :class="$style.recentVal">---</span>
                                    <span v-else :title="run.recentVal" :class="$style.recentVal">{{ run.recentVal === 1 ? '异常' : '正常' }}</span>
                                </div>
                            </template>
                            <template v-else>
                                <div v-if="run.recentVal === ''" :class="$style.value">
                                    <span :title="run.recentVal" :class="$style.recentVal">---</span>
                                </div>
                                <div v-else :class="$style.value">
                                    <span :title="run.recentVal" :class="$style.recentVal">{{ run.recentVal }}</span>
                                    <span :class="$style.dataUnit">{{ run.dataUnit }}</span>
                                </div>
                            </template>
                        </div>
                    </div>
                </transition>
            </div>
            <!-- 传感器状态 -->
            <div :class="$style.footer">
                <span style="display: table-cell; vertical-align: middle;">
                    <!-- 禁用判断 -->
                    <img v-if="details.physical.able == 0" :class="$style.iconImg" src="../../../images/perceptiveInfo/disable.png" />
                    <img v-else :class="$style.iconImg" src="../../../images/perceptiveInfo/able.png" />
                    <span :class="$style.iconTitle" style="margin-right: 10px;">{{ details.physical.able == 0 ? '禁用' : '启用' }}</span>
                    <!-- 在线判断 -->
                    <img
                        v-show="details.physical.able != 0"
                        v-if="details.physical.online == 0"
                        :class="$style.iconImg"
                        style="margin-bottom: -5px;"
                        src="../../../images/perceptiveInfo/offline.png"
                            />
                    <img v-show="details.physical.able != 0" v-else :class="$style.iconImg" src="../../../images/perceptiveInfo/online.png" />
                    <span v-show="details.physical.able != 0" :class="$style.iconTitle">{{ details.physical.online == 0 ? '离线' : '在线' }}</span>
                </span>
                <!-- 采样时间 -->
                <div style="height: 100%; display: table; float: left;">
                    <span style="display: table-cell; vertical-align: middle;">
                        <img :class="$style.iconImg" style="margin-bottom: -5px;" src="../../../images/perceptiveInfo/clock.png" />
                        <span :class="$style.iconTitle">{{ details.physical.recentTime }}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import animations from 'create-keyframe-animation';
export default {
    name: 'SensorCard',
    props: {
        sensorId: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        sensorInfo: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            transFlag: false,
            loading: true,
            details: {}
        };
    },
    mounted() {
        setTimeout(() => {
            this.transFlag = true;
        }, 100);

        this.init(this.sensorInfo);
    },
    // 页面销毁事件
    destroyed() {
        this.details = {};
    },
    methods: {
        // 由卡片状态返回色彩
        cardColor(status) {
            return status > 0 ? 'rgb(0, 255, 246)' : 'rgb(127, 133, 133)';
        },
        beforeEnter(el) {},
        // 动画
        enter(el, done) {
            let animation = {
                // 先固定首位百分比
                '0%': {
                    transform: 'translateY(0px)'
                },
                // '25%': {
                //     transform: 'translateY(-80px)'
                // },
                // '50%': {
                //     transform: 'translateY(-80px)'
                // },
                // '75%': {
                //     transform: 'translateY(-160px)'
                // },
                '100%': {
                    transform: 'translateY(0px)'
                }
            };
            const len = this.details.runState.length;
            const dur = Math.ceil(len / 2); // 计算行数取整（两个属性一行）
            const pian = (dur - 1) * 2 + 1; // 如5个属性，3行，1start > 1end > 2start > 2end > 3start > 3end
            animation[`${(1 / pian) * 100}%`] = {
                // 滑动一下停一下，根据属性个数设置动画执行到多少百分比时候停止一会
                transform: 'translateY(0px)'
            };
            for (let i = 2; i < pian; i += 2) {
                const mt = -80 * Math.ceil(i / 2);
                animation[`${(i / pian) * 100}%`] = {
                    transform: `translateY(${mt}px)`
                };
                animation[`${((i + 1) / pian) * 100}%`] = {
                    transform: `translateY(${mt}px)`
                };
            }
            // console.log(animation);
            const keyframe = 'cardContentMove' + this.details.physical.sensorId; // 坑：animation的 keyframe名称必须是全局唯一的，否则会被覆盖
            animations.registerAnimation({
                name: keyframe,
                animation,
                presets: {
                    duration: 2000 * Math.ceil(len / 2), // 执行周期（由行数决定，每行2秒）
                    easing: 'linear',
                    iterations: 'infinite'
                }
            });
            animations.runAnimation(this.$refs.cdWrapper, keyframe, done);
        },
        afterEnter() {
            animations.unregisterAnimation('move');
            this.$refs.cdWrapper.style.animation = '';
        },
        init(data) {
            this.details = data;
            this.loading = false;
        }
    }
};
</script>
<style scoped>
.c_font {
    font-family: PIXELLCD7;
}
/* 字体颜色 正常标题 */
.normal_title {
    color: rgb(0, 222, 214);
}
/* 字体颜色 正常文字 */
.normal_text {
    color: rgb(0, 168, 164);
}
/* 字体颜色 正常数字 */
.normal_number {
    color: rgb(0, 255, 246);
}
/* 字体颜色 异常 */
.abnormal {
    color: rgb(127, 133, 133);
}
/* 放大镜白框处理 */
.changeSubSearch .ivu-input {
    border-right: 1px solid rgba(1, 216, 209, 1);
}

.rightArrow {
    position: absolute;
    right: 0px;
    cursor: pointer;
    width: 20px;
    height: 100%;
    margin-left: 5px;
    background: url('../../../images/perceptiveInfo/rightArrow.png') no-repeat center;
}
.rightArrow:hover {
    background: url('../../../images/perceptiveInfo/rightArrow_hover.png') no-repeat center;
}
.rightArrow_disable {
    background: url('../../../images/perceptiveInfo/rightArrow_disable.png') no-repeat center;
}
</style>
