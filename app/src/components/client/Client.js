import React, { Component } from 'react';

import Header from './../headers/Header';

import ClientLobby from './game/ClientLobby';
import Connector from './connector/Connector';

import './Client.css';

import io from 'socket.io-client';

class Client extends Component {
	constructor(props) {
		super(props);

		this.state = props.state;
		this.state.player = false;

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {

		const socket = io(this.state.endpoint);

		this.setState({
			socket: socket
		});

		socket.on('log', msg => {
			console.log(msg);
		});

		socket.on('refuse', msg => {
			console.error(msg);
		});

		socket.on('link', link => {
			console.log('You joined ' + link.code);
			this.setState({
				connected: true,
				color: link.player.color,
				player: link.player
			});
		});
	}

	handleChange = e => {
		const state = this.state;
		if (e.target.name === 'code')
			state[e.target.name] = e.target.value.toUpperCase();
		else state[e.target.name] = e.target.value;
		this.setState(state);
	}

	handleSubmit = e => {
		e.preventDefault();

		const state = this.state;
		let newplayer = new Player(this.state.name);
		state.player = newplayer;
		this.setState(state);

		const socket = this.state.socket;
		const connector = {
			player: this.state.player,
			code: this.state.code
		}

		socket.emit('request player', connector);
	}

	componentWillUnmount() {
		// animations
	}

	render() {
		return (
			this.state.connected ?
				<ClientLobby state={this.state} />
				:
				<div className="Client">
					<Header />
					<form onSubmit={this.handleSubmit}>
						<Connector handleChange={this.handleChange.bind(this)} />
						<button type="submit" className="submit-button">Join Game</button>
					</form>
				</div>
		);
	}
}

export default Client;

//* CLASSES

class Player {
	constructor(name) {
		this.name = name;
		this.color = '';
		this.points = 0;
		this.questions = [];
	}

	setColor(newColor) {
		this.color = newColor;
	}

	addPoints(points) {
		this.points += points;
	}

	addQuestion(question) {
		if (!this.questions.length >= 2)
			this.questions.push(question);
		else return 'Too many questions';
	}
}

/* Question and Answer Classes

class Question {
	constructor(text) {
		this.text = text;
		this.answers = [];
	}

	addAnswer(answer) {
		if (!this.answers.length >= 2)
			this.answers.push(answer);
		else return 'Too many answers';
	}
}

class Answer {
	constructor(owner, text) {
		this.owner = owner;
		this.text = text;
		this.votes = 0;
	}

	vote() {
		this.votes++;
	}
}

//*/