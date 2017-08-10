import Reatc from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import provider from 'react-redux'

const preloadedState=window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store=createStore(counterAPP,preloadedState);

render(
		document.getElementById('root');
	);