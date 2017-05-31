## 主题
构建一个阅读网站，模仿简书，并进行改进，网站取名 *likeread*

## 技术
* Node.js(v6.10.3)
* MongoDB 
* ES6
* Mongoose
* React.js
* WebPack
* Babel
* node-inspector
* Supervisor

## 下载运行
* git clone https://github.com/treeandgrass/likeread.git

* cd likeread

* supervisor --debug ./bin/www   (默认已全局安装 Supervisor)

* node-inspector    (默认已安装node-inspector，新启一个命令行窗口运行)

* 浏览器请求 http://localhost:3000/index


## MongoDB数据库设计
[MongoDB模型设计](https://github.com/treeandgrass/likeread/blob/master/MongoDB_Design/likread_model_design.md)

[MongoDB monoose代码](https://github.com/treeandgrass/likeread/tree/master/mongoose)
## 需求与建模

[需求与建模](https://github.com/treeandgrass/likeread/tree/master/UML%E5%BB%BA%E6%A8%A1)

## 进度

* （2017-5-24）完成[登录](https://github.com/treeandgrass/likeread/blob/master/routes/login.js)功能
* （2017-5-29）完成[注册](https://github.com/treeandgrass/likeread/blob/master/routes/register.js)
* （2017-5-31）完成邮箱验证(https://github.com/treeandgrass/likeread/blob/master/utils/mailsend.js)
