import React from 'react';
import { Card } from 'semantic-ui-react';
import FilmModal from './FilmModal';

const WelcomeFilms = ({ welcomeMovies }) => {
    return (
        <Card.Group itemsPerRow={7} style={{marginBottom:"3%", marginTop:"3%"}}>
            {welcomeMovies.map((wm, index) => (
                <Card key={index}>
                    <FilmModal film={wm} />
                </Card>
            ))}
        </Card.Group>
    )
};

export default WelcomeFilms;