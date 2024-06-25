import React from 'react';
import { Card, Rating, Icon } from 'semantic-ui-react';
import FilmModal from '../SearchFilms/FilmModal';

const Feed = ({ feed }) => {  
    const films =  feed.slice(0,7).map((movie, index) =>   
        <Card 
            key={index} 
            style={{marginLeft:".5%"}}
        >
            <FilmModal film={movie} />
            <Card.Content style={{marginTop:"-10%"}}>
                <Icon name="user circle" />{movie.user.username}
                <br />
                <Rating 
                    disabled 
                    size="mini" 
                    rating={movie.rating}  
                    maxRating={5}  
                />
            </Card.Content>
        </Card>
    );

    return (
        <Card.Group 
            itemsPerRow={7} 
            style={{
                marginTop:"3.5%", 
                marginBottom:"1.5%"
            }}
        >
           {films}
        </Card.Group>
    );	
};

export default Feed;