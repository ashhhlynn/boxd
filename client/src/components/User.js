import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Grid, Divider, Search, Segment} from 'semantic-ui-react'
import Login from './Login'
import Signup from './Signup'
import Feed from './Feed'
import UserIndex from './UserIndex'

class User extends Component {

    state={
        users: [],
        userDF: []
    }

    componentDidMount = () => {
        fetch("/users")
        .then(resp => resp.json())
        .then(data => {
            this.setState({users: data})
            console.log(data)
        })

     
    }
    
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
                <Search       placeholder='Search users to follow...'>

                </Search>
                <UserIndex users={this.state.users}/>
<Feed userDF={this.state.userDF} />

            </>
        )
    }
}


  

export default User