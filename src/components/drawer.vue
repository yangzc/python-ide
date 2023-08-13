<template>
    <div class="drawer">
        <div :class="maskClass" @click="closeByMask"></div>
        <div :class="mainClass" :style="mainStyle" class="main">
            <div class="drawer-head">
                <span>{{ title }}</span>
                <span class="close-btn" v-show="closable" @click="closeByButton">X</span>
            </div>
            <div class="drawer-body">
                <slot />
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { computed } from 'vue';

var props = defineProps({
    // 是否打开
    display: {
        type: Boolean
    },
    // 标题
    title: {
        type: String,
        default: '标题'
    },
    // 是否显示关闭按钮
    closable: {
        type: Boolean,
        default: true
    },
    // 是否显示遮罩
    mask: {
        type: Boolean,
        default: true
    },
    // 是否点击遮罩关闭
    maskClosable: {
        type: Boolean,
        default: true
    },
    // 宽度
    width: {
        type: String,
        default: '400px'
    },
});
const maskClass = computed(() => {
    console.log("computed", "maskClass");
    return {
        'mask-show': (props.mask && props.display),
        'mask-hide': !(props.mask && props.display)
    }
});
const mainClass = computed(() => {
    console.log("computed", "mainClass");
    return {
        'main-show': props.display,
        'main-hide': !props.display
    }
});
const mainStyle = computed(() => {
    console.log("computed", "mainStyle");
    return {
        width: props.width,
        right: props.display ? '0' : `-${props.width}`
    }
});

const emit = defineEmits(['update:display', 'close']);
const closeByButton = () => {
    emit('update:display', false);
    emit('close');
};
const closeByMask = () => {
    if (props.maskClosable) {
        emit('update:display', false);
        emit('close');
    }
};
</script>
  
<style lang="scss" scoped>
.drawer {

    /* 遮罩 */
    .mask-show {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-color: rgba(0, 0, 0, .5);
        opacity: 1;
        transition: opacity .5s;
    }

    .mask-hide {
        opacity: 0;
        transition: opacity .5s;
    }

    /* 滑块 */
    .main {
        position: fixed;
        z-index: 10;
        top: 0;
        height: 100%;
        background: #fff;
        transition: all 0.5s;
    }

    .main-show {
        opacity: 1;
    }

    .main-hide {
        opacity: 0;
    }

    /* 其他样式 */
    .drawer-head {
        display: flex;
        justify-content: space-between;
        height: 45px;
        line-height: 45px;
        padding: 0 15px;
        font-size: 14px;
        font-weight: bold;
        border-bottom: 1px solid #eee;

        .close-btn {
            display: inline-block;
            cursor: pointer;
            height: 100%;
            padding-left: 20px;
        }
    }

    .drawer-body {
        font-size: 14px;
        padding: 15px;
        height: 100%;
        background-color:aqua;
    }
}
</style>