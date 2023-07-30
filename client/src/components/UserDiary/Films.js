import React from 'react'
import { Card, Popup, Button, Image } from 'semantic-ui-react'

const Films = (props) => {
	return (
        <Card.Group itemsPerRow={4}>
            {props.films.map((movie, index) => (
                <Card style={{background:"inherit", boxShadow:"none"}}>
                <Popup hoverable key={index} trigger={<Image style={{height:"290px", width:"205px"}}src={movie.Poster} alt='movie'></Image>}>
                    <Popup.Content>
                        <h1>{movie.Title}</h1>
                        <p>
                            <Button style={{marginTop:"-4%", letterSpacing:"1px", fontWeight:"normal"}}circular color="black" floated="right" onClick={() => props.addUserDiaryFilm(movie)}>Log to Diary</Button>
                            {movie.Year}
                        </p>  
                    </Popup.Content>
                </Popup>
                </Card>
            ))}
        </Card.Group>
       
	)
}

export default Films