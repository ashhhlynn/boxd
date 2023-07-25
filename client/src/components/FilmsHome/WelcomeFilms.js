import React from 'react'
import { Image, Card } from 'semantic-ui-react'

const WelcomeFilms = (props) => {
	return (
        <Card.Group itemsPerRow={7} style={{marginBottom:"3%", marginTop:"3%"}}>
            {props.welcomeMovies.map((wm) => (
                <Card key={wm.Title}>
                    <Image src={wm.Poster}/>
                </Card>
            ))}
        </Card.Group>
    )
}

export default WelcomeFilms