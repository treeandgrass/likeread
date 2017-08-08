//comment model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Comment_Schema = new Schema({
						article_id:String,
						user_id:String,
						comment:String,
						date_of_comm:Date
					},
					{collection:'comment'});
mongoose.model('Comment_Model',Comment_Schema);



