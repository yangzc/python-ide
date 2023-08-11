<!-- 语法、错误提示 -->
<script setup lang="ts">
import { shell } from "electron";
import { ref } from "vue";
import Python from "../utils/python";

var codeTextArea = ref();

var codeStr = `print("Hello World")`;

function run() {
    // console.log("run");
    // Shell.run_script(codeTextArea.value.value);
    // console.log("run end");
    // Shell.set_dataHandler((data: string) => {
    //     console.log(data);
    // });
    // Shell.run_script(codeStr)
    Python.installPython();
    // Python.execPython(codeTextArea.value.value, (data: string) => {
    //     console.log(data);
    // });
}
</script>
<template>
    <div class="code-ide">
        <button @click="run">Run</button>
        <textarea class="code-area" ref="codeTextArea">{{codeStr}}</textarea>
    </div>
</template>
<style scoped>
.code-ide {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.code-area {
    height: 100%;
}
</style>