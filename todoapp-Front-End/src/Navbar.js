import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {

	render() {
		return (
			<div className= "todo-navbar">
				<nav>
					<div className="nav-wrapper">
						{/* Using only anchor tags, <a href="/login"..., the application will refresh the page as we cycle through nav tags
							If we use <Link to="/"..., we will not get that refresh!
							If we use <NavLink to="/"..., we will not get a refresh AND we receive an "active" class to use CSS!
							*/}
						{/* Our component that fetches data from database needs to be refreshed
							I "believe" the reason is because we fetch the data from the component
								We should try to fetch the data straight on to Redux, instead of from the component
								That's why I used the <a> tag for "Home"
						*/}

						<a href="/" className="brand-logo home-nav-link">Home</a>
						<ul id="nav-mobile" className="right">
							<li><NavLink to="/login">Login</NavLink></li>
							<li><NavLink to="/register">Register</NavLink></li>
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}

export default Navbar