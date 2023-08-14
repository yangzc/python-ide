<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { editorProps } from './monacoEditorType'
import * as monaco from 'monaco-editor'
const props = defineProps(editorProps);
const emit = defineEmits(['change', 'editor-mounted']);

let editor: any = null;
const codeEditBox = ref();

watch(
    () => props.modelValue,
    newValue => {
        if (editor) {
            const value = editor.getValue()
            if (newValue !== value) {
                editor.setValue(newValue)
            }
        }
    }
)

watch(
    () => props.options,
    newValue => {
        editor.updateOptions(newValue)
    },
    { deep: true }
)

watch(
    () => props.language,
    newValue => {
        monaco.editor.setModelLanguage(editor.getModel()!, newValue)
    }
)

// 页面加载完成后初始化
onMounted(() => {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: false
    })
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true
    })
    monaco.editor.defineTheme('py-theme', {
        base: 'vs-dark', // 基于默认主题
        inherit: true, // 继承默认主题的样式
        colors: {
            // "editorLineNumber.activeForeground": "#fff000", //选中行号颜色
            // 'editorLineNumber.foreground': '#ff0000', // 行号颜色
            // "editor.background": "#FFFFFF",// 编辑器背景色
            // "editor.foreground": "#000000", // 编辑器前景色（文本颜色）
        },
        rules: [
            // { token: 'comment', foreground: 'ffa500' }
        ],
    });

    editor = monaco.editor.create(codeEditBox.value, {
        value: props.modelValue,
        language: props.language,
        theme: "py-theme",
        ...props.options,
    })
    editor.updateOptions({
        lineDecorationsWidth: 15,
        lineNumbersMinChars: 2
    });
    console.log("getLayoutInfo", editor.getLayoutInfo());
    // console.log("getLayoutInfo", editor.getRawOptions());


    // 监听值的变化
    editor.onDidChangeModelContent(() => {
        const value = editor.getValue() //给父组件实时返回最新文本
        emit('change', value)
    })

    emit('editor-mounted', editor)
})

// 页面卸载前销毁
onBeforeUnmount(() => {
    editor.dispose()
})

// 获得内容
var getValue = () => {
    return editor.getValue();
}

var errorPoints: string[] = [];
function setErrorPoint(line: number) {
    let model = editor.getModel()
    if (!model) return
    let value = {
        range: new monaco.Range(line, 1, line, 1),
        options: {
            isWholeLine: true,
            linesDecorationsClassName: 'errorPoint'
        }
    }
    errorPoints = model.deltaDecorations([], [value])
}

function clearErrorPoints() {
    editor.removeDecorations(errorPoints);
}

defineExpose({
    getValue,
    setErrorPoint,
    clearErrorPoints
})
</script>

<template>
    <div ref="codeEditBox" class="monaco-editor" />
</template>
<style lang="scss">
.monaco-editor {
    // height: v-bind(height);
    width: 100%;
    height: 100%;
}

// .margin-view-overlays {
//     background-color: bisque;
//     width: 40px;
// }
</style>