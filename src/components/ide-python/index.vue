<script setup lang="ts">
import CodeEditer from '../code-editer/index.vue';
import Terminal from '../terminal/index.vue';
import { ref } from "vue";
import Python from "../../utils/python";

const codeEditor = ref();
const terminal = ref();
const codeValue = ref<string>("print('hello world11')");

// 页面加载完成后初始化
const editorMounted = (editor: any) => {
    console.log('editor实例加载完成')
}
// 监听值的变化
const onCodeChange = (value: string) => {
}
const runCode = () => {
    console.log('运行代码', terminal.value);
    // Python.execPython(codeEditor.value.getValue(), (data: string) => {
    //     console.log(data);
    //     terminal.value.setValue(data);
    // }, (err: string) => {
    //     console.log(err);
    //     terminal.value.setValue(err);
    // });
    codeEditor.value.addBreakPoint(1)
}

</script>
<template>
    <div class="ide-python">
        <CodeEditer class="codeEditBox" @editor-mounted="editorMounted" @change="onCodeChange" :modelValue="codeValue" ref="codeEditor"/>
        <div>结果：</div>
        <Terminal class="terminal" ref="terminal"></Terminal>
        <button @click="runCode">
            运行
        </button>
    </div>
</template>
<style scoped>
.ide-python {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.terminal {
    height: 200px;
    overflow-y: auto;
}
.codeEditBox {
    width: 100%;
    height: 0;
    flex-grow: 1;
}
</style>