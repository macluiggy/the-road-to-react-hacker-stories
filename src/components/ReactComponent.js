import { Component, useEffect } from 'react';

class ReactComponent extends Component {
	state = {
		msg: '',
		toggle: false,
	}
	componentDidMount() {
		this.setState({
			msg: 'hola'
		})
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.toggle !== this.state.toggle) {
			this.setState({
				msg: prevState.msg.split('').reverse().join('')
			})
		}
	}
	
	changeToggleState = () => {
		console.log(`changed it`)
		this.setState({
			toggle: !this.state.toggle
		})
	}
  render() {
  	return (
		<div>
  			{this.state.msg}
  			<button onClick={this.changeToggleState} >toggle</button>
  		</div>
  		) 	
  }
}

export default ReactComponent
