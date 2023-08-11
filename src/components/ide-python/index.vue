<script setup lang="ts">
import CodeEditer from '../code-editer/index.vue';
import { onMounted, ref } from "vue";
import Python from "../../utils/python";

const codeValue = ref<string>("print('hello world11')");

var code = "";
// 页面加载完成后初始化
const editorMounted = (editor: any) => {
    console.log('editor实例加载完成')
}
// 监听值的变化
const onCodeChange = (value: string) => {
    code = value;
}
const runCode = () => {
    console.log('运行代码', code)
    Python.execPython(code, (data: string) => {
        console.log(data);
    });
}
</script>
<template>
    <div class="ide-python">
        <CodeEditer class="codeEditBox" @editor-mounted="editorMounted" @change="onCodeChange" :modelValue="codeValue"/>
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
.codeEditBox {
    width: 100%;
    height: 0;
    flex-grow: 1;
}
</style>