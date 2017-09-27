const { Map } = require('immutable');

const defaultState = Map({
	prop: 'Some data',
});

export default function base(state = defaultState, action) {
	switch (action.type) {
		default:
			return state;
	}
}