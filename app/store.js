import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

import rootReducer from 'modules/rootReducer.js';

export const history = createBrowserHistory();

const initialState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const enhancers = [];
const middleware = [routerMiddleware(history), thunk];

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