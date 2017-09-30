var router=require('express').Router();
var UserModel=require('mongoose').model('User_Model');
const mongoose=require('mongoose');
const ArticleModel=mongoose.model('Article_Model');
//设置路由

router.get('/personPageMain',(req,res,next)=>{
    res.render('person.html');
});


router.post('/personDetail',(req,res,next)=>{
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

router.post('/modifyPass',(req,res,next)=>{
    client.get(req.body.tokenId,(err,reply)=>{
		if(err){
			res.end(err);
		}else{
			ArticleModel.update(
                {hash:reply},
    
                {
                    password:res.body.newpass
                },
                (err,doc)=>{
                if(err) console.log(err);
            });
		}
	});
});

module.exports=router;