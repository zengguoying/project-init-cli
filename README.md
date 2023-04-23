# project-init-cli
<br />
<h1 align="center">project-init-cli</h1>
<p align="center">
<a href="https://github.com/zengguoying/project-init-cli/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/zengguoying/project-init-cli"></a>
<a href="https://github.com/zengguoying/project-init-cli/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/zengguoying/project-init-cli"></a>
</p>

## 目标

实现一个项目初始化 CLI，为后续项目提供统一初始化脚手架

## 实现功能

- 保存代码自动格式化
- 提交前 commit 校验
- eslint + prettier 校验
- husky 自动装载

## 使用方式

局部安装

```BASH
# 1. 项目中执行
npm i project-init-cli -D

# 2. 在package.json中添加script
"scripts": {
  "project-init-cli": "project-init-cli",
},

# 3. 执行npm run project-init-cli, 即会自动添加依赖
```
