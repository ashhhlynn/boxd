import React from 'react'
import { Image, Card } from 'semantic-ui-react'

const WelcomeFilms = (props) => {

	return (
        <Card.Group itemsPerRow={7}>
            {props.welcomeMovies.map((wm) => (
                <Card key={wm.Title}>
                    <Image style={{height:"220px", width:"200px"}} src={wm.Poster}/>
                </Card>
	        ))}
        </Card.Group>
    )
}

export default WelcomeFilms