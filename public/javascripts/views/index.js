(function(window){

	var count=0;

	//判断离底部的距离

	function check_bottom(){
		var currentPosition=document.documentElement.clientHeight
				+(document.documentElement.scrollTop||document.body.scrollTop);
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


			var user=obj.user[0];

			var userimg=user.userimg?user.userimg:'http://127.0.0.1:3000/images/common.jpg' //头像
			var date_of_pub=(obj.date_of_pub?new Date(obj.date_of_pub):new Date()).toLocaleDateString().replace(/\//g,'-');//日期
			var username=user.username?user.username:'';//作者名
			var title=obj.title?obj.title:'';//标题
			var content=obj.content?obj.content.substring(0,100):'';//简介
			var articleId=obj.article_id; //文章id
			var likeers = obj.be_like?obj.be_like:0; //喜欢人数
			var followers=obj.followers?obj.followers:0; //收藏人数
			var browse=obj.browse?obj.browse:0; //浏览人数


			liElement.innerHTML=
			`
			<div>
				<img src="${userimg}"/>
				<div>
					<span>${date_of_pub}</span>
					<span>${username}</span>
				</div>
			</div>
			<div>
				<a href="articleHandle/articleIndex/${articleId}">${title}</a>
			</div>
			<div>
				${content}
			</div>
			<div>
				<span class="iconfont_love"><a></a></span><span>${browse}</span>
				<span class="iconfont_browse"><a></a></span><span>${likeers}</span>
				<span class="iconfont_collection"><a></a></span><span>${followers}</span>
			</div>
			`;

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




