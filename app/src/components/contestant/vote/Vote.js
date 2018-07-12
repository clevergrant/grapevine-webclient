import React from 'react';

import Choice from './choice/Choice';

import './Vote.css';

function Vote(props) {
	console.log('voteObj: ', props.voteObj);
	return (
		<div className="Vote">
			{
				props.voteObj.answers.map(
					answer => {
						return <Choice className={answer.color} answer={answer.answer} handleVote={props.handleVote} key={answer.name} name={answer.name} />
					}
				)
			}
		</div>
	);
}

export default Vote;