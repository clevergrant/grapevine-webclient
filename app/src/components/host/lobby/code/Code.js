import React, { Component } from 'react';

import './Code.css';

class Code extends Component {
	render() {
		return (
			<div className='Code'>
				<h2>Game Code:</h2>
				<h2>{this.props.code}</h2>
			</div>
		);
	}
}

export default Code;