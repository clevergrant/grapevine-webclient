import React, { Component } from 'react';

import Title from './headers/Title';
import Menu from './menu/Menu';

class Home extends Component {
	constructor(props) {
		super(props);

		this.navigateHost = props.navigateHost;
		this.navigatePlay = props.navigatePlay;
	}

	render() {
		return (
			<div className="Home">
				<Title />
				<Menu navigateHost={this.navigateHost} navigatePlay={this.navigatePlay} />
			</div>
		);
	}
}

export default Home;