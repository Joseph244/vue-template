<style lang="less" module>
.test {
    width: 200px;
}
</style>
<style scoped>
.itxst {
    width: 60%;
    margin: 10px;
    text-align: left;
    height: 300px;
    overflow: auto;
}
.col {
    width: 100%;
    flex: 1;
    padding: 10px;
    border: solid 1px #eee;
    border-radius: 5px;
    float: left;
}
.col + .col {
    margin-left: 10px;
}
.item {
    padding: 20px 12px;
    margin: 0px 10px 0px 10px;
    border: solid 1px #eee;
    text-align: left;
}
.item + .item {
    margin-top: 6px;
}
.item:hover {
    /* 超出之后移动滚动条必须配置该属性 */
    cursor: move;
}
</style>
<template>
    <div :class="$style.test">
        <draggable v-model="arr1" :scroll="true" animation="300">
            <transition-group>
                <div v-for="item in arr1" :key="item.id" :class="item.id == 1 ? 'item forbid' : 'item'">
                    {{ item.name }}
                </div>
            </transition-group>
        </draggable>
    </div>
</template>
<script>
import draggable from 'vuedraggable';
export default {
    name: 'Test',
    components: {
        draggable
    },
    data() {
        return {
            arr1: [
                { id: 1, name: 'www.itxst.com' },
                { id: 2, name: 'www.jd.com' },
                { id: 3, name: 'www.baidu.com' },
                { id: 4, name: 'www.google.com' },
                { id: 5, name: 'www.taobao.com' },
                { id: 6, name: 'item 1' },
                { id: 7, name: 'item 2' },
                { id: 8, name: 'item 3' },
                { id: 9, name: 'item 4' }
            ]
        };
    },
    computed: {},
    watch: {},
    created() {},
    methods: {}
};
</script>
