import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import baseReducer from 'modules/base/BaseReducer';


export default history => combineReducers({
    router: connectRouter(history),
	base: baseReducer,
});