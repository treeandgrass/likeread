import '../../stylesheets/simplemde.min.css';
import '../..//stylesheets/articleWrite.css';
var SimpleMDE=require('simplemde');
var BombBox = require('../../../utils/bombbox/BombBox.js');

//初始化SimpleMDE editor
var simplemde =new SimpleMDE({
		element: document.getElementById("editorArea"),
		spellChecker: false,
	});

//初始化BoxbBox,依赖前面的SimpleMDE
var bombbox = new BombBox(simplemde,'http://localhost:3000/articleHandle/fileUpload');//网址为图片上传网址