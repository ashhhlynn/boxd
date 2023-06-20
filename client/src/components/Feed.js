import React, { useState, useEffect } from 'react'
import {  Card, Image, Rating, Icon } from 'semantic-ui-react'

const Feed = () => {

    const [userDF, setUserDF] = useState([])

    const getUsers = () => {
        fetch("/follows")
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            const i = []
            data.forEach(d => 
                i.push(d.diary_films)
            )
            setUserDF(i.flat().slice(0,8))
        })   
    }  

	useEffect(() => {
		getUsers()
	}, [])   

	return (
		<Card.Group itemsPerRow={8}>
            {userDF.map((movie, index) => (  
                <Card style={{marginLeft:"5%",backgroundColor:"#1a1f22", boxShadow:"none", color:"white"}}>
                    <Image style={{height:"180px", width:"200px"}} src={movie.poster}/>
                    <Card.Content style={{marginTop:"-10%"}}>
                        <Icon name="user circle "/>{movie.user.username}<br></br>
                        <Rating icon='star' disabled size="mini"  rating={movie.rating}  
                        maxRating={5}  />
                    </Card.Content>
                </Card>
            ))} 
        </Card.Group>
	)
}

export default Feed