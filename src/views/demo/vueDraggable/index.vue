<style lang="less" module>
.draggable {
    .item {
        border: 1px solid salmon;
    }
}
</style>
<template>
    <div :class="$style.draggable">
        <vuedraggable v-model="list" class="wrapper" @update="updated">
            <!-- 过度效果 -->
            <transition-group>
                <div v-for="item in list" :key="item.id" :class="$style.item">
                    <p>{{ item }}</p>
                </div>
            </transition-group>
        </vuedraggable>
    </div>
</template>
<script>
// 导入组件
import vuedraggable from 'vuedraggable';
export default {
    name: 'Draggable',
    components: { vuedraggable },
    data() {
        return {
            dataList: [
                {
                    id: 3,
                    name: '悟净',
                    orderIndex: 6
                },
                {
                    id: 1,
                    name: '悟空',
                    orderIndex: 8
                },
                {
                    id: 2,
                    name: '八戒',
                    orderIndex: 2
                }
            ]
        };
    },
    computed: {
        list() {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            let ls = this.dataList.sort(this.$tools.objArraySortBy('orderIndex', 'desc'));
            return ls;
        }
    },
    watch: {},
    created() {},
    methods: {
        // 更新事件
        updated(e) {
            let { oldIndex, newIndex } = e;
            console.log(oldIndex, newIndex, this.dataList);
        }
    }
};
</script>
