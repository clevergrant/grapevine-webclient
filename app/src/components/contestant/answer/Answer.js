import React from 'react';

import './Answer.css';

function Answer(props) {
	return (
		<div className='Answer'>
			<div className='question'>{props.question}</div>
			<form className='response-form' onSubmit={props.handleResponseSubmit}>
				<input className='response' type='text' name='response' placeholder='Answer here...' value={props.response} onChange={props.handleResponseChange} />
			</form>
		</div>
	);
}

export default Answer;