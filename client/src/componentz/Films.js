import React, { Component } from 'react'
import { Segment, Header, Rating, Menu, Button, Icon, Image, Container, Form, Card } from 'semantic-ui-react'


class Films extends Component {


  
  render() {
    return (
      <><Card style={{color:"black"}}>
        <h3>June 8, 2023</h3>
        <h3>Film Title</h3>
        <Rating size="huge" color="white" defaultRating={3} maxRating={4} /> <br></br>
        <Button basic>Submit</Button></Card>
      </>
    )
  }
}

export default Films