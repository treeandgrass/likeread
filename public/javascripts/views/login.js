import React from 'react';
import ReactDOM from 'react-dom';

class Login_Form extends React.Component{

	constructor(props){
		super(props);
		this.state={login:{
				url:'login',
				method:'post'
			}};
	}


	componentDidMount(){
		
	}


	componentWillUnmount(){

	}



	render(){
		return (
				<div id="container">
					<form action={this.state.login.url} method={this.state.login.method}>
						<p id="login_font">密码登录</p>
						<p><label><input name="username" placeholder="账号/邮箱/手机" type="text"/></label></p>
						<p><label><input name="password" placeholder="密码" type="password"/></label></p>
						<p><label><input  id="submit_input" type="submit" value="登录"/></label></p>
					</form>
					<p id="register"><a  href="register"><span>注册</span></a></p>
				</div>
			);

	}

}


const login_form = <Login_Form/>

ReactDOM.render(
		login_form,
		document.getElementById('login')
	);


