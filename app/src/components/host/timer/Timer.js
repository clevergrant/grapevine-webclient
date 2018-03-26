import React, { Component } from 'react';

import './Timer.css';

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			seconds: props.seconds
		};
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
		if (this.state.seconds > 0)
			this.setState({
				seconds: this.state.seconds - 1
			});
		else this.props.handleAllReady();
	}

	render() {
		return (
			<div className="Timer">
				<h2>
					{Math.floor(this.state.seconds / 60)}:{('0' + this.state.seconds % 60).slice(-2)}
				</h2>
			</div>
		);
	}
}

export default Timer;