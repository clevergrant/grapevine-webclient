import React, { Component } from 'react';

import Title from './title/Title';
import Menu from './menu/Menu';

class Home extends Component {
	render() {
		return (
			<div className="Home">
				<Title />
				<Menu navigateHost={this.props.navigateHost} navigateJoin={this.props.navigateJoin} />
			</div>
		);
	}
}

export default Home;