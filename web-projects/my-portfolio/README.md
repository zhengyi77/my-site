# 个人项目 · 郑翼的 Portfolio

这是课程 "Project 2 · Your personal project" 的起点版本。纯静态，没有框架、没有构建步骤：
双击 `index.html` 就能看，也可以直接扔到 GitHub Pages 上。

## 文件结构

```
my-portfolio/
├── index.html      首页：hero + 速览卡 + 三个能力卡片 + 精选作品
├── about.html      关于：故事段落 + 技能标签 + 时间线
├── projects.html   项目：6 张卡片 + 分类筛选（JS 交互）
├── contact.html    联系：表单校验（JS 交互）+ 联系方式
├── style.css       全部样式，含浅色/深色两套变量、响应式断点
├── script.js       主题切换、移动端菜单、筛选、表单校验、滚动出现
├── assets/
│   ├── favicon-32.png        32×32   浏览器标签页图标
│   ├── apple-touch-icon.png  180×180 手机桌面图标（直角，系统会自己切圆角）
│   ├── og-image.png          1200×630 社交分享图（同时可当 Cover image）
│   └── cover.png             1200×630 备用封面
└── README.md
```

## 八项要求的对应关系

| 课程要求 | 在这里怎么满足 |
|---|---|
| Pages ≥ 4，导航可用 | 4 个页面，顶部导航 + 页脚导航，每页都指向同一组链接 |
| Content 自己的文字和图片 | 文案是我写的草稿；**你必须读一遍、改成你自己的话**（见下面 TODO） |
| Structure 语义化 HTML | `header/nav/main/section/article/aside/footer`、`h1` 唯一、`aria-label`、skip link |
| Layout 响应式 | 移动优先，620px / 900px 两个断点，手机上导航变成汉堡菜单 |
| Behaviour 至少一个交互 | 主题切换（记忆偏好）、项目筛选、表单校验、滚动淡入 |
| Live 可访问的地址 | 推到 GitHub 后开 Pages（下面有步骤） |
| History 逐周增长的 Git 历史 | **不要一次性提交**，按下面"提交节奏"分几次提交 |
| Identity OG 图 / favicon / app icon | `assets/` 里三个文件，并在每个 `<head>` 里引用了 |

## 先跑起来

直接双击 `index.html` 即可。或者在文件夹里开一个本地服务器：

```bash
python -m http.server 8000
# 然后打开 http://localhost:8000
```

## 必须自己改的地方（TODO）

搜索文件里的 `TODO` 就能找到。至少改这几处：

1. **contact.html** — 邮箱和 GitHub 链接现在是 `your.name@example.com` / `github.com/your-name`。
2. **projects.html** — 每个项目的 `Repository →` 现在是 `#`，换成真实仓库地址（没有的先把卡片删掉，
   别留假链接；课程要求里"nothing is a placeholder"）。
3. **projects.html** — 后两张卡片是"实验草稿"，如果你没做，也删掉。
4. **about.html** — 时间线里的事件年份、Group 2 等信息按实际情况改。
5. **全站文案** — 读一遍，用你自己的语气改写。课程明确要求 "AI text is edited — and owned — by you"。

## 推到 GitHub 并上线

```bash
# 1. 在 my-portfolio 里初始化（注意：是在项目文件夹里，不是外面那层）
cd web-projects/my-portfolio
git init
git add .
git commit -m "Start the portfolio: four pages, stylesheet, script"

# 2. 在 GitHub 上新建空仓库 my-portfolio（不要加 README），然后：
git branch -M main
git remote add origin https://github.com/<你的用户名>/my-portfolio.git
git push -u origin main

# 3. 上线：仓库 Settings → Pages → Deploy from a branch → main → / (root) → Save
#    一两分钟后地址是：https://<你的用户名>.github.io/my-portfolio/
```

**提交节奏**（History 那一项就是看这个的）：

```bash
# 每完成一块就提交一次，别攒到最后
git add index.html style.css && git commit -m "Add the home page and base styles"
git add about.html            && git commit -m "Add the about page"
git add projects.html script.js && git commit -m "Add projects page with filters"
git add contact.html          && git commit -m "Add contact page with form validation"
git add assets README.md      && git commit -m "Add icons, social image and readme"
```

## 交作业要的 5 张图

| 图 | 尺寸 | 怎么来 |
|---|---|---|
| Cover image | 1200×630，<100 KB | 直接用 `assets/cover.png`（或 og-image.png），也可以自己重做 |
| Desktop screenshot | 1920×1080 | 打开首页 → F12 → `Ctrl+Shift+P` → 输入 `Capture screenshot` |
| Mobile screenshot | 375×812 | F12 → `Ctrl+Shift+M`(设备模式) → 宽度设 375 → 同样 `Capture screenshot` |
| App icon | 180×180 PNG | `assets/apple-touch-icon.png` |
| Favicon | 32×32 PNG | `assets/favicon-32.png` |

DevTools 截出来的图没有浏览器边框、没有桌面背景，这是要求里明确说的那种。

## 交到 webtech.landrock.io 的表单里

Dashboard → `Untitled personal project` → Edit，填：

- **Title**：3–4 个词，例如 `Yi's Portfolio` / `Small Things Web`
- **Short description**：一句 10–20 词
- **Long description**：3–5 段（是什么、给谁看、怎么做的）
- **GitHub repository**：这个项目的仓库地址
- **Live site**：`https://<用户名>.github.io/my-portfolio/`（必填）
- **Status**：全部做完后改成 `Completed`

别忘了 **Learning HTML** 那条也要单独填、单独交 5 张图。
