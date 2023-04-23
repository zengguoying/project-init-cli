// 一些特殊处理
import fs from 'fs-extra';
import { getPath } from '../utils/path';
import { env, getPackageJson } from '../utils/env';

export const specialFn = async () => {
    const { isVue3 } = env;
    if (!isVue3) return;
    let pkgJson = await getPackageJson();
    // 如果是vue3 的话 需要把package中的 type="module"去掉
    if (pkgJson.type) {
        delete pkgJson.type;
    }
    fs.writeJsonSync(getPath('package.json'), pkgJson, { spaces: 2 });
}
