import path from "path";
import { getEnv } from "./env";

/**
 * @name 获取文件路径
 * @param name 文件名
 * @returns 文件路径
 */
export const getPath = (name: string) => {
    const basePath = getEnv('base') as string;
    return path.resolve(basePath, name);
};
