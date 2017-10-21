import { createStore, applyMiddleware, combineReducers } from 'redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import reducers from './modules/reducers';
import { Provider } from 'react-redux';
import compression from 'compression';
import bodyParser from 'body-parser';
import Routes from 'routes/Routes';
import useragent from 'useragent';
import thunk from 'redux-thunk';
import Express from 'express';
import Config from './config';
import React from 'react';
import path from 'path';
import fs from 'fs';

const app = Express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression({threshold: 512}));

app.use('/', Express.static('dist/public'));
app.use(handleRender);

const template = fs.readFileSync('dist/public/template.html', 'utf-8');

function handleRender(req, res) {
	const store = createStore(combineReducers({ ...reducers }), applyMiddleware(thunk));
	const context = {};
	
	const html = renderToString(
		<Provider store={store}>
			<StaticRouter
				location={req.url}
				context={context}
			>
				<Routes />
			</StaticRouter>
		</Provider>
	);

	const agent = useragent.parse(req.headers['user-agent']);	
	const preloadedState = store.getState();

	res.send(renderFullPage(html, preloadedState, agent));
}

function renderFullPage(html, preloadedState, agent) {
	const modernBundle = Config.modernBrowsers[agent.family] <= agent.major ? true : false;

	return template
		.replace('<div id=\'root\'></div>', `<div id='root'>${html}</div>`)
		.replace('<script></script>', `<script>
			window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
		</script>`)
		.replace('bundle', modernBundle ? 'bundle_es6' : 'bundle');
}

app.listen(port, () => {
	console.log('Server listening on port:', port);
});