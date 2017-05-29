import React from 'react';
import ReactDOM from 'react-dom';

class Register extends React.Component{


	constructor(props){
		super(props);
	
	}


	render(){
		return (
				<form method={this.props.method} action={this.props.action}>
					<p>注册账户</p>
					<input type="text" placeholder="用户名" id="username" required />
					<input placeholder="密码" type="password" id="password"  required / >
					<input type="text" placeholder="邮箱" id="email" required />
					<input type="submit" id="submit"/>
					<a id="login" href="login">登录</a>
				</form>
			);
	}

	componentDidMount(){

	}


	componentWillUnmount(){

	}

}


ReactDOM.render(
	<Register action="register" method="post"></Register>,
	document.getElementById('register')
);




