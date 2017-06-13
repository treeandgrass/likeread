var xhr = new XMLHttpRequest();


//为表单添加submit事件
var post_form = document.getElementsByTagName('form')[0];

post_form.setAttribute('onsubmit','SubmitAjax(this);return false;'); 


function SubmitAjax(formElement){

	if(formElement.method.toUpperCase()==='POST'){
		if(formElement.hasAttribute('action')){
			xhr.open("post",formElement.action,true);
			if(window.FormData){
				var formData = new FormData(formElement);
				xhr.send(formData);

			}else{

				var search='';

				for(var nItem=0;nItem<formElement.elements.length;nItem++){

					if(formElement[nItem].nodeName.toUpperCase()==='INPUT'
						&&formElement[nItem].type.toUpperCase()==='TEXT'){
						search+=formElement[nItem].getAttribute('name')+'='
						+formElement[nItem].getAttribute('value');
					}

				}
				xhr.send(search);
			}
		}
	}


}





//当存在错误结果时，提示消息错误

xhr.onreadystatechange=function(){
	if(xhr.readyState===XMLHttpRequest.DONE){
		if(xhr.status===200){
			//重定向到首页
			window.location.href="index";
		}else if(xhr.status===302){
			
			var p_element=document.createElement('p');
			p_element.innerHTML='用户名或者密码错';
			p_element.setAttribute('id','show_prompt');
			post_form.append(p_element);

			//定时在1秒后移除p_element
			var timeoutID=setTimeout(function(){
				post_form.removeChild(p_element);
				clearTimeout(timeoutID);
			},2000);		
		}else{
			var p_element=document.createElement('p');
			p_element.innerHTML="登录出现错误，请重试";
			p_element.setAttribute("id","show_prompt");
			post_form.append(p_element);
			var timeoutID=setTimeout(function(){
				post_from.removeChild(p_element);
				clearTimeout(timeoutID);
			},2000);
		}
	}
}






