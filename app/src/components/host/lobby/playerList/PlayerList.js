import React, { Component } from 'react';

import LobbyPlayer from './lobbyPlayer/LobbyPlayer';

import './PlayerList.css';

class PlayerList extends Component {
	constructor(props) {
		super(props);
		this.state = this.props.state;
	}

	render() {
		const colors = [
			'red',
			'orange',
			'yellow',
			'lime',
			'green',
			'blue',
			'indigo',
			'violet',
		];

		return (
			<div className='PlayerList'>
				{
					colors.map(
						color => {
							return <LobbyPlayer key={color} name={this.state.names[color]} className={this.state.classes[color]} />
						}
					)
				}
			</div>
		);
	}
}

export default PlayerList;