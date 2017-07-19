const io=require('socket.io')(8080);
const ArticleModel=require('mongoose').model('Article_Model');

const article=io.of('/article');
article.on('update',(socket)=>{
	debugger;
	//更新数据
	ArticleModel.update();
});

article.on('connection',(socket)=>{
	console.log('connected!');
});