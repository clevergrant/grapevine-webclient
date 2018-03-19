import React, { Component } from 'react';

import './ClientGame.css';

class ClientGame extends Component {
	constructor(props) {
		super(props);
		this.state = props.state;
	}

	render() {
		return (
			<div className="ClientGame">

			</div>
		);
	}
}

export default ClientGame;