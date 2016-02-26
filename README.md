# Nodejs AngularJS
>此项目为学习Angularjs和Nodejs的练习项目

>后台使用Nodejs环境,引用了Express和mysql库，另外包含两个自建库liucr-strext和liucr-mysql
>前台使用Angular

***

### __功能说明__
#### 前台包含以下功能
1. 可动态加载的双向绑定分页列表。
2. 首字母大写filter
3. $cacheFactory实现数据缓存（不依赖浏览器缓存设置），避免频繁数据请求
4. peopleServices数据服务
5. 全局事件注册（$locationChangeStart，$locationChangeSuccess，$locationChangeSuccess，$routeChangeSuccess）可用于身份验证（未完成）
6. 页码按钮css动画
***
#### 后台说明
>__调试方法__

>调试命令 (需要安装 node-inspector),默认使用5858端口调试
>
    node-inspector
打开一个新的Chrome窗口，访问 http://127.0.0.1:8080/?port=5858
>
>在新的命令行窗口中运行
>
    node --debug-brk=5858 app.js

##### 代码说明

2. 初步实现业务与数据层分离，尝试使用liucr-mysql封装mysql操作类，使用方法如下：



    var m=require("liucr-mysql");
    //加载mysql链接配置文件
    var cfg=require("config.json");
    var mysql=new m.mysqlop(cfg);

> liucr-strext是一个String的扩展库，目前只实现了String.format方法
>
加载方法
>
    var strext=require("liucr-strext");
    strext.Load();
>
使用方法
>
    String.format("Hello,{0}","world");
    //"Hello,world"
