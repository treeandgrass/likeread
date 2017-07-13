var router = require('express').Router();

router.get('/index',(req,res,next)=>{

});

router.get('/search',(req,res,next)=>{

});

router.post('/articleWrite',(req,res,next)=>{

});


router.get('/articleWrite',(req,res,next)=>{
	res.render('articleWrite.html');
});




module.exports=router;