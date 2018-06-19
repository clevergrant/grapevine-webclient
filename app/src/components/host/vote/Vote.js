import React from 'react';

function Vote(props) {
	return (
		<div className="Vote">
			<div className="question">{props.question}</div>
		</div>
	);
}

export default Vote;