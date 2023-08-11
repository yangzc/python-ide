<template>
    <div class="terminal-container" ref="terminalRef"></div>
</template>
    
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const terminalRef = ref(null);
var term: any = null;

onMounted(() => {
    term = new Terminal({
        cursorBlink: true,
        fontSize: 14,
        fontFamily: 'Menlo, Consolas, "DejaVu Sans Mono", monospace',
        fontWeight: 'normal',
        letterSpacing: 0,
        lineHeight: 1,
        theme: {
            background: '#1d1f21',
            foreground: '#c5c8c6',
            black: '#1d1f21',
            blue: '#81a2be',
            brightBlack: '#969896',
            brightBlue: '#81a2be',
            brightCyan: '#8abeb7',
            brightGreen: '#b5bd68',
            brightMagenta: '#b294bb',
            brightRed: '#cc6666',
            brightWhite: '#ffffff',
            brightYellow: '#f0c674',
            cyan: '#8abeb7',
            green: '#b5bd68',
            magenta: '#b294bb',
            red: '#cc6666',
            white: '#c5c8c6',
            yellow: '#f0c674',
        },
    });
    // 将终端附加到容器中
    term.open(terminalRef.value);
    // 添加 FitAddon，以便在窗口大小变化时自动调整终端尺寸
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    // 在终端中输出示例文本
    term.write('Hello, python!\r\n');
    term.write('c:/\x1B[1;3;31mpythons\x1B[0m $ ')
    // term.write('\033[0mHello, left-aligned text!\r\n');
    // 设置输入处理
    // term.onKey(e => {
    //     // 处理按键事件，可以在这里模拟终端行为
    //     if (e.domEvent.key === 'Enter') {
    //         // this.handleCommandInput(this.inputBuffer);
    //         // inputBuffer = '';
    //     } else {
    //         // inputBuffer += e.key;
    //         term.write(e.key);
    //     }
    // });
});

var setValue = (value: string) => {
    console.log(value);
    term.write(value);
    term.write('c:/\x1B[1;3;31mpythons\x1B[0m $ ')
}

defineExpose({
    setValue
})
</script>
    
<style>
.terminal-container {
    width: 100%;
    height: 100%;
}
</style>
    