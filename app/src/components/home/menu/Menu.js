import React, { Component } from 'react';
import './Menu.css';

import MenuButton from './menuButton/MenuButton';

class Menu extends Component {
	render() {
		return (
			<div className="Menu">
				<MenuButton text="Host a Game" onClick={this.props.navigateHost} />
				<MenuButton text="Join a Game" onClick={this.props.navigateJoin} />
			</div>
		);
	}
}

export default Menu;