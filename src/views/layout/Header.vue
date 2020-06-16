<template>
    <header :class="$style.systemHeader">
        <!-- <div :class="$style.compony">
            <img :class="$style.componyLogo" v-show="componyInfo.componyLogo" src="../../images/stateGrid_whiteLogo.png" />
            <div>
                <div :class="$style.chineseTitle">
                    {{ componyInfo.mainTitle.split('/')[0] || '' }}
                </div>
                <div :class="$style.englishTitle">
                    {{ componyInfo.subTitle.split('/')[0] || '' }}
                </div>
                <div v-show="componyInfo.mainTitle" style="border:1px solid #c4fafa9c;width:10em;"></div>
                <div :class="$style.chineseTitle">
                    {{ componyInfo.mainTitle.split('/')[1] || '' }}
                </div>
                <div :class="$style.englishTitle">
                    {{ componyInfo.subTitle.split('/')[1] || '' }}
                </div>
            </div>
        </div> -->
        <img src="../../images/title-decorate.png" :class="$style.titleBefore" />
        <img :class="$style.titleLogo" alt="" />
        <span :class="$style.title">
            {{ title }}
        </span>
        <img src="../../images/title-decorate.png" :class="$style.titleAfter" />
    </header>
</template>
<script>
export default {
    name: 'Header',
    data() {
        return {
            componyInfo: {
                componyLogo: '../../images/stateGrid_whiteLogo.png',
                mainTitle: '国家电网/国网江苏省电力有限公司电力科学研究院',
                subTitle: 'STATE GRID/STATE GRID JIANGSU ELECTRIC POWER CO.,LTD RESEARCH INSTITUT'
            },
            title: 'xxxxxx系统'
        };
    },
    computed: {
        authorName() {
            return this.$store.state.authorName;
        }
    }
};
</script>
<style lang="less" module>
.systemHeader {
    height: @headerHeight;
    width: 100%;
    // padding: 0 20px;
    background: linear-gradient(
        90deg,
        rgba(9, 67, 66, 0.9) 0%,
        rgba(9, 67, 66, 0.9) 20%,
        rgba(5, 159, 154, 1) 50%,
        rgba(9, 67, 66, 0.9) 80%,
        rgba(9, 67, 66, 0.9) 100%
    );
    border: 1px solid #149593;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        line-height: @headerHeight;
    }
    .compony {
        position: absolute;
        left: 20px;
        color: @color-title;
        font-size: 14px;
        color: #c4fafa;
        font-family: 黑体;
        display: flex;
        .componyLogo {
            height: 1.8em;
            margin-right: 5px;
        }
        .chineseTitle {
            font-weight: bold;
        }
        .englishTitle {
            font-size: 10px;
        }
    }
    .title {
        color: @color-title;
        font-size: 24px;
    }
    .titleBefore {
        transform: rotate(180deg);
    }
    .titleAfter {
    }
    .titleLogo {
        content: url('../../styles/iot/imgs/logo-white.png');
        height: 28px;
        margin-right: 10px;
        margin-top: 2px;
    }
}
</style>
