<script setup lang="ts">
import CodeEditer from '../code-editer/index.vue';
import Terminal from '../terminal/index.vue';
import { ref } from "vue";
import Python from "../../utils/python";

const codeEditor = ref();
const terminal = ref();
const script = `
# python环境初始化，升级依赖库等
# python运行
# python语法检查
# python语法书解析，判断对错
print('hello world11')
for i in range(10):
	print(i)
`;
const codeValue = ref<string>(script);

// 页面加载完成后初始化
const editorMounted = (editor: any) => {
    console.log('editor实例加载完成1', editor)
}
// 监听值的变化
const onCodeChange = (value: string) => {
    codeEditor.value.clearErrorPoints();
}
const runCode = () => {
    console.log('运行代码', terminal.value);
    Python.execPython(codeEditor.value.getValue(), (data: string) => {
        console.log(data);
        terminal.value.setValue(data);
    }, (err: string) => {
        console.log(err);
        terminal.value.setValue(err);
    });
}

const checkSyntax = () => {
    Python.checkSyntax(codeEditor.value.getValue(), (result: string, lineNum: number, msg: string) => {
        console.log(`result: ${result}, lineNum: ${lineNum}, msg: ${msg}`);
        codeEditor.value.clearErrorPoints();
        if (result !== "success") {
            console.log("运行成功");
            codeEditor.value.setErrorPoint(lineNum);
        }
        terminal.value.setValue(`检查结果: ${result}, lineNum: ${lineNum}, msg: ${msg}\r\n`);
    });
}

</script>
<template>
    <div class="ide-python">
        <CodeEditer class="codeEditBox" @editor-mounted="editorMounted" @change="onCodeChange" :modelValue="codeValue"
            ref="codeEditor" />
        <div>结果：</div>
        <Terminal class="terminal" ref="terminal"></Terminal>
        <div style="display: flex; flex-direction: row; justify-content: center;">
            <button @click="checkSyntax">
                检查
            </button>
            <button @click="runCode" style="margin-left: 20px;">
                运行
            </button>
        </div>
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
}</style>