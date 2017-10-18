import { connect } from 'react-redux';
import Home from './Home';

function mapStateToProps(state) {
	return { data: state.base.get('data') };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);