import '../../stylesheets/simplemde.min.css';
import '../../stylesheets/articleWrite.css';
var SimpleMDE=require('../../../utils/bombbox/simplemde.js');
var BombBox = require('../../../utils/bombbox/BombBox.js');
var io =require('socket.io-client');



//初始化SimpleMDE editor
var simplemde =new SimpleMDE({
		element: document.getElementById("editorArea"),
		spellChecker: false,
	});


//初始化BoxbBox,依赖前面的SimpleMDE，网址为图片上传网址

var bombbox = new BombBox(simplemde,
	'http://localhost:3000/articleHandle/fileUpload');


/**
*建立socket连接
*/
(function(){
	//构造socket
	var socket = io('http://localhost:3002/article',{
		path:'/write'
	});
	
	//监听错误事件
	socket.on('error',function(err){
		console.log('连接出错');
		socket.open();
	});


	//处理cookie实体类
	var CookieUtils={
		add:function(name,value,options){
			var str=name+'='+value;
			if(options.expires){
				var time=options.expires;
				var date=new Date(time*3600*1000);
				options.expires=date.toGMTString();
			}

			for(var key in options){
				str+=";"+key+'='+options[key];
			}
			document.cookie=str;
		},

		query:function(key){
			var cookie=document.cookie;
			var index=cookie.indexOf(key);
			if(index<0){
				return;
			}
			var subStr=cookie.substring(index+key.length+1);
			return subStr.split(';')[0];
		},

		delete:function(key){
			var val=query(key);
			var date =new Date();
			date.setTime(Date.now()-1);
			var keyVal=key+'='+val+';'+'expires'+date.toGMTString();
			document.cookie+=keyVal;
		}

	};

	function save(event){
		//获取数据
		var articleValue=simplemde.value();
		var _id=CookieUtils.query('articleId');

		var data={_id:_id,
				title:titleInput.value,
				update:articleValue};
		
		//通过websockt传输到后端

		if(timeId){
			clearTimeout(timeId);
			timeId=null;
		}

		timeId=setTimeout(function(){//异步事件阻塞的机制，当keyinput停止时执行保存
			socket.send(data);
		},100);		
	}

	var titleInput=document.querySelector('input[id=title]');//获取title对象
	var timeId;//保存定时器

	document.addEventListener('keydown',save);
	document.addEventListener('paste',save);
})();



