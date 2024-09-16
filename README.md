<div align="center">
	<h1>bilibili.cum</h1>
	<img src="./public/icon/128.png" width="150" align="center" />
	<br/> <br/>
	<strong>你所热爱的，就是你的生活</strong>
</div>

## 介绍

基于WXT框架的网页端bilibili功能增强插件，适用于大多数浏览器（有待测试）

## 关于项目

### 1.老项目

原版的 bilibili.cum 插件由于是原生开发，且项目结构混乱，代码冗余已经停止更新，此项目基于原版功能重构以及继续更新。

老项目地址：https://gitee.com/SS_ymbol/bilibili_cum

### 2.关于框架

WXT仓库地址：https://github.com/wxt-dev/wxt

WXT文档地址：https://wxt.dev/

### 3.关于bilibili接口

bilibili-API-collect：https://github.com/SocialSisterYi/bilibili-API-collect

### 4.初始化项目

确保已经安装了 Node.js 和 pnpm 并保证其版本支持项目所依赖环境的最低版本

在项目根目录下执行以下命令：

```bash
pnpm install
```

通过以下命令启动项目：

```bash
pnpm dev
```
其余构建命令查看 package.json 或 WXT文档

### 5.项目结构

```
├── .vscode (vscode配置文件目录)
├── assets (资源目录，构建过程中将被 vite 处理)
|   ├─ config (插件脚本配置项目录)
|   └─ i18n (国际化目录<目前没用>)
├── commponents (vue组件目录)
├── entrypoints (插件核心代码目录)
|   ├─ popup (插件弹窗组件目录)
|   ├─ <function_name>.content (功能脚本目录)
|   └─ background.ts (后台脚本)
├── public (插件资源目录，会被原样复制到输出目录)
├── router (vue路由目录)
├── .gitignore
├── LICENSE
├── README.md
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json (项目ts配置文件)
└── wxt.config.js (wxt配置文件)
```

## 关于插件
🚧 Building...
