import React, { Component } from 'react';

import './Timer.css';

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: props.time
		};

		this.allReady = props.allReady;
	}

	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		if (this.state.time > 0)
			this.setState({
				time: this.state.time - 1
			});
		else this.allReady();
	}

	render() {
		return (
			<div className="Timer">
				<h2>
					{Math.floor(this.state.time / 60)}:{('0' + this.state.time % 60).slice(-2)}
				</h2>
			</div>
		);
	}
}

export default Timer;