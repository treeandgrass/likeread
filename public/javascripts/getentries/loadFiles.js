var fs=require('fs');
var path=require('path');

function loadFiles(dir){
	var stat=fs.statSync(dir);
	if(stat.isDirectory()){
		var files=fs.readdirSync(dir,'utf8');
		files.forEach(function(file){
				loadFiles(path.join(dir,file));
			});
	}else{
		loadFiles.ret.push(dir);
	}
}


module.exports=loadFiles;