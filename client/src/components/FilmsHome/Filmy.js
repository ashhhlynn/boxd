
import React, { Component } from 'react'
import { Button, Image, Modal } from 'semantic-ui-react'

class Filmy extends Component {

	state = {
		modalOpen: false,
		r: ''
	}

	handleOpen = () => {
		fetch("/diary_films/" + this.props.film.id)
		.then(resp => resp.json())
		.then(data => {
			if (data !== null) {
				this.setState({r: data})
			}
		})
		this.setState({ modalOpen: true });
	}
	
	handleClose = () => {
		this.setState({ modalOpen: false })
	}

	render() {
        let film = this.props.film
        return (
    		<div onClick={this.handleOpen}>
      			<Image src={film.poster}/>
				<Modal
					open={this.state.modalOpen}
					onClose={this.handleClose}
					closeIcon>
            		<Modal.Content style={{background:"inherit"}}>
						<h3>{film.title}
							<Button style={{letterSpacing:"1px", fontWeight:"normal"}}circular floated='right'>Log Film to Diary</Button>
						</h3>
						<h5>{film.year}</h5>
						<h5>Boxd score: {this.state.r}</h5>
            		</Modal.Content>
          		</Modal>
    		</div>
  		)
	}
}

export default Filmy
