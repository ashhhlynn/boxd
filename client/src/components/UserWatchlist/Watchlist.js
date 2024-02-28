import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import FilmModal from '../FilmsHome/FilmModal'

class Watchlist extends Component {

    render () {
        return (
            <div className="home">
                {this.props.watchlistFilms.length === 0 ?
                    <p><center><br></br>Your watchlist is empty. Search for a film to begin adding!</center></p> 
                :
                    <>
                    <Card.Group style={{marginTop:"3%", marginBottom:"-.5%"}} itemsPerRow={7}>
                        {this.props.watchlistFilms.map((movie) => (
                            <Card key={movie.id}>
                                <FilmModal film={movie} />
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

export default connect(mapStateToProps)(Watchlist)