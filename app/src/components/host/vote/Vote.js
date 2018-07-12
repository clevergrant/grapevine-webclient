import React from 'react';

import Menu from './menu/VoteMenu';

import './Vote.css';

function Vote(props) {
	return (
		<div className="Vote">
			<div className="question">{props.voteObj.question}</div>
			<Menu
				answers={props.voteObj.answers}
				classes={props.classes}
				names={props.names}
			/>
		</div>
	);
}

export default Vote;