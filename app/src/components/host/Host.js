import React, { Component } from 'react';

import Header from './../headers/Header';
import Lobby from './lobby/Lobby';

import './Host.css';

import io from 'socket.io-client';

class Host extends Component {
	constructor(props) {
		super(props);
		this.state = props.state;

		this.state.names = {
			red: 'red',
			orange: 'orange',
			yellow: 'yellow',
			lime: 'lime',
			green: 'green',
			blue: 'blue',
			indigo: 'indigo',
			violet: 'violet'
		};

		this.state.classes = {
			red: 'black',
			orange: 'black',
			yellow: 'black',
			lime: 'black',
			green: 'black',
			blue: 'black',
			indigo: 'black',
			violet: 'black'
		};

		this.state.hostPage = 'lobby';

		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {

		const socket = io(this.state.endpoint);

		this.setState({
			socket: socket
		});

		socket.emit('request host');

		socket.on('host created', gameCode => {
			this.setState({
				code: gameCode
			});
		});

		socket.on('player joined', player => {
			console.log('%c ' + player.name + ' joined the lobby. ', 'background: ' + player.color + '; color: #feffef');
			const state = this.state;
			state.names[player.color] = player.name;
			state.classes[player.color] = player.color;
			this.setState(state);
		});

		socket.on('player removed', playerInfo => {
			console.log('%c ' + playerInfo.name + ' left the lobby. ', 'background: #fdd42c');
			const state = this.state;
			state.names[playerInfo.color] = playerInfo.color;
			state.classes[playerInfo.color] = 'black';
			this.setState(state);
		});
	}

	onClick() {
		this.setState({
			hostPage: 'prep'
		});
	}

	render() {
		return (
			<div className="Host">
				<Header />

				{this.state.hostPage === "lobby" &&
					(
						<div>
							<div className='code'>
								<h2>Game Code:</h2>
								<h2>{this.state.code}</h2>
							</div>

							<button className='start' onClick={this.onClick}>
								Start
							</button>

							<Lobby state={this.state} />
						</div>
					)
				}

				{this.state.hostPage === "prep" &&
					(
						<div className='prep'>
							<h2>
								Waiting for everyone...
							</h2>
						</div>
					)
				}

			</div>
		);
	}
}

export default Host;