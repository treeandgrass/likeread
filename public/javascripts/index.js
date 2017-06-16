

//判断离底部的距离

function check_bottom(){
	var currentPosition=document.clientHeight+(document.documentElement.scrollTop||document.body.scrollTop);
	if(document.documentElement.scrollHeight-200<currentPosition){
		return true;
	}else{
		return false;
	}
}





//DOM操作
function insertPageToDom(data){
	var jsonData=JSON.parse(data);
	console.log(jsonData);
}


//ajax请求事件
function ajax_request_pages(position){
	var xhr;

	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}else if(window.ActiveXObject){
		try{
			xhr=new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				xhr=new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){

			}
			
		}
		
	}

	if(!xhr){
		alert("your browser did'nt suppport ajax");
		return false;
	}



	xhr.open("POST",'http://localhost:3000/index/page',true);

	xhr.send(null);
	xhr.onreadystatechange=function(){
		if(xhr.readyState===4){
			if(xhr.status===200){
				insertPageToDom(xhr.responseText);
			}
		}
	}

}








//在首次文档加载完成后调用事件
window.onload=function(){
	ajax_request_pages(0);
}




