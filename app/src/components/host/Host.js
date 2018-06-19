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
			
		]
	}

	componentDidMount() {

		const socket = io(this.state.endpoint);

		// store the socket in the state - may not actually work

		this.setState({
			socket: socket
		});

		// send 'request host' to the server
		socket.emit('request host');

		// When the server has created a new game, store the room code in the state
		socket.on('host created', gameCode => {
			this.setState({
				code: gameCode
			});
		});

		// This will update the bar of the player who joins to be a color with their name, rather than a black bar with the color name.
		socket.on('player joined', player => {
			//console.log('%c ' + player.name + ' joined the lobby. ', 'background: ' + player.color + '; color: #feffef');
			const state = this.state;
			state.names[player.color] = player.name;
			state.classes[player.color] = player.color;
			this.setState(state);
		});

		// should the player leave the lobby, this will remove the colored bar in the lobby screen and reset it to a black bar with the color name.
		socket.on('player removed', playerInfo => {
			//console.log('%c ' + playerInfo.name + ' left the lobby. ', 'background: #fdd42c');
			const state = this.state;
			state.names[playerInfo.color] = playerInfo.color;
			state.classes[playerInfo.color] = 'black';
			this.setState(state);
		});

		// This saves the game sent from the server as a state variable.
		socket.on('game created', game => {
			this.setState({
				game: game
			});
		});

		socket.on('player answered', player => {

			// When the player's answers have been recorded on the server,
			// create a local variable for the game object
			let game = this.state.game;

			// update the player object in the game object's player array
			game.players[player.name] = player;

			// update the game object in the client state
			this.setState({
				game: game
			});

			// change the color on the lobby and say ready

			// create a local variable for the isReady state variable
			let isReady = this.state.isReady;

			// change this player to true
			isReady[player.color] = true;

			// update the state variable
			this.setState({
				isReady: isReady
			});

			// assume everyone is ready at first
			let start = true;

			// check to see if there is someone who isn't ready, revoke ready status if found
			for (const key in this.state.isReady) if (!this.state.isReady[key]) start = false;

			// once all players are ready to move on, run handleAllReady()
			if (start) this.handleAllReady();
		});

		socket.on('log', log => {
			console.log(log);
		});
	}

	handleStart() {
		// grab the socket from the state
		const socket = this.state.socket;

		// emit 'game start' to the server, with an object attached containing which game to start
		socket.emit('game start', {
			gameCode: this.state.code
		});

		// change the host page to the answering lobby
		this.setState({
			hostPage: 'answer'
		});
	}

	handleAllReady() {

		// set host page to vote
		this.setState({
			hostPage: 'vote'
		});

		let example = {
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
		};

		// check game object for question array, add each key to a new votingRound local variable
		for (let key in this.state.game.questions)
			this.votingRound.push({ question: this.state.game.questionText[key].text });

		for (let playerKey in this.state.game.players) {
			let player = this.state.game.players[playerKey];
			console.log(player);

			for (let questionKey in player.questions) {
				let question = player.questions[questionKey];
				
			}

			for (let answerKey in player.answers) {
				console.log(player.answers[answerKey]);
			}
		}
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
						<Vote question={this.votingRound.question} />
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