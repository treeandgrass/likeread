// column model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const Column_Schema = new Schema({
									column_id:ObjectId,
									column_name:String,
									article_id:ObjectId
								},
								{collection:'cloumn'});

mongoose.model('Column_Model',Column_Schema);




