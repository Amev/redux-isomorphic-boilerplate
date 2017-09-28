import { createStore, applyMiddleware } from 'redux';
import { renderToString } from 'react-dom/server';
import RootReducer from './modules/RootReducer';
import App from 'components/AppContainer';
import { Provider } from 'react-redux';
import compression from 'compression';
import bodyParser from 'body-parser';
import thunk from 'redux-thunk';
import Express from 'express';
import React from 'react';
import path from 'path';

const app = Express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression({threshold: 512}));

app.use('/public', Express.static('dist/public'));
app.use(handleRender);

function handleRender(req, res) {
	const store = createStore(RootReducer, applyMiddleware(thunk));

	const html = renderToString(
		<Provider store={store}>
			<App />
		</Provider>
	);

	const preloadedState = store.getState();

	res.send(renderFullPage(html, preloadedState));
}

function renderFullPage(html, preloadedState) {
	return `
		<!doctype html>
		<html>
			<head>
				<meta charset='UTF-8' />
				<title>Web app boilerplate</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no' />
			</head>
			<body>
				<div id='root'>${html}</div>
				<script>
					window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
				</script>
				<script type='module' src='/public/bundle_es6.js'></script>
				<script nomodule src='/public/bundle.js'></script>
			</body>
		</html>
	`;
}

app.listen(port, () => {
	console.log('Server listening on port:', port);
});