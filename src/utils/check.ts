import fs from "fs-extra";
import { debugError } from "./debug";
import { getEnv } from "./env";

/**
 * @name 判断文件夹是否存在
 * @param name 文件名称
 * @param ext 若不存在，是否退出
 */
export const pathExists = async (name: string, ext: boolean = true) => {
    const base = getEnv('base') as string;
    const res = await fs.pathExists(`${base}/${name}`);
    if(!res) {
        ext && debugError(`${base}/${name}不存在`);
        return false;
    } else {
        return res;
    }
}

/**
 * @name 判断vue版本
 * @param version 版本号
 */
export const checkVueVersion = (version: string) => {
    const v = version.split('.')[0] as string;
    return Number(v.match(/\d+/g));
}

/**
 * @name 判断使用的是npm还是yarn
 * @param _basePath 文件路径
 */
export const checkNpmOrYarn = async (_basePath?: string): Promise<string[]> => {
    if(await pathExists('yarn.lock', false)) {
        return ['yarn', 'add'];
    }
    return ['npm', 'init'];
}
