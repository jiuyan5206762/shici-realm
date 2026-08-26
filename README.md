# 诗境 · 中国古诗词智能阅读与检索平台

<div align="center">

![诗境 Logo](/public/favicon.svg)

### 数字化中国古典诗词现代阅读与智能检索平台

传承华夏千本文脉 · 致敬不朽先贤风骨 · 融汇现代极简设计与东方宣纸美学

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Cloudflare](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?style=flat&logo=cloudflare)](https://pages.cloudflare.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📖 项目简介

**诗境（Shici Realm）** 是一个现代化、高质量、东方美学与极简现代设计深度融合的中国古典诗词 Web 平台。

本项目不仅仅是一个静态诗词浏览网页，而是一套集 **古诗词数据库检索 + 诗人百科 + 多维组合筛选 + 沉浸式禅意阅读器 + 本地珍藏与足迹 + AI 深度鉴赏与问答 + 古风书法卡片分享** 于一体的现代化 Web 应用。

全站基于 **诗泉官方古籍数据源 API** 开发，收录历朝历代 **371,300+** 首古典诗词典籍、**13,500+** 位先贤诗人、**11** 大朝代纪元以及 **17** 种经典诗词体裁，全面适配桌面端、平板与移动端。

---

## ✨ 核心功能特性

### 1. 🔍 智能全文检索与精准搜索
- 支持按 **诗名**、**诗句名篇**、**诗人姓名** 与 **意象关键词**（如“明月”、“春风”、“李白”、“静夜思”）进行全文检索。
- 自动适配古籍索引规范，针对短词提供智能搜索建议。
- 历史搜索词持久保存、热门推荐词快速一键点击。

### 2. 🎛️ 多维组合高级筛选
- **三维联合筛选**：朝代（先秦至清代等 11 大纪元） + 体裁（绝句、律诗、宋词、元曲、乐府等 17 种） + 诗人（名家速选与自定义检索）。
- **URL 状态双向同步**：如 `/poems?dynasty=唐&type=七言绝句&author=李白&page=2`，支持浏览器前进后退、刷新保持与直接分享。
- 桌面端粘性侧边筛选栏，移动端平滑自适应 Bottom Sheet 底部抽屉。

### 3. 📜 沉浸式古典深度阅读器
- **东方排版美学**：正文采用思源宋体（Noto Serif SC）与华文楷体，字号（小/中/大/特大/巨幕）、行间距（紧凑/舒展/空灵）与对齐方式（居中/居左）自由调节。
- **禅意纯享模式（Zen Mode）**：一键隐藏所有干扰元素，支持快捷键 `ESC` 随时进出。
- **Web Speech API 智能朗诵**：以从容悠远的古典韵律智能诵读全诗。
- **严谨古籍声明**：如实保留古籍原本风貌（如“床前看月光”），并附带版本差异学术说明。

### 4. 🤖 AI 诗词深度研析与互动问答
- **白话译文**：逐联连贯通俗晓畅的优美现代汉译。
- **创作背景**：详析诗篇创制年代、诗人时下境遇与历史渊源。
- **艺术赏析**：剖析情感基调、意象营构与章法布局。
- **名句点睛**：逐句点拨核心诗眼与千古妙笔。
- **AI 诗词问答**：支持与 AI 助手实时探讨关于这首诗的各类文学与历史问题。
- **云端保护与无 Key 兼容**：Cloudflare Edge 函数安全调用，本地与无 Key 状态下自动启动内置智能鉴赏库。

### 5. 🎨 雅致古风书法卡片生成与分享
- 内置 HTML5 Canvas 绘图引擎，一键渲染出具有宣纸质感、朱砂篆刻印章、双线回纹边框的书法书签长图。
- 支持一键导出高清 PNG 图片、调用系统原生 Web Share API 与复制诗篇链接。

### 6. 📚 诗人字典与作品全集
- 13,000+ 位诗人分类索引与朝代检索。
- 诗人专属主页：生平简介、代表名作雅鉴、随心抽选该诗人作品、作品存目分页浏览。

### 7. 🏷️ 本地化珍藏与阅读足迹
- **零登录负担**：基于浏览器 `localStorage` 安全持久化存储。
- **我的珍藏**：支持按朝代/体裁筛选、搜索收藏、批量删除，并提供 **JSON 备份导出与导入恢复**。
- **阅读足迹**：按时间自动归类（今天、昨天、最近七天、更早），支持单个删除与一键清空。

### 8. 🌗 四重雅致主题配色
- **宣纸暖白** (`#F8F5EF`)：温润米白，宛如展卷宣纸。
- **复古竹简** (`#F3EBDD`)：古朴茶褐，清幽护眼。
- **玄青夜读** (`#121212`)：深邃夜黑，长夜研读不刺眼。
- **跟随系统**：自动响应操作系统明暗偏好。

---

## 🛠️ 技术栈选型

| 模块 | 技术选型 | 说明 |
| :--- | :--- | :--- |
| **前端框架** | React 18 + TypeScript (Strict Mode) | 高性能组件化架构，严格类型安全 |
| **构建工具** | Vite 6 | 秒级热更新，极速生产打包 |
| **样式系统** | Tailwind CSS 3.4 | 东方宣纸与玄青调色盘，响应式断点设计 |
| **路由管理** | React Router DOM v6 | 声明式路由与 URL SearchParams 双向绑定 |
| **状态管理** | Zustand 5 (Persist) | 轻量响应式状态，自动持久化 localStorage |
| **数据请求** | TanStack Query v5 (React Query) | 智能缓存、请求去重、失败重试与防抖 |
| **图标库** | Lucide React | 现代高质感轻量图标 |
| **边缘部署** | Cloudflare Pages + Pages Functions | 边缘 CDN 缓存、API 反向代理与 AI 密钥隔离 |

---

## 📂 项目目录结构

```
shici-realm/
├── functions/                         # Cloudflare Pages Functions 边缘服务端
│   ├── types.d.ts                     # Cloudflare Worker / Pages 类型声明
│   └── api/
│       ├── [[route]].ts               # 诗泉 API 边缘代理与 CORS 缓存网关
│       └── ai/
│           ├── explain.ts             # AI 诗词深度解析接口 (服务端读取密钥)
│           └── chat.ts                # AI 诗词实时问答接口
├── public/
│   ├── favicon.svg                    # 朱砂印章 SVG 图标
│   └── manifest.json                  # PWA Web App 清单文件
├── src/
│   ├── api/                           # 统一 API 请求封装层
│   │   ├── client.ts                  # Fetch 客户端 (超时控制/重试/内存缓存)
│   │   ├── poems.ts                   # 诗词列表、单篇详情、随机漫游
│   │   ├── authors.ts                 # 诗人列表与检索
│   │   ├── dynasties.ts               # 11 大朝代接口
│   │   ├── types.ts                   # 17 种体裁接口
│   │   ├── stats.ts                   # 平台实时数据统计
│   │   ├── search.ts                  # 全文搜索接口
│   │   └── ai.ts                      # AI 鉴赏与聊天请求客户端
│   ├── components/                    # 模块化 UI 组件库
│   │   ├── Common/
│   │   │   ├── Navbar.tsx             # 顶部导航栏 (快捷键提示/主题切换)
│   │   │   ├── Footer.tsx             # 东方古典页脚与数据源声明
│   │   │   ├── MobileTabBar.tsx       # 移动端底部导航栏
│   │   │   ├── ThemeToggle.tsx        # 4 色主题切换菜单
│   │   │   ├── Pagination.tsx         # 智能折叠高级分页组件
│   │   │   ├── LoadingSkeleton.tsx    # 诗词与诗人骨架屏
│   │   │   ├── EmptyState.tsx         # 空状态优雅插画
│   │   │   └── ErrorState.tsx         # 错误重试状态
│   │   ├── Poem/
│   │   │   ├── PoemCard.tsx           # 雅致古风诗词卡片 (收藏/朗读/分享)
│   │   │   ├── PoemList.tsx           # 响应式诗词网格列表
│   │   │   ├── PoemReader.tsx         # 诗词详情深度阅读画布
│   │   │   ├── ZenReadingMode.tsx     # 禅意全屏沉浸阅读模式
│   │   │   ├── PoemShareModal.tsx     # Canvas 书法卡片生成与分享弹窗
│   │   │   └── AiAnalysisDrawer.tsx   # AI 深度解析与问答抽屉
│   │   ├── Author/
│   │   │   └── AuthorCard.tsx         # 诗人名家卡片
│   │   ├── Filter/
│   │   │   ├── FilterPanel.tsx        # 多维组合筛选面板 (朝代/体裁/诗人)
│   │   │   └── MobileFilterDrawer.tsx # 移动端底部筛选抽屉
│   │   └── Search/
│   │       └── SearchBar.tsx          # 智能搜索框 (历史记录/热门推荐)
│   ├── hooks/                         # 自定义 React Hooks
│   │   ├── useKeyboardShortcuts.ts    # 全局快捷键 (/ 搜索, ESC 退出, R 随机)
│   │   ├── usePoemSpeech.ts           # Web Speech API 诗词朗诵
│   │   └── useSharePoem.ts            # 分享与复制管理
│   ├── pages/                         # 路由页面
│   │   ├── Home/HomePage.tsx          # 首页 (今日雅荐/随机漫游/朝代名家/统计)
│   │   ├── Poems/PoemsPage.tsx        # 古诗总库 (多维筛选/20篇分页/URL同步)
│   │   ├── PoemDetail/PoemDetailPage.tsx # 诗词详情 (排版/AI赏析/相关推荐)
│   │   ├── Authors/AuthorsPage.tsx    # 诗人百科 (朝代筛选/姓名检索/分页)
│   │   ├── AuthorDetail/AuthorDetailPage.tsx # 诗人专页 (生平/代表作/全集存目)
│   │   ├── Dynasties/DynastiesPage.tsx# 朝代纪元历史沿革
│   │   ├── Types/TypesPage.tsx        # 体裁格律词牌分类
│   │   ├── Search/SearchPage.tsx      # 全文检索中心
│   │   ├── Favorites/FavoritesPage.tsx# 我的珍藏 (检索/筛选/JSON导入导出)
│   │   ├── History/HistoryPage.tsx    # 浏览足迹 (日期分组/清理)
│   │   └── Settings/SettingsPage.tsx  # 阅读与排版偏好设置
│   ├── store/                         # Zustand 持久化状态
│   │   ├── favoriteStore.ts           # 诗词珍藏持久化
│   │   ├── historyStore.ts            # 浏览足迹持久化 (上限100条)
│   │   ├── settingsStore.ts           # 阅读排版偏好持久化
│   │   ├── searchHistoryStore.ts      # 搜索历史词持久化
│   │   └── themeStore.ts              # 界面配色主题持久化
│   ├── types/                         # 严格 TypeScript 类型声明
│   │   └── index.ts
│   ├── utils/                         # 实用函数
│   │   ├── canvasShare.ts             # Canvas 古典书法书签卡片绘制生成器
│   │   ├── formatters.ts              # 年份区间/相对时间/朝代色彩映射
│   │   └── localAiFallback.ts         # 离线与免 Key 智能名篇鉴赏引擎
│   ├── App.tsx                        # 顶层应用路由与布局
│   ├── index.css                      # 基础样式与动画
│   ├── main.tsx                       # React 挂载入口
│   └── vite-env.d.ts
├── .env.example                       # 环境变量示例
├── .gitignore
├── index.html                         # HTML 模版与 Google 字体引入
├── package.json
├── postcss.config.js
├── tailwind.config.js                 # 东方美学色彩与字体扩展配置
├── tsconfig.json                      # Strict 模式 TypeScript 配置
├── tsconfig.node.json
├── vite.config.ts                     # Vite 插件、别名与开发代理配置
└── wrangler.toml                      # Cloudflare Pages 部署配置文件
```

---

## 🚀 本地开发与运行指南

### 1. 克隆或下载代码
```bash
cd shici-realm
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动本地开发服务
```bash
npm run dev
```
打开浏览器访问 `http://localhost:3000` 即可畅享体验！

### 4. 生产构建打包
```bash
npm run build
```
编译产物将输出至 `./dist` 目录。

### 5. 本地预览生产构建产物
```bash
npm run preview
```

---

## ☁️ Cloudflare Pages 部署教程

本项目原生支持 **Cloudflare Pages** 与 **Pages Functions**，无需自建传统服务器，零成本全球 CDN 加速。

### 方式一：通过 GitHub 关联 Cloudflare Pages 自动部署（推荐）

1. 将代码推送至您的 GitHub 仓库。
2. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)，进入 **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**。
3. 选择刚刚创建的 GitHub 仓库。
4. 构建参数配置：
   - **Framework preset**：`Vite`
   - **Build command**：`npm run build`
   - **Build output directory**：`dist`
