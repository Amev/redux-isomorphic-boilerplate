import baseReducer from 'modules/base/BaseReducer';
import { combineReducers } from 'redux';

export default combineReducers({
	base: baseReducer,
});