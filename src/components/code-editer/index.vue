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
        base: 'vs', // 基于默认主题
        inherit: true, // 继承默认主题的样式
        colors: {
            // "editorLineNumber.activeForeground": "#fff000", //选中行号颜色
            'editorLineNumber.foreground': '#ff0000', // 行号颜色
            "checkbox.border": "#919191",
            "editor.background": "#FFFFFF",// 编辑器背景色
            "editor.foreground": "#000000", // 编辑器前景色（文本颜色）
            "editor.inactiveSelectionBackground": "#E5EBF1",
            "editorIndentGuide.background": "#D3D3D3",
            "editorIndentGuide.activeBackground": "#939393",
            "editor.selectionHighlightBackground": "#ADD6FF80",
            "editorSuggestWidget.background": "#F3F3F3",
            "activityBarBadge.background": "#007ACC",
            "sideBarTitle.foreground": "#6F6F6F",
            "list.hoverBackground": "#E8E8E8",
            "menu.border": "#D4D4D4",
            "input.placeholderForeground": "#767676",
            "searchEditor.textInputBorder": "#CECECE",
            "settings.textInputBorder": "#CECECE",
            "settings.numberInputBorder": "#CECECE",
            "statusBarItem.remoteForeground": "#FFF",
            "statusBarItem.remoteBackground": "#16825D",
            "ports.iconRunningProcessForeground": "#369432",
            "sideBarSectionHeader.background": "#0000",
            "sideBarSectionHeader.border": "#61616130",
            "tab.lastPinnedBorder": "#61616130",
            "notebook.cellBorderColor": "#E8E8E8",
            "notebook.selectedCellBackground": "#c8ddf150",
            "statusBarItem.errorBackground": "#c72e0f",
            "list.activeSelectionIconForeground": "#FFF",
            "list.focusAndSelectionOutline": "#90C2F9",
            "terminal.inactiveSelectionBackground": "#E5EBF1",
            "widget.border": "#d4d4d4",
            "editorGutter.addedBackground": "#2EA043",
		    "editorGutter.deletedBackground": "#F85149",
		    "editorGutter.modifiedBackground": "#0078D4",
        },
        rules: [
            { token: 'comment', foreground: 'ffa500' }
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

function addBreakPoint(line: number) {
    let model = editor.getModel()
    if (!model) return
    let value = {
        range: new monaco.Range(line, 1, line, 1),
        options: {
            isWholeLine: true,
            linesDecorationsClassName: 'breakpoints'
        }
    }
    model.deltaDecorations([], [value])
}

defineExpose({
    getValue,
    addBreakPoint
})
</script>

<template>
    <div ref="codeEditBox" class="monaco-editor" />
</template>
<style lang="scss">
.monaco-editor {
    width: v-bind(width);
    height: v-bind(height);
}

// .margin-view-overlays {
//     background-color: bisque;
//     width: 40px;
// }
</style>