import React from 'react';
import './Menu.css';

import MenuButton from './menuButton/MenuButton';

function Menu(props) {
	return (
		<div className="Menu">
			<MenuButton text="Host a Game" onClick={props.navigateHost} />
			<MenuButton text="Join a Game" onClick={props.navigateJoin} />
		</div>
	);
}

export default Menu;