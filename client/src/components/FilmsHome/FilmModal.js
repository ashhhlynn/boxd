
import React, { Component } from 'react'
import { Icon, Image, Modal, Rating, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addDiaryFilm } from "../actions/rootActions"
import { addWatchlistFilm } from "../actions/rootActions"
import { removeWatchlistFilm } from "../actions/rootActions"

class FilmModal extends Component {
	
	state = {
		modalOpen: false,
		score: 'N/A'
	}
	
	handleOpen = () => {
		if (this.props.allDiaryFilms.find(f => f.watch_date === this.props.film.watch_date)) {
			let f = this.props.allDiaryFilms.find(f => f.watch_date === this.props.film.watch_date)
			fetch("/diary_films/" + f.id)
				.then(resp => resp.json())
				.then(data => {
				if (data !== null) {
					this.setState({score: data})
				}
			})
		}
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
			window.alert("Added to diary.")
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
			window.alert("Added to watchlist.")
			this.props.addWatchlistFilm(data)
		})
	}
		
    removeFilmFromWatchlist = () => {
		let x = this.props.watchlistFilms.find(f => f.watch_date === this.props.film.watch_date)
		fetch(`/watchlist_films/` + x.id, {
    		method: 'DELETE',
    		headers: {
			'Content-Type': 'application/json',	
    		},
		})
        this.props.removeWatchlistFilm(x)
    }

	render() {
		let film = this.props.film
		return (
			<div className="filmModal" onClick={this.handleOpen}>
				<Image src={film.poster}/>
				<Modal
				open={this.state.modalOpen}
				onClose={this.handleClose}
				closeIcon
				>
					<Modal.Content>
						<h3>
							{film.title}
							{this.props.watchlistFilms.find(f => f.watch_date === this.props.film.watch_date) ?
								<>
								<Button onClick={this.removeFilmFromWatchlist} animated inverted style={{marginTop:"-1%", background:"none", color:"white"}} circular floated='right'>
									<Button.Content visible>
										<Icon size="large" name="eye slash"/>
									</Button.Content>
									<Button.Content hidden>
										Unwatch
									</Button.Content>
								</Button>
								</>
							:
								<>
								<Button onClick={this.addUserWatchlistFilm} animated inverted style={{marginTop:"-1%", background:"none", color:"white"}} circular floated='right'>
									<Button.Content visible>
										<Icon size="large" name="eye"/>
									</Button.Content>
									<Button.Content hidden>
										Watch
									</Button.Content>
								</Button>
								</>
							}
							<Button onClick={this.addFilmToDiary} animated inverted style={{ marginTop:"-1%", background:"none",color:"white" }} circular floated='right'>
								<Button.Content visible>
									<Icon size="large" name="calendar check"/>
								</Button.Content>
								<Button.Content hidden>
									Diary
								</Button.Content>
							</Button>
						</h3>
						<h5>{film.year}</h5>
						<div className="filmrating">
							<h5>
								<Rating className="stars" disabled rating={5} maxRating={5}/> {this.state.score}
							</h5>
						</div>
					</Modal.Content>
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser,
		allDiaryFilms: state.allDF,
		watchlistFilms: state.watchlistFilms
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addDiaryFilm: (film) =>  { dispatch(addDiaryFilm(film)) },
		addWatchlistFilm: (film) =>  { dispatch(addWatchlistFilm(film)) },
		removeWatchlistFilm: (film) => { dispatch(removeWatchlistFilm(film)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmModal)
