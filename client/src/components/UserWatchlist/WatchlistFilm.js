
import React, { Component } from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { removeWatchlistFilm } from "../actions/rootActions"

class WatchlistFilm extends Component {

	state = {
		modalOpen: false,
		score: 'NA'
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
							<Button onClick={this.removeFilmFromWatchlist} animated style={{marginTop:"-1%", background:"none",color:"white" }} circular floated='right'>
								<Button.Content visible>
									<Icon size="large" name="eye slash"/>
								</Button.Content>
								<Button.Content hidden>
									Remove
								</Button.Content>
							</Button>
						</h3>
						<h5>{film.year}</h5>
						<h5>Boxd Score: {this.state.score}</h5>
            		</Modal.Content>
          		</Modal>
    		</div>
  		)
	}
}

const mapStateToProps = (state) => {
    return { 
		allDiaryFilms: state.allDF
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        removeWatchlistFilm: (film) =>  { dispatch(removeWatchlistFilm(film)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistFilm)
