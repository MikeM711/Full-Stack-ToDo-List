import React, { Component } from 'react';
import Navbar from './Navbar';

class Register extends Component {

	render() {
		return (
			<div className='register'>
				<Navbar />
				{/* Boilerplate of Materialize Text-Input */}
				<div className="register-form container" >
					<h4 className="center card-panel blue lighten-2  white-text">Register To Create Todos</h4>
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
					<button className="waves-effect waves-light blue lighten-1 btn-large">Register</button>
				</div>
			</div>
		)
	}
}

export default Register