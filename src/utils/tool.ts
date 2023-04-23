import spawn from "cross-spawn";
import fs from 'fs-extra';

import { getEnv, getPackageJson } from "./env";
import { checkNpmOrYarn } from "./check";
import { debugInfo, debugWarning } from "./debug";
import { getPath } from "./path";

/**
 * @name 数组中是否存在某元素
 * @param list 数组
 * @param element 元素
 * @returns 元素 || ''
 */
export const hasElementInArray = (list: Array<String>, element: string) => {
    return list.indexOf(element) >= 0 ? element : '';
}

/**
 * @name 
 * @param runName 
 * @param type 
 * @returns 
 */
export const down = async (runName: string | string[], type: string) => {
    const basePath = getEnv('base') as string;
    const [n, i] = await checkNpmOrYarn(basePath);
    if(typeof runName === 'string') {
        await spawnSync(n, i, runName, type, basePath);
        return false;
    }
    runName.forEach(async (runItem) => {
        await spawnSync(n, i, runItem, type, basePath);
    });
}

/**
 * @name 
 * @param n 
 * @param i 
 * @param runItem 
 * @param type 
 * @param basePath 
 * @returns 
 */
export const spawnSync = (n: string, i: string, runItem: string, type: string, basePath: string) => {
    return new Promise((resolve) => {
        spawn.sync(n, [i, runItem, type], {
            stdio: 'pipe',
            cwd: basePath
        });
        debugInfo(`${runItem}✅`);

        resolve({ success: true });
    })
}

/**
 * @name 将依赖项写入package.json
 * @param devArr 依赖数据
 * @param key 依赖key
 */
export const writeInPkg = async (devArr: string[], key: string = 'devDependencies') => {
    let pkg = await getPackageJson();
    devArr.forEach((item: string) => {
        // 为了防止安装包里面的名字有@
        const index = item.lastIndexOf('@');
        const k = index === -1 ? item : item.slice(0, index);
        const v = index === -1 ? '' : item.slice(index + 1) || '';

        // ???
        pkg[key][k] = v;

        debugInfo(`${item}✅`);
    });
    fs.writeJSONSync(getPath('package.json'), pkg, { spaces: 2 });
}

/**
 * @name 执行命令语句
 * @param str 命令语句
 */
export const run = async (str: string) => {
    const basePath = getEnv('base') as string;
    const runArr = str.split(' ');
    if(runArr.length < 2) {
        debugWarning(`运行参数错误${str}`);
        return false;
    }
    const [npm, ...args] = runArr;
    debugInfo(`${runArr.join(' ')}✅`);
    spawn.sync(npm, args, {
        stdio: 'pipe',
        cwd: basePath
    })
}

/**
 * @name 组装依赖安装命令
 */
export const downNodeModules = async () => {
    const basePath = getEnv('base') as string;
    const [n] = await checkNpmOrYarn(basePath);
    await run(`${n} install`);
}
