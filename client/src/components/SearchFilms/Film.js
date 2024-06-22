import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Image, Icon, Button, Rating, Modal } from 'semantic-ui-react'
import { addDiaryFilm } from "../actions/rootActions"
import { addWatchlistFilm } from "../actions/rootActions"
import { removeWatchlistFilm } from "../actions/rootActions"
import ModalFeed from "../FilmsHome/ModalFeed"

class Film extends Component {
    
    state = {
        modalOpen: false,
        score: 'Unrated'
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
        this.setState({ modalOpen: true })
    }
    
    handleClose = () => {
        this.setState({ modalOpen: false })
    }
    
    alertMessage = () => {
        window.alert("Register or log in to begin adding films.")
    }

    addUserDiaryFilm = (film) => {
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
    }
    
    addUserWatchlistFilm = (film) => {
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
    }
    
    removeFilmFromWatchlist = (film) => {
        let x = this.props.watchlistFilms.find(f => f.watch_date === film.imdbID)
        fetch(`/watchlist_films/` + x.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        this.props.removeWatchlistFilm(x)
    }
    
    render () {
        let movie = this.props.movie
        let feedEntries = this.props.feed.filter(f => f.title === movie.Title)
        return (
            <>
            <Card>
                <Image id={movie.imdbID} onClick={this.handleOpen} style={{cursor:"pointer", height:"290px", width:"205px"}} src={movie.Poster} alt='movie'></Image>
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    closeIcon
                >
                    <Modal.Content style={{marginTop:"1.75%"}}>
                        <h3 style={{fontFamily:"Helvetica", letterSpacing:".5px", fontSize:"17px"}}>{movie.Title}
                        <Image floated="left" size="tiny" src={movie.Poster} style={{width:"82px", height:"120px", marginTop:"-1%"}}/>
                            {this.props.watchlistFilms.find(f => f.watch_date === movie.imdbID) ?
                                <>
                                <Button size="large" onClick={() => this.removeFilmFromWatchlist(movie)} inverted animated style={{ marginTop:"-1%", background:"none",color:"white" }} circular floated='right'>
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
                                <Button size="large" onClick={() => this.addUserWatchlistFilm(movie)} inverted animated style={{ marginTop:"-1%", background:"none",color:"white" }} circular floated='right'>
                                    <Button.Content visible>
                                        <Icon name="eye"/>
                                    </Button.Content>
                                    <Button.Content hidden style={{fontSize:"13px"}}>
                                        Watch
                                    </Button.Content>
                                </Button>
                                </>
                            }
                            <Button size="large" onClick={() => this.addUserDiaryFilm(movie)} inverted animated style={{ marginTop:"-1%", background:"none",color:"white" }}  circular floated='right'>
                                <Button.Content visible>
                                    <Icon name="calendar check"/>
                                </Button.Content>
                                <Button.Content hidden style={{fontSize:"13px"}}>
                                    Diary
                                </Button.Content>
                            </Button>
                        </h3>
                        {movie.Year}<br></br><br></br>
                        <p style={{marginTop:"-1.5%"}}>Average {this.state.score}</p>
                        <div className="filmrating" style={{marginTop:"-2%"}}>
                            <Rating className="stars" disabled rating={5} maxRating={5}/>
                        </div><br></br><br></br>
                        <ModalFeed feedEntries={feedEntries} />
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
        watchlistFilms: state.watchlistFilms, 
        feed: state.feed
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
    	addDiaryFilm: (film) => { dispatch(addDiaryFilm(film)) },
        addWatchlistFilm: (film) => { dispatch(addWatchlistFilm(film)) },
        removeWatchlistFilm: (film) => { dispatch(removeWatchlistFilm(film)) }
    }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Film)