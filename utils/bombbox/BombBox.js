//引入弹框样式
require('./BombBox.css');

(function(global,factory){
	// typeof exports==='object' && typeof module!=='undefined'?module.exports=factory() :
	typeof define==='function' && define.amd? define(factory) :
	(global.BombBox=factory()) 
})(this,function(){ 'use strict';

		
		function BombBox(editor,URL){

			this.editor=editor;
			this.URL=URL;
			//缓存this
			var self=this;

			//在初始化时覆盖元素的onclick事件
			var img=document.querySelector('[class="fa fa-picture-o"]');
			var oldClickEvent=img.onclick;
			img.onclick=function(e){
				self.createBombBox();
			}

			//数据劫持，当BombBox的imageURL改变时，调用oldClick事件
			Object.defineProperty(this,'imageURL',{
				enumerable:true,
				configurable:true,
				get:function(){
					return this.imageURL;
				},
				set:function(newVal){
					this.value=newVal;
					self.editor.options.imageURL=newVal;
					document.body.removeChild(transparentDiv);//移除BombBox
					var event=new Event('click',{"bubbles":true,"cancelable":true});//oldClick为simplemde中方法，需要event对象
					oldClickEvent(event);
				}
			});

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
							<input id="displayFileInput" name="uploadimage" accept="image/*" type="file" style="display:none;"/>
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
		*添加事件监听
		*
		*/
		function eventDelegation(self){

				//以事件委托的方式处理点击事件
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
							removeBombBox(self,event);
							break;
						case 'cancel': //放弃插入图片
							removeBombBox(self,event);
							break;
						case 'selctedImg':
							selectedImg(self,event);
							break;
						default:   //默认不做任何操作
							break;

					}
					
			});


			//为文件<input id="displayFileInput">添加onchange事件，显示图片
			var imageInput=transparentDiv.querySelector('input[id=displayFileInput]');

			imageInput.addEventListener('change',function showFileName(event){
				var fileName=event.target.files[0].name;
				var nameInput=document.querySelector('input[id=nurl]');
				nameInput.value=fileName;
			});

		}
		


		/**
		*点击激发<input id="selctedImg type="file"/>
		**/
		function selectedImg(self,event){
			//阻止默认事件
			event.preventDefault();
			event.stopPropagation();

			var imgInput=document.querySelector('input[id="displayFileInput"]');
			imgInput.click();
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

		function httpRquest(self,Method,URL,ASYN,Data){

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
			

			xhr.send(Data);

			//接受返回的数据
			xhr.onreadystatechange=function(){
				if(xhr.readyState===XMLHttpRequest.DONE&&xhr.status===200){
					self.imageURL=xhr.responseText;
				}
			}

		}


		/**
		*
		*文件上传事件处理器
		*/
		function fileUploadHandler(self,event){
			var target=event.target;
			var NFileInput=transparentDiv.querySelector('[id="nurl"]');
			var LRFileInput=transparentDiv.querySelector('[id="lrurl"]');
			var FileInput=document.querySelector('input[id="displayFileInput"]');

			var formData;
			if(window.FormData){
				formData=new FormData();
			}else{
				alert('your browser not supported FormData');
			}

			if(NFileInput.style.display==='none'){
				formData.appned('lrFileURL',LRFileInput);
			}else{
				formData.append('nFileName',NFileInput);
				var file=FileInput.files[0];
				formData.append(file.name,file);
			}

			//URL为传入的参数
			httpRquest(self,'POST',self.URL,true,formData,'multipart/form-data');
		}


		/**
		*取消事件处理器
		*
		*/
		function removeBombBox(self,event){
			document.body.removeChild(transparentDiv);
		}



		//返回BombBox
		return BombBox;

});