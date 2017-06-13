const client=require('./resis/redisconn.js');
module.exports=functon(req,res,next){
	if(req.baseUrl='*'){
		const checkId=req.body.jessionId;
		if(client.checkId){
			next();
		}else{
			res.redirct('/login');
		}
	}
}