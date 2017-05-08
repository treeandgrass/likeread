//连接数据库

const mongoose=require('mongoose');
mongoose.Promise=global.Promise;


const Schema=mongoose.Schema;

const  userSchema=new Schema({
	user_id:mongoose.Schema.Types.ObjectId,
	username:String,
	email:Array,
	tel:Array,
	registerDate:Date,
	level:Number,
	attention:Array,
	followed:Array,
	like:Array

},{collection:'data'});

mongoose.model('UserModel',userSchema);









