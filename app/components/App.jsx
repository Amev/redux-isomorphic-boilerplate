import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.less';

export default class App extends Component {
    static proptypes = {
        data: PropTypes.string,
    };

    render() {
        return (
            <div className='App'>
                Insert your app here
            </div>
        );
    }
}