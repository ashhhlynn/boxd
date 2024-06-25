import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import FilmModal from '../SearchFilms/FilmModal';

const Watchlist = (props) => {
    return (
        <div className="watchlist">
            {props.watchlistFilms.length === 0 ?
                <p>Your watchlist is empty. Search for a film to begin adding!</p> 
            :
                <Card.Group 
                    itemsPerRow={7}
                    style={{
                        marginTop:"3%", 
                        marginBottom:"-.5%"
                    }} 
                >
                    {props.watchlistFilms.map((movie) => (
                        <Card key={movie.id}>
                            <FilmModal film={movie} />
                        </Card>
                    ))}
                </Card.Group>
            }
        </div>
    );
};
    
const mapStateToProps = (state) => {
    return { 
        watchlistFilms: state.watchlistFilms
    }
};

export default connect(mapStateToProps)(Watchlist);