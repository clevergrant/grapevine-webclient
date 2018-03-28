import React, { Component } from 'react';

import Header from './../header/Header';
import Lobby from './lobby/Lobby';
import Answer from './answer/Answer';
import Vote from './vote/Vote';

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

		this.handleAllReady = this.handleAllReady.bind(this);
		this.handleStart = this.handleStart.bind(this);

		this.state.currentQuestion = '';
		this.state.currentAnswers = [];

		this.votingRound = [
			{
				question: '',
				answers: [
					{
						playerName: '',
						text: '',
						votes: 0,
					},
					{
						playerName: '',
						text: '',
						votes: 0,
					},
				]
			},
		]
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

		socket.on('game created', game => {
			this.setState({
				game: game
			});
		});

		socket.on('player answered', player => {
			let game = this.state.game;
			game.players[player.name] = player;

			this.setState({
				game: game
			});

			// change the color on the lobby and say ready

			let isReady = this.state.isReady;

			isReady[player.color] = true;

			this.setState({
				isReady: isReady
			});

			let start = true;

			for (const key in this.state.isReady) if (!this.state.isReady[key]) start = false;

			if (start) this.handleAllReady();
		});

		socket.on('log', log => {
			console.log(log);
		});
	}

	handleStart() {
		const socket = this.state.socket;

		socket.emit('game start', {
			gameCode: this.state.code
		});

		this.setState({
			hostPage: 'answer'
		});
	}

	handleAllReady() {
		this.setState({
			hostPage: 'vote'
		});

		for (let key in this.state.game.questions)
			this.votingRound.push({ question: this.state.game.questions[key] });
	}

	render() {
		return (
			<div className="Host">
				<Header />

				{
					this.state.hostPage === 'lobby' &&
					(
						<Lobby state={this.state} handleStart={this.handleStart} />
					)
				}

				{
					this.state.hostPage === 'answer' &&
					(
						<Answer isReady={this.state.isReady} names={this.state.names} handleAllReady={this.handleAllReady} />
					)
				}

				{
					this.state.hostPage === 'vote' &&
					(
						<Vote />
					)
				}

				{
					this.state.hostPage === 'score' &&
					(
						<div />
					)
				}

			</div>
		);
	}
}

export default Host;