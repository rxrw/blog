---
title: "高德开放平台API封装SDK"
date: 2017-08-23T20:22:14+08:00
lastmod: 2020-05-23T20:22:14+08:00
tags: ["github", "技术", "开源"]
draft: false
slug: "rxrw-amap"
---

> 小版本更新了 psr 规范
> 之前对这方面了解不多，因此写的可能有点问题。
> 但是欢迎指出错误而不是带着一股子嘲讽过来喷人好吗。
> 用处不多维护精力比较少
> 但基本够用
> 注：可能有不兼容改动，一些类名大小写可能有问题 请注意

## 需求

    php >=7.0.0
    guzzlehttp/guzzlehttp:^6.3

没有安装 guzzlehttp 也不要紧，在 require 的时候回自动安装

## 安装

    composer require reprover/amap

## 用法

    use Reprover\Amap\Amap;

(1)

    $amap = new Amap();
    $gateway = $amap->uses("Georegeo")->gateway("geo")->build(["key"=>"你的api key",...其他选项]);
    //这里支持setKey("key值");
    //这里支持useHttps(true);
    $result = $gateway->ask();

如果不需要额外的配置，可以用以下方法：

(2)

    $gateway = Amap::use("georegeo")->gateway("regeo")->build(...);
    $result = $gateway->ask();

(3)
如果请求的接口大类只有一个子方法（例如坐标转换），则可以省略 gateway()方法

    $gateway = Amap::use("convert")->build(...);
    $result = $gateway->ask();

### 额外方法

> build 方法传什么？
> 传$config 参数，参数列表为一数组，具体实现为一 Reprover/Support/Config 对象，

返回结果为一个 Reprover\AMap\Support\Result 对象，类似于 Laravel 的 Collection，不过没那么全面。可用的方法：

    count() :int

所得数据结果数量，如果有多种类型结果则只返回主要数据（如天气只返回实时天气数量，天气预报也可以用$result->forecast）获取。

    foreach($result as $k=>$v){...}

可以用 foreach 进行结果的循环

    isValid() :boolean

判断结果是否正确，即根据高德返回数据 status(errcode)是否为 1(0)

部分特殊接口有一些特殊用法，开发 ing

## 说明

这个 sdk 是第一版，还存在很多不足的地方，欢迎大家提交 pr 和 issue！同时也在版本迭代中，建议大家不要急于将此插件用于生产环境中～

## 接下来的任务

- √ 优化类名和驼峰法命名
- √ 修改验证类规则（现在是一个方法，需要写一个类）
- √ 优化使用方法，注入配置项等
- 数字签名自动完成
- √ http 与 https 的切换
