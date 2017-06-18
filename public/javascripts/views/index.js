(function(window){

	var count=0;

	//判断离底部的距离

	function check_bottom(){
		var currentPosition=document.documentElement.clientHeight+(document.documentElement.scrollTop||document.body.scrollTop);
		if(document.documentElement.scrollHeight<=currentPosition){
			return true;
		}else{
			return false;
		}
	}




	//DOM操作
	function insertPageToDom(data){
		var jsonArray=JSON.parse(data);
		var divElement = document.createElement('div');
		var ulElement=document.createElement('ul');
		jsonArray.forEach(function(obj){
			var liElement=document.createElement("li");
			liElement.innerHTML=`<p><h2>${obj.title}</h2></p>
			<p>${obj.content}</p>
			<p>${obj.date_of_pub}</p>`;
			ulElement.append(liElement);
		});

		divElement.append(ulElement);
		var fragment=document.createDocumentFragment();
		fragment.appendChild(divElement);
		var container=document.querySelector('.middle_div_container');
		container.append(fragment);
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

		//设置请求头
		xhr.setRequestHeader("Content-Type","application/json");

		xhr.send(JSON.stringify({"position":position}));
		xhr.onreadystatechange=function(){
			if(xhr.readyState===4){
				if(xhr.status===200){
					insertPageToDom(xhr.responseText);
				}
			}
		}

	}




	window.onload=function(){
		//在首次文档加载完成后调用事件
		ajax_request_pages(count++);
	}


	//事件监听实现懒加载
	document.addEventListener('scroll',function(){
		if(check_bottom()){
			ajax_request_pages(count*20);
			count++;
		}
	});

})(window);




