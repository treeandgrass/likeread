//连接数据库

const mongoose=require('mongoose');
mongoose.Promise=global.Promise;


const Schema=mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;

const  UserSchema=new Schema({
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
	active:Number,
	url:String
},{collection:'user'});

mongoose.model('User_Model',UserSchema);









