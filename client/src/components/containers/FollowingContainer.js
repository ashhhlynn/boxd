import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Grid, Divider, Search, Segment} from 'semantic-ui-react'
import Login from './Login'
import Signup from './Signup'
import Feed from './Feed'
import UserIndex from './UserIndex'

class Following extends Component {

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
            
          
                <Search       placeholder='Search users to follow...'>

                </Search>
                <UserIndex users={this.state.users}/>
<Feed  />

   
            </>
        )
    }
}


  

export default Following
