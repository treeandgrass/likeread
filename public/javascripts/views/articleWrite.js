import '../../stylesheets/simplemde.min.css';
import '../..//stylesheets/articleWrite.css';
var SimpleMDE=require('simplemde');
var BombBox = require('../../../utils/bombbox/BombBox.js');
var io=require('../../../utils/socket.io.js');



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
	var socket = io.connect('http://localhost:8080/article')
	
	//监听错误事件
	socket.on('error',function(err){
		alert('连接出错');
		socket.open();
	});



	//监听editorArea的change事件
	var ta=document.querySelector('textarea[id=editorArea]');

	ta.addEventListener('input',function(event){
		//组织默认行为和冒泡
		event.preventDefault();
		event.stopPrepagation();

		//获取数据

		var articleValue=simplemde.value();

		var data={'update':articleValue};
		var timeId;
		//通过websockt传输到后端
		
		if(!timeId){
			timeId=setTimeout(function(){//异步事件阻塞的机制，当keyinput停止时执行保存
				clearTimeout(timeId);
				socket.emit('update',data);
			},100);		
		}
	});
})();



