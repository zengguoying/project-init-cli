import fs from 'fs-extra';
import { getPath } from '../utils/path';
import { pathExists } from '../utils/check';
import { getPackageJson } from '../utils/env';
import { writeInPkg, run } from '../utils/tool';
import { debugInfo, debugWarning } from '../utils/debug';

// 需要安装的依赖
const devDependencies = ['husky@^8.0.1', 'lint-staged@^12.4.1'];

export const huskyInit = async () => {
    // 检查是否有git，如果没有，需要先初始化git
    if (!(await pathExists('.git', false))) {
        debugWarning(`请先初始化git`);
        debugInfo('参考命令 git init');
        process.exit();
    }
    // 安装依赖
    await writeInPkg(devDependencies);
    // 更改package
    let pkgJson = await getPackageJson();
    pkgJson.script['prepare'] = 'husky install';
    pkgJson.script['pre-commit'] = 'lint-staged';
    pkgJson.script['postinstallmac'] = 'git config core.hooksPath .husky && chmod 700 .husky/*';
    pkgJson.script['eslint'] = 'eslint --cache --max-warning 0 "{src,mock}/**/*.{vue,ts.js.tsx}" --fix';
    pkgJson['lint-staged'] = {
        '*.{js,ts,vue,jsx,tsx}': ['npm run eslint'],
        '*.{js,ts,jsx,tsx,md,html,css,less,scss,sass}': 'prettier --write'
    };
    fs.writeJsonSync(getPath('package.json'), pkgJson, { spaces: 2 });

    await run ('npm run prepare');
    await run('npx husky add .husky/pre-commit "npm-run-pre-commit"');
};

