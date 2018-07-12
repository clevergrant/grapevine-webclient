import React from 'react';
import './MenuButton.css';

function MenuButton(props) {
	return (
		<button className="MenuButton" onClick={props.onClick} >{props.text}</button>
	);
}

export default MenuButton;