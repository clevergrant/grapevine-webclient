import React from 'react';

function Answer(props) {
		return (
			<div className='Answer'>
				<div className='question'>{this.props.question}</div>
				<form onSubmit={this.props.handleAnswer}>
					<input type='text' name='response' className='response' placeholder='Answer here...' />
				</form>
			</div>
		);
	}

export default Answer;