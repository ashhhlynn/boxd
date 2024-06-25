import React from 'react';
import { Card } from 'semantic-ui-react';
import Film  from '../SearchFilms/Film';

const Films = ({ films }) => {
    const searchFilms = films.map((movie, index) => 
        <Film 
            key={index} 
            movie={movie} 
        />
    );

    return (
        <Card.Group 
            itemsPerRow={7}
            style={{marginTop:"3%"}}
        >
           {searchFilms}
        </Card.Group>
    );
};

export default Films;