<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZZF
 * @Date: 2020-06-08 17:00:50
 * @LastEditors: ZZF
 * @LastEditTime: 2020-06-15 15:24:38
-->
<style lang="less" module>
.leftMenu {
    width: 240px;
    padding: 20px;
    background: rgba(3, 53, 51, 0.8);
    border: 1px solid #1f9a9f;
    margin-right: 10px;
    overflow: auto;
    :global {
        .menuItem {
            @light: #00fff6;
            @hover: #fcc400;
            color: @light;
            margin-bottom: 20px;

            .first {
                border: 1px solid @light;
                padding: 10px 10px 10px 20px;
                cursor: pointer;
                border-color: @light;
                box-shadow: 0px 0px 6px @light inset;
                i {
                    margin-right: 6px;
                }
            }
            .first:hover,
            .activeParent {
                color: @hover;
                border-color: @hover;
                box-shadow: 0px 0px 6px @hover inset;
            }

            .second {
                cursor: pointer;
                border-left: 1px solid @light;
                border-right: 1px solid @light;
                padding: 12px 10px 0 40px;
            }
            .second:last-child {
                border-bottom: 1px solid @light;
                padding-bottom: 12px;
            }
            .second:hover,
            .activeMenu {
                color: @hover;
            }

            .activeIcon {
                position: absolute;
                left: 40px;
                margin-top: 3px;
            }
        }
    }
}
</style>
<template>
    <aside :class="$style.leftMenu">
        <!-- {{ activeMenu }}
        {{ activeParent }} -->
        <div class="menuItem" v-for="item in menus" :key="item.name">
            <nav :class="['first', activeParent === item.name ? 'activeParent' : '']" @click="gotoRoute(item)"><i :class="item.icon"></i>{{ item.title }}</nav>
            <div :class="['second', activeMenu === child.name ? 'activeMenu' : '']" v-for="child in item.children" :key="child.name" @click="gotoRoute(child)">
                <i v-if="activeMenu === child.name" class="el-icon-caret-right activeIcon"></i> {{ child.title }}
            </div>
        </div>
    </aside>
</template>
<script>
export default {
    name: 'LeftMenu',
    data() {
        return {};
    },
    computed: {
        menus() {
            // console.log('menus', routers);
            return this.$store.state.user.routes;
        },
        activeMenu() {
            const route = this.$route;
            const { name } = route;
            return name;
        },
        activeParent() {
            const matchedRoutes = this.$route.matched;
            const res = matchedRoutes.filter(x => {
                return this.$route.name === x.name;
            });
            return res[0] ? res[0].parent.name : this.$route.name;
        }
    },
    watch: {
        $route: {
            handler: function(route) {},
            immediate: true
        }
    },
    methods: {
        gotoRoute(item) {
            // 有redirect就重定向到对应菜单
            const { redirect, path } = item;
            if (redirect) {
                this.$router.push(redirect);
                return;
            }
            this.$router.push(path);
        }
    },
    created() {
        // console.error(window.location.href);
    }
};
</script>
