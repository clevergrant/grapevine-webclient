import React, { Component } from 'react';

import './Wait.css';

class Wait extends Component {
	render() {
		return (
			<div className={'Wait ' + this.props.color} >
				<h2>Waiting for others...</h2>
			</div>
		);
	}
}

export default Wait;