<style lang="less" module>
.topMenu {
    position: relative;
    .statistics {
        position: absolute;
        top: 5px;
        right: 10px;
    }
    @media screen and (max-width: 1700px) {
        // 宽度最大1530时候的样式
        .statistics {
            top: -62px;
            right: 168px;
        }
    }
}
</style>
<template>
    <div :class="$style.topMenu">
        <el-menu ref="topMenu" :default-active="activeParent" mode="horizontal" menu-trigger="click" @select="handleSelect">
            <template v-for="(item, index) in menus">
                <el-menu-item :key="index" v-if="item.children.length === 1" :index="item.name">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.title }}</span></el-menu-item
                >
                <el-submenu :key="index" v-else :index="item.name">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item v-for="child in item.children" :index="child.name" :key="child.name">{{ child.title }}</el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
        <statistics :class="$style.statistics"></statistics>
    </div>
</template>
<script>
import statistics from './statistics';
export default {
    name: 'topMenu',
    components: {
        statistics
    },
    data() {
        return {
            activeMenu: '',
            activeParent: ''
        };
    },
    computed: {
        menus() {
            return this.$store.state.user.routes;
        }
    },
    watch: {
        '$route.matched': {
            handler(val) {
                if (val.length > 0) {
                    this.activeParent = val[0].name;
                    this.activeMenu = val[val.length - 1].name;
                }
            },
            immediate: true
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            this.$router.push({ name: key });
        }
    }
};
</script>
