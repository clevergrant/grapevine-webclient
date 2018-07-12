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

		this.state.contestantPage = 'join';

		this.state.response = '';

		this.state.questions = [];
		this.state.answers = [];

		// sub-component handlers
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
			// when the client receives a 'link' from the socket, inform the client
			console.log('You joined ' + link.code);
			// store the player color, and change the page to 'wait'
			this.setState({
				connected: true,
				color: link.color,
				contestantPage: 'wait',
			});
		});

		socket.on('game created', () => {
			// change the page to 'answer'
			this.setState({
				started: true,
				contestantPage: 'answer',
			});
		});

		socket.on('assign questions', questions => {
			console.log('questions: ', questions);
			// save the player info and change the page to answer, and set the current question to the player's 1st question
			this.setState({
				questions: questions,
				contestantPage: 'answer',
				currentQuestion: questions[0]
			});
		});

		socket.on('ask vote', voteObj => {

			// change the state of the voteObj so it updates everything on the page
			this.setState({
				voteObj: voteObj
			}, () => {

				// after that, navigate to the vote page
				this.setState({
					contestantPage: 'vote'
				});
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

		const socket = this.state.socket;
		socket.emit('request player', {
			name: this.state.name,
			code: this.state.code
		});
	}

	handleResponseChange(e) {
		this.setState({
			response: e.target.value
		});
	}

	handleResponseSubmit(e) {
		e.preventDefault();

		// create a new state variable holding the answers to the questions
		let answers = this.state.answers;
		answers.push(this.state.response);

		// save it to the state
		this.setState({
			response: "",
			answers: answers
		});

		// If there are two answers,
		if (this.state.answers.length >= 2) {

			// navigate to the wait page
			this.setState({
				contestantPage: 'wait'
			});

			// connect to the socket
			const socket = io(this.state.endpoint);

			// send answered questions
			socket.emit('questions answered', {
				name: this.state.name,
				code: this.state.code,
				questions: this.state.questions,
				answers: this.state.answers
			});
		}
		else {
			// otherwise, just change the question
			this.setState({
				currentQuestion: this.state.questions[1]
			});
		}

	}

	handleVote(name) {

		let pv = {
			code: this.state.code,
			name: name,
			round: this.state.voteObj
		};

		const socket = this.state.socket;
		socket.emit('player vote', pv);

		this.setState({
			contestantPage: 'wait'
		});

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
						<Vote handleVote={this.handleVote} voteObj={this.state.voteObj} />
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