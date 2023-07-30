import React from 'react'
import { Card, Popup, Button, Image } from 'semantic-ui-react'

const Films = (props) => {
	return (
        <Card.Group itemsPerRow={5}>
            {props.films.map((movie, index) => (
                <Popup hoverable key={index} trigger={<Card><Image style={{height:"300px", width:"220px"}}src={movie.Poster} alt='movie'></Image></Card>}>
                    <Popup.Content>
                        <h1>{movie.Title}</h1>
                        <p>
                            <Button style={{marginTop:"-4%", letterSpacing:"1px", fontWeight:"normal"}}circular color="black" floated="right" onClick={() => props.addUserDiaryFilm(movie)}>Log to Diary</Button>
                            {movie.Year}
                        </p>  
                    </Popup.Content>
                </Popup>
            ))}
        </Card.Group>
	)
}

export default Films