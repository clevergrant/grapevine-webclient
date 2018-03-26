import React, { Component } from 'react';

import Connector from './connector/Connector';
import Header from './../../header/Header';

import './Join.css';

class Join extends Component {
	render() {
		return (
			<div className="Join">
				<Header />
				<form onSubmit={this.props.handleSubmit}>
					<Connector handleChange={this.props.handleChange} />
					<button type="submit" className="submit-button">Join Game</button>
				</form>
			</div>
		);
	}
}

export default Join;