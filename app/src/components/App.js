import React, { Component } from 'react';
import './App.css';

import Home from './home/Home';
import Host from './host/Host';
import Contestant from './contestant/Contestant';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			page: "home",
			// endpoint: 'http://ec2-18-219-237-114.us-east-2.compute.amazonaws.com:3001',
			// endpoint: 'http://localhost:3001',
			endpoint: 'https://grapevinegame.herokuapp.com',
			socket: false,
			code: ''
		};

		this.navigateHost = this.navigateHost.bind(this);
		this.navigateJoin = this.navigateJoin.bind(this);
	}

	navigateHost() {
		this.setState({
			page: "host"
		});
	}

	navigateJoin() {
		this.setState({
			page: "contestant"
		});
	}

	render() {
		return (
			<div className="App">

				{
					this.state.page === "home" && (
						<Home navigateHost={this.navigateHost} navigateJoin={this.navigateJoin} />
					)
				}

				{
					this.state.page === "host" && (
						<Host state={this.state} />
					)
				}

				{
					this.state.page === "contestant" && (
						<Contestant state={this.state} />
					)
				}

			</div>
		);
	}
}

export default App;
