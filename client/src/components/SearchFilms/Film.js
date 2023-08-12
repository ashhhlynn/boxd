import React, { Component } from 'react'
import { Card, Image, Icon, Menu, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addDiaryFilm } from "../actions/rootActions"
import { addWatchlistFilm } from "../actions/rootActions"

class Film extends Component {

    state = {
		modalOpen: false,
        score: 'N/A',
    }

    handleOpen = (event) => {
        if (this.props.allDiaryFilms.find(f => f.watch_date === event.target.id)) {
            let f = this.props.allDiaryFilms.find(f => f.watch_date === event.target.id)
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

    addUserDiaryFilm = (film) => {	
        fetch("/diary_films", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: film.Title, 
				user_id: this.props.currentUser.id, 
				watch_date: film.imdbID,
				year: film.Year, 
				poster: film.Poster, 
				rating: 0, 
			})
		})
		.then((response) => response.json())
        .then(data => {
            window.alert("Added to diary.")
            this.props.addDiaryFilm(data)
        })
	}
    
    addUserWatchlistFilm = (film) => {	
        fetch("/watchlist_films", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: film.Title, 
				user_id: this.props.currentUser.id, 
				watch_date: film.imdbID,
				year: film.Year, 
				poster: film.Poster, 
			})
		})
		.then((response) => response.json())
        .then(data => {
            window.alert("Added to watchlist.")
            this.props.addWatchlistFilm(data)
        })
	}

    render () {
        let movie = this.props.movie
	    return (
		    <>
            <Card>
                <Image id={movie.imdbID} onClick={this.handleOpen} style={{cursor:"pointer", height:"290px", width:"205px"}} src={movie.Poster} alt='movie'></Image>   
                <Modal
			        open={this.state.modalOpen}
                    onClose={this.handleClose}
			        closeIcon
                >
                    <Modal.Content>
                        <Menu style={{background: "none"}}>
						    <h3>{movie.Title}</h3>
						    <Menu.Menu position="right" icon='labeled' style={{marginTop:"-1.5%"}}>
							    <Menu.Item style={{color:"white", letterSpacing:"1px", cursor:"pointer"}}>
								    <Icon onClick={() => this.addUserDiaryFilm(movie)} size="large" name="book"/>Diary
							    </Menu.Item>
							    <Menu.Item style={{color:"white", letterSpacing:"1px", cursor:"pointer"}}>
								    <Icon onClick={() => this.addUserWatchlistFilm(movie)} size="large" name="eye"/>Watchlist
							    </Menu.Item>
						    </Menu.Menu>
					    </Menu>
                        <h5 style={{marginTop:"-2%"}}>{movie.Year}</h5> 
                        <h5>Boxd Score: {this.state.score}</h5>
                    </Modal.Content>
          	    </Modal>
            </Card>
            </>
	    )
    }
}

const mapStateToProps = (state) => {
    return { 
        allDiaryFilms: state.allDF,
        currentUser: state.currentUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
    	addDiaryFilm: (film) =>  { dispatch(addDiaryFilm(film)) },
        addWatchlistFilm: (film) =>  { dispatch(addWatchlistFilm(film)) }
    }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Film)