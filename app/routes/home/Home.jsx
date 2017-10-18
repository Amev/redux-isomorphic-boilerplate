import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Home.less';

export default class Home extends Component {
    static proptypes = {
        data: PropTypes.string,
    };

    render() {
        return (
            <div className='Home'>
                Insert your app here
            </div>
        );
    }
}