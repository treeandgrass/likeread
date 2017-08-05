const router=require('express').Router();
const client=require('../redis/rediscon.js');

router.get('/',(req,res,next)=>{
	const tokenId=req.cookies.tokenId;
	client.del(tokenId,function(err,state){
		if(state===1){
			res.redirect('index');
		}
	});
});

module.exports=router;
