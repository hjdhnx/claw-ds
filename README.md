# claw-ds

基于 OpenClaw (龙虾) 的 ds 源自动生成 Skill。
核心理念：**不写源，只喂它 skill**。用户只需要告诉它：“请根据这个网址 xxx.com 给我最终的 ds 源文件”，AI 就会自动分析网页并生成规范的源文件。

## 项目简介

本项目旨在为 OpenClaw 提供一个标准化的技能（Skill），赋予 AI 自动爬取、分析目标网站结构，并输出标准 `ds源` 格式配置文件的能力。通过集成该技能，你可以极大地提升制作各类数据源（小说、影视、漫画等）的效率。

## 目录结构 / 标准 Skill 模板

本项目提供了一个标准的 OpenClaw Skill 结构，你可以直接将其作为模板：

```text
claw-ds/
├── SKILL.md                  # OpenClaw 技能核心定义文件（必须）
├── README.md                 # 项目说明文档
└── template/
    └── ds_template.js        # ds 源的真实 drpy-node 规则结构模板（供 AI 参考）
```

## 如何安装和使用

1. **安装 Skill**:
   将本项目的目录复制或链接到你的 OpenClaw 的 skills 目录下：
   - 全局技能目录：`~/.openclaw/skills/claw-ds`
   - 或工作区技能目录：`<workspace>/skills/claw-ds`

2. **配置模板**:
   根据你实际需要的 `ds源` 格式，修改 `template/ds_template.js` 中的字段和结构。这样 AI 在生成时就会严格遵守你定义的格式。该模板采用了真实的 drpy-node 语法规则。


3. **使用对话触发**:
   在 OpenClaw 客户端中直接发送指令：
   > "请根据这个网址 https://example.com 给我最终的 ds 源文件"

   AI 会自动触发 `claw-ds-generator` 技能，执行网页分析并生成最终代码。

## Skill 开发与调试指南

- **修改 `SKILL.md`**: 调整 AI 的行为逻辑、工作流和工具调用策略（如优先使用 `browser` 工具绕过反爬）。
- **增加 Reference**: 可以在目录下新建 `references/` 文件夹，放入更多关于你所用 ds 源格式的文档，帮助 AI 更精准地生成代码。
