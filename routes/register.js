const express = require('express');
const router = express.Router();



router.get('/',(req,res,next)=>{
	res.render('register.html');
});


router.post('/',(req,res,next)=>{
	res.redirct('/login');
});

module.exports=router;