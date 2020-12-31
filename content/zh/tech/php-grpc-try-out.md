---
title: "PHP GRPC 的试水"
date: 2020-11-16T12:06:31+08:00
tags: ["技术", "PHP", "GRPC"]
lastmod: 2020-11-16T12:06:31+08:00
toc: true
---

## 先说环境
+ MacOS 10.16
+ brew 
+ php 7.4+

## 前言
研究微服务治理，苦于找不到相对于 `php` 合适的 `rpc` 框架。多个服务起来，用 `curl` 或者 `guzzle` 相互域名请求简直太逆天奇葩了。由于服务大部分都是 `php` 的，没有常驻后台的 `daemon` 开发送心跳。因此对于 `rpc` 的选型也是个很严肃的问题。
看过 `yar` 、 `dubbo` 等协议，但是不是特别理想。 `yar` 本身是 `php` 的扩展。但是不支持服务治理，或者说只是一个远程过程调用的工具。 `dubbo` 主力支持 `java`，其他语言虽然支持，但本质对于 `php` 来说和 `curl` 没大区别。今儿记录一下 `php` + `grpc` 的过程

## 安装
官方文档：[https://grpc.io/docs/languages/php/quickstart/](https://grpc.io/docs/languages/php/quickstart/)
本身就支持php的服务端和客户端，按文档操作如下：
安装扩展：
```bash
$ pecl install protobuf
$ pecl install grpc
```
上面 `protobuf` 是 `grpc` 通信所使用的协议。类似`thrift`，一个跨语言的结构定义工具？（瞎起）

安装好后，按照文档，装个 `php-protoc` 插件，用来生成 `php` 相关的 `class` 和 `service`
```bash
$ git clone -b v1.33.2 https://github.com/grpc/grpc
$ cd grpc
$ git submodule update --init
$ make grpc_php_plugin
```

第一次安装一直在报
```bash
Can't exec "aclocal": No such file or directory at /usr/local/Cellar/autoconf/2.69/share/autoconf/Autom4te/FileUtils.pm line 326.
```
然后发现是因为`automake`没装。好吧。
```bash
$ brew install automake
$ brew install protobuf #这个我偶然装的 不知道不装对后续会不会有影响
```
重新执行上述命令，编译安装完了。

## First Example
继续按照文档，执行代码库里的 `submoudle`:
```bash
$ cd examples/php
$ ./greeter_proto_gen.sh
```
如此应该是把预定义好的这个生成了 `php` 的文件，目录结构如下
```bash
i@wdeMacBook-Pro:~/Code/grpc-try/grpc/examples/php|ee5b762f33⚡ ⇒  ll
total 40
drwxr-xr-x   3 i  staff    96B 11 16 11:11 GPBMetadata
drwxr-xr-x   5 i  staff   160B 11 16 11:11 Helloworld
-rw-r--r--   1 i  staff   1.0K 11 16 10:42 README.md
-rw-r--r--   1 i  staff   348B 11 16 10:42 composer.json
drwxr-xr-x  11 i  staff   352B 11 16 10:42 echo
-rw-r--r--   1 i  staff   1.5K 11 16 10:42 greeter_client.php
-rwxr-xr-x   1 i  staff   728B 11 16 10:42 greeter_proto_gen.sh
drwxr-xr-x   6 i  staff   192B 11 16 10:42 route_guide
-rwxr-xr-x   1 i  staff   691B 11 16 10:42 run_greeter_client.sh
```
接着执行`composer install` 安装相关依赖。
```bash
$ cd ../node
```
教程中用node起了一个服务端。
```bash
$ npm install 
```
第一次安装报错，好吧。再装一次，提示我`Error: The gRPC binary module was not installed. This may be fixed by running "npm rebuild" `
我tm。。
经过各种`npm install`，算是装完了。然后
```bash
$ cd dynamic_codegen
$ node greeter_server.js
```
目测已经起来了，没有任何提示
再开一个窗口，执行
```bash
$ ./run_greeter_client.sh
PHP Warning:  PHP Startup: Unable to load dynamic library 'grpc.so' (tried: /usr/local/lib/php/pecl/20190902/grpc.so (dlopen(/usr/local/lib/php/pecl/20190902/grpc.so, 9): image not found), /usr/local/lib/php/pecl/20190902/grpc.so.so (dlopen(/usr/local/lib/php/pecl/20190902/grpc.so.so, 9): image not found)) in Unknown on line 0

Warning: PHP Startup: Unable to load dynamic library 'grpc.so' (tried: /usr/local/lib/php/pecl/20190902/grpc.so (dlopen(/usr/local/lib/php/pecl/20190902/grpc.so, 9): image not found), /usr/local/lib/php/pecl/20190902/grpc.so.so (dlopen(/usr/local/lib/php/pecl/20190902/grpc.so.so, 9): image not found)) in Unknown on line 0
PHP Fatal error:  Uncaught Error: Class 'Grpc\ChannelCredentials' not found in /Users/i/Code/grpc-try/grpc/examples/php/greeter_client.php:30
Stack trace:
#0 /Users/i/Code/grpc-try/grpc/examples/php/greeter_client.php(44): greet('localhost:50051', 'world')
#1 {main}
  thrown in /Users/i/Code/grpc-try/grpc/examples/php/greeter_client.php on line 30

Fatal error: Uncaught Error: Class 'Grpc\ChannelCredentials' not found in /Users/i/Code/grpc-try/grpc/examples/php/greeter_client.php:30
Stack trace:
#0 /Users/i/Code/grpc-try/grpc/examples/php/greeter_client.php(44): greet('localhost:50051', 'world')
#1 {main}
  thrown in /Users/i/Code/grpc-try/grpc/examples/php/greeter_client.php on line 30
```
。。。官网说的 `congratulation` 给谁听呢。。
`php -m`果然没看见我的 `grpc` 。。再装一遍看看
…漫长的编译之旅
这回看见了 难道我刚才装了个寂寞
这回执行
```bash
$ ./run_greeter_client.sh
PHP Warning:  Module 'grpc' already loaded in Unknown on line 0

Warning: Module 'grpc' already loaded in Unknown on line 0
Hello world
```
OK，这是看见了服务端的返回了。（btw，安装的时候自己在 `php.ini` 里加了 `extension` ，然后还说重复了。我再删了就好了。原因是脚本中执行的语句，自己看。）
## 看一看代码
`vscode` 打开 `php` 目录， `HelloWorld` 和 `GPBMetadata` 都是由 `protobuf` 生成的。 `proto` 文件在上层目录的 `protos` 下，长如下这样：
```Proto
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

syntax = "proto3";

option java_multiple_files = true;
option java_package = "io.grpc.examples.helloworld";
option java_outer_classname = "HelloWorldProto";
option objc_class_prefix = "HLW";

package helloworld;

// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings
message HelloReply {
  string message = 1;
}
```
定义了 `package` 名 `helloworld` ， `service` 对应 `php` 的命名空间， `message` 对应的是结构体。对应 `php` 的 `HelloWorld` 目录下的东西。可以用 `composer` 加载，也可以用 `require\_once` 加载。
看下函数
```php
<?php

require dirname(__FILE__).'/vendor/autoload.php';

function greet($hostname, $name)
{
    $client = new Helloworld\GreeterClient($hostname, [
        'credentials' => Grpc\ChannelCredentials::createInsecure(),
    ]);
    $request = new Helloworld\HelloRequest();
    $request->setName($name);
    list($response, $status) = $client->SayHello($request)->wait();
    if ($status->code !== Grpc\STATUS_OK) {
        echo "ERROR: " . $status->code . ", " . $status->details . PHP_EOL;
        exit(1);
    }
    echo $response->getMessage() . PHP_EOL;
}

$name = !empty($argv[1]) ? $argv[1] : 'world';
$hostname = !empty($argv[2]) ? $argv[2] : 'localhost:50051';
greet($hostname, $name);
```
直接通过 `protobuf` 定义的 `Client` 就可以实例化啦。对应的方法啥的都已经在里面了。没错，就是我们想要的亚子。

接下来需要考虑的还有服务端的架设，服务中心的架设。不说了，再研究研究。