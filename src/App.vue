<script setup lang="ts">
import PythonIde from './components/ide-python/index.vue';
// import Drawer from './components/Drawer.vue';
import MainDivisionPanel from './components/MainDivisionPanel.vue'
import CodeEditer from './components/code-editer/index.vue';
import { computed, ref, watch } from 'vue';
var display = ref(false)
var drawerWidth = ref('400px')

var leftVisible = ref(true);
var rightVisible = ref(true);

// watch(
//     () => leftVisible,
//     newValue => {

//     }
// )

const leftStyle = computed(() => {
  return {
    // "opacity": leftVisible.value ? 1 : 0,
    "margin-left": leftVisible.value ? '0px' : '-190px'
  }
});

const rightStyle = computed(() => {
  return {
    // "opacity": leftVisible.value ? 1 : 0,
    "margin-right": rightVisible.value ? '0px' : '-90px'
  }
});
const codeEditor = ref();
const terminal = ref();
const codeValue = ref<string>("print('hello world11')");
// 页面加载完成后初始化
const editorMounted = (editor: any) => {
    console.log('editor实例加载完成1', editor)
}
// 监听值的变化
const onCodeChange = (value: string) => {
}
</script>

<template>
  <!-- <PythonIde></PythonIde> -->
  <!-- <div class="box">
    <button @click="display = true">打开抽屉</button>
    <Drawer title="我是一个抽屉组件" v-model:display="display" :width="drawerWidth" :mask="false">
      1. Hello, world!
      2. Do you like it?
    </Drawer>
  </div> -->
  <MainDivisionPanel>
    <template v-slot:left>Left</template>
    <template v-slot:right>Right</template>
    <template v-slot:center>
      <CodeEditer class="codeEditBox" @editor-mounted="editorMounted" @change="onCodeChange" :modelValue="codeValue" ref="codeEditor"/>
    </template>
  </MainDivisionPanel>
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
        background-color: blueviolet;
        cursor: pointer;
      }
    }
  }

  .center {
    width: 0;
    flex-grow: 1;
    background-color: black;
    display: flex;
    justify-content: space-between;
  }

  .right {
    width: 100px;
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
        background-color: blueviolet;
        cursor: pointer;
      }
    }
  }
}


.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo.electron:hover {
  filter: drop-shadow(0 0 2em #9FEAF9);
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
