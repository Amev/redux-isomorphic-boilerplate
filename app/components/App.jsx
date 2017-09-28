import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class App extends Component {
    static proptypes = {
        data: PropTypes.string,
    };

    render() {
        return (
            <div>Insert your app here</div>
        );
    }
}