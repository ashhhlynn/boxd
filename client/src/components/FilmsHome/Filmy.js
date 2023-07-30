
import React, { Component } from 'react'
import { Button, Image, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'

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

	addFilmToDiary = () => {
		fetch("/diary_films", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: this.props.film.title, 
				user_id: this.props.currentUser.id, 
				watch_date: this.props.film.watch_date,
				year: this.props.film.year, 
				poster: this.props.film.poster, 
				rating: 0, 
			})
		})
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
							<Button onClick={this.addFilmToDiary} style={{letterSpacing:"1px", fontWeight:"normal"}}circular floated='right'>Log Film to Diary</Button>
						</h3>
						<h5>{film.year}</h5>
						<h5>Boxd score: {this.state.r}</h5>
            		</Modal.Content>
          		</Modal>
    		</div>
  		)
	}
}
const mapStateToProps = (state) => {
    return { 
    	currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps)(Filmy)
