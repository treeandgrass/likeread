// login action

const  express = require('express');
const mongoose = require('mongoose');

const User_Model = mongoose.model('User_Model');


const router = express.Router();

router.get('/',(req,res,next)=>{
	res.render('login.pug');
});

module.exports=router;







