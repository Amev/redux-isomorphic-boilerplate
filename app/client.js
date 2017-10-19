import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { BrowserRouter } from 'react-router-dom';
import reducers from 'modules/reducers';
import Routes from 'routes/Routes.jsx';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import thunk from 'redux-thunk'
import React from 'react';

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const store = createStore(
	combineReducers({
		...reducers,
		router: routerReducer,
	}),
	preloadedState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),	
	applyMiddleware(thunk, historyMiddleware)
);

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Routes />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);