import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import Bluebird from 'bluebird';
import React from 'react';

import { store, history } from './store';
import App from './routes/App.jsx';


Bluebird.config({ cancellation: true });

const target = document.querySelector('#root');
const html = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
);

render(html, target);