import React, { Component } from 'react';
import './Title.css';

class Title extends Component {
	render() {
		return (
			<div className="Title">
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
				<h1>
					<a href="/" className="title-link">Grapevine</a>
				</h1>
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

export default Title;