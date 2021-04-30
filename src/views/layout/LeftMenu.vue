<style lang="less" module>
.leftMenu {
    width: 240px;
    padding: 10px;
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
            font-weight: bold;
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
                padding: 8px 10px 8px 40px;
            }
            .second:last-child {
                border-bottom: 1px solid @light;
                padding-bottom: 12px;
            }
            .second:hover {
                background: #086b67c7;
            }
            .activeMenu {
                color: @hover;
            }

            .activeIcon {
                margin-left: -19px;
            }
        }
    }
}
</style>
<template>
    <aside :class="$style.leftMenu">
        <!-- {{ activeMenu }}
        {{ activeParent }} -->
        <div v-for="item in menus" :key="item.name" class="menuItem">
            <nav :class="['first', activeParent === item.name ? 'activeParent' : '']" @click="gotoRoute(item)"><i :class="item.icon"></i>{{ item.title }}</nav>
            <template v-if="item.children > 1">
                <div
                    v-for="child in item.children"
                    :key="child.name"
                    :class="['second', activeMenu === child.name ? 'activeMenu' : '']"
                    @click="gotoRoute(child)"
                >
                    <i v-if="activeMenu === child.name" class="el-icon-caret-right activeIcon"></i> {{ child.title }}
                </div>
            </template>
        </div>
    </aside>
</template>
<script>
export default {
    name: 'LeftMenu',
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
                this.activeParent = val[0].name;
                this.activeMenu = val[val.length - 1].name;
            },
            immediate: true
        }
    },

    methods: {
        gotoRoute(item) {
            // 有redirect就重定向到对应菜单
            const { path } = item;
            this.$router.push(path);
        }
    }
};
</script>
