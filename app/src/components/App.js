import React, { Component } from 'react';
import './App.css';

import Home from './Home';

import Host from './host/Host';
import Client from './client/Client';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			page: "home",
			endpoint: 'http://ec2-18-219-237-114.us-east-2.compute.amazonaws.com:3001',
			socket: false,
			code: ''
		};

		this.navigateHost = this.navigateHost.bind(this);
		this.navigatePlay = this.navigatePlay.bind(this);
	}

	navigateHost() {
		this.setState({
			page: "host"
		});
	}

	navigatePlay() {
		this.setState({
			page: "play"
		});
	}

	render() {
		return (
			<div className="App">

				{
					this.state.page === "home" && (
						<Home navigateHost={this.navigateHost} navigatePlay={this.navigatePlay} />
					)
				}

				{
					this.state.page === "host" && (
						<Host state={this.state} />
					)
				}

				{
					this.state.page === "play" && (
						<Client state={this.state} />
					)
				}

			</div>
		);
	}
}

export default App;