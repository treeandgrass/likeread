
const multer=require('multer');
const  express = require('express');
var mongoose = require('mongoose');
const client=require('../redis/rediscon.js');
const User_Model = mongoose.model('User_Model');
const hashcrypto=require('../utils/hash.js');
// const url=require('url');

const uploads=multer({dest:'uploads/'});




const router = express.Router();

router.get('/',(req,res,next)=>{
	res.render('login.html');
});

module.exports=router;





router.post('/',uploads.none(),(req,res,next)=>{

if(req.body.username&&req.body.password){
	
			let queryResult=User_Model.findOne(
				{username:req.body.username,password:req.body.password});

			queryResult.exec((err,result)=>{
				const hash=result?result.hash:null;
				if(hash){
					//构造token
					const tokenId=hashcrypto(new String(hash+''+Date.now()+Math.random()));

					client.set(tokenId,hash,'EX',1800);
					
					//设置cookie
					res.cookie('tokenId',tokenId,{maxAge:1800000});

					res.status(200).end(tokenId);
				}else{
					res.status(302).end();
				}
			});
		}
		else{

			res.status(302).end();
		}

});

