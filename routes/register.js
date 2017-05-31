const express = require('express');
const router = express.Router();
const User_Model=require('mongoose').model('User_Model');
const hashFun=require('../utils/hash.js');
const mailsend=require('../utils/mailsend.js');


router.get('/',(req,res,next)=>{
	res.render('register.html');
});


router.post('/',(req,res,next)=>{
	// res.redirct('/login');

	
	let hashValue=hashFun(req.body.username+req.body.password+req.body.email)+Date.now();

	let user=new User_Model({
		username:req.body.username,
		password:req.body.password,
		email:req.body.email,
		hash:hashValue,
		active:0
	});
	

	user.save((err)=>{
		if(err){
			res.redirect('register/register_error');
		}else{
			const title='激活你的账户';
			const msg="您刚刚在likeread注册了账户，我们需要您激活你的账户，请点击"+"<a href='http://localhost:3000/register/register_success"+"?hash="+hashValue+"'>激活<a>，或者访问下面的链接进行激活验证："+"http://localhost:3000/register/register_success"+"?hash="+hashValue;
			mailsend(req.body.email,title,msg);
			res.redirect('register/register_finish');
		}
	});

});


router.get('/register_finish',(req,res,next)=>{
	res.render('register_finish.html');
});

router.get('/register_error',(req,res,next)=>{
	res.render('register_error.html');
});

router.get('/register_success',(req,res,next)=>{
	User_Model.update({'hash':req.query.hash.toString()},{'active':1},(err,raw)=>{
		if(err){
			console.log(err);
		}else{

		}
	});
	res.render('register_success.html');
});


module.exports=router;
