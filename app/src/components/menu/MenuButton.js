import React, { Component } from 'react';
import './Menu.css';

class MenuButton extends Component {
	constructor(props) {
		super(props);
		this.text = props.text;
		this.onClick = props.onClick;
	}

	render() {
		return (
			<button className="MenuButton" onClick={this.onClick} >{this.text}</button>
		);
	}
}

export default MenuButton;