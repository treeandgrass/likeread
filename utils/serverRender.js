import path from 'path';
import React from 'react';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {renderString} from 'react-dom/server'


function  handleRender(req,res,next){

	const store=createStore(counterApp);
	const html=renderString(

		);

	const preloadedState=store.getState();
	res.send(renderFullPage(html,preloadedState));
}

function renderFullPage(title,html,preloadedState){
	return `
		<!doctype html>
		<html>
			<head>
				<title>{$title}</title>
			</head>
			<body>
				<div id="root">${html}</div>
				<script>
					window.__PRELOADED_STATE__=${JSON.stringify(preloadedState).replace(/</g,'\\u003c')}
				</script>
				<script src="/wp/articlePage.js"></script>
			</body>
		</html>

	`;
}


