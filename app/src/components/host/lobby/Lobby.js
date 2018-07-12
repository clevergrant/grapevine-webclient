import React from 'react';

import Code from './code/Code';
import PlayerList from './playerList/PlayerList';

import './Lobby.css';

function Lobby(props) {
	return (
		<div className="Lobby">
			<Code code={props.code} />

			<button className='start' onClick={props.handleStart}>
				Start
			</button>

			<PlayerList state={props.state} />
		</div>
	);
}

export default Lobby;