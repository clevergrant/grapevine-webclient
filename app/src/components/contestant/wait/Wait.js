import React from 'react';

import './Wait.css';

function Wait(props) {
	return (
		<div className={'Wait ' + props.color} >
			<h2>Waiting for others...</h2>
		</div>
	);
}

export default Wait;