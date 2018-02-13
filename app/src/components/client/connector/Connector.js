import React, { Component } from 'react';

import './Connector.css';

class Connector extends Component {
	constructor(props) {
		super(props);

		this.handleChange = props.handleChange;
		this.handleSubmit = props.handleSubmit;
	}

	render() {
		return (
			<div className="Connector">
				<input type="text" name="name" onChange={this.handleChange} placeholder="Name" maxLength={24} className="name-input" />
				<input type="text" name="code" onChange={this.handleChange} placeholder="Room Code" maxLength={4} className="room-input" />
			</div>
		);
	}
}

export default Connector;