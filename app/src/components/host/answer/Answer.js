import React, { Component } from 'react';

import Timer from './../timer/Timer';

import './Answer.css';

class Answer extends Component {
	render() {
		const colors = [
			'red',
			'orange',
			'yellow',
			'lime',
			'green',
			'blue',
			'indigo',
			'violet',
		];

		return (
			<div className="Answer">
				<div className='timer'>
					<h2>Waiting for everyone...</h2>
					<Timer handleAllReady={this.props.handleAllReady} seconds={3} />
				</div>

				{
					colors.map(
						color => {
							return (
								<div key={color} className={'is-ready ' + (this.props.isReady[color] === true ? color : 'black')} >
									<h2>{(this.props.isReady[color] !== true ? this.props.names[color] : 'Ready!')}</h2>
								</div>
							)
						}
					)
				}
			</div>
		);
	}
}

export default Answer;