import React from 'react';
import { Card, Header, Image, Segment, Icon, Button, Rating, Divider } from 'semantic-ui-react';
import MovieRating from './MovieRating';

const DiaryList = (props) => {
	const FavouriteComponent = props.favouriteComponent;
	return (
		<div>
			{props.movies.map((movie, index) => (
			<div style={{marginLeft:"5%", color:"white", marginRight:"5%"}}>
                <Header as="h5" floated="right" style={{color:"#ffff9f", textAlign:"right"}}>
                    <h3>{movie.Title} </h3>
                    <h5>{movie.Year}</h5>
					<MovieRating/>
                </Header>
                <Header floated="left"><br></br>
                    <Button inverted style={{backgroundColor:"#FFFEEF", color:"black"}}>
                        <h3><b>June 8</b><br></br>2023</h3>
                    </Button>
                </Header>
						<Image size="tiny" style={{ marginLeft:"13%", alignContent:"left"}} src={movie.Poster} alt='movie'/>
						<div
							onClick={() => props.handleFavouritesClick(movie)}
						>
							<FavouriteComponent />
						</div>
                        <Divider></Divider>
                        </div>
			))}
            </div>
	);
};

export default DiaryList;