<script setup lang="ts">
import { computed, ref} from 'vue';

var leftVisible = ref(false);
var rightVisible = ref(false);

const leftStyle = computed(() => {
  return {
    // "opacity": leftVisible.value ? 1 : 0,
    "margin-left": leftVisible.value ? '0px' : '-190px'
  }
});

const rightStyle = computed(() => {
  return {
    // "opacity": leftVisible.value ? 1 : 0,
    "margin-right": rightVisible.value ? '0px' : '-290px'
  }
});

</script>

<template>
  <div class="main">
    <div class="left" :style="leftStyle">
      <div class="left-body">
        <slot name="left"></slot>
      </div>
      <div class="left-slide">
        <div class="operation" @click="leftVisible = !leftVisible">三</div>
      </div>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right" :style="rightStyle">
      <div class="right-slide">
        <div class="operation" @click="rightVisible = !rightVisible">三</div>
      </div>
      <div class="right-body">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .left {
    width: 200px;
    background-color: red;
    transition: all 0.5s;
    transition-timing-function: ease-in;

    display: flex;
    flex-direction: row;
    overflow: hidden;

    .left-body {
      width: 0px;
      flex-grow: 1;
    }

    .left-slide {
      width: 10px;
      background-color: cornflowerblue;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      .operation {
        // background-color: blueviolet;
        cursor: pointer;
        font-weight: bold;
      }
    }
  }

  .center {
    width: 0;
    flex-grow: 1;
    background-color: bisque;
    display: flex;
    justify-content: space-between;
  }

  .right {
    width: 300px;
    background-color: aqua;
    transition: all 0.5s;
    transition-timing-function: ease-in;
    display: flex;
    flex-direction: row;
    overflow: hidden;

    .right-body {
      width: 0px;
      flex-grow: 1;
    }

    .right-slide {
      width: 10px;
      background-color: cornflowerblue;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      .operation {
        // background-color: blueviolet;
        cursor: pointer;
        font-weight: bold;
      }
    }
  }
}
</style>
