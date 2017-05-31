//连接数据库

const mongoose=require('mongoose');
mongoose.Promise=global.Promise;


const Schema=mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;

const  UserSchema=new Schema({
	user_id:ObjectId,
	username:String,
	password:String,
	email:Array,
	tel:Array,
	registerDate:Date,
	level:Number,
	attention:Array,
	followed:Array,
	like:Array,
	hash:String,
	active:Number
},{collection:'data'});

mongoose.model('User_Model',UserSchema);









