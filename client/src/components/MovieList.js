import React from 'react';
import { Card, Reveal, Button, Image } from 'semantic-ui-react';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;

	return (
		<Card.Group itemsPerRow={5}>
			{props.movies.map((movie, index) => (
				<Card>
					<Reveal animated='move'>
    				<Reveal.Content visible>
						<Image src={movie.Poster} alt='movie'></Image>
					</Reveal.Content>	
					<Reveal.Content hidden >
					<div onClick={() => props.handleFavouritesClick(movie)}>
							<FavouriteComponent />
						</div>
					<Image src={movie.Poster} style={{opacity:"60%"}}alt='movie'></Image>
					
					</Reveal.Content>
					</Reveal>
				</Card>				
			))}
		</Card.Group>
	);
};

export default MovieList;