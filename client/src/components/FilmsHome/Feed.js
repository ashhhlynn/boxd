import React from 'react'
import {  Card, Image, Rating, Icon } from 'semantic-ui-react'

const Feed = (props) => {
	return (
        <>
        <Card.Group itemsPerRow={7} style={{marginTop:"3.5%", marginBottom:"1.5%"}}>
            {props.userFeed.map((movie, index) => (  
                <Card key={index} style={{marginLeft:".5%"}}>
                    <Image src={movie.poster}/>
                    <Card.Content style={{marginTop:"-10%"}}>
                        <Icon name="user circle"/>{movie.user.username}<br></br>
                        <Rating 
                        disabled size="mini" 
                        rating={movie.rating}  
                        maxRating={5}  
                        />
                    </Card.Content>
                </Card>
            ))} 
        </Card.Group>
        </>
	)
}

export default Feed