const router = require('express').Router();
const multer=require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../likeread/uploads')
  },
  filename: function (req, file, cb) {
  	var formIndex=file.fieldname.lastIndexOf('.');
  	var suffix=file.fieldname.substring(0,formIndex-1);
  	prefix=file.fieldname.substring(formIndex+1)
    cb(null, suffix + '-' + Date.now()+'.'+prefix)
  }
})

var upload = multer({ storage: storage })



router.get('/index',(req,res,next)=>{

});

router.get('/search',(req,res,next)=>{

});

router.post('/articleWrite',(req,res,next)=>{

});


router.post('/fileUpload',upload.any(),(req,res)=>{
	var file=req.files[0];
	res.send(file.path);
});

router.get('/articleWrite',(req,res,next)=>{
	res.render('articleWrite.html');
});




module.exports=router;