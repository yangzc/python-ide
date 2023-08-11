import * as path from 'path';
import { getBinariesDirectoryPath, getScriptPath, getXiaoHeDir, isDev, isMac, isWin64, isWins } from './utils';
import { exec, spawn } from './shells';

const python_win64_path = path.join(getBinariesDirectoryPath(), 'python-win64/python.exe');
const python_win32_path = path.join(getBinariesDirectoryPath(), 'python-win32/python.exe');
const python_macos_path = path.join(getBinariesDirectoryPath(), 'python-mac/bin/python3');
// 内置依赖库路径
const python_buildin_libs = path.join(getBinariesDirectoryPath(), 'python-buildin-libs');
// 下载路径
const python_download_libs = path.join(getXiaoHeDir(), 'python-external-libs');

class Python {
    // 获得python安装路径
    static getPythonPath = () => {
        if (isDev()) {
            return "/Users/yangzc/.pyenv/shims/python3"
        }
        if (isWin64()) {
            return python_win64_path;
        } else if (isWins()) {
            return python_win32_path;
        } else if (isMac()) {
            return python_macos_path;
        } else {
            return ""
        }
    }

    // 获得sitePackages目录
    static getPySitePackagesDir = () => {
        var pythonPthPath = ""
        if (isWin64()) {
            pythonPthPath = getBinariesDirectoryPath() + "/python-win64/Lib/site-packages";
        } else if (isWins()) {
            pythonPthPath = getBinariesDirectoryPath() + "/python-win32/Lib/site-packages";
        } else if (isMac()) {
            // var pythonPthPath = getBinariesDirectoryPath() + "/python-mac/lib/python3.6/site-packages";
            var pythonPthPath = getBinariesDirectoryPath() + "/python-mac"
        }
        return pythonPthPath
    }

    // 初始化python环境
    static installPython = () => {
        // 执行初始化python环境脚本
        const PYTHON_SCRIPT_PATH = path.join(getScriptPath(), 'py_install.py');
        const target = Python.getPySitePackagesDir() + "/xiaohe.pth";

        const command = `${PYTHON_SCRIPT_PATH} ${python_buildin_libs} ${python_download_libs} ${target}`;
        exec(Python.getPythonPath(), command, (error: number, stdout: any, stderr: any) => {
            console.log(stdout);
            if (error) {
                console.log("初始化python环境失败");
            } else {
                console.log("初始化python环境成功");
            }
        });
    }

    // 安装python依赖库
    static installLib = (libname: string, fcn: (error: number | null, action: string, libname: string) => void) => {
        let command = '';
        console.log('[*] start installLibBy -------------------->>>>>');
        command += [
            `-m pip install`,
            `--upgrade ${libname}`,
            `--target ${python_download_libs}`,
            '-i http://mirrors.aliyun.com/pypi/simple/',
            '--trusted-host mirrors.aliyun.com',
            '--extra-index-url=https://file.logicxcode.com/pypi',
            '--trusted-host v0.ftp.upyun.com'
        ].join(' ');

        console.log(`[*] installLibBy, command: ${command}`);
        exec(Python.getPythonPath(), command, (error: number, stdout: any, stderr: any) => {
            console.log(`[*] installLibBy, e: ${error}, n: ${stdout}, r: ${stderr}`);
            if (error && stderr.includes('pip install --upgrade pip')) {
                Python.updatePip();
            }
            if (stdout && stdout.includes('pip install --upgrade pip')) {
                Python.updatePip();
            }
            fcn(error, 'install', libname);
        });
    };

    // 更新python依赖库
    static uninstallLib = (libname: string, fcn: (error: number | null, action: string, libname: string) => void) => {
        let command = `-m pip uninstall ${libname} -y`;
        exec(Python.getPythonPath(), command, (error: number, stdout: any, stderr: any) => {
            console.log(`[*] updatePip, e: ${error}, n: ${stdout}, r: ${stderr}`);
            fcn(error, 'uninstall', libname)
        });
    };

    // 搜索python依赖库
    static searchLibBy = (libname: string, fcn?: (error: number | null, libname: string) => void) => {
        let command = `-m pip show ${libname}`;
        exec(Python.getPythonPath(), command, (error: number, stdout: any, stderr: any) => {
            fcn && fcn(error, libname);
        });
    };

    // 
    static checkInstalledLibs = (fcn: (error: number | null, result: string) => void) => {
        let command = `-m pyutils --import-list --include .xiaoxiang --include cmpython`;
        exec(Python.getPythonPath(), command, (error: number, stdout: any, stderr: any) => {
            console.log(`[*] updatePip, e: ${error}, n: ${stdout}, r: ${stderr}`);
            fcn(error, stdout)
        });
    };

    // 更新pip
    static updatePip = () => {
        let command = `-m pip install --upgrade pip`;
        exec(Python.getPythonPath(), command, (error: number, stdout: any, stderr: any) => {
            console.log(`[*] updatePip, e: ${error}, n: ${stdout}, r: ${stderr}`);
        });
    };

    // 执行python脚本
    static execPython = (code: string, onSuccess: Function | undefined, onFail: Function | undefined = undefined, onClose: Function | undefined = undefined, onError: Function | undefined = undefined) => {
        spawn(Python.getPythonPath(), code, onSuccess, onFail, onClose, onError);
    }
}
export default Python;