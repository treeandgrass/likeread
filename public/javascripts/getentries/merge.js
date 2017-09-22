const loadFiles=require('./loadFiles.js');

/*
config path of entries in webpack
*/

var paths=[
	'D:/node/likeread/public/javascripts/views'
];

//path array
var entries=[];

paths.forEach(function(path){
	loadFiles.ret=[];
	loadFiles(path);
	loadFiles.ret.forEach(function(file){
		entries.push(file);
	});
});

function getEntries(){
	var fileMap={};
	entries.forEach(function(entry){
		var index=entry.lastIndexOf('.');
		var subStr=entry.substring(0,index);
		var keys=subStr.split('\\');
		var key=keys.pop();
		fileMap[key]=entry;
	});
	
	return fileMap;
}

module.exports=getEntries;




