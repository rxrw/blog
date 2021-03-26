---
title: "代码的管理"
date: 2021-01-22T15:05:05+08:00
lastmod: 2021-01-22T15:05:05+08:00
tags: ["随笔", "技术", "Gitlab", "Github", "阿里云", "部署"]
slug: "Code-Management"
description: "Code Management"
toc: true
---

因为自用的 Gitlab 搭建在了内网，只能通过加密协议访问，前几天在老文件中找到了当初初学代码时候的一堆… 放了进去，跑题了。

然后对于开源项目肯定是放在 GitHub 上了。而一些需要公网访问的内容只能部署在阿里云。那从家中的 Gitlab 搭出一个 Runner 给阿里云的方案也试过，比较折腾。闲来无事在阿里云 Code 发现它升级了。。把原来集团内的 Aone 商业化了相当于。

配合 Gitlab 的镜像仓库功能，实现代码统一集中管理，由 Gitlab 去负责将代码推到该在的地方，完美。

阿里云 Flow :
![阿里云 flow](https://rxrw.iuv520.com/zh/tech/code-management/97d36209f1b5ab15966a56134a1f41aa.png)

最终效果：
![代码的传递](https://rxrw.iuv520.com/zh/tech/code-management/dbca5ee9c63c0a49d504aa65352a78d0.png)

就是从以前要管理很多很多远程库变成只需要管一个就好了。同时，对代码的存储也是一个不错的选择。

## Gitlab 的配置

Gitlab 的部署不是本篇的范围。。

没什么好配置的呀。首先假设我们的代码源是 Github。以我的博客为例。
在 Gitlab 中新建仓库，从 Github 中导入仓库。那么就选了这个仓库导入，这个过程小白化的，不多讲。
阿里云的项目呢，就一个道理，在 [阿里云 Codeup](https://codeup.aliyun.com/) 上新建项目。
这是最基本的配置。

## Gitlab 与 Github 的联动

在 Github 上进入设置页面，在 `Developer Settings` -\> `Personal access token` 里面新建一个 token ，权限选择 `repo`, `workflow` 两个，OK。记住这个 token ，这是 GitHub 的同步密码。
回到 Gitlab 。选刚刚同步过来的仓库。`设置` -\> `镜像仓库` -\> `展开` (`Settings` -\> `Repository Mirrors` -\> `Expand`)
在 `Git仓库URL` 中填入 Github 仓库的 HTTPS 地址，在地址前面加上你的`用户名@`，方向选择推送，密码则是刚刚的 token。
点击保存，下方刷新试一下，没有问题的话，选择拉取再填一下。

> 镜像仓库只可以有一个拉取仓库，可以有多个推送仓库，原因不用多说。

现在，Gitlab 和 Github 之间的这个仓库就可以完全同步了。在本地将代码仓库的 remote 改为 gitlab 的地址，尝试 push 一下吧。

## Gitlab 与 阿里云 Code 的联动

此处的前提是先有 Gitlab 的仓库。如果先有的阿里云 Code 的仓库跟上述操作是差不多的。
初始化阿里云 Codeup ，设置推送密码，然后跟 上面一样配置就好了。

## 阿里云 flow 的配置

在阿里云 Code 的仓库里选择流水线，新建流水线，可根据需要去选择模板。像我没什么追求，就直接 docker 部署到 ecs 主机了，因此流水线是自建的。直接 ssh 到机器上 `git pull` 然后`docker-compose up -d` 就 ok。
如果是自建镜像可以通过这里推送到阿里云的仓库，然后在主机 pull。

## 总结

好像没什么难度…
