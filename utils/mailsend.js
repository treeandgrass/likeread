const nodemailer=require('nodemailer');

module.exports=(email,title,data)=>{
	let transporter=nodemailer.createTransport({
		host:'smtp.126.com',
		secure:true,
		auth:{
			user:'treeandgrass126@126.com',
			pass:'987654321My'

		},
	});

	let mailOptions={
		from:'treeandgrass126@126.com',
		to:email,
		subject:title,
		text:data,
		html:'<b>'+data+'</b>'
	};


	transporter.sendMail(mailOptions,(err,info)=>{
		if(err){
			console.log(err);
		}
		else{
			console.log(info);
		}
	});
}