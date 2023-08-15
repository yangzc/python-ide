var child_proces = require("child_process");

const formatData = (data: string) => {
    return data.replace(/\n/g, '\r\n');
}

class XShells {

    // 执行脚本命令
    static spawn = (shell: string, code: string, onSuccess: Function | undefined, onFail: Function | undefined, onClose: Function | undefined, onError: Function | undefined) => {
        var terminal = child_proces.spawn(code, [], {
            env: Object.assign({}, process.env, { PYTHONIOENCODING: 'UTF-8', PYTHONLEGACYWINDOWSIOENCODING: 'UTF-8' }),
            detached: process.platform === 'darwin',
            shell: shell
        });
        terminal.stdout.on('data', (data: any) => {
            console.log(`stdout: ${data}`);
            onSuccess && onSuccess(formatData(data.toString()));
        });
        terminal.stderr.on('data', (data: any) => {
            console.log(`stderr: ${data}`);
            onFail && onFail(formatData(data.toString()));
        });
        terminal.on('close', (code: number) => {
            console.log(`子进程退出码：${code}`);
            onClose && onClose(code)
        });
        terminal.on('error', (err: any) => {
            console.log(`子进程错误：${err}`);
            onError && onError(err)
        });
    }

    // 执行脚本命令
    static exec = (command: string, callback: Function, shell: string | undefined = undefined) => {
        var options = {};
        if (shell) {
            options = Object.assign({}, {
                shell: shell
            });
        }
        var process = child_proces.exec(command, options, (error: number, stdout: any, stderr: any) => {
            callback && callback(error, stdout, stderr);
            process && process.kill();
        });
    }
}

exports.default = XShells;