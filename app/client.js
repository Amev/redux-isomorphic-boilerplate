import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import RootReducer from 'modules/RootReducer';
import Routes from 'routes/Routes.jsx';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import thunk from 'redux-thunk'
import React from 'react';

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = createStore(
	RootReducer,
	preloadedState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),	
	applyMiddleware(thunk)
);

render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);