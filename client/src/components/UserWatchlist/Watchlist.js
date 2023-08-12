import { Card } from 'semantic-ui-react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchWatchlistFilms } from "../actions/rootActions"
import WatchlistFilm from './WatchlistFilm'

class Watchlist extends Component {

    componentDidMount = () => {
        fetch("/watchlist_films")
		.then(resp => resp.json())
		.then(data => {
			this.props.fetchWatchlistFilms(data)
		})
    }

    render () {
	    return (
            <div className="home">
                {this.props.watchlistFilms.length === 0 ?
                    <p><center><br></br>Your watchlist is empty. Search for a film to begin adding!</center></p> 
                :
                    <>
                    <Card.Group style={{marginTop:"3%"}} itemsPerRow={7}>
                        {this.props.watchlistFilms.map((movie, index) => (
                            <Card>
                                <WatchlistFilm key={index} film={movie} />
                            </Card>
                        ))}
                    </Card.Group>
                    </>
                }
            </div>
	    )
    }
}
    
const mapStateToProps = (state) => {
    return { 
        watchlistFilms: state.watchlistFilms
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        fetchWatchlistFilms: (data) =>  { dispatch(fetchWatchlistFilms(data)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist)