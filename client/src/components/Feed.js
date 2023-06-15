import React, { useState, useEffect } from 'react'
import {  Card, Image, Rating, Icon } from 'semantic-ui-react'

const Feed = () => {


    const [userDF, setUserDF] = useState([])


	const getRequest = () => {
        fetch("/users/2")
        .then(resp => resp.json())
        .then(data => {
        setUserDF(data.diary_films)
        })
	}



		useEffect(() => {
			getRequest()
			}, [])
	
   

	return (
		    <Card.Group itemsPerRow={4}>
                {userDF.map((movie, index) => (
              
            
                <Card style={{marginLeft:"5%", width:"110px", height:"170",backgroundColor:"#1a1f22", boxShadow:"none", color:"white"}}>
                 <Image size="small" src={movie.poster}/>
                 <Card.Content style={{marginTop:"-10%"}}><Icon name="user circle "/>ali
                 <Rating icon='star' disabled size="mini"  rating={movie.rating}  
                maxRating={5}  /></Card.Content>
                </Card>
              
               
                 ))} </Card.Group>
		
	)
}

export default Feed