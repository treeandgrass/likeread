const mongoose = require('Mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Ques_Schema = Schema({
				ques_Id:ObjectId,
				user_Id:ObjectId,
				ques_cont:String,
				ques_date:Date
			},{collection:'data'});


mongoose.model('Ques_Model',Ques_Schema);

