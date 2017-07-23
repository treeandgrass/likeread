var express = require('express');
const mongoose = require('mongoose');
const UserModel=mongoose.model('User_Model');

var router = express.Router();
const ObjectId = mongoose.Schema.Types.ObjectId;

/* GET users listing. */
router.get('/', function(req, res, next) {

	var user_model = new UserModel({username:'xiao',email:'email@.com'});
	user_model.save((err,re)=>{
		console.log(err,re);
	});
	
	res.render('user.html');
});


module.exports = router;
