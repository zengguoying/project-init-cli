import fs from 'fs-extra';
import { getPath } from '../src/utils/path';
import { getPackageJson } from '../src/utils/env';

const buildInit = async () => {
    const pkgJson = await getPackageJson();
    pkgJson['bin'] = {
        'project-init-cli': 'index.js',
    };
    // 去掉husky
    delete pkgJson.scripts.prepare;
    pkgJson['main'] = 'index.js';
    fs.outputFileSync(getPath('./dist/package.json'), JSON.stringify(pkgJson));
    fs.copyFileSync(getPath('./README.md'), './dist/README.md');
};

buildInit();
