//comment model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Comment_Schema = new Schema({
						id:ObjectId,
						article_id:ObjectId,
						user_id:ObjectId,
						comment:String,
						date_of_comm:Date
					},
					{collection:'data'});
mongoose.model('Comment_Model',Comment_Schema);



