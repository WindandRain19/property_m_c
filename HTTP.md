# HTTP

## 一. URI 和 URL

```
URI:通一资源标志符(Uniform Resource Identifier， URI)，表示的是web上每一种可用的资源，如 HTML文档、图像、视频片段、程序等都由一个URI进行定位的。

URL:采用URL可以用一种统一的格式来描述各种信息资源，包括文件、服务器的地址和目录等。URL是URI概念的一种实现方式。
```

## 二. http

```
是无连接的  每次链接自能处理一个请求
媒体独立的  只要客户端和服务器端知道如何处理的数据内容，任何的数据类型都可以通过HTTP请求
无状态  没有记忆的（通过cookies可以在第一次请求后解决）
```

## 三. 请求报文

分为请求报文和响应报文
https://lilinchao.com/archives/start.html
https://lilinchao.com/archives/start.html

### 1. 请求报文

```
请求行 － 通用信息头 － 请求头 － 实体头 － 报文主体
```

### 2. 响应报文

```
状态行 － 通用信息头 － 响应头 － 实体头 － 报文主体
```

### 3. 请求头信息

```
Accept：可接受的响应内容类型（Content-Types）

Accept-Charset：可接受的字符集

Accept-Encoding：可接受的响应内容的编码方式。

Accept-Language：可接受的响应内容语言列表。

Accept-Datetime：可接受的按照时间来表示的响应内容版本

Authorization：用于表示 HTTP 协议中需要认证资源的认证信息

Cache-Control：用来指定当前的请求/回复中的，是否使用缓存机制。

Connection：客户端（浏览器）想要优先使用的连接类型

Cookie：由之前服务器通过Set-Cooki（e 见下文）设置的一个HTTP协议Cookie

Content-Length：以 8 进制表示的请求体的长度

Content-MD5：请求体的内容的二进制 MD5 散列值（数字签名），以 Base64 编码的结果

Content-Type：请求体的 MIME 类型 （用于 POST 和 PUT 请求中）
Date：发送该消息的日期和时间（以 RFC 7231 中定义的"HTTP 日期"格式来发送）

Expect：表示客户端要求服务器做出特定的行为

From：发起此请求的用户的邮件地址

Host：表示服务器的域名以及服务器所监听的端口号。如果所请求的端口是对应的服务的标准端口（80），则端口号可以省略。

If-Match：仅当客户端提供的实体与服务器上对应的实体相匹配时，才进行对应的操作。主要用于像 PUT 这样的方法中，仅当从用户上次更新某个资源后，该资源未被修改的情况下，才更新该资源。

If-Modified-Since：允许在对应的资源未被修改的情况下返回 304 未修改

If-None-Match：允许在对应的内容未被修改的情况下返回 304 未修改（ 304 Not Modified ），参考 超文本传输协议 的实体标记

If-Range：如果该实体未被修改过，则向返回所缺少的那一个或多个部分。否则，返回整个新的实体

If-Unmodified-Since：当该实体自某个特定时间以来未被修改的情况下，才发送回应。

Max-Forwards限制该消息可被代理及网关转发的次数。

Origin：发起一个针对跨域资源共享的请求（该请求要求服务器在响应中加入一个 Access-Control-Allow-Origin 的消息头，表示访问控制所允许的来源）。

Pragma：与具体的实现相关，这些字段可能在请求/回应链中的任何时候产生。

Proxy-Authorization：用于向代理进行认证的认证信息。

Range：表示请求某个实体的一部分，字节偏移以 0 开始。

Referer：表示浏览器所访问的前一个页面，可以认为是之前访问页面的链接将浏览器带到了当前页面。Referer 其实是 Referrer 这个单词，但 RFC制作标准时给拼错了，后来也就将错就错使用 Referer 了。

TE：浏览器预期接受的传输时的编码方式：可使用回应协议头

Transfer-Encoding：中的值（还可以使用"trailers"表示数据传输时的分块方式）用来表示浏览器希望在最后一个大小为 0 的块之后还接收到一些额外的字段。

User-Agent：浏览器的身份标识字符串

Upgrade：要求服务器升级到一个高版本协议。

Via：告诉服务器，这个请求是由哪些代理发出的。

Warning：一个一般性的警告，表示在实体内容体中可能存在错误
```

### 3. 网络文件类型

#### ① 常见的

```
text/html ： HTML格式
text/plain ：纯文本格式
text/xml ： XML格式
image/gif ：gif图片格式
image/jpeg ：jpg图片格式
image/png：png图片格式
```

#### ② 以 application 开头的

```
application/xhtml+xml ：XHTML格式
application/xml： XML数据格式
application/atom+xml ：Atom XML聚合格式
application/json： JSON数据格式
application/pdf：pdf格式
application/msword ： Word文档格式
application/octet-stream ： 二进制流数据（如常见的文件下载）
application/x-www-form-urlencoded ： <form encType=””>中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）
```

## 四. 状态码

```
200：OK	请求正常处理
204	请求成功，但是没有处理数据
206	对资源某一部分的请求

301	永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替
302	临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI
303	请求资源存在另一个URI，使用GET方法再次请求
（虽然301、302禁止使用GET，但大多数都是将POST改为GET）
304	找到资源，但是没有符合的请求（服务器端的请求资源未发生改变，可以使用客户端未过期的缓存）
307	与302相似，但是不会把POST改为GET

400	客户端语法错误
401	请求要求用户的身份认证（场景：①用户未登录②token过期）
403	服务器理解请求客户端的请求，但是拒绝执行此请求
404	服务器无法根据客户端的请求找到资源（网页）

500	服务器不支持请求的功能，无法完成请求
503	由于超载或系统维护，服务器暂时的无法处理客户端的请求。
```

