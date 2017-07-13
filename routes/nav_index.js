var express=require('express');
var router=express.Router();
var client=require('../redis/rediscon.js');
var UserModel=require('mongoose').model('User_Model');

router.post('/checklogin',(req,res,next)=>{
	
	client.get(req.body.tokenId,(err,reply)=>{
		if(err){
			res.end(err);
		}else{
			if(reply){
				var ret=UserModel.findOne({hash:reply});
				ret.exec(function(err,result){
					res.send(JSON.stringify(result));
				});
			}else{
				res.send(JSON.stringify({hasLogin:false}));
			}
		}
	});
});


module.exports=router;