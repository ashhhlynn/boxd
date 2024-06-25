import React from 'react';
import { Card } from 'semantic-ui-react';
import FilmModal from '../SearchFilms/FilmModal';

const WelcomeFilms = ({ welcomeMovies }) => {
    const films = welcomeMovies.map((wm, index) => 
        <Card key={index}>
            <FilmModal film={wm} />
        </Card>
    );

    return (
        <Card.Group 
            itemsPerRow={7} 
            style={{
                marginBottom:"3%", 
                marginTop:"3%"
            }}
        >
            {films}
        </Card.Group>
    );
};

export default WelcomeFilms;