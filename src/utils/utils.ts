/**
 * @autor yangzc
 */

import * as os from 'os';
import * as path from "path";

// 获得应用程序根目录
const getAppPath = () => {
    return "/Users/yangzc/devsoft/projects/web/electron-python-ide"
}

// 获得用户目录
export const getXiaoHeDir = () => {
    return path.join(os.homedir(), ".xiaohe");
}

export function getScriptPath(): string {
    const script_path = path.join(getAppPath(), 'scripts');
    return script_path;
}

// 获得runtime目录
export function getBinariesDirectoryPath(): string {
    const binaries_directory = path.join(getAppPath(), 'runtime');
    return binaries_directory;
}

// 获得操作系统的cpu架构
export function getArch(): string {
    return os.arch();
}

// 是否是windows系统
export function isWins(): boolean {
    return os.platform() === 'win32';
}

// 是否是mac系统
export function isMac(): boolean {
    return os.platform() === 'darwin';
}

// 是否是64位
export function isWin64(): boolean {
    return isWins() && getArch() === 'x64';
}

export function isDev(): boolean {
    return process.env.NODE_ENV === 'development';
}


