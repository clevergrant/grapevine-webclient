import React, { Component } from 'react';
import './Rainbow.css';

import { TweenMax } from 'gsap';

class Stripe extends Component {
	constructor(props) {
		super(props);
		this.className = props.className;
		this.dom = {};
	}

	componentWillEnter() {
		TweenMax.to(this.dom.root, .5, { width: "100%" });
	}

	componentWillLeave() {

	}

	render() {
		return (
			<div className={this.className}></div>
		);
	}
}

export default Stripe;