# @akong/intro-astro

阿空 intro 共享 Astro template · React island · 营销静态站。**替代 Python render 版** [`akong-intro-design`](../akong-intro-design)。

## 为啥 Astro

老板 5-6 拍 · 营销静态站业界最佳:
- **0 JS 默认** - 比 Next.js SSG 还轻 (Next 即使 export 也带 React runtime ~80kb · Astro 只在 `client:load` 的组件那点)
- **跟 OSS 完美** - 输出纯静态 HTML/CSS/JS · 一键 cp 到 oss bucket
- **能用 React 组件** - 通过 `@astrojs/react` 集成 · 复用 [`@akong/ui-react`](../akong-ui-react) 组件
- **内容驱动** - intro 是营销页 · Astro 就是为这个生的

## 架构

```
akong-intro-astro/                    # 共享 template (本仓)
├── src/
│   ├── pages/index.astro            # 通用 intro 页 (props from config)
│   ├── components/AudioPlayer.tsx   # React island (唯一需要 hydration)
│   └── styles/shadcn.css            # CSS variables (跟 @akong/ui-react 同套)
├── public/                          # build 时各 intro 仓注入:
│   ├── intro.config.json            # 业务文案 + URL + accent
│   ├── intro-zh.mp3                 # TTS 音频
│   ├── avatar.svg                   # DiceBear 头像
│   └── transcript.md                # 文字稿
└── astro.config.mjs

各 intro 仓 (e.g. mail-dayou-intro):
├── intro.config.json                # own 业务文案
├── intro/text/intro-zh.md           # own 文字稿
├── intro/audio/intro-zh.mp3         # own 音频
└── scripts/build.sh                 # 跑 astro build → cp 回本仓 dist/
```

## 用 (各 intro 仓 build 流程)

```bash
# 1. 把本仓 config + 资源 inject 到 astro template public/
cp <intro-repo>/intro.config.json   ~/.claude/repos/akong-intro-astro/public/
cp <intro-repo>/intro/audio/intro-zh.mp3 ~/.claude/repos/akong-intro-astro/public/
cp <intro-repo>/intro/text/intro-zh.md   ~/.claude/repos/akong-intro-astro/public/transcript.md
cp ~/.claude/repos/akong-avatars/avatars/<slug>.svg ~/.claude/repos/akong-intro-astro/public/avatar.svg

# 2. astro build
cd ~/.claude/repos/akong-intro-astro && pnpm build

# 3. cp 出来 dist/ 给本仓部署
cp -r ~/.claude/repos/akong-intro-astro/dist/* <intro-repo>/dist/

# 4. <intro-repo> 各自 deploy-oss.sh 上传 dist/ 到 OSS bucket
```

(scripts/build.sh 自动化这 4 步)

## 跟 Python render (老 akong-intro-design) 对比

| | Python render (旧) | Astro (本仓) |
|---|---|---|
| template | jinja-style HTML hardcode CSS | Astro 组件 + Tailwind 4 |
| 设计 token | hardcode `#fafafa` | `hsl(var(--*))` 跟 chat 同源 |
| icon | emoji | lucide-react (React island) |
| 组件复用 | ❌ template 字符串拼接 | ✅ React 组件 (@akong/ui-react) |
| 输出 | 静态 HTML + JS (vanilla) | 静态 HTML + 0 JS (除 AudioPlayer 那点) |
| OSS 部署 | ✅ | ✅ |

## v0.1 范围

- ✅ 主 intro 页 (头像 + 名 + 音频 + 文字稿 + CTA + 二维码 + footer)
- ✅ AudioPlayer React island (play/pause)
- ✅ shadcn 极客风 (跟 chat / app 同 token)
- ❌ multi-language (v0.2 加 en)
- ❌ analytics (v0.2)

## 各 intro 仓切换路线

1. **mail-dayou-intro** (试点 · 最新最干净)
2. cs-xiaoke-intro / studio-xiaohua-intro / kb-xiaozhi-intro
3. hongniang-xiaoxi-intro / hongniang-xiaoqiao-intro
4. discovery-xiaoyan-intro / discovery-dayan-intro
5. brand-akong-intro / fitness-xiaojian-intro / ppt-xiaoxiu-intro

切完老 akong-intro-design (Python) archive。
