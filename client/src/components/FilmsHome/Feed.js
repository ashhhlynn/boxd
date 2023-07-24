import React from 'react'
import {  Card, Image, Rating, Icon } from 'semantic-ui-react'

const Feed = (props) => {
	return (
        <>
        <Card.Group itemsPerRow={7} style={{marginTop:"4%", marginBottom:"1.5%"}}>
            {props.userFeed.map((movie, index) => (  
                <Card key={index} style={{marginLeft:".5%",backgroundColor:"#1a1f22", boxShadow:"none", color:"white"}}>
                    <Image style={{height:"210px", width:"200px"}} src={movie.poster}/>
                    <Card.Content style={{marginTop:"-10%"}}>
                        <Icon name="user circle"/>{movie.user.username}<br></br>
                        <Rating 
                        icon='star' 
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