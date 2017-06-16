module.exports=function(url){
	if(url.endsWith('/index')){
		return true;
	}
	else if(url.endsWith('praise')){
		return true;
	}else{
		return false;
	}
}