const { Map, fromJS } = require('immutable');

const defaultState = Map({
	data: 'Some data',
});

export default function base(state = defaultState, action) {
	if (!Map.isMap(state)) {
		state = fromJS(state);
	}

	switch (action.type) {
		default:
			return state;
	}
}