import React, { Component } from 'react';

import Code from './code/Code';
import PlayerList from './playerList/PlayerList';

import './Lobby.css';

class Lobby extends Component {
	render() {
		return (
			<div className="Lobby">
				<Code code={this.props.state.code} />

				<button className='start' onClick={this.props.handleStart}>
					Start
				</button>

				<PlayerList state={this.props.state} />
			</div>
		);
	}
}

export default Lobby;