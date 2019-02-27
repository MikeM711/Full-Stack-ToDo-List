import React, { Component } from 'react';
import Navbar from './Navbar';

class Login extends Component {

	render() {
		return (
			<div className="login">
				<Navbar />
				{/* Boilerplate of Materialize Text-Input */}
				<div className="login-form container" >
					<h4 className="center card-panel green accent-4 white-text">Login To See Your Todos</h4>
					<div className="row">
						<div className="input-field col s12">
							<input id="email" type="email" className="validate" />
							<label htmlFor="email">Email</label>
						</div>
					</div>
					<div className="row">
						<div className="password-field input-field col s12">
							<input id="password" type="password" className="validate" />
							<label htmlFor="password">Password</label>
						</div>
					</div>
					{/* Materialize Button - not attached to anything at the moment */}
					<button className="waves-effect waves-light green accent-e btn-large">Login</button>
				</div>
			</div>
		)
	}
}

export default Login