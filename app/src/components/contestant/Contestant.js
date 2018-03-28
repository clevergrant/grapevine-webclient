import React, { Component } from 'react';

import io from 'socket.io-client';

import Join from './join/Join';
import Wait from './wait/Wait';
import Answer from './answer/Answer';
import Vote from './vote/Vote';

class Contestant extends Component {
	constructor(props) {
		super(props);

		this.state = props.state;
		this.state.player = false;

		this.state.contestantPage = 'join';

		this.state.response = '';

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleResponseChange = this.handleResponseChange.bind(this);
		this.handleResponseSubmit = this.handleResponseSubmit.bind(this);
		this.handleVote = this.handleVote.bind(this);
	}

	componentDidMount() {

		const socket = io(this.state.endpoint);

		this.setState({
			socket: socket
		});

		socket.on('link', link => {
			console.log('You joined ' + link.code);
			this.setState({
				connected: true,
				color: link.player.color,
				player: link.player,
				contestantPage: 'wait',
			});
		});

		socket.on('game created', () => {
			this.setState({
				started: true,
				contestantPage: 'answer',
			});
		});

		socket.on('assign questions', player => {
			this.setState({
				player: player,
				contestantPage: 'answer',
				currentQuestion: player.questions[0]
			});
		});

		socket.on('log', msg => {
			console.log(msg);
		});

		socket.on('refuse', msg => {
			console.error(msg);
		});

	}

	componentWillUnmount() {
		// animations
	}

	handleChange(e) {
		const state = this.state;
		if (e.target.name === 'code')
			state[e.target.name] = e.target.value.toUpperCase();
		else state[e.target.name] = e.target.value;
		this.setState(state);
	}

	handleSubmit(e) {
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

	handleResponseChange(e) {
		this.setState({
			response: e.target.value
		});
	}

	handleResponseSubmit(e) {
		e.preventDefault();

		let player = this.state.player;

		player.answers.push(this.state.response);

		this.setState({
			response: "",
			player: player,
		});

		if (this.state.player.answers.length >= 2) {
			this.setState({
				contestantPage: 'wait'
			});

			console.log(this.state.code);

			const socket = io(this.state.endpoint);

			socket.emit('questions answered', player, this.state.code);
		}
		else {
			this.setState({
				currentQuestion: player.questions[1]
			});
		}

	}

	handleVote(e) {
		e.preventDefault();
		console.log(e.target);
	}

	render() {
		return (
			<div className='Contestant'>
				{
					this.state.contestantPage === 'join' && (
						<Join handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
					)
				}

				{
					this.state.contestantPage === 'answer' && (
						<Answer
							handleResponseSubmit={this.handleResponseSubmit}
							handleResponseChange={this.handleResponseChange}
							question={this.state.currentQuestion}
							response={this.state.response} />
					)
				}

				{
					this.state.contestantPage === 'vote' && (
						<Vote handleVote={this.handleVote} />
					)
				}

				{
					this.state.contestantPage === 'wait' && (
						<Wait color={this.state.color} />
					)
				}
			</div>
		);
	}
}

export default Contestant;

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