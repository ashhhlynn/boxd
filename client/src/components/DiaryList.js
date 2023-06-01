import React from 'react';
import { Card, Header, Image, Segment, Icon, Button, Divider } from 'semantic-ui-react';

const DiaryList = (props) => {
	const FavouriteComponent = props.favouriteComponent;

	return (
		<div>
			{props.movies.map((movie, index) => (
			<div style={{marginLeft:"5%", marginRight:"5%"}}>
                        <Header as="h5" floated="right" style={{textAlign:"right"}}>
                        <h3>{movie.Title} </h3>
                        <h5>{movie.Year}</h5>
                        <h5><Icon name="star" style={{color:"#ffff9f"}} /> <Icon name="star" style={{color:"#ffff9f"}}/> <Icon name="star" style={{color:"#ffff9f"}}  /> <Icon name="star" style={{color:"#ffff9f"}} /> <Icon name="star" style={{color:"#ffff9f"}}  />
                        </h5></Header>
                        <Header floated="left"><br></br><Button inverted >
                        <h3>June 8<br></br>2023</h3></Button></Header>
						<Image size="tiny" style={{ marginLeft:"5%", alignContent:"left"}} src={movie.Poster} alt='movie'/>
						<div
							onClick={() => props.handleFavouritesClick(movie)}
							className='overlay d-flex align-items-center justify-content-center'
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