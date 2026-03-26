/*
* @File     : drpy-node spider template (OpenClaw AI 自动生成参考)
* @Author   : claw-ds
* @Comments : 本模板展示了真实的 ds源 (drpy-node 规则) 的结构，AI 应当参考此结构生成最终的规则代码。
*/

var rule = {
    // 网站类型，可选值: '影视', '漫画', '小说'
    类型: '影视',
    // 源标题
    title: 'Site Name',
    // 源主域名，注意以 http(s):// 开头
    host: 'https://example.com',
    // 源一级列表链接，fyclass 代表分类参数，fypage 代表页码参数
    url: '/category/fyclass/page/fypage',
    // 源搜索链接，** 代表搜索关键词
    searchUrl: '/search?wd=**&pg=fypage',
    // 允许搜索(2/1/0)、允许快搜、允许筛选
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    // 请求头，可以加入 User-Agent 或其他必要字段
    headers: {
        'User-Agent': 'MOBILE_UA', // 'MOBILE_UA' 或 'UC_UA' 是内置常量，也可写死具体的 UA
    },
    // 超时时间
    timeout: 5000,
    // 静态分类，用于首页展示的分类名及对应的参数 (对应 fyclass)
    class_name: '电影&电视剧&综艺&动漫',
    class_url: '1&2&3&4',

    // 动态获取分类和排除分类的规则 (如适用)
    // class_parse: '#menu-main-menu&&li:lt(15);a&&Text;a&&href;.*/(.*?)/',
    // cate_exclude: '',

    // 是否需要调用免嗅探/解析
    play_parse: true,
    // 免嗅/解析处理函数，常用于处理图片列表或真实视频地址
    // 可以是字符串，或者是 async function() {...}
    lazy: async function () {
        let {input, pdfa, pdfh} = this; // 当前上下文有 input(链接) 等参数
        // 示例：漫画解析图片列表
        // let html = await request(input);
        // let arr = pdfa(html, '.content&&img');
        // let urls = arr.map(it => pdfh(it, 'img&&data-src'));
        // return { parse: 0, url: 'pics://' + urls.join('&&') };
        return input;
    },
    // 首页推荐数量限制
    limit: 6,
    // 是否双层列表 (一般为 true)
    double: true,

    // ===== 解析规则部分 =====
    // 格式通常为: "列表选择器;标题;图片;描述;链接" (或通过 async function 自定义返回)
    // 语法: && (嵌套), || (备用), :eq(n) (索引), * (全部)
    // 特殊属性: Text, Html, href, src, style, data-*
    
    // 推荐列表
    推荐: '.recommend .item;a&&title;img&&src;.remarks&&Text;a&&href',
    // 推荐也可以用函数：
    // 推荐: async function () { let {input, pdfa, pdfh} = this; return []; },

    // 一级列表 (分类页)
    一级: '.list .item;a&&title;img&&src;.remarks&&Text;a&&href',
    
    // 二级详情 (详情页)
    // 格式为对象，或者通过 async function() 动态返回一个 vod 对象
    二级: {
        "title": "h1&&Text",
        "img": ".poster img&&src",
        "desc": ".desc&&Text",
        "content": ".content&&Text",
        "tabs": ".tabs span",
        "lists": ".playlists ul"
    },
    
    // 搜索列表
    搜索: '.search-result .item;a&&title;img&&src;.remarks&&Text;a&&href',
};
