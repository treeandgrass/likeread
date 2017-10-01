const loadFiles=require('./loadFiles.js');
const path=require('path');
/*
config path of entries in webpack
*/
var paths=[];
var dirs=__dirname.split(path.sep);
dirs.pop();
dirs.push('views');
paths.push(path.join(...dirs));

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
		var keys=subStr.split(path.sep);
		var key=keys.pop();
		fileMap[key]=entry;
	});
	
	return fileMap;
}

module.exports=getEntries;




