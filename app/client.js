import { createStore, applyMiddleware } from 'redux';
import RootReducer from 'modules/RootReducer';
import App from 'components/AppContainer';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import thunk from 'redux-thunk'
import React from 'react';

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = createStore(RootReducer, preloadedState, applyMiddleware(thunk));

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);