# 项目 1 · Learning Website

课程 "Project 1 · The learning website" 的完整代码。纯静态：HTML + CSS + 原生 JavaScript，
没有构建步骤，没有依赖。

## 在 VS Code 里跑起来（重要）

**不能双击 index.html 打开。** 导航是用 `fetch('nav.html')` 加载的，浏览器在 `file://`
协议下会拒绝这个请求，页面顶部会显示一条红字提示。

用 VS Code 的 Live Server：

1. VS Code 打开 `my-site` 这个文件夹（`File → Open Folder`）
2. 左侧扩展面板搜索并安装 **Live Server**（Ritwick Dey）
3. 右键 `index.html` → **Open with Live Server**
4. 浏览器会打开 `http://127.0.0.1:5500/index.html`

没有 Live Server 的话，也可以在终端里：

```bash
python -m http.server 8000
# 打开 http://localhost:8000
```

## 文件说明

```
my-site/
├── index.html      首页：hero 图 + 全站概览（要求 1）
├── quotes.html     名言页：随机一句 + 全部 18 条（要求 2、5）
├── project.html    项目想法页：6 个想法，带图和状态（要求 4）
├── machine.html    无用机器 + 小游戏（要求 6、7）
├── nav.html        导航的 HTML，只写这一份（要求 3）
├── nav.js          把 nav.html 注入每个页面，并高亮当前页（要求 3）
├── quotes.js       18 条名言的数据和渲染（要求 2、5）
├── machine.js      开关 + 机械臂动画 + 倒计时游戏（要求 6、7）
├── style.css       全站样式，移动优先（要求 8）
├── README.md
└── images/
    ├── hero.jpg            1600×900
    ├── project-1..6.jpg    800×500，六张
    └── favicon-32.png      32×32
```

## 14 项要求对照表

| # | 要求 | 在哪 |
|---|------|------|
| 1 | 首页有 hero 图和全站概览 | `index.html` 的 `.hero` + "What is on this site" |
| 2 | 名言页至少 15 条 | `quotes.js` 里 18 条 |
| 3 | DRY 导航，JS 注入 | `nav.html` + `nav.js` |
| 4 | 项目页至少 5 个想法 | `project.html` 里 6 个 |
| 5 | 名言页有样式，hero 显示随机名言 | `quotes.js` 的 `showFeature()` |
| 6 | 无用机器页 | `machine.html` 第一个 section |
| 7 | 机器页有可交互的游戏 | `machine.html` 第二个 section + `machine.js` 第二部分 |
| 8 | 全站样式完成、移动端可用 | `style.css`，断点 620 / 900 / 699 |
| 9 | VS Code 里装了 AI 编程助手 | 这是你的环境，不是代码 |
| 10 | Git 已安装 | `git --version` 有输出即可 |
| 11 | 在 `my-site` 里 `git init` | 见下面命令 |
| 12 | GitHub 账号 | — |
| 13 | 远程仓库已连、代码已推送 | 见下面命令 |
| 14 | 站点在线，任何人可打开 | GitHub Pages |

## 推到 GitHub 并上线

```bash
# 在当前文件夹（my-site）里初始化，注意不要在外层 web-projects 里 init
git init
git add .
git commit -m "Add the learning website: four pages, shared nav, machine and game"

# 在 GitHub 上新建空仓库 my-site，然后
git branch -M main
git remote add origin https://github.com/<你的用户名>/my-site.git
git push -u origin main
```

仓库 → **Settings → Pages → Deploy from a branch → main → / (root) → Save**。
地址是 `https://<你的用户名>.github.io/my-site/`。

⚠️ `fetch('nav.html')` 在 GitHub Pages 上是正常的（有服务器），在本地双击打开才不行。

## 交作业：5 张图

| 图 | 尺寸 | 来源 |
|---|---|---|
| Cover image | 1200×630 | 自己用 Figma/Canva/PowerPoint 做一张 1200×630，写上站点名字 |
| Desktop screenshot | 1920×1080 | 打开首页 → F12 → `Ctrl+Shift+P` → `Capture screenshot` |
| Mobile screenshot | 375×812 | F12 → `Ctrl+Shift+M` → 宽度 375 → 同样 `Capture screenshot` |
| App icon | 180×180 | `images/favicon-32.png` 放大，或重做一个 180×180 的 |
| Favicon | 32×32 | `images/favicon-32.png` |

## 想改的时候

- **加一个新页面**：新建 `about.html`，复制任意页面的 `<head>` 和 `#nav-slot`，
  然后只在 `nav.html` 里加一行链接。四页变五页，只改一个文件。
- **加一条名言**：在 `quotes.js` 的数组末尾加 `{ text: '...', author: '...' }`。
  "All the quotes" 和 "See all 18" 这两处文字要顺手改成 19。
- **改配色**：`style.css` 顶部 `:root` 里的 `--accent`、`--teal`、`--bg` 改掉，
  全站跟着变。
- **调游戏难度**：`machine.js` 里的 `GAME_SECONDS = 20`。

## 答辩时可能被问到的三个问题

1. **为什么导航要单独放一个文件？**
   四页各写一遍的话，改一个链接就要改四个文件，改漏了就有死链。现在改 `nav.html` 一处。

2. **机械臂为什么用 CSS 过渡 + `setTimeout`，而不是自己写 `requestAnimationFrame`？**
   位移本质是一条 CSS `transition`（`transform`），浏览器负责插值，比手算流畅也更省代码。
   JS 只负责三个时间点：加 `is-pressing`、把开关关掉、把 `is-pressing` 去掉。状态清楚，
   出问题也容易定位。

3. **不用 JavaScript 会怎样？**
   导航、名言列表、游戏都不工作，但静态文字和样式还在。这是有意为之：内容不该
   依赖脚本才能读到。
