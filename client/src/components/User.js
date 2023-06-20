import React, { Component } from "react"
import { Grid, Divider, Segment} from 'semantic-ui-react'
import Login from './Login'
import Signup from './Signup'

class User extends Component {

    render() {
        return (
            <>          
            <Segment placeholder style={{backgroundColor:"#1a1f22"}}>
                <Grid stackable relaxed='very' columns={2} >
                    <Grid.Column> 
                      <Login />
                    </Grid.Column>                 
                    <Grid.Column verticalAlign='middle'>
                        <Signup />
                    </Grid.Column>   
                </Grid>
                <Divider style={{color:"white"}}vertical>Or</Divider>
                </Segment>
            </>
        )
    }
}

export default User