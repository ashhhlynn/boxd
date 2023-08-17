
import React, { Component } from 'react'
import { Button, Icon, Image, Modal, Rating} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { removeWatchlistFilm } from "../actions/rootActions"
import { addDiaryFilm } from "../actions/rootActions"

class WatchlistFilm extends Component {

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
                this.setState({score: data})
            })
        }
		this.setState({ modalOpen: true });
	}
	
	handleClose = () => {
		this.setState({ modalOpen: false })
	}

    removeFilmFromWatchlist = () => {
		fetch(`/watchlist_films/` + this.props.film.id, {
    		method: 'DELETE',
    		headers: {
			'Content-Type': 'application/json',	
    		},
		})
        this.props.removeWatchlistFilm(this.props.film)
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

	render() {
        let film = this.props.film
        return (
    		<div className="filmModal" onClick={this.handleOpen}>
      			<Image src={film.poster}/>
				<Modal
					open={this.state.modalOpen}
					onClose={this.handleClose}
					closeIcon>
            		<Modal.Content >
						<h3>{film.title}
							<Button onClick={this.removeFilmFromWatchlist} animated inverted style={{marginTop:"-1%", background:"none",color:"white" }} circular floated='right'>
								<Button.Content visible>
									<Icon size="large" name="close"/>
								</Button.Content>
								<Button.Content hidden>
									Remove
								</Button.Content>
							</Button>
							<Button onClick={this.addFilmToDiary} animated inverted style={{marginTop:"-1%", background:"none",color:"white" }} circular floated='right'>
								<Button.Content visible>
									<Icon size="large" name="calendar plus"/>
								</Button.Content>
								<Button.Content hidden>
									Diary
								</Button.Content>
							</Button>
						</h3>
						<h5>{film.year}</h5>
						<h5>
							<Rating className="stars" disabled rating={5} maxRating={5}/> {this.state.score}
						</h5>            		
					</Modal.Content>
          		</Modal>
    		</div>
  		)
	}
}

const mapStateToProps = (state) => {
    return { 
		allDiaryFilms: state.allDF,
		currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        removeWatchlistFilm: (film) =>  { dispatch(removeWatchlistFilm(film)) },
		addDiaryFilm: (film) =>  { dispatch(addDiaryFilm(film)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistFilm)
