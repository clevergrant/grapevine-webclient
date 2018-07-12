import React from 'react';

import LobbyPlayer from './lobbyPlayer/LobbyPlayer';

import './PlayerList.css';

function PlayerList(props) {
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
		<div className='PlayerList'>
			{
				colors.map(
					color => {
						return <LobbyPlayer key={color} name={props.state.names[color]} className={props.state.classes[color]} />
					}
				)
			}
		</div>
	);
}

export default PlayerList;