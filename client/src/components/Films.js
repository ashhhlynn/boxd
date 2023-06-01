import React, { Component } from 'react'
import { Segment, Header, Menu, Search, Item, Image, Container, Card } from 'semantic-ui-react'

import Diary from './Diary'
import TestFilms from './TestFilms'

class Films extends Component {


  
  render() {
    return (
 <>
 <Menu style={{backgroundColor:"#2A3135"}}></Menu>
    <Container>
<Segment  style={{backgroundColor:"#161D21", color:"white"}}><center>


<TestFilms />

<br></br>
<Card.Group itemsPerRow={4} style={{marginTop: "1%", marginLeft:"20%", marginRight:"0%"}}>

Hi
</Card.Group></center>
<br></br><br></br>
</Segment></Container>

 </>
    )
  }
}

export default Films