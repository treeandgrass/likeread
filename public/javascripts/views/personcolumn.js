import React from 'react';
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class App  extends React.Component{
    render() {
        return (
            <Router>
                <div>
                    <h1>栏目</h1>
                    <ul>
                        <li><Link to="/">个人详情</Link></li>
                        <li><Link to="/modifypass">修改密码</Link></li>
                    </ul>
                    <Route exact path="/" component={PersonDetail}/>
                    <Route path="/modifypass" component={ModifyPass} />
                </div>
          </Router>
          )
    }
  }
  


class ModifyPass extends React.Component{

    constructor(props){
        super(props);
        this.modifyPass=this.modifyPass.bind(this);
    }

    modifyPass(e){
        e.preventDefault();
        e.target.reset();
        var form=e.target;

        var data={};
        var elems=form.elements;
        for(var i=0;i<elems.length;i++){
            var el=elems[i];
            if(el.nodeName.toUpperCase()=='INPUT'){
                data[el.name]=el.value;
            }
        }
        //ajax修改密码密码
        var xhr=getAjax();
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.open('post','http://localhost:3000/personInfoHandle/modifyPass');
        xhr.send(JSON.stringify(data));

        xhr.readystatechange=function(){
            if(xhr.status==200&&xhr.readyState==4){
                var msgEl=document.createElement('div');
                msgEl.cssText="position:absolute;width:100px;height:100px;left:50%;top:50%;margin-top:-50px;margin-left:-50px;font-size:24px;text-align:center;line-height:100px;"
                document.body.append(msgEl);

                setTimeout(function(){
                    document.removeChild(msgEl);//移除提示框
                },1000);
            }
        }
    }


    render(){
        return(
            <div>
                <form  onSubmit={this.modifyPass}>
                    <label>新密码:<input type="text" name="newpasswd"/></label>
                    <label>重复密码：<input type="text" name="repeatnewpasswd"/></label>
                    <label>重置：<input type="submit"/></label>
                </form>
            </div>
        )
    }
} 

class PersonDetail  extends React.Component{
    

    constructor(props){
        super(props);
        this.getPersonMsg=this.getPersonMsg.bind(this);
        this.state={user:null};
    }

    getPersonMsg(){
        var xhr=getAjax();
        xhr.open('post','http://localhost:3000/personInfoHandle/personDetail');
        xhr.readystatechange=function(){
            if(xhr.status==200&&xhr.readyState==4){
                var user=JSON.parse(xhr.responseText);
                this.setState({user:user});
            }
        }
    }

    componentDidMount(){
        this.getPersonMsg();//获取用户数据
    }

    render(){
        if(!this.state.user){
            return(
                <div></div>
            )
        }
        return(
            <div>
                <label>姓名：{this.state.user.name?this.state.user.name:'未填写'}</label>
                <label>邮箱：{this.state.user.email?this.state.user.email:'未填写'}</label>
                <label>年龄：{this.state.user.name?this.state.user.name:'未填写'}</label>
                <label>粉丝数：{this.state.user.followed?this.state.user.followed.length:0}</label>
            </div>
        );
    }

}



function getAjax(){
    var xhr=null;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }else if(window.ActiveObject){
        try{
            xhr=new ActiveObject('Microsoft.XMLHTTP');
        }catch(e){
            xhr=new ActiveObject('MSXML2.XMLHTTP');
        }
    }else{
        alert('your brower don\'t support ajax!' );
    }
    if(xhr)
        return xhr;
}



render(<App/>, document.getElementById('column'))



