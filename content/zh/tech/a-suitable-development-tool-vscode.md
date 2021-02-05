---
title: "vscode —— 选择一款合适的开发工具"
date: 2021-02-05T17:50:48+08:00
tags: ["vscode", "技术"]
slug: "A-Suitable-Development-Tool-Vscode"
description: "A Suitable Development Tool Vscode"
toc: true
---

## 背景

曾几何时用 windows 系统的时候，写代码简直难以想象的坎坷 —— 就说命令行和环境变量与标准 linux 不同就很烦了，命令也不同步 —— 这也说明了我的 reuixiy 用 ubuntu 也不用 windows 的原因。后来换了 mac ，用起来，可以说大赞，用钱堆出来的解决方案，就是香。我 17 年买的 macbook pro ，现在运行依旧十分顺畅。

## JetBrains

除此之外呢就是编辑器，诚然，`JetBrains` 公司出的一系列 IDE， 包括但不限于 PHPStorm, PyCharm, WebStorm, IntelliJ IDEA, GoLand 等等，极大地简化且提速了开发，内置的语言检查工具、代码智能提示引入以及调试运行等功能无不是开发路上的垫脚石啊。从而想想刚入门编程时用的 `Sublime Text`，哎。。

但是用了一段时间呢，还是发现其美中不足。逐渐到了难以接受的地步。

- 由于是用 Java 语言进行开发的，因此运行在 JVM 中，相当吃内存。在一般配置下，一个 IDE 会将内存占满，导致整台电脑卡卡的，更别提敲代码了。
- 收费。虽说我们平时使用社区版是免费的，但是其实它是不能商用的。我一直用学生邮箱去使用 Ulimate 版，但也不是长久之计。
- 语言单一，写不同语言的代码要用不同的工具，而 IDEA 本身却是可以安装任何插件的（原本是 Java IDE）。但由于其本身的属性，会导致写 PHP 的时候旁边有一个 maven 的选项卡，这样。
- 通过问题 1、3，得出一个新问题，当我同时要写 go 和 html 的时候，就必须要打开两个 IDE 了，那么这台电脑基本上就废了。。

## 引申：IDE 与编辑器的概念与区别

上面的内容里面把 IDE 和编辑器区分了开，其还是有一定区别的。

IDE， `Integrated Development Environment` ，集成开发环境。也就是说，把一系列开发相关的工具 —— 比如代码编辑、分析、调试甚至打包发布等集成到了一起。众所周知的 `JetBrains` 系列，微信开发中工具，`eclipse`，`Android Studio`，`XCode`，`Visual Studio` 都是我们比较熟知的 IDE 了。它们基本有一个特点就是在配置不够的机器上卡，占用内存大，但功能全面，基本不需要额外的配置。而上述的例子，除了微软的`VS`，苹果的`XCode`，都是用 Java 语言去实现的，因此。。

编辑器 —— 任何一个文本工具都可以称为一个编辑器，只要它包含如下功能：

- 文本撰写
- 文件保存与更新

  而大部分的编辑器都包含了文件编码（甚至记事本）、文件夹管理等功能。为编程而生的编辑器呢，更多的比如基础的语法高亮、插件扩展等。从最基础的记事本、写字板，写作专用的`Word`、`Ulysses`，命令行上的 `vim` 、 `nano` ，再到写代码的 `Sublime Text` 、`Visual Studio Code` 、`Atom`、`Notepad++` 等，都属于文本编辑器的范畴。

### 代码编辑器

代码编辑器有一个不约而同的特点（Notepad 除外）就是可以通过插件、扩展增加新的功能，从而使一个编辑器借助外部的力量编成生产力的工具。以前在用 `Sublime Text 3` 的时候没有意识到这一点，直到用了 `VS Code` ，微软把插件功能明晃晃的放在左侧快捷栏上，才开始领略插件的威力。

## VS Code

在其刚刚推出的时候，我把它跟 Sublime 一概而论，而且默认是个工程模式，给人感觉很别扭。后来来到现在这个单位，在 leader 的大力推荐下，居然已经完完全全把 `VS Code` 当成一个生产力的工具。集成各大语言，除了 PHP 外，支持度不亚于 `JetBrains IDE` —— 当然，得益于各大开发爱好者们的无私贡献！现在已经完全抛弃全家桶了。

