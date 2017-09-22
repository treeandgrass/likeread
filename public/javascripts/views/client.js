import React from 'react';
import ReactDOM from 'react-dom';
import App from '../common/App';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import counterApp from '../common/counterApp';






const preloadedState=window.__preloadedState;
delete window.__preloadedState;

const store=createStore(counterApp,preloadedState);


ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);