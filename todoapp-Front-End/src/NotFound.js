import React, { Component } from 'react';
import Navbar from './Navbar';

class NotFound extends Component {

	render() {
		return (
			<div className="not-found">
				<Navbar />
				{/* Boilerplate of Materialize Text-Input */}
				<div className="not-found-card container" >
					<h4 className="center card-panel grey lighten-1  white-text">
						Not Found - Incorrect URL</h4>
				</div>
			</div>
		)
	}
}

export default NotFound