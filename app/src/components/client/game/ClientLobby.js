import React, { Component } from 'react';

import './ClientLobby.css';

import ClientGame from './ClientLobby';

class ClientLobby extends Component {
	constructor(props) {
		super(props);

		this.state = props.state;
		this.state.started = false;
	}

	render() {
		return (
			this.state.started ?
				<ClientGame state={this.state} />
				:
				<div className="ClientLobby">
					<div className={'client-wait ' + this.color} >
						<h2>Waiting for others...</h2>
					</div>
				</div>

		);
	}
}

export default ClientLobby;