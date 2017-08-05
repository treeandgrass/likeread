import React from 'react';
import ReactDOM from 'react-dom';


class EntryComponent extends React.Component{

	constructor(props){
		super(props);
	}

	render(){
		return (
				<div>
					<p>
						<img src={this.props.showmsg.imgsrc}/>
						<font>author</font>
						<font>{this.props.showmsg.date_of_pub}</font>
					</p>
					<p>{this.props.showmsg.content}</p>
					<p>
						<font>{this.props.be_like.length}</font>
					</p>
				</div>
			);
	}


}


class ContainerApp extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const entries=this.props.map(entry=>{
			<EntryComponent showmsg={entry}/>
		});
		return(
				<div>
					{entries}
				</div>
			);
	}

}
