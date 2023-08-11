<template>
  <div class="terminal-container" ref="terminalContainer"></div>
</template>
  
<script>
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

// inputBuffer = '';
export default {
  mounted() {
    // 创建终端对象
    const term = new Terminal({
      // cursorBlink: true,
      // fontSize: 14,
      // fontFamily: 'Menlo, Consolas, "DejaVu Sans Mono", monospace'
    });
    // term.cols = 80;

    // 获取容器元素
    const terminalContainer = this.$refs.terminalContainer;

    // 将终端附加到容器中
    term.open(terminalContainer);
    // term.cols = 80;
    // 居左对齐
    // term.write('\x1b[3J');

    // 添加 FitAddon，以便在窗口大小变化时自动调整终端尺寸
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    // 在终端中输出示例文本
    term.write('Hello, xterm in Vue!\r\n');
    term.write('This is a very simple terminal.\r\n');
    term.write('Try typing some commands!\r\n');
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
    // term.write('\033[0mHello, left-aligned text!\r\n');
    // 设置输入处理
    term.onKey(e => {
      // 处理按键事件，可以在这里模拟终端行为
      if (e.domEvent.key === 'Enter') {
        // this.handleCommandInput(this.inputBuffer);
        // inputBuffer = '';
      } else {
        // inputBuffer += e.key;
        term.write(e.key);
      }
    });
    // this.displayPrompt();
  }

  // methods: {
  //   displayPrompt() {
  //     this.term.write(`\r\n Enter: $ `);
  //   },
  //   handleCommandInput(command) {
  //     // 处理命令输入，包括命令解析、文件操作等
  //     // ...
      
  //     // 显示下一行提示符
  //     this.displayPrompt();
  //   }
  //   // 其他方法...
  // }
};
</script>
  
<style>
.terminal-container {
  width: 100%;
  height: 400px;
}
</style>
  