
//用于登录验证

const urlfilter=require('../utils/urlfilter.js');
const client = require('../redis/rediscon.js');

module.exports=function(req,res,next){

	if(urlfilter(req.originalUrl)){
		if(req.cookies.tokenId){
			client.get(req.cookies.tokenId,(err,hash)=>{
				if(hash){
					const _next=next;
					_next();
				}else{
					res.redirect('/login');
				}
			});
		}else{
			res.redirect('/login');
		}
	}else if(/favicon\.ico/.test(req.url)){
		res.end();//请求favicon.ico文件直接返回
	}else{
		next();
	}


}

