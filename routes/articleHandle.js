const router = require('express').Router();
const multer=require('multer');
const redis=require('../redis/rediscon.js');
const mongoose=require('mongoose');
const ArticleModel=mongoose.model('Article_Model');
const hash=require('../utils/hash.js');

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





router.get('/articleIndex',(req,res,next)=>{

});

router.get('/search',(req,res,next)=>{

});

router.post('/articleWrite',(req,res,next)=>{

});


/**
*文件上传
*/
router.post('/fileUpload',upload.any(),(req,res)=>{
	var file=req.files[0];
	res.send(file.path);
});


/**
*文章编辑页面
*/
router.get('/articleWrite',(req,res,next)=>{
  //创建一篇内容为空的文章，返回—id
  const tokenId=req.cookies.tokenId;
  if(!tokenId){
    res.redirect('../index');
  }else{
    redis.get(tokenId,function(err,reply){

        const article_id=hash(reply);

        const articleModel=ArticleModel({
          article_id:article_id,
          date_of_pub:Date.now(),
          author:reply,
          state:0
        });

        articleModel.save((err,doc)=>{
            if(err){
              console.log(err);
            }else{
              var articleId=doc.article_id;
              res.cookie('articleId',articleId);
            }

            //返回文章编辑页面
            res.render('articleWrite.html');
        });

      });
  } 
});


/**
*文章修改页面
*/
router.get('/articleModify',(req,res,next)=>{
  
});


module.exports=router;