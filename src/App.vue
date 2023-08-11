<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import PythonIde from './components/PythonIde.vue';
// import TerminalComponent from './components/TerminalComponent.vue';
// import PythonComponent from './components/PythonComponent.vue';
// import CodeEditer from './components/code-editer/index.vue';
import PythonIde from './components/ide-python/index.vue';
import Drawer from './components/Drawer.vue';
// import * as monaco from 'monaco-editor'
import { ref } from 'vue';
// const content = ref('print("aaa")')
// const editorMounted = (editor: monaco.editor.IStandaloneCodeEditor) => {
//   console.log('editor实例加载完成', editor)
// }
var display = ref(false)
var drawerWidth = ref('400px')
var closeDrawer = () => {
  display.value = false;
}
</script>

<template>
  <!-- <div>
    <a href="https://www.electronjs.org/" target="_blank">
      <img src="./assets/electron.svg" class="logo electron" alt="Electron logo" />
    </a>
    <a href="https://vitejs.dev/" target="_blank">
      <img src="./assets/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Electron + Vite + Vue" />
  <div class="flex-center">
    Place static files into the <code>/public</code> folder
    <img style="width: 2.4em; margin-left: .4em;" src="/logo.svg" alt="Logo">
  </div> -->
  <PythonIde></PythonIde>
  <!-- <div class="box">
    <button @click="display = true">打开抽屉</button>
    <Drawer title="我是一个抽屉组件" v-model:display="display" :width="drawerWidth" :mask="false">
      1. Hello, world!
      2. Do you like it?
    </Drawer>
  </div> -->
</template>

<style>
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
