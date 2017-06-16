//Info model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=mongoose.Schema.Types.ObjectId;
const Info_Schema=new Schema({
					info_Id:ObjectId,
					user_Id:ObjectId,
					info:String,
					info_date:Date
				},{collection:'info'});


mongoose.model('Info_Model',Info_Schema);

