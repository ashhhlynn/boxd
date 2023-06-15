import React from 'react'
import { Header, Image, Button, Item, Icon, Divider } from 'semantic-ui-react'
import MovieRating from './MovieRating'
import MovieDate from './MovieDate'

const Diaries = (props) => {
	return (
		<div>
		    {props.films.map((movie, index) => (
			    <Item key={index} style={{marginLeft:"5%", marginRight:"5%"}}>
                    <div onClick={() => props.handleDiaryClick(movie)}>
                        <Button floated="right" size="mini" style={{width:"40px"}} inverted basic>
                            <Icon size="small" name="delete" />
                        </Button>
				    </div>
                    <Header floated="right" style={{color:"white", textAlign:"right"}}>
                        <h3>{movie.Title} </h3>
                        <h5>{movie.Year}</h5>
					    <h5><MovieRating film={movie} key={movie.imdbID}/></h5>
                    </Header>
                    <Header floated="left"><br></br>
                        <MovieDate film={movie} key={movie.Year}/>
                    </Header>
				    <Image style={{height:"110px", width:"75px", marginLeft:"13%", alignContent:"left"}} src={movie.Poster} alt='movie'/>
                    <Divider></Divider>
                </Item>
		    ))}
        </div>
	)
}

export default Diaries