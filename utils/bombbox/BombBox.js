//引入弹框样式
require('./BombBox.css');

(function(global,factory){
	// typeof exports==='object' && typeof module!=='undefined'?module.exports=factory() :
	typeof define==='function' && define.amd? define(factory) :
	(global.BombBox=factory()) 
})(this,function(){ 'use strict';
		
	
		//保存数据
		var ImageURL;


		var oldClickEvent;

		
		function BombBox(editor,URL){

			this.editor=editor;
			this.URL=URL;
			//缓存this
			var self=this;

			//在初始化时覆盖元素的onclick事件
			var img=document.querySelector('[class="fa fa-picture-o"]');
			oldClickEvent=img.onclick;
			img.onclick=function(e){
				self.createBombBox();
			}

		}

	
		
		
		//创建遮罩DIV
		var transparentDiv;


		/**创建DOM弹框
		*
		*/
		BombBox.prototype.createBombBox=function(){
			transparentDiv = document.createElement('div');
			transparentDiv.setAttribute('id','shadowbombbox');
			// transparentDiv.name="shadowbombbox";
			transparentDiv.setAttribute('class','bombbox_shadow');
			//es6模板字符串
			var html=`

					<div class="bombbox_container">
						<div class="bombbox_title_box">
							<h2>图片上传</h2>
						</div>
						
						<ul>
							<li id="nuploadselected">本地上传</li>
							<li id="lruploadselected">远程上传</li>
							<li class="station"></li>
						</ul>	
					
						<div>
							<input class="nfileinput" id="nurl" placeholder="本地文件"/>
							<input id="displayFileInput" type="file" style="display:none;"/>
							<button id="selctedImg" class="nbutton">选择图片</button>
							<input id="lrurl" placeholder="图片网址" type="text" class="lrfileInput"/>
						</div>
						<div>
							<button id="insert" class="insertButton">插入</button>
							<button id="cancel" class="cancleButton">取消</button>
						</div>
				</div>`;

			transparentDiv.innerHTML=html;
			//将弹框插入Body中
			document.body.append(transparentDiv);

			eventDelegation(this);//注册监听事件
		}





		/**
		*
		*以事件委托的方式处理事件
		*
		*/
		function eventDelegation(self){

				transparentDiv.addEventListener('click',function(event){

					var target=event.target;

					switch(target.id){
						case 'nuploadselected':  //选择本地上传
							uploadSelectedHandler(self,event);
							break; 
						case 'lruploadselected':  //选择远程上传
							uploadSelectedHandler(self,event);
							break;
						case 'insert':    //插入图片
							fileUploadHandler(self,event);
							break;
						case 'shadowbombbox': //放弃插入图片
							cancleHandler(self,event);
							break;
						case 'cancel': //放弃插入图片
							cancleHandler(self,event);
							break;
						default:   //默认不做任何操作
							break;

					}
					
			});
		}
		

		/**
		*
		*js 动态修改样式
		*/
		function uploadSelectedHandler(self,evnt){
			//获取操作的DOM
			var NUploadSelectedLi=transparentDiv.querySelector('[id="nuploadselected"]');	
			var LRUploadSlectedLi=transparentDiv.querySelector('[id="lruploadselected"]');	
			var NFileInput=transparentDiv.querySelector('[id="nurl"]');
			var LRFileInput=transparentDiv.querySelector('[id="lrurl"]');	
			var SelctedImg=transparentDiv.querySelector('[id="selctedImg"]');	
			

			if(NFileInput.style.display==='none'){
				NFileInput.style.display='initial';
				LRFileInput.style.display='none';
				SelctedImg.style.display='initial';
				styleBorderNone(LRUploadSlectedLi);
				styleBorderShow(NUploadSelectedLi);
			}
			else{
				NFileInput.style.display='none';
				SelctedImg.style.display='none';
				LRFileInput.style.display='initial';
				styleBorderNone(NUploadSelectedLi);
				styleBorderShow(LRUploadSlectedLi);
			}

		}


		function styleBorderNone(elem){
			elem.style.border="none";
			elem.style.borderBottom='1px solid';
			elem.style.borderColor='rgb(240,240,240)';
		}

		function styleBorderShow(elem){
			elem.style.border="1px solid";
			elem.style.borderBottom='none';
			elem.style.borderColor='rgb(240,240,240)';
		}



		/**
		*封装XHR
		*
		*/

		var xhr;

		function httpRquest(Method,URL,ASYN,Data){
			//创建xhr对象
			if(window.XMLHttpRequest){
				xhr=new XMLHttpRequest();
			}
			else if(window.ObjectActive){
				try{
					xhr=new ObjectActive('Microsoft.XMLHTTP');
				}catch(e){
					try{
						xhr=new ObjectActive('Ms2.XHLHTTP');
					}catch(e){
						alert('你的浏览器不支持AJAX，请升级浏览器！');
					}
				}
				
			}


			xhr.open(Method,URL,ASYN);

			xhr.send(data);

			//接受返回的数据
			xhr.onreadystatechange=function(){
				if(xhr.readyState===XMLHttpRequest.DONE&&xhr.status===200){
					ImageURL=xhr.responseText;
				}
			}

		}


		/**
		*
		*文件上传事件处理器
		*/
		function fileUploadHandler(self,event){
			var target=event.target;
			var NFileInput=transparentDiv.querySelector('[name="nurl"]');
			var LRFileInput=transparentDiv.querySelector('[name="lrurl"]');

			var formData;
			if(window.FormData){
				formData=new FormData();
			}else{
				alert('your browser not supported FormData');
			}

			if(NFileInput.style.display==='none'){
				formData.appned(LRFileInput);
			}else{
				formData.append(NFileInput);
			}

			//URL为传入的参数
			httpRquest('POST',self.URL,true,formData);

			//更新editor的URL
			self.options.promptURLs=ImageURL;

			//图片上传成功执行原有事件
			oldClickEvent(event);
		}


		/**
		*取消事件处理器
		*
		*/
		function cancleHandler(self,event){
			document.body.removeChild(transparentDiv);
		}



		//返回BombBox
		return BombBox;

});