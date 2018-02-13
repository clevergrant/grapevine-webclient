import React, { Component } from 'react';

import LobbyPlayer from './LobbyPlayer';

import './Lobby.css';

class Lobby extends Component {
	constructor(props) {
		super(props);
		this.state = props.state;
	}

	render() {
		return (
			<div className="Lobby">
				<LobbyPlayer name={this.state.names.red} className={this.state.classes.red} />
				<LobbyPlayer name={this.state.names.orange} className={this.state.classes.orange} />
				<LobbyPlayer name={this.state.names.yellow} className={this.state.classes.yellow} />
				<LobbyPlayer name={this.state.names.lime} className={this.state.classes.lime} />
				<LobbyPlayer name={this.state.names.green} className={this.state.classes.green} />
				<LobbyPlayer name={this.state.names.blue} className={this.state.classes.blue} />
				<LobbyPlayer name={this.state.names.indigo} className={this.state.classes.indigo} />
				<LobbyPlayer name={this.state.names.violet} className={this.state.classes.violet} />
			</div>
		);
	}
}

export default Lobby;