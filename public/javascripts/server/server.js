import App from'../common/App';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import React from'react'
import ReactDOM  from 'react-dom'
import counterApp from '../common/counterApp';
import {renderToString} from 'react-dom/server';



module.exports=function handlerRender(req,res,result){
	const store=createStore(counterApp,result);
		const html=renderToString(
			<Provider store={store}>
				<App/>
			</Provider>
		);
		
	res.send(renderFullPage(html,result));
}

function renderFullPage(html,preloadedState){
	return `
		<!doctype html>
		<html>
			<head>
				<title>
					${preloadedState.title}
				</title>
				<base href="http://localhost:3000/index"/>
				<base target="_blank" href="http://localhost:3000/index"/>
				<link rel="stylesheet" href="../../stylesheets/articledetail.css"/>
			</head>
			<body>
				<div id="nav_index"></div>
				<div id="root">
					${html}
				</div>
				<script>
					window.__preloadedState=${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
				</script>
				<script src="../../javascripts/dist/manifest.js"></script>
				<script src="../../javascripts/dist/vendor.js"></script>
				<script src="../../javascripts/dist/nav_index.js"></script>
				<script src="../../javascripts/dist/client.js"></script>
			</body>
		</html>
	`;
} 





