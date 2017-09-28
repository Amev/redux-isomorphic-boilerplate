import { connect } from 'react-redux';
import App from './App';

function mapStateToProps(state) {
	return { data: state.base.get('data') };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);