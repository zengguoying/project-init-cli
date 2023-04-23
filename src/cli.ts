import cac from "cac";
import { start } from "./start";
import { answerType } from './interface';
import { name } from '../package.json';
import { getPackageJson, setEnv } from './utils/env';

const cli = cac(name);

export default async (answers: answerType) => {
    const pkgJson = await getPackageJson();
    const { version } = pkgJson;

    cli
        .command('[root]')
        .alias('alias')
        .action(async (_root, options) => {
            let base: string = options.base;
            if (!base) {
                // 项目的最终路径
                base = process.cwd();
            }
            setEnv('base', base);
            await start(base, answers);
        });
    cli.help();
    cli.version(version);
    cli.parse();
};