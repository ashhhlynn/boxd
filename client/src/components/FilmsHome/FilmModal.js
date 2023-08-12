
import React, { Component } from 'react'
import { Button, Icon, Image, Menu, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addDiaryFilm } from "../actions/rootActions"
import { addWatchlistFilm } from "../actions/rootActions"

class FilmModal extends Component {

	state = {
		modalOpen: false,
		score: ''
	}

	handleOpen = () => {
		fetch("/diary_films/" + this.props.film.id)
		.then(resp => resp.json())
		.then(data => {
			if (data !== null) {
				this.setState({score: data})
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
		.then((response) => response.json())
        .then(data => {
			this.props.addDiaryFilm(data)
		})
	}

	addUserWatchlistFilm = () => {	
        fetch("/watchlist_films", {
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
			})
		})
		.then((response) => response.json())
        .then(data => {
			this.props.addWatchlistFilm(data)
        })
	}

	render() {
        let film = this.props.film
        return (
    		<div className="filmModal" onClick={this.handleOpen}>
      			<Image src={film.poster}/>
				<Modal
					open={this.state.modalOpen}
					onClose={this.handleClose}
					closeIcon>
            		<Modal.Content>
					<Menu style={{background: "none", color:"white"}}>
						<h3>{film.title}</h3>
						<Menu.Menu position="right" icon='labeled' style={{marginTop:"-1.5%"}}>
							<Menu.Item style={{color:"white", letterSpacing:"1px", cursor:"pointer"}}>
								<Icon onClick={this.addFilmToDiary} size="large" name="book"/>Diary
							</Menu.Item>
							<Menu.Item style={{color:"white", letterSpacing:"1px", cursor:"pointer"}}>
								<Icon onClick={this.addUserWatchlistFilm} size="large" name="eye"/>Watchlist
							</Menu.Item>
						</Menu.Menu>
					</Menu>
					<h5 style={{marginTop:"-2%"}}>{film.year}</h5>
					<h5>Boxd score: {this.state.score}</h5>
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

const mapDispatchToProps = (dispatch) => {
    return { 
    	addDiaryFilm: (film) =>  { dispatch(addDiaryFilm(film)) },
		addWatchlistFilm: (film) =>  { dispatch(addWatchlistFilm(film)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmModal)
