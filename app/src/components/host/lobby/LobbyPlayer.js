import React, { Component } from 'react';

class LobbyPlayer extends Component {
	constructor(props) {
		super(props);
		this.state = props.state;
	}

	render() {
		return (
			<div className={'LobbyPlayer ' + this.props.className}>
				<h2>{this.props.name}</h2>
			</div>
		);
	}
}

export default LobbyPlayer;