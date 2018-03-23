import React, { Component } from 'react';

class LobbyPlayer extends Component {
	render() {


		return (
			<div className={'LobbyPlayer ' + this.props.className}>
				<h2>{this.props.name}</h2>
			</div>
		);
	}
}

export default LobbyPlayer;