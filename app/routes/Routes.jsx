import { Route, Switch } from 'react-router-dom';
import NotFound from 'routes/notfound/NotFound';
import Home from 'routes/home/HomeContainer';
import React, { Component } from 'react';

export default class Routes extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route component={NotFound} />
				</Switch>
			</div>
		);
	}
}