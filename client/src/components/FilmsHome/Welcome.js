import { Button, Item } from 'semantic-ui-react'
import React from 'react'
import { Link} from 'react-router-dom'

const Welcome = () => {
	return (
        <div className="bg">
            <Item style={{marginTop:"4%"}}><br></br><br></br><br></br><br></br><br></br><br></br>
                <h1>The social network for film.</h1>
                <h2>Track films you've watched.</h2>
                <h2>Tell your friends what's good.</h2>
                <Button as={Link} to ="/login" size="big">GET STARTED</Button>  
            </Item>
        </div>   
	)
}

export default Welcome
