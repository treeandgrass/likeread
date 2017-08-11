const conterApp=(state,action)=>{
	switch(action.type){
		case 'HANDLE_CLICK_ACTION':
			return action.state
		default:
			return state
	}
}