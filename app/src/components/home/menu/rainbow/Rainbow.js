import React from 'react';

import './Rainbow.css';

function Rainbow(props) {
	return (
		<div className="Rainbow">
			<div className="rainbow-block">
				<div className="red"></div>
				<div className="orange"></div>
				<div className="yellow"></div>
				<div className="lime"></div>
				<div className="green"></div>
				<div className="blue"></div>
				<div className="indigo"></div>
				<div className="violet"></div>
			</div>
		</div>
	);
}

export default Rainbow;