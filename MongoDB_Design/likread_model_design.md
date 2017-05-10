## MongoDB模型设计

#### collection User

{

Id:ObjectId
Username:String
Passwd:String
Email:Array
Tel:Array
registerDate:Date
Level:Number
Attention:Array
Followed:Array
Like:Array


}

#### collection Article

{

Id:ObjectId
User_Id:ObjectId
Title:String
Content:String
Date_of_pub:Date
State:Number
Be_like:Array

}

#### collection Column

{

Column_Id:ObjectId
Column_Name:String
Article_Id:ObjectId

}

#### collection Comment

{

Id:ObjectId
Article_Id:ObjectId
User_Id:ObjectId
Comment:String
Date_of_comm:Date

}

#### collection Info

{

Info_Id:ObjectId
User_Id:ObjectId
Info:String
Info_date:Date

}

#### collectionQuestion

{

Ques_Id:ObjectId
User_Id:ObjectId
Ques_cont:String
Ques_date:Date

}


#### collection Answer

{

Ans_Id:ObjectId
User_Id:ObjectId
Ques_Id:ObjectId
Ans_cont:String
Ans_date:Date

}