### 安装

mac 下：

```bash
brew install --cask visual-studio-code
```

你也可以选择安装预览版，看你是喜欢蓝色还是绿色了。预览版是

```bash
brew install --cask visual-studio-code-insiders
```

其他系统：

去[官网](https://code.visualstudio.com/Download)找属于自己的系统就好。

走过一遍正常的安装流程就打开了。我记得默认是会让你安装中文语言包的。

### 配置结构

其实想先说插件的，毕竟插件是 `VS Code` 的核心。但是配置结构也很重要。

首先，按 `Command`/`Ctrl` + `,`，就进入了用户配置。在这里是 ui 化的配置，也可以进入 JSON 来配置。
通过 `Command` + `Shift` + `P` 搜索 `JSON` ，可以进入 JSON 配置功能。也就是通过编辑一个 JSON 文件来实现配置的变更。

在工程目录里，同样的操作会多一个选项，则是打开工作区配置。当你打开的一瞬间，会在你的工作区建立一个 `.vscode` 文件夹，此处的配置会覆盖用户配置。一般都是工程专属的内容，比如 `python`的虚拟环境等。

用户级的功能和插件的功能都是通过这个 JSON 文件去实现的。建议在安装插件之前把默认配置可以看一看。

### 常用插件及配置

之前劝退过我的原因之一就是网上很多没脑子的博主直接把别人的内容复制粘贴说这些都是必装插件，然后又有不更新的又有功能重复的，让人以为这编辑器就是臃肿不堪的东西。在此，哥哥我整理了一下自用的插件，尽量少装，装精品。

#### 基础插件

##### 设置同步

曾经是一个插件，现在就是内置的功能。在界面的左下角，人头像，可以选择 GitHub 登录或 Microsoft 帐户登录。毕竟 Github 已经是 Microsoft 的产业了。

很有用的功能，建议大家都开着。以后再换电脑，或者多台电脑一起用的时候，不用一个一个手动安装了。

##### [go-home](https://marketplace.visualstudio.com/items?itemName=go-home.go-home)

这是个很逗比的插件，不过我觉得大家可能会比较有兴趣，哈哈哈。

设置 `gohome.hour`和`gohome.minute`，每天当你打开 `VS Code` 的时候，它都会倒计时还有多久下班。默认是早 9 晚 6 ，没有任何其它功能，但很逗比。给挣扎在工位的我们一点活着的希望～

##### [wakatime](https://wakatime.com)

工作量统计工具 —— 支持各大 IDE 。通过编辑器的语言、工程名可以得知你所写的每个工程的时长发送到服务端，免费版是一周一次周报大概。

安装后会弹出提示框让你输入 API Key，填写后就再也不用管啦。

##### Code Runner

可以运行各种语言的代码。当然前提是本地有安装对应的解释器。
做了个实验，不需要新建文件，只要打开一个窗口写代码就好了。像 Java 这种完全面向对象的语言，继承它提供的一个类就可以运行。

##### Kite AI Autocompletion / Tabnine AI Autocompletion

两大神器，任选其一。

基于机器学习的代码补全工具。它们会在额外跑一个线程用来计算写代码的模型，也就是各 IDE 通用的一个东西。它们的不智能之处在于不会知道代码这么写对不对，但好处也就是它知道你想要怎么写。

如果你不知道这个工具有什么好处，就先用着吧。当用到一定程度的时候，你会发现，你只需要写一个单词，剩下的代码基本不用你管了… 尤其是在写 case 条件的时候，这是一个比任何提示都强大的工具。

Leader 推荐我们在用的是 Tabnine ，我最近在尝试使用 Kite。两者的区别呢，Tabnine 基本是全语言的，但是根本不看语法，只靠推算。而 Kite 是在 Python 等语言上与语法结合提示的，大概。而且 Kite 的下载量要远大于 Tabnine 。因此两个都放了上来以供大家参考。

#### 代码管理

最怕的一件事就是代码丢了。前几天整理代码时候发现最初写的东西大部分也都找不到了。现在我们都用 `git` 进行代码管理 。因此 Git 与 Github 的插件也是比较多的。VSCode 自带了一个基础的管理工具，但很显然不够用。

##### GitLens

一款 `VS Code` Git 管理增强工具。安装后会直接显示在侧边栏。最近更新后，与原生的 Git 管理工具结合，更加易用了。

在代码编辑器页，点击一行时候，会在后面出现这一行是又谁最后编辑的，在 Git Tab，可以直接看提交历史和 Compare。

之前有一个插件叫 `Git History`，功能也很强大。但只是用来看提交历史的。现在功能已经完全被覆盖了。

##### Git Project Management

一般我们都会有习惯，把代码放在一个父目录下。那么与其一个一个文件夹管理，不如以 Git 工程作为目录进行管理吧！

##### [Git Automator](https://marketplace.visualstudio.com/items?itemName=ivangabriele.vscode-git-add-and-commit)

懒人必备神器。写什么 Git Commit Message 都抛到脑后去吧。
在改动之后，`Command` + `Shift` + `A` ，会自动根据你所改动的内容生成 Commit Message，默认添加全部的改动文件。

##### GitHub Pull Requests and Issues

GitHub 官方扩展，登录你的 GitHub 后，会自动拉取你当前工程的 Issue 和 PR，直接本地管理。当然前提是你要把代码的 remote 设置为 github 的。可以在配置里设置默认的 origin 名。

#### 各种编程语言支持

##### PHP

先说这个是我觉得支持最不好的了。可能因为 PHP 是全天下最好的语言吧。
原本有一个插件叫做 `PHP IntelliSense`，但是自从 19 年 12 月开始就停更了（开源共建呢）。有一个插件貌似叫`PHP Tool`的，高收费，要在后台起一个 `PHP Language Server`，也许功能很强大，但是很贵。

###### PHP Intelephense

最近更新是 2021 年 1 月 27 日。据描述支持的功能很多。确实。目前用起来，代码格式化-代码检查等都支持的有条不紊。但是像 `Laravel`这种结构比较复杂的，包括带有命名空间的情况支持就不是特别理想。可能是因为没有使用它的专业版吧。一个月 12 刀，如果只写 PHP 可以尝试。

###### PHP Namespace Resolver

这个东西酌情使用。帮我解决了命名空间的问题，但是有的时候会莫名其妙报一些引用错误，而且要求很严格，`Imported But Not Used` 的会一直亮一条红线，也挺烦的。

##### Python

令人比较愉悦的是，Python 是微软官方支持的。照着插件列表中的 Microsoft 点就是了。

插件：Python、Pylance、Jupyter。基于不同框架还有不同的支持插件，比如 Django。建议安装前注意一下插件的安装量和星级。

刚刚重新装了一遍 python 的插件，记得 languageServer 要选 pylance ， python 的路径要设置正确，高亮再找个插件，不然还挺难受的。。

##### Go

来自 `Go Team At Google` 的开发团队开发的插件就问你用不用？

其他的什么都不用装了。当你打开一个 go 工程时，它会提示你装一些`golint`, `gopls`等代码提示检查工具。go 和 python 的智能原理差不多，都是通过运行一个 `Language Server` 来实现功能的。

##### Java

VS Code 对于 Java 和 Python 有着独特的情感。可能是因为 Java 的项目比较特殊，它必须是一个完整的工程。因此，如果你要用 VS Code 写 Java，建议直接安装 `Java Extension Pack`，这是一系列的插件集合。大概可以支持 maven、java 的代码提示工程管理等。具体的我也没试过其实。

##### Dart/Flutter

有谁用 Dart 语言写东西不是为了 Flutter 的呢？

装好 flutter 的运行环境，`flutter doctor` 没问题就直接装插件吧，毕竟是官方支持。

##### JavaScript/CSS/HTML/VUE/REACT/MARKDOWN

诚然，node 和这个标题不太符合，毕竟 node 属于服务端语言。

由于 vs code 是由 node 开发的，因此原生支持很多功能，此外推荐一个 `Prettier` 的插件吧。错误提示，Formatter等功能一应俱全哦。

#### 结束

颜色主题什么的，大家自己配置就好啦。
