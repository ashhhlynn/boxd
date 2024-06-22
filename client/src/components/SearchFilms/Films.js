import React from 'react';
import { Card } from 'semantic-ui-react';
import Film  from './Film';

const Films = ({ films }) => {
    return (
        <div className="films">
            <br/><br/>
            <Card.Group itemsPerRow={7}>
                {films.map((movie, index) => (
                    <Film key={index} movie={movie} />
                ))}
            </Card.Group>
        </div>
    );
};

export default Films;