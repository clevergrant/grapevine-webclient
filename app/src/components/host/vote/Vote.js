import React from 'react';

function Vote(props) {
	return (
		<div className="Vote">
			<div classname="question">{props.question}</div>
		</div>
	);
}

export default Vote;