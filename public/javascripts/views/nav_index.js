import React from 'react';
import ReactDOM from 'react-dom';

import '../../stylesheets/nav_index.css'
//为Array 绑定方法
(function(){
	Array.prototype.objToArray=function(obj){
		var array=[];
		for(var key in obj){
			array.push(obj[key]);
		}
		return array;
	}
})();

class LoginState extends React.Component{

	constructor(props){
		super(props);
	}


	componentDidMount(){
	}	

	render(){

		if(this.props.loginState.username){
			return(
				<div>
					<span>{this.props.loginState.username}</span>
					<a href={this.props.URLS.logoutURL}><span>注销</span></a>
				</div>

				);

		}else{
			return (
				<div>
					<a href={this.props.URLS.loginURL}><span>登录</span></a>
					<a href={this.props.URLS.registerURL}><span>注册</span></a>
				</div>
			);
		}
		
	}

}


class SearchComponent extends React.Component{
	
	constructor(props){
		super(props);
	}


	

	componentWillMount(){


	}


	render(){
		return (
				<form method='get' action='search'>
					<div><input  type="text" name="searchContent"/></div>
					<div><input type="submit" value="搜索"/></div>
				</form>
			);

	}



	componentDidMount(){



	}


	componentWillUnmount(){


	}


}



class NavComponent extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillMount(){


	}

	render(){
		if(this.props.loginState.username){
			return (
				<div>
					<a href={this.props.URLS.writeURL}><span>写文章</span></a>
					<a href={this.props.URLS.personURL}><span>个人主页</span></a></div>
			);
		}else{
			return(
				<div><a href={this.props.URLS.writeURL}><span>写文章</span></a></div>
			);
		}
	}

	componentDidMount(){


	}


	componentWillUnmount(){


	}
}



class ControllerComponent extends React.Component{

	constructor(props){
		super(props);
		this.state={loginState:{username:null}};
		this.URLS={writeURL:'articleHandle\/articleWrite',personURL:'personInfoHandle\/personPageMain',loginURL:'login',registerURL:'register',logoutURL:'logout'};
		this.Ajax=Ajax.bind(this);
	}





	render(){

		return (
			<div>
				<LoginState URLS={this.URLS} loginState={this.state.loginState} />
				<SearchComponent action="search" />
				<NavComponent URLS={this.URLS} loginState={this.state.loginState}/>
			</div>
		);
	}

	componentDidMount(){
		this.Ajax(...Array.prototype.objToArray.call(null,this.props.req));
	}

}



function Ajax(method,url,asyn,data){
	var xhr;
	var component=this;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}
	else if(window.ObjectActive){
		try{
			xhr=new ObjectActive('Microsoft.XMLHTTP');
		}catch(e){
			xhr=new ObjectActive('Ms2.XMLHTTP');
		}
	}

	if(!xhr){
		return;
	}

	xhr.open(method,url,asyn);

	//设置发送消息格式
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.send(JSON.stringify({'tokenId':data}));

	xhr.onreadystatechange=function(){
		if(xhr.readyState==XMLHttpRequest.DONE&&xhr.status==200){
			var user=JSON.parse(xhr.responseText);
			component.setState({loginState:user});
		}
	}
}


//cookie操作类
var cookieUtil={
	addCookie:function(name,val,options){
		var str=name+'='+val;
		if(options.expires){
			var date=new Date();
			date.setTime(options.expires*3600*1000);
			options.expires=date.toGMTString();
		}

		for(var key in options){
			str+=key+'='+options.key;
		}
		document.cookie=str;
	},


	//根据key查询cookie
	queryCookie:function(name){
		var cookie=document.cookie;
		var startIndex=cookie.indexOf(name);
		var suplusCookie=cookie.slice(startIndex+name.length+1);
		return suplusCookie;
	},

	//删除cookie
	deleteCookie:function(name){
		var val=queryCookie(name);
		var date=new Date();
		date.setTime(date.getTime()-1);
		document.cookie=name+'='+val+'expires='+date.toGMTString();
	}

}


//构造数据
var req={method:'post',
		url:'http://localhost:3000\/nav_index\/checklogin',
		asyn:true,
		data:cookieUtil.queryCookie('tokenId').split(';')[0]
}


//渲染DOM
ReactDOM.render(
		<ControllerComponent 
			req={req}/>,
		document.getElementById('nav_index')
	);

