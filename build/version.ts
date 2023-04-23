import fs from 'fs-extra';
import { getPath } from '../src/utils/path';
import { debugInfo } from '../src/utils/debug';
import { getPackageJson } from '../src/utils/env';

const versionInit = async () => {
    // 默认为 patch 版本更新
    const pkgJson = await getPackageJson();
    let version = pkgJson.version.split('.');
    version[2] = Number(version[2]) + 1;
    
    pkgJson['version'] = version.join('.');
    fs.outputFileSync(getPath('./package.json'), JSON.stringify(pkgJson, null, 2));

    debugInfo(`当前版本升级为：${pkgJson['version']}`);
};

versionInit();
