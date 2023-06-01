import React, { Component } from 'react'
import { Segment, Header, Button, Divider, Grid } from 'semantic-ui-react'
import DiaryFilm from './DiaryFilm'
import { Link } from 'react-router-dom'

class Film extends Component {

  
  render() {
    return (
        <div>

<Segment  style={{backgroundColor:"#161D21", color:"#faefd1", fontWeight:"normal"}}>
<h1 style={{color:"white"}}>Shawshank Redemption
<Button floated="right">Log Film</Button><Button floated="right"><Link to ='/'>Back</Link></Button>

</h1>
<Divider></Divider>
<Grid  stackable columns={2}>
    <Grid.Column>
<img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/beet-hummus-crispy-chickpeas-subs-b705a73.jpg?quality=90&webp=true&resize=440,400"/>
</Grid.Column>
<Grid.Column>
<h3>Director: Francis Ford</h3>
<h3>Actrs: Morgan, Who knows, Francis Ford</h3>
<h3>Writer: Francis Ford</h3>
<h3>Plot: Blah blah </h3>
<h3>Year: 1982 </h3>
<h3>Genre: Drama</h3>


    
    
    </Grid.Column>
</Grid>
</Segment>
 </div>
    )
  }
}

export default Film