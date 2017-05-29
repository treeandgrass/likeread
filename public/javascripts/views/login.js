import React from 'react';
import ReactDOM from 'react-dom';

class Login_Form extends React.Component{

	constructor(props){
		super(props);
		this.state={login:{
				url:'login',
				method:'post',
				register_url:'/register'
			}};
	}


	componentDidMount(){
		
	}


	componentWillUnmount(){

	}



	render(){
		return (
					<form action={this.state.login.url} method={this.state.login.method}>
						<p id="login_font">密码登录</p>
						<label><input name="username" placeholder="账号/邮箱/手机" type="text" required /></label>
						<label><input name="password" placeholder="密码" type="password" required /></label>
						<label><input  id="submit_input" type="submit" value="登录"/></label>
						<a  id="register" href={this.state.login.register_url}>注册</a>
					</form>
			);

	}

}


const login_form = <Login_Form/>

ReactDOM.render(
		login_form,
		document.getElementById('login')
	);


