import React, { Component } from 'react';
import './MenuButton.css';

class MenuButton extends Component {
	render() {
		return (
			<button className="MenuButton" onClick={this.props.onClick} >{this.props.text}</button>
		);
	}
}

export default MenuButton;