import React from 'react';

import './VoteMenu.css';

function Menu(props) {
	return (
		<div className="VoteMenu">
			<div className={"VoteButton " + props.classes.left}>
				{props.answers[0].answer}
				<small>{props.names.left}</small>
			</div>
			<div className={"VoteButton " + props.classes.right}>
				{props.answers[1].answer}
				<small>{props.names.right}</small>
			</div>
		</div>
	);
}

export default Menu;