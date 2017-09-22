const counterApp=(prestate,action)=>{
	switch(action.type){
		case 'HANDLE_CLICK_BROWSE':
			prestate.browse=prestate.browse+1;
			return prestate;
		case 'HANDLE_CLICK_LOVE':
			prestate.be_like=prestate.be_like+1;
			return prestate;
		case 'HANDLE_CLICK_FOLLOWER':
			prestate.followers=prestate.followers+1;
			return prestate;
		default:
			return prestate;
	}
}
module.exports=counterApp;