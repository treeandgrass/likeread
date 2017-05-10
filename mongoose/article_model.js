const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const Article_Schema= new Schema({
								article_id:ObjectId,
								user_id:ObjectId,
								title:String,
								content:String,
								date_of_pub:Date,
								state:Number,
								be_like:Array
								},
								{collection:'data'});

mongoose.model('Artcile_Model',Article_Schema);