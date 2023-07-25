import React from "react"
import { Grid, Divider, Segment} from 'semantic-ui-react'
import Login from './Login'
import Signup from './Signup'
import { useHistory } from "react-router-dom"

function SigninRegister(props) {

    const history = useHistory()

    function handleRoute() {
        props.getUserProfile()
        history.push('/')
    }
    
    return (
        <>          
        <Segment placeholder style={{background:"none"}}>
            <Grid stackable relaxed='very' columns={2}>
                <Grid.Column> 
                  <Login handleRoute={handleRoute}/>
                </Grid.Column>                 
                <Grid.Column>
                    <Signup handleRoute={handleRoute}/>
                </Grid.Column>   
            </Grid>
            <Divider vertical>Or</Divider>
        </Segment>
        </>
    )
}

export default SigninRegister

