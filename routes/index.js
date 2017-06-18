const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const Article_Model=mongoose.model('Article_Model');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});


router.post('/page',(req,res,next)=>{
	var article_model_exec=Article_Model.find({}).sort({date:-1}).skip(req.body.position).limit(20);
	article_model_exec.exec((err,result)=>{
		res.end(JSON.stringify(result));
	});
});



module.exports = router;
