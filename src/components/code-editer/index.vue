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

    editor = monaco.editor.create(codeEditBox.value, {
        value: props.modelValue,
        language: props.language,
        theme: props.theme,
        ...props.options,
    })

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
</script>

<template>
    <div ref="codeEditBox" class="codeEditBox"/>
</template>
<style lang="scss" scoped>
.codeEditBox {
    width: v-bind(width);
    height: v-bind(height);
    text-align: left;
}
</style>