import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
	render() {
		return (
			<div className="Header">
				<div className="rainbow">
					<div className="red"></div>
					<div className="orange"></div>
					<div className="yellow"></div>
					<div className="lime"></div>
					<div className="green"></div>
					<div className="blue"></div>
					<div className="indigo"></div>
					<div className="violet"></div>
				</div>
				<h1>Grapevine</h1>
				<div className="rainbow">
					<div className="red"></div>
					<div className="orange"></div>
					<div className="yellow"></div>
					<div className="lime"></div>
					<div className="green"></div>
					<div className="blue"></div>
					<div className="indigo"></div>
					<div className="violet"></div>
				</div>
			</div>
		);
	}
}

export default Header;