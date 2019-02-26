import React, { Component } from 'react'

class Navbar extends Component {

	render() {
		return (
			<div>
				<nav>
					<div className="nav-wrapper">
						<a href="/" className="brand-logo home-nav-link">Home</a>
						<ul id="nav-mobile" className="right hide-on-med-and-down">
							<li><a href="/login">Login</a></li>
							<li><a href="/register">Register</a></li>
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}

export default Navbar