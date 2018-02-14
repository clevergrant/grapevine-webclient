import React, { Component } from 'react';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = props.state;

	}

	render() {
		return (
			<div className="Host">
				<Header />

			</div>
		);
	}
}

export default Game;