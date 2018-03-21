import React, { Component } from 'react';

import Header from './../header/Header';
import Lobby from './lobby/Lobby';
import Timer from './timer/Timer';

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

		this.state.isReady = {
			red: false,
			orange: false,
			yellow: false,
			lime: false,
			green: false,
			blue: false,
			indigo: false,
			violet: false
		}

		this.state.hostPage = 'lobby';

		this.allReady = this.allReady.bind(this);
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

	allReady() {
		this.setState({
			hostPage: 'game'
		})
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
							<div className='timer'>
								<h2>Waiting for everyone...</h2>
								<Timer allReady={this.allReady} time={5} />
							</div>

							<div className={'is-ready ' + (this.state.isReady.red === true ? 'red' : 'black')} >
								<h2>{(this.state.isReady.red !== true ? this.state.names.red : 'Ready!')}</h2>
							</div>
							<div className={'is-ready ' + (this.state.isReady.orange === true ? 'orange' : 'black')} >
								<h2>{(this.state.isReady.orange !== true ? this.state.names.orange : 'Ready!')}</h2>
							</div>
							<div className={'is-ready ' + (this.state.isReady.yellow === true ? 'yellow' : 'black')} >
								<h2>{(this.state.isReady.yellow !== true ? this.state.names.yellow : 'Ready!')}</h2>
							</div>
							<div className={'is-ready ' + (this.state.isReady.lime === true ? 'lime' : 'black')} >
								<h2>{(this.state.isReady.lime !== true ? this.state.names.lime : 'Ready!')}</h2>
							</div>
							<div className={'is-ready ' + (this.state.isReady.green === true ? 'green' : 'black')} >
								<h2>{(this.state.isReady.green !== true ? this.state.names.green : 'Ready!')}</h2>
							</div>
							<div className={'is-ready ' + (this.state.isReady.blue === true ? 'blue' : 'black')} >
								<h2>{(this.state.isReady.blue !== true ? this.state.names.blue : 'Ready!')}</h2>
							</div>
							<div className={'is-ready ' + (this.state.isReady.indigo === true ? 'indigo' : 'black')} >
								<h2>{(this.state.isReady.indigo !== true ? this.state.names.indigo : 'Ready!')}</h2>
							</div>
							<div className={'is-ready ' + (this.state.isReady.violet === true ? 'violet' : 'black')} >
								<h2>{(this.state.isReady.violet !== true ? this.state.names.violet : 'Ready!')}</h2>
							</div>

						</div>
					)
				}

				{this.state.hostPage === 'game' &&
					(
						<div>hey there</div>
					)
				}

			</div>
		);
	}
}

export default Host;