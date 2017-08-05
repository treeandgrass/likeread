## 主题
构建一个阅读网站，模仿简书，并进行改进，网站取名 *likeread*

## 技术
* Node.js(v6.10.3)
* MongoDB 
* ES6
* Mongoose
* React.js
* Socket.IO
* WebPack
* Babel
* node-inspector
* Supervisor

## 下载运行
* git clone https://github.com/treeandgrass/likeread.git

* cd likeread

* 根据[博客](http://blog.csdn.net/mymy_blog/article/details/72810487)，修改[配置](https://github.com/treeandgrass/likeread/blob/master/utils/mailsend.js)

* supervisor --debug ./bin/www   (默认已全局安装 Supervisor)

* node-inspector    (默认已安装node-inspector，新启一个命令行窗口运行)

* 浏览器请求 http://localhost:3000/index


## MongoDB数据库设计
[MongoDB模型设计](https://github.com/treeandgrass/likeread/blob/master/MongoDB_Design/likread_model_design.md)

[MongoDB monoose代码](https://github.com/treeandgrass/likeread/tree/master/mongoose)
## 需求与建模

[需求与建模](https://github.com/treeandgrass/likeread/tree/master/UML%E5%BB%BA%E6%A8%A1)

## 进度

*  完成[登录](https://github.com/treeandgrass/likeread/blob/master/routes/login.js)功能
*  完成[注册](https://github.com/treeandgrass/likeread/blob/master/routes/register.js)
*  完成[邮箱验证](https://github.com/treeandgrass/likeread/blob/master/utils/mailsend.js)
*  完成[首页懒加载](https://github.com/treeandgrass/likeread/blob/master/views/index.html)
*  完成[导航](https://github.com/treeandgrass/likeread/blob/master/public/javascripts/views/nav_index.js)
*  完成[markdown编辑功能](https://github.com/treeandgrass/likeread/blob/master/views/articleWrite.html)
* 完成[弹框图片上传](https://github.com/treeandgrass/likeread/tree/master/utils/bombbox)
* 完成[文章实时上传](https://github.com/treeandgrass/likeread/blob/master/routes/articleContentHandle.js)
* 完成[注销和首页内容样式](https://github.com/treeandgrass/likeread/blob/master/routes/logout.js)
* 完成[mongoose聚合查询并且排序](https://github.com/treeandgrass/likeread/blob/master/routes/index.js)
