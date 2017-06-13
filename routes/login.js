
const multer=require('multer');
const  express = require('express');
var mongoose = require('mongoose');

const User_Model = mongoose.model('User_Model');

// const url=require('url');

const uploads=multer({dest:'uploads/'});




const router = express.Router();

router.get('/',(req,res,next)=>{
	res.render('login.html');
});

module.exports=router;





router.post('/',uploads.none(),(req,res,next)=>{

if(req.body.username&&req.body.password){

			let queryResult=User_Model.find(
				{username:req.body.username,password:req.body.password});

			queryResult.exec((err,result)=>{

				if(result.length>0){
					res.status(200).end();
				}else{
					res.status(302).end();
				}
			});
		}
		else{

			res.status(302).end();
		}

});

