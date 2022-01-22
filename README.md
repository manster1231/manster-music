manster云音乐

#### 介绍
基于网易云音乐真实接口开发的音乐小程序

#### 软件架构
Nodejs作为后端，跨站请求伪造 (CSRF), 伪造请求头 , 调用官方 API

[网易云音乐NodeJS版API](https://binaryify.github.io/NeteaseCloudMusicApi/#/)


使用ES6语法

使用promise对象进行异步请求资源

使用moment.js进行时间日期处理

使用pubsub.js消息的发布订阅，进行组件间数据的传递


#### 安装教程

1.  git到本地，或者下载zip包解压
2.  进入manster_server目录
![cd](https://images.gitee.com/uploads/images/2021/0609/200959_e6cd2489_8531883.png "1.png")
3.  在路径栏输入cmd
![cmd](https://images.gitee.com/uploads/images/2021/0609/201013_22f8ed98_8531883.png "2.png")
4.  npm start开启服务

- 可能会提示nodemon不是内外部程序，则通过npm install -g nodemon解决
- 找不到 module（双引号出现什么单词，就 npm install 那个单词，或者直接 npm install）

![start](https://images.gitee.com/uploads/images/2021/0609/201030_2106a276_8531883.png "3.png")

#### 使用说明

1.  首先要安装有nodejs，我下载的是14.9.0，npm是6.14.8
2.  然后安装有[微信小程序开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html),我使用的是1.03
3.  使用详情可参考微信官网给出的[起步](https://developers.weixin.qq.com/miniprogram/dev/framework/)
4.  导入项目以后记得在本地配置中勾选
    - ES6 转 ES5
    - 增强编译
    - 使用npm模块
    - 不校验合法域名、web-view(业务域名)、TLS版本以及 HTTPS 证书
    - ![config](https://images.gitee.com/uploads/images/2021/0609/201439_fe0c3b8f_8531883.png "config.png")
5. 点击观看视频报错

```
TypeError: Cannot read property 'length' of undefined
```
获取视频资源需要用户进行登录，登录校验完成后才可以获得加载视频的权限

目前没有做注册的功能，网易云需要用户自己去设置一个密码，然后才能进行登录(已有的api中不支持验证码登录)

6. 如果要进行真机调试，需要改变 utils/config.js 里面的 ip 和 request.js中的 url:config.host + url 对应起来，如果只是要自己调试玩一下的话建议使用 ~~uTools 的内网穿透，详情自己百度~~（utools为了安全把这个功能删了，大家可以试试花生壳）

#### 预览效果如下
##### 初始页面
![初始页面](https://images.gitee.com/uploads/images/2021/0214/110613_9eb39fdf_8531883.png "index.png")

##### 登录页面
![登录页面](https://images.gitee.com/uploads/images/2021/0214/110706_6051c091_8531883.png "login.png")

##### 个人中心页面
![个人中心页面](https://images.gitee.com/uploads/images/2021/0214/110724_ae52c98a_8531883.png "person.png")

##### 推荐歌曲页面
![推荐歌曲页面](https://images.gitee.com/uploads/images/2021/0214/110744_31fffee1_8531883.png "recommendSong.png")

##### 视频页面
![视频页面](https://images.gitee.com/uploads/images/2021/0214/110804_ccf6d227_8531883.png "video.png")

##### 热搜页面
![热搜页面](https://images.gitee.com/uploads/images/2021/0214/110822_6447cbe3_8531883.png "hotSearch.png")

##### 搜索列表
![搜索列表](https://images.gitee.com/uploads/images/2021/0214/110851_b73a082e_8531883.png "searchList.png")

##### 历史搜索记录
![历史搜索记录](https://images.gitee.com/uploads/images/2021/0228/101514_0d59160a_8531883.png "5@O3N5_BR]AIQV_04N2FTGV.png")

##### 歌曲详情页面
![歌曲详情页面](https://images.gitee.com/uploads/images/2021/0225/103707_2af1320a_8531883.png "7XTTM23O@K989}3D67M2ZRS.png")