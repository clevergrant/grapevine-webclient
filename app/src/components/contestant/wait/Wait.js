import React from 'react';

import './Wait.css';

function Wait(props) {
	return (
		<div className={'Wait ' + this.props.color} >
			<h2>Waiting for others...</h2>
		</div>
	);
}

export default Wait;