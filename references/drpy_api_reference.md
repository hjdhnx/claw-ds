# drpy-node 辅助函数与进阶语法参考

在为目标网站生成 ds 源规则时，如果遇到复杂的加密、需要自定义发包或者特殊解析的场景，可以使用以下 drpy-node 内置的全局辅助函数与特性。

## 1. HTTP 请求封装

在 `async function` (例如 `lazy`, `一级`, `二级` 等方法) 中，可以使用内置的 HTTP 客户端进行发包：

```javascript
// 发送 GET 请求
let html = await request(url);
// 发送带 Header 的 GET 请求
let html = await request(url, { headers: { 'User-Agent': 'MOBILE_UA' } });

// 发送 POST 请求
let res = await post(url, { body: 'a=1&b=2' });
let resJson = await post(url, { body: { a: 1, b: 2 }, headers: { 'Content-Type': 'application/json' }});
```

## 2. HTML 节点解析 (DOM/XPATH 类)

这些方法专门用于从 HTML 字符串中快速解析出目标内容，格式支持类似于 `CSS选择器;属性名` 的简化语法：

- `pdfa(html, rule)`：**解析列表**。返回一个包含多个 HTML 片段（字符串）的数组。
  - 例如：`let items = pdfa(html, '.list&&.item');`
- `pdfh(html, rule)`：**解析单节点属性**。返回提取到的文本或属性值字符串。
  - 例如：`let title = pdfh(item_html, 'h1&&Text');`
  - 例如：`let cover = pdfh(item_html, 'img&&data-src');`
- `pd(html, rule)`：**解析并补全绝对链接**。
  - 例如：`let fullUrl = pd(item_html, 'a&&href');`

## 3. 本地缓存与持久化

如果在爬取过程中需要保存一些 Token、Cookie 或中间状态，可以使用缓存接口：

- `setItem(key, value)`：存储数据。
- `getItem(key)`：读取数据。
- `clearItem(key)`：清除数据。

```javascript
// 示例：在免嗅或预处理中保存 Cookie
setItem('my_cookie', 'session_id=12345');
// 后续请求时读取
let cookie = getItem('my_cookie');
```

## 4. URL 拼接工具

- `urljoin(baseUrl, relativePath)`：将相对路径安全地拼接为绝对路径。

## 5. 常用的预定义常量

- `MOBILE_UA`：标准的移动端 User-Agent，推荐在手机端适配较好的网站使用。
- `UC_UA`：UC 浏览器的 User-Agent。
- `PC_UA`：标准电脑端 User-Agent。

## 6. md5 与加解密支持

针对某些需要签名或基础加密的网站，内置支持部分加密函数：

```javascript
// 示例：MD5 签名
let sign = md5(`-${id}-TcbmGhl247Bc-Rd-android`);
```

*(请注意：此文件供 AI 自动生成 ds 源时作为背景知识参考，以处理复杂站点的解析逻辑。)*
