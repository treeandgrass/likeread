var express = require('express');
const mongoose = require('mongoose');
const UserModel=mongoose.model('User_Model');

var router = express.Router();
const ObjectId = mongoose.Schema.Types.ObjectId;
const connection = mongoose.connect('mongodb://localhost/likeread').connection;
connection.on('error',(err)=>{
		console.log(err);
	})
	.on('open',(res)=>{
		console.log('success!');
	});


/* GET users listing. */
router.get('/', function(req, res, next) {

	var user_model = new UserModel({username:'xiao',email:'email@.com'});
	user_model.save((err,re)=>{
		console.log(err,re);
	});
	connection.close((err,re)=>{
		console.log(err,re);
	});
	
	res.render('user.html');
});


module.exports = router;
