import React from 'react'
import { Card } from 'semantic-ui-react'
import Film from './Filmy'

const WelcomeFilms = (props) => {
	return (
        <Card.Group itemsPerRow={7} style={{marginBottom:"3%", marginTop:"3%"}}>
            {props.welcomeMovies.map((wm) => (
                <Card key={wm.title}>
                    <Film film={wm}/>
                </Card>
            ))}
        </Card.Group>
    )
}

export default WelcomeFilms