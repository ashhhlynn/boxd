import React, { useState, useEffect } from 'react'
import { Image, Card } from 'semantic-ui-react'

const WelcomeFilms = () => {

	const [welcomeMovies, setWelcomeMovies] = useState([])
	const getWelcomeMovieRequest = async () => {
		const url = `https://www.omdbapi.com/?s=hack&apikey=263d22d8`
		const response = await fetch(url);
		const responseJson = await response.json()
		if (responseJson.Search) {
			setWelcomeMovies(responseJson.Search.slice(0,7))
		}
	}

	useEffect(() => {
		getWelcomeMovieRequest()
	}, [])
    
	return (
        <Card.Group itemsPerRow={7}>
            {welcomeMovies.map((wm) => (
                <Card key={wm.Title}>
                    <Image style={{height:"220px", width:"200px"}} src={wm.Poster}/>
                </Card>
	        ))}
        </Card.Group>
    )
}

export default WelcomeFilms