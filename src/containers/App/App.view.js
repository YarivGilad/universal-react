import React, { Component, PropTypes } from 'react'

import css from './App.css'


export default class App extends Component {

		constructor(props) {
			super(props)
		}	

		render() {

			return 	(
						<div>
							<h1>Hello React</h1>
							<img src="/images/march.jpg"/>
						</div>
					)
		}

}


