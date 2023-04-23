import chalk from "chalk";
const log = console.log;
let debugSwitch = true;

/**
 * debug开关，默认开启
 * @param debug boolean
 */
const switchDebug = (debug: boolean) => {
    debugSwitch = debug
}

/**
 * debug 错误信息
 * @param msg 信息
 */
const debugError = (msg: string) => {
    debugSwitch &&
    log(chalk.hex('#646cff')(`[project-init-cli]:`) + chalk.red(msg));
    // 遇到错误，退出程序
    process.exit(0);
}

/**
 * debug 信息
 * @param msg 信息
 */
const debugInfo = (msg: string) => {
    debugSwitch &&
    log(chalk.hex('#646cff')(`[project-init-cli]:`) + chalk.green(msg));
}

/**
 * debug 强调
 * @param msg 信息
 */
const debugProcess = (msg: string) => {
    debugSwitch &&
    log(chalk.hex('#646cff')(`[project-init-cli]:`) + chalk.yellow(msg));
}

/**
 * debug 警告信息
 * @param msg 信息
 */
const debugWarning = (msg: string) => {
    log(chalk.hex('#646cff')(`[project-init-cli]:`) + chalk.yellow(msg));
}

/**
 * debug 文本信息
 * @param msg 信息
 */
const debugTxt = (msg: string) => {
    log(chalk.hex('#646cff')(`[project-init-cli]:`) + chalk.hex('#5c6d82')(msg));
}

export {
    switchDebug,
    debugError,
    debugInfo,
    debugProcess,
    debugWarning,
    debugTxt
};
