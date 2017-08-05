const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const Article_Model=mongoose.model('Article_Model');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});


router.post('/page',(req,res,next)=>{
	var article_model_exec=Article_Model.aggregate([{
		$lookup:
     	{
       		from:'user',
       		localField:'author',
       		foreignField:'hash',
       		as:'user'
     	},
	},
	{ $skip:req.body.position},
	{$sort:{date_of_pub:-1}}],
	(err,result)=>{
		//查询
		res.end(JSON.stringify(result));
	
	});
});



module.exports = router;
