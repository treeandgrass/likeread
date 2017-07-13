import '../../stylesheets/simplemde.min.css';
import '../..//stylesheets/articleWrite.css';
var SimpleMDE=require('simplemde');
var simplemde =new SimpleMDE({
		element: document.getElementById("editorArea"),
		spellChecker: false,
	});