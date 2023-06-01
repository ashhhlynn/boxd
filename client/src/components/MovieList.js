import React from 'react';
import { Card } from 'semantic-ui-react';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;

	return (
		<Card.Group itemsPerRow={5}>
			{props.movies.map((movie, index) => (
				
						<Card>
						<img src={movie.Poster} alt='movie'></img>
						<div
							onClick={() => props.handleFavouritesClick(movie)}
							className='overlay d-flex align-items-center justify-content-center'
						>
							<FavouriteComponent />
						</div>
						</Card>				
			))}
		</Card.Group>
	);
};

export default MovieList;