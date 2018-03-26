import React, { Component } from 'react';

class Answer extends Component {
	render() {
		return (
			<div className='Answer'>
				<div className='question'>{this.props.question}</div>
				<form onSubmit={this.props.handleAnswer}>
					<input type='text' name='response' className='response' placeholder='Answer here...' />
				</form>
			</div>
		);
	}
}

export default Answer;