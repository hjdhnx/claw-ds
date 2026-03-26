---
name: "claw-ds-generator"
description: "根据用户提供的目标网址（如小说、影视、漫画网站），自动分析网页结构或 API，生成对应的 drpy-node spider 规则 (ds源/var rule={})。当用户要求写源或制作规则时调用。"
---

# OpenClaw DS 源生成技能 (claw-ds-generator)

## 技能说明
本技能用于自动为给定的目标网站生成 `ds源`（即符合 **drpy-node** 标准的爬虫规则 `var rule = {}` JS 文件）。
作为 AI，你不需要手动编写每一个选择器，而是利用浏览、搜索和代码生成能力，分析目标网站的 DOM 结构和网络请求，然后按照特定的 drpy 语法格式输出代码。

## 触发条件
当用户输入类似于以下指令时触发：
- "请根据这个网址 xxx.com 给我最终的 ds 源文件"
- "帮我写一个 xxx 的源"
- "制作 xxx 网站的 ds 规则"

## 工作流程
1. **接收网址**: 获取用户提供的目标网址 (例如: `https://xxx.com`)，并判断源类型（影视、漫画、小说）。
2. **分析网站**:
   - 使用 `web_fetch` 或 `browser` 等工具访问该网址。
   - 如果是传统服务端渲染网站：分析 HTML 结构，提取列表页、详情页、搜索页的关键 CSS 选择器。
   - 如果是前后端分离或有反爬网站：利用 `browser` 检查 Network 面板，找出可用的 API 接口（优先使用 API，返回 JSON 更好解析）。
3. **映射与构建规则**:
   - 依据 drpy-node 的专属解析语法，构建 `var rule = {...}` 对象。
   - 请参考工作区中的 `template/ds_template.js`，严格确保 `类型`, `host`, `url`, `searchUrl` 等必填字段的存在。
4. **生成源文件**:
   - 如果使用 DOM 解析，规则格式需符合 `"列表选择器;标题;图片;描述;链接"` 语法。
   - 如果使用 API 或动态请求，可以使用 `async function() { ... }` 处理。
5. **输出结果**:
   - 将生成的完整 JS 源配置代码以代码块的形式返回给用户。

## drpy-node 规则语法指南 (非常重要)
为了确保源能在系统中成功运行，AI 生成的规则必须遵循以下特定语法：

- **基础格式**: `列表选择器;标题;图片;描述;链接`
- **选择器进阶语法**: 
  - `&&` 表示嵌套 (例如 `.title&&a`)
  - `||` 表示备用 (例如 `img&&data-src||img&&src`)
  - `:eq(n)` 取索引，`*` 代表全部。
  - **特殊属性后缀**: `Text` (提取文本), `Html` (提取内部HTML), `href`, `src`, `style`, `data-*` 等。
  
- **全局函数 (在 async function 模式中可用)**:
  - `request(url, options)` - 发起 HTTP GET 请求。
  - `post(url, options)` - 发起 HTTP POST 请求，例如 `await post(url, {body: params})`。
  - `pdfa(html, rule)` - 解析列表，返回节点数组。例如 `pdfa(html, '.list&&item')`。
  - `pdfh(html, rule)` - 解析单节点属性，返回字符串。例如 `pdfh(item, 'a&&Text')`。
  - `pd(html, rule)` - 解析并返回绝对链接。
  
- **动态解析示例 (如果不用字符串简写，使用 async 函数)**:
  ```javascript
  一级: async function (tid, pg, filter, extend) {
      let [url, params] = this.input.split('?');
      let html = await post(url, {body: params});
      let items = html.parseX.itemsList; // 假设返回 JSON
      let d = items.map(item => ({
          title: item.title,
          desc: item.subTitle,
          url: item.id,
          img: item.imageURL
      }));
      return setResult(d);
  }
  ```

## 执行守则 (Guardrails)
- **通用性优先**: 提取的选择器必须具有通用性和稳定性，避免使用如 `class="abc-123 xyz"` 这样混淆或随机的 class。
- **验证必填项**: `rule` 对象中 `title`、`host`、`url` 为必填。
- **输出格式**: 最终输出**必须是 JavaScript 代码**（`var rule = { ... }`），而不是普通的 JSON 数据！