## 五. 通信数据转发程序

```
代理：“中间人的角色”，在客户端和服务器端中间，两边传送
网关：是一个转发其它服务器通信数据的服务器，接收客户端发来的请求时候，它也可以处理
隧道：在相隔甚远的客户端和服务器端之间进行中转，并保持通讯链接的应用程序
```

## 六. session cookies JWT（token）

### 1. cookies

cookie 是一个非常具体的东西，指的就是浏览器里面能永久存储的一种数据。跟服务器没啥关系，仅仅是浏览器实现的一种数据存储功能。
cookie 由服务器生成，发送给浏览器，浏览器把 cookie 以 KV 形式存储到某个目录下的文本文件中，下一次请求同一网站时会把该 cookie 发送给服务器。由于 cookie 是存在客户端上的，所以浏览器加入了一些限制确保 cookie 不会被恶意使用，同时不会占据太多磁盘空间。所以每个域的 cookie 数量是有限制的。

#### ① 客户端设置

客户端可以设置 cookie 的以下选项: expires, domain, path, secure(只有在 https 协议的网页中, 客户端设置 secure 类型 cookie 才能生效), 但无法设置 httpOnly 选项

```
设置cookie => cookie被自动添加到request header中 => 服务端接收到cookie
```

#### ① 服务端端设置

不管你是请求一个资源文件(如 html/js/css/图片), 还是发送一个 ajax 请求, 服务端都会返回 response.而 response header 中有一项叫 set-cookie, 是服务端专门用来设置 cookie 的;

```
一个set-cookie只能设置一个cookie, 当你想设置多个, 需要添加同样多的set-cookie
服务端可以设置cookie的所有选项: expires, domain, path, secure, HttpOnly
```

#### ③ Cookie，SessionStorage，LocalStorage

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/13/16b4fb158b9ac13b~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

### 2. session

是一块保存在服务器端的内存空间，一般用于保存用户的会话信息

```
客户端第一次请求（账号、密码）→→服务器端第一次响应（生成sessionID，且保存了与这个sessionID对应的信息，响应返回时将sessionID存在cookies中）→→客户端将sessionid保存在客户端cookies中
客户端第二次请求（携带cookies中的sessionID）→→服务器端（判断sessionid，响应处理）→→客户端
客户端第三次请求（携带cookies中的sessionID）→→服务器端（判断sessionid，响应处理）→→客户端
```

```
session从字面上讲，就是会话。这个就类似你和一个人交谈，你怎么知道当时和你交谈的是张三而不是李四呢？对方肯定有某种特征（长相等）表明他是张三；
session也是类似的道理，服务器要知道当前请求发给自己的是谁。为了做这种区分，服务器就是要给每个客户端分配不同的"身份标识"，然后客户端每次向服务器发请求的时候，都带上这个”身份标识“，服务器就知道这个请求来自与谁了。
至于客户端怎么保存这个”身份标识“，可以有很多方式，对于浏览器客户端，大家都采用cookie的方式。
```

**流程**
![图片](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/13/16b4fb158d3a7cbb~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

```
1.用户向服务器发送用户名和密码
2.服务器验证通过后,在当前对话(session)里面保存相关数据,比如用户角色, 登陆时间等;
3.服务器向用户返回一个session_id, 写入用户的cookie
4.用户随后的每一次请求, 都会通过cookie, 将session_id传回服务器
5.服务端收到 session_id, 找到前期保存的数据, 由此得知用户的身份
```

### 3. JWT

```
客户端第一次请求（账号、密码）→→服务器端第一次响应（生成token，响应返回token）→→客户端将token保存在客户端cookies中
客户端第二次请求（携带cookies中的token →→服务器端（判断token，响应处理）→→客户端
客户端第二次请求（携带cookies中的token →→服务器端（判断token，响应处理）→→客户端
```

**流程**
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/13/16b4fb15a64494a1~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

```
客户端需要携带用户名/密码等可证明身份的的内容去授权服务器获取JWT信息；
每次服务都携带该Token内容与Web服务器进行交互，由业务服务器来验证Token是否是授权发放的有效Token，来验证当前业务是否请求合法。

这里需要注意：不是每次请求都要申请一次Token，这是需要注意，如果不是对于安全性要求的情况，不建议每次都申请，因为会增加业务耗时；比如只在登陆时申请，然后使用JWT的过期时间或其他手段来保证JWT的有效性
```

### 4.区别

#### ① Cookie 和 Session

```
1.存储位置不同： cookie数据存放在客户的浏览器上，session数据放在服务器上
2.隐私策略不同：cookie不是很安全， 别人可以分析存放在本地的cookie并进行cookie欺骗，考虑到安全应当使用session
2.session会在一定时间内保存在服务器上。当访问增多，就会比较占用你服务器的性能，考虑到减轻服务器性能方面，应当使用cookie
4.存储大小不同： 单个cookie保存的数据不能超过4k, 很多浏览器都限制一个站点最多保存20个cookie

一般建议： 将登陆信息等重要信息存放为session, 其他信息如果需要保留，可以放在cookie中
```

#### ② Token 和 Session

```
Session是一种HTTP储存机制， 为无状态的HTTP提供持久机制;

Token就是令牌， 比如你授权(登录)一个程序时，它就是个依据，判断你是否已经授权该软件；

Session和Token并不矛盾，作为身份认证Token安全性比Session好，因为每一个请求都有签名还能防止监听以及重放攻击，而Session就必须依赖链路层来保障通讯安全了。如上所说，如果你需要实现有状态的回话，仍然可以增加Session来在服务端保存一些状态。
```
