import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

import reducers from 'modules/reducers.js';

export const history = createBrowserHistory();

const initialState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const enhancers = [];
const middleware = [routerMiddleware(history), thunk];
const rootReducer = history => combineReducers({
    router: connectRouter(history),
	...reducers,
});

// eslint-disable-next-line no-undef
const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
}

export const store = createStore(
    rootReducer(history),
    initialState,
    compose(
        applyMiddleware(...middleware),
        ...enhancers
    )
);