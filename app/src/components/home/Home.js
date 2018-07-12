import React from 'react';

import Title from './title/Title';
import Menu from './menu/Menu';

function Home(props) {
	return (
		<div className="Home">
			<Title />
			<Menu navigateHost={props.navigateHost} navigateJoin={props.navigateJoin} />
		</div>
	);
}

export default Home;