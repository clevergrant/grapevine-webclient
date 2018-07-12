import React from 'react';

import './Choice.css';

function Choice(props) {
	return (
		<button className={"Choice " + props.className} onClick={props.handleVote.bind(null, props.name)} >
			{props.answer}
		</button>
	);
}

export default Choice;