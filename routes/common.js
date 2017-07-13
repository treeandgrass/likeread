const express=require('express');
const router = express.Router();
const rediscon=require('../redis/rediscon.js');

router.get('/checkloginstate',(req,res)=>{
	var token = req.body.token;
	if(token){
		rediscon.get('token',(err,reply)=>{
			if(err){
				console.log(err);
			}else{
				res.send(JSON.Stringify({user:reply}));
			}
		});
	}else{
		res.send(null);
	}
	
});


module.exports=router;