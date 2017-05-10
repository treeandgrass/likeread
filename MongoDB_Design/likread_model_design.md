## MongoDB模型设计

User:{
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

Article:{
Id:ObjectId
User_Id:ObjectId
Title:String
Content:String
Date_of_pub:Date
State:Number
Be_like:Array
}

Column:{
Column_Id:ObjectId
Column_Name:String
Article_Id:ObjectId
}

Comment:{
Id:ObjectId
Article_Id:ObjectId
User_Id:ObjectId
Comment:String
Date_of_comm:Date
}

Info:{
Info_Id:ObjectId
User_Id:ObjectId
Info:String
Info_date:Date
}
Question:{
Ques_Id:ObjectId
User_Id:ObjectId
Ques_cont:String
Ques_date:Date
}
Answer:{
Ans_Id:ObjectId
User_Id:ObjectId
Ques_Id:ObjectId
Ans_cont:String
Ans_date:Date
}