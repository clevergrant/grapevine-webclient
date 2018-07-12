import React, { Component } from 'react';

// import Header from './../header/Header';
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

		this.state.voteObj = false;
		this.state.answerClasses = {
			left: 'black',
			right: 'black'
		};
		this.state.answerNames = {
			left: '',
			right: ''
		};

		// handlers
		this.handleAllReady = this.handleAllReady.bind(this);
		this.handleStart = this.handleStart.bind(this);

		this.state.currentQuestion = '';
	}

	componentDidMount() {

		const socket = io(this.state.endpoint);

		// store the socket in the state

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
		socket.on('player joined', playerJoined => {
			//console.log('%c ' + player.name + ' joined the lobby. ', 'background: ' + player.color + '; color: #feffef');
			// When a player joins, change the state variable on the name and color arrays so it will propogate and change whats on the screen.
			const state = this.state;
			state.names[playerJoined.color] = playerJoined.name;
			state.classes[playerJoined.color] = playerJoined.color;
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

		socket.on('player answered', playerAnswered => {

			// change the color on the lobby and say ready

			// create a local variable for the isReady state variable
			let isReady = this.state.isReady;

			// change this player to true
			isReady[playerAnswered.color] = true;

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

		socket.on('ask vote', voteObj => {
			// set vote object
			this.setState({
				voteObj: voteObj
			});

			// set the page after so it knows what the voteObj is
			this.setState({
				hostPage: 'vote'
			});
		});

		socket.on('log', log => {
			console.log(log);
		});
	}

	handleStart() {
		// grab the socket from the state
		const socket = this.state.socket;

		// emit 'game start' to the server, with the game code attached
		socket.emit('game start', this.state.code);

		// change the host page to the answering lobby
		this.setState({
			hostPage: 'answer'
		});
	}

	handleAllReady() {
		// let the server do the computing
		const socket = io(this.state.endpoint);
		socket.emit('all ready', this.state.code);
	}

	render() {
		return (
			<div className="Host">
				{/* <Header /> */}

				{
					this.state.hostPage === 'lobby' &&
					(
						<Lobby state={this.state} code={this.state.code} handleStart={this.handleStart} />
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
						<Vote voteObj={this.state.voteObj} classes={this.state.answerClasses} names={this.state.answerNames}/>
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