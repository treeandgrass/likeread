const Server=require('socket.io');
const mongoose=require('mongoose');
const ArticleModel=mongoose.model('Article_Model');
const ObjectId = mongoose.Schema.Types.ObjectId;
const io=new Server(3002,{
	path:'/write',
	origins:'http://localhost:3000',
	serveClient:true
});
const article=io.of('/article');

//
article.on('connection',(socket)=>{
	socket.on('message',function(msg){
		//更新文章内容
		ArticleModel.update(
			{article_id:msg._id},

			{title:msg.title,
				content:msg.update,
				date_of_pub:Date.now(),
				state:0,
			},
			(err,doc)=>{
			if(err) console.log(err);
		});
	});
});