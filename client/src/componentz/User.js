import React, { Component } from 'react'
import { Segment, Header, Divider } from 'semantic-ui-react'
import DiaryFilm from './DiaryFilm'


class User extends Component {


  
  render() {
    return (
 <div>

<Segment  style={{backgroundColor:"#161D21", color:"#faefd1", fontWeight:"normal"}}>
<Header color="white">Login or Signup</Header>
<Divider></Divider>

</Segment>
 </div>
    )
  }
}

export default User