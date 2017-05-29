// Answer model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Ans_Schema=new Schema({
					ans_id:ObjectId,
					user_id:ObjectId,
					ques_id:ObjectId,
					ans_cont:String,
					ans_date:Date
				},{collection:'data'});


mongoose.model('Ans_Schema',Ans_Schema);



