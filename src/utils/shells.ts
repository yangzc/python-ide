var child_proces = require("child_process");

// 执行脚本命令
export const spawn = (shell: string, code: string, onSuccess: Function | undefined, onFail: Function | undefined, onClose: Function | undefined, onError: Function | undefined) => {
    var terminal = child_proces.spawn(code, [], {
        env: Object.assign({}, process.env, { PYTHONIOENCODING: 'UTF-8', PYTHONLEGACYWINDOWSIOENCODING: 'UTF-8' }),
        detached: process.platform === 'darwin',
        shell: shell
    });
    terminal.stdout.on('data', (data: any) => {
        console.log(`stdout: ${data}`);
        onSuccess && onSuccess(data.toString());
    });
    terminal.stderr.on('data', (data: any) => {
        console.log(`stderr: ${data}`);
        onFail && onFail(data.toString());
    });
    terminal.on('close', (code: any) => {
        console.log(`子进程退出码：${code}`);
        onClose && onClose(code)
    });
    terminal.on('error', (err: any) => {
        console.log(`子进程错误：${err}`);
        onError && onError(err)
    });
}

// 执行脚本命令
export const exec = (shell: string, command: string, callback: Function) => {
    var process = child_proces.exec(`${shell} ${command}`, (error: number, stdout: any, stderr: any) => {
        callback && callback(error, stdout, stderr);
        process.kill();
    }
    );
}