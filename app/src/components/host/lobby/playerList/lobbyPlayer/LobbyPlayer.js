import React from 'react';

import './LobbyPlayer.css';

function LobbyPlayer(props) {
	return (
		<div className={'LobbyPlayer ' + props.className}>
			<h2>{props.name}</h2>
		</div>
	);
}

export default LobbyPlayer;