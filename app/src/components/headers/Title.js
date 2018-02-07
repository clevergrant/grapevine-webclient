import React, { Component } from 'react';
import './Title.css';

class Title extends Component {
	render() {
		return (
			<div className="Title">
				<div class="rainbow">
					<div class="red"></div>
					<div class="orange"></div>
					<div class="yellow"></div>
					<div class="lime"></div>
					<div class="green"></div>
					<div class="blue"></div>
					<div class="indigo"></div>
					<div class="violet"></div>
				</div>
				<h1>
					<a href="/" className="title-link">Grapevine</a>
				</h1>
				<div class="rainbow">
					<div class="red"></div>
					<div class="orange"></div>
					<div class="yellow"></div>
					<div class="lime"></div>
					<div class="green"></div>
					<div class="blue"></div>
					<div class="indigo"></div>
					<div class="violet"></div>
				</div>
			</div>
		);
	}
}

export default Title;