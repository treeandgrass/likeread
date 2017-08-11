import React from 'react'
import  {connect} from 'react-redux'
import styles from '../stylesheets/articlePage.css'

class MainSection extends React.Component{

	constructor(props){
	
		super(props);
		this.handleClick=this.handleClick.bind(this)

	}

	componentDidMount(){


	}


	handleClick(e){
		e.preventDefault();
		const onClick=props.onClick;
		onClick(e.target.id);//dom id as a identifier to decide action
	}


	render(){

		return(
				<div>
					<div className={styles.title}></div>
					<div className={styles.author}></div>
					<div className={styles.sec}></div>
					<div className={styles.info}>
						<span><a onClick={this.handleClick}></a></span><span></span>
						<span><a onClick={this.handleOnclick}></a></span><span></span>
						<span><a onClick={this.handleOnClick}></a></span><span></span>
					</div>
					<div className={styles.comment}></div>
				</div>
			);

	}

}


//send params

const Container=(state,onClick)=>(

	<MainSection state={state} click={onClick}/>

)



const mapStateToProps=(state,ownProps)=>(
	return{
		satte:state
	}
)

const DispatchToProps=(dispatch,ownProps)=>(
	return{
		onClick:(id)=>{
				const p = new Promise((resolve,reject)=>{

					var xhr;

					if(window.XMLHttpRequest){

						xhr=new XMLHttpRequest();

					}else{

						if(window.ObjectActive){
							try{
								xhr=new ObjectActive('Microsoft.XMLHTTP');
							}catch(e){
								try{
									xhr=new ObjectActive('Ms2.XMLHTTP');
								}catch(e){

								}
							}
						}
					}

					if(!xhr){
						//not support ajax
						reject();
					}


					xhr.open(ownProps.m,ownProps.url,ownProps.aysn);

					xhr.send(ownProps.data?ownProps.data:'');



					xhr.onreadystatechange=function(){
						if(xhr.readyState===4&&xhr.status==200){
							resolve(xhr.responseText);
						}
					}

			});

			p.then((value)=>{
				dispatch( handleById( id ) ) //dispatch action
			}).catch((err)=>{
				//err and do notthing
			})
		}
	}
)

//emit action
const handleById=(id)=>{
	if(id=='browse'){
		return {
			type:'HANDLE_CLICK_ACTION',
			state:{}
		}
	}else if(id=='love'){
		return {
			type:'HANDLE_CLICK_ACTION',
			state:{}
		}
	}else{
		return {
			type:'HANDLE_CLICK_ACTION',
			state:{}
		}
	}
	
}


//container component

const App=connect(mapStateToProps,mapDispatchToProps)(Container);

export default App;

