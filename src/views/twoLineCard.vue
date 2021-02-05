<style lang='less' module>
.towLineCard {
    width: 164px;
    div{
        padding: 10px;
    }
    .tit{
        font-weight: bold;
        background: @background-secondary;
    }
    .val{
        background: @background-white-secondary;
    }
}
</style>
<template>
    <div :class="$style.towLineCard">
        <div :class="$style.tit">
            <i :class="icon"></i>{{ title }}
        </div>
        <div :class="$style.val">
            {{ value }}
        </div>
    </div>
</template>
<script>
export default {
    name:'TowLineCard',
    props:{
        icon:{
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    }
}
</script>