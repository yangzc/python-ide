<!-- 语法、错误提示 -->
<script setup lang="ts">
import { shell } from "electron";
import { onMounted, ref } from "vue";
import Python from "../utils/python";
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

var codeTextArea = ref();

onMounted(() => {
    const term = new Terminal();
// 获取容器元素
const terminalContainer = codeTextArea.value;
// 将终端附加到容器中
term.open(terminalContainer);
// 添加 FitAddon，以便在窗口大小变化时自动调整终端尺寸
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
// 在终端中输出示例文本
term.write('Hello, xterm in Vue!\r\n');
});

var codeStr = `print("Hello World")`;

function run() {
    // console.log("run");
    // Shell.run_script(codeTextArea.value.value);
    // console.log("run end");
    // Shell.set_dataHandler((data: string) => {
    //     console.log(data);
    // });
    // Shell.run_script(codeStr)
    // Python.installPython();
    // Python.execPython(codeTextArea.value.value, (data: string) => {
    //     console.log(data);
    // });
    
}
</script>
<template>
    <div class="code-ide">
        <button @click="run">Run</button>
        <!-- <textarea class="code-area" ref="codeTextArea">{{codeStr}}</textarea> -->
        <div id="terminal" class="code-area" style="width: 100%;height: 400px;" ref="codeTextArea"></div>
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