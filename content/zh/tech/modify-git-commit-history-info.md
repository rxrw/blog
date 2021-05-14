---
title: "修改 git 历史提交的用户名/邮箱"
date: 2021-05-14T11:45:19+08:00
tags: ["git", "tech"]
slug: "Modify-Git-Commit-History-Info"
description: "Modify Git Commit History Info"
toc: false
---

之前由于工作，以及自己比较混乱等原因，在 github 和自己的仓库中提交的历史邮箱、用户名不一致，就很烦。后来通过百度找到了 `git filter-branch` 的方法。但是它一直在提示

```bash
WARNING: git-filter-branch has a glut of gotchas generating mangled history rewrites.  Hit Ctrl-C before proceeding to abort, then use an alternative filtering tool such as 'git filter-repo' (https://github.com/newren/git-filter-repo/) instead.  See the filter-branch manual page for more details; to squelch this warning, set FILTER_BRANCH_SQUELCH_WARNING=1.
```

意思是这个命令会产生大量的混乱提交。因为之前的项目都是自己写的，也没在意。直到后来整理一份 forked 项目时里面多出了很多冲突。于是查找并使用 `git-filter-repo`来解决问题。国内使用这个命令的少之又少，因此在此记录一下。

## git filter-branch 用法

```bash
#!/bin/sh

git filter-branch -f --env-filter '

OLD_EMAIL="原邮箱"
CORRECT_NAME="要修改的用户名"
CORRECT_EMAIL="要修改的邮箱"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

`OLD_EMAIL` 是要修改的邮箱，`CORRECT_NAME` 和 `CORRECT_EMAIL` 是要修改为的邮箱。将命令保存到 .sh 文件中，在仓库根目录执行 `bash rewrite.sh &&  git push --force --tags origin 'refs/heads/*'` 就可以了。

## git-filter-repo

这是一个 python 脚本，需要安装：`brew install git-filter-repo` ，或者在 github 上下载：<https://github.com/newren/git-filter-repo/>

命令如下：

```bash

git-filter-repo --email-callback 'return email.replace(b"原邮箱", b"要修改的邮箱")' --force
git-filter-repo --name-callback 'return name.replace(b"原用户名", b"要修改的用户名")' --force

```

其原理是执行 python 来处理其 commits。

整理ing...
