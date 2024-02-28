import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Image, Modal, Card, Rating, Button, Popup } from 'semantic-ui-react'
import { addDiaryFilm } from "../actions/rootActions"
import { addWatchlistFilm } from "../actions/rootActions"
import { removeWatchlistFilm } from "../actions/rootActions"

class FilmModal extends Component {
	
	state = {
		score: 'Unrated',
        modalOpen: false
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
	
	alertMessage = () => {
		window.alert("Register or log in to begin adding films.")
	}

	addFilmToDiary = () => {
		if (this.props.currentUser.length === 0) {
			this.alertMessage()
		}
		else {
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
	}
	
	addUserWatchlistFilm = () => {
		if (this.props.currentUser.length === 0) {
			this.alertMessage()
		}
		else {
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
		let feedEntries = this.props.feed.filter(f => f.title === film.title)
		return (
			<div className="filmModal" onClick={this.handleOpen}>
				<Image src={film.poster}/>
				<Modal
				open={this.state.modalOpen}
				onClose={this.handleClose}
				closeIcon
				>
					<Modal.Content style={{marginTop:"1.75%"}}>
						<h3 style={{fontFamily:"Helvetica", letterSpacing:".5px", fontSize:"17px"}}>
							<Image floated="left" src={film.poster} style={{width:"82px", height:"120px", marginTop:"-1%"}}/>
							{film.title}
							{this.props.watchlistFilms.find(f => f.watch_date === this.props.film.watch_date) ?
								<>
								<Button size="large" onClick={this.removeFilmFromWatchlist} inverted animated style={{marginTop:"-1%", background:"none", color:"white"}} circular floated='right'>
									<Button.Content visible>
										<Icon name="eye slash"/>
									</Button.Content>
									<Button.Content hidden style={{fontSize:"13px"}}>
										Unwatch
									</Button.Content>
								</Button>
								</>
							:
								<>
								<Button size="large" onClick={this.addUserWatchlistFilm} animated inverted style={{marginTop:"-1%", background:"none", color:"white"}} circular floated='right'>
									<Button.Content visible>
										<Icon name="eye"/>
									</Button.Content>
									<Button.Content hidden style={{fontSize:"13px"}}>
										Watch
									</Button.Content>
								</Button>
								</>
							}
							<Button size="large" onClick={this.addFilmToDiary} animated inverted style={{ marginTop:"-1%", background:"none",color:"white" }} circular floated='right'>
								<Button.Content visible>
									<Icon name="calendar check"/>
								</Button.Content>
								<Button.Content hidden style={{fontSize:"13px"}}>
									Diary
								</Button.Content>
							</Button>
						</h3>
						{film.year}<br></br><br></br>
						<p style={{marginTop:"-2%"}}>Average {this.state.score}</p>
						<div className="filmrating" style={{marginTop:"-2%"}}>
							<Rating className="stars" disabled rating={5} maxRating={5}/> 					
						</div>
						<br></br><br></br>
						<Card.Group style={{marginLeft:"-6%", marginTop:"-2%"}} itemsPerRow={7} >
							{feedEntries.map((f => (
								<Card style={{marginLeft:"5%", textAlign:"center", fontSize:"12px", background:"inherit", boxShadow:"none", width:"30px"}}>
									<Popup
    								trigger={<Icon style={{fontSize:"280%", marginLeft:"20%"}}name="user circle"/>}
    								content={f.user.username}
    								basic
  									/>
                        			<Rating 
                        			disabled
                        			size="mini" 
                        			rating={f.rating}  
                        			maxRating={5}  
									style={{fontSize:"8px", marginTop:"40%"}}
                        			/>
								</Card>
							)))} 	
						</Card.Group>
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
		watchlistFilms: state.watchlistFilms,
		feed: state.feed
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