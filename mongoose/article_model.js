const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const Article_Schema= new Schema({
								article_id:String,
								title:String,
								content:String,
								date_of_pub:Date,
								author:String,
								state:Number,
								be_like:Number,
								followers:Number,
								browse:Number
								},
								{collection:'article'});

mongoose.model('Article_Model',Article_Schema);