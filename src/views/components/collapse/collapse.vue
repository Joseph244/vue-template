<style lang="less" module>
@import './collapse.less';
</style>

<template>
    <div :class="$style.container">
        <div :class="$style.title" :style="titleStyle || ''">
            <h2>{{ title }}</h2>
            <a :class="$style.icon" @click="showChange">
                <Icon :class="`${isOpen ? $style.up : $style.down}`" type="ios-arrow-up" />
            </a>
        </div>
        <transUpDown>
            <div v-show="isOpen" :class="$style.content">
                <slot></slot>
            </div>
        </transUpDown>
    </div>
</template>

<script>
import transUpDown from './transUpDown';

export default {
    components: { transUpDown },
    props: {
        title: {
            type: String,
            default: ''
        },
        titleStyle: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isOpen: true
        };
    },
    methods: {
        showChange() {
            this.isOpen = !this.isOpen;
        }
    }
};
</script>
