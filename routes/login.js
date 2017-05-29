// login action

const  express = require('express');
var mongoose = require('mongoose');

const User_Model = mongoose.model('User_Model');

// const url=require('url');


const router = express.Router();

router.get('/',(req,res,next)=>{
	res.render('login.html');
});

module.exports=router;





router.post('/',(req,resp,next)=>{

if(req.body.username&&req.body.password){

			let queryResult=User_Model.find({username:req.body.username,password:req.body.password});
			queryResult.exec((err,result)=>{
// 				str_res=JSON.stringify(result);
				debugger;
				//str_res=="[]"
				console.log(result.username);
				console.log(result.password);
				if(result.username&&result.username===req.body.username&&result.password&&result.password===req.body.password){
					resp.redirect('/index');
				}else{
					//重定向到首页
					resp.send('密码或者用户名错误！');
				}
			});
		}
		else{

			resp.send('密码或者用户名错误！');
		}

});