5. （可选）配置环境变量与 AI 密钥：
   - 在 Pages 项目后台进入 **Settings** -> **Environment variables**。
   - 添加生产环境变量 `AI_API_KEY`，填入您的 Google Gemini API Key。
6. 点击 **Save and Deploy**，大约 1 分钟后即可获得全球访问的专属域名（如 `https://shici-realm.pages.dev`）！

---

### 方式二：使用 Cloudflare Wrangler CLI 本地一键部署

1. 全局或本地安装 Wrangler：
   ```bash
   npm install -g wrangler
   ```
2. 登录 Cloudflare 账号：
   ```bash
   wrangler login
   ```
3. 构建并直接发布：
   ```bash
   npm run build
   wrangler pages deploy dist --project-name=shici-realm
   ```
4. 添加 AI Secret 密钥（可选）：
   ```bash
   wrangler secret put AI_API_KEY
   ```

---

## 🔑 环境变量与安全规范

| 变量名 | 类型 | 使用位置 | 说明 |
| :--- | :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Public Env | 前端客户端 | 诗泉 API 基础地址（默认为 `https://poetry.palemoky.com`） |
| `AI_API_KEY` / `GEMINI_API_KEY` | Secret | Cloudflare Worker / Serverless | 服务端 AI 鉴赏与问答密钥（**绝不暴露在前端代码中**） |

> 💡 **免密钥开箱即用**：即使未在 Cloudflare 环境变量中配置 `AI_API_KEY`，系统也会自动启用内置的 **诗学辞章智能赏析引擎**，确保译文、背景、赏析与互动问答功能 100% 完整可用！

---

## ⌨️ 快捷键支持

| 快捷键 | 功能说明 |
| :--- | :--- |
| `/` | 快速聚焦并打开全局诗词检索 |
| `ESC` | 退出全屏禅意阅读模式 / 关闭当前弹窗 |
| `R` | 随心随机抽取并阅读下一首诗词 |

---

## 📜 数据来源与版权声明

- 本站数据源接入自 **[诗泉 API (poetry.palemoky.com)](https://poetry.palemoky.com)**，数据涵盖唐诗、宋词、元曲、诗经、楚辞等中华古籍典藏。
- 诗词正文严格尊重古籍原刻文字，不同通行版本间可能存在文字差异，请以学术考据为准。

---

## 📄 开源许可证

本项目基于 [MIT License](LICENSE) 开源。欢迎 Star 🌟 与 Fork 改进！
