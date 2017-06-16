
//用于登录验证

const urlfilter=require('../utils/urlfilter.js');
const client = require('../redis/rediscon.js');

module.exports=function(req,res,next){

	if(urlfilter(req.originalUrl)){
		if(req.cookies.jsessionid){
			client.get(req.cookies.jsessionid,(err,hash)=>{
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
	}else{
		next();
	}


}

