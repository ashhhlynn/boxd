import React, { useState, useEffect } from 'react'
import {  Card, Image, Rating, Icon } from 'semantic-ui-react'
import WelcomeFilms from './WelcomeFilms'

const Feed = (props) => {

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
            let o = i.flat()
            let x = o.slice().sort((item1, item2) => item1.created_at < item2.created_at ? 1 : -1).slice(0,7)
            setUserFeed(x)
        })   
    }  

	useEffect(() => {
		getUserFeed()
	}, [])   

	return (
        <>
        {userFeed.length !== 0 ? 
		    <Card.Group itemsPerRow={7}>
                {userFeed.map((movie, index) => (  
                    <Card key={index} style={{marginLeft:".5%",backgroundColor:"#1a1f22", boxShadow:"none", color:"white"}}>
                        <Image style={{height:"210px", width:"200px"}} src={movie.poster}/>
                        <Card.Content style={{marginTop:"-10%"}}>
                            <Icon name="user circle"/>{movie.user.username}<br></br>
                            <Rating icon='star' disabled size="mini"  rating={movie.rating}  
                            maxRating={5}  />
                        </Card.Content>
                    </Card>
                ))} 
            </Card.Group>
        :
            <WelcomeFilms welcomeMovies={props.welcomeMovies}/>   
        }
        </>
	)
}

export default Feed