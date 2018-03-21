import React, { Component } from 'react';
import './Menu.css';

import MenuButton from './menuButton/MenuButton';
// import Rainbow from './Rainbow';

class Menu extends Component {
	constructor(props) {
		super(props);

		this.navigateHost = props.navigateHost;
		this.navigatePlay = props.navigatePlay;
	}

	render() {
		return (
			<div className="Menu">
				<MenuButton text="Host a Game" onClick={this.navigateHost} />
				<MenuButton text="Join a Game" onClick={this.navigatePlay} />
			</div>
		);
	}
}

export default Menu;