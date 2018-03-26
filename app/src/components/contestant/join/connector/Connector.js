import React from 'react';
import './Connector.css';

function Connector(props) {
	return (
		<div className="Connector">
			<input type="text" name="name" onChange={this.props.handleChange} placeholder="Name" maxLength={24} className="name-input" />
			<input type="text" name="code" onChange={this.props.handleChange} placeholder="Room Code" maxLength={4} className="room-input" />
		</div>
	);
}

export default Connector;