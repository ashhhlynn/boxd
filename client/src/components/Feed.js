import React, { useState, useEffect } from 'react'
import {  Card, Image, Rating, Icon } from 'semantic-ui-react'

const Feed = () => {

    const [userFeed, setUserFeed] = useState([])

    const getUserFeed = () => {
        fetch("/follows")
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            const i = []
            data.forEach(d => 
                i.push(d.diary_films)
            )
            let o = i.flat().slice().sort((item1, item2) => item1.watch_date < item2.watch_date ? 1 : -1)

            let x = o.slice(0,7)
            setUserFeed(x)
                console.log(x)
        })   
    }  

	useEffect(() => {
		getUserFeed()
	}, [])   

	return (
		<Card.Group itemsPerRow={7}>
            {userFeed.map((movie, index) => (  
                <Card style={{marginLeft:".5%",backgroundColor:"#1a1f22", boxShadow:"none", color:"white"}}>
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