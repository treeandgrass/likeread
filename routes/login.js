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

if(()=>{
		//检查用户名和密码是否合法
		if(req.body.username){
			return false;
		}
		if(req.body.password){
			return false;
		}

			return true;
		}){

			let queryResult=User_Model.find({username:req.body.username,password:req.body.password});
			queryResult.exec((err,result)=>{
				str_res=JSON.stringify(result);
				debugger;
				//str_res=="[]"
				if(str_res!==null&&str_res.length>2){
					resp.redirect('/index');
				}else{
					//重定向到首页
					resp.render('login.html');
				}
			});
		}
		else{
				//重定向到登录页面
				/*resp.redirect(url.format({
					pathname:'/',
					query:{
						err:'your name'
					}
				}));*/

			resp.render('login.html');
		}

});









