import React, { Component } from 'react'
import { Icon, Header, Item, Card, Button, Statistic, Divider, Image} from 'semantic-ui-react'


class DiaryFilm extends Component {


  
  render() {
    return (
 <div>
<br></br>
<Item>
  <Card.Group style={{marginLeft:"2%"}}><Button style={{backgroundColor:"#faefd1"}} size="huge">May 29</Button><Image size="small" src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/beet-hummus-crispy-chickpeas-subs-b705a73.jpg?quality=90&webp=true&resize=440,400"/></Card.Group>
<Item.Content style={{ marginLeft:"65%", marginTop:"-11%"}}>
<h2>Shawshank Redemption<Button inverted style={{marginTop:"0%", marginRight:"10%"}}basic floated="right">1982</Button></h2>

<Icon size="large" name="star" style={{color:"#ffffff"}}></Icon><Icon size="large"name="star" style={{color:"#ffffff"}} ></Icon><Icon size="large"name="star" style={{color:"#ffffff"}}></Icon>
<br></br></Item.Content>
</Item><br></br><br></br><br></br>
<Divider></Divider>
<br></br>
<Item>
  <Card.Group style={{marginLeft:"2%"}}><Button inverted basic size="huge">May 29</Button><Image size="small" src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/beet-hummus-crispy-chickpeas-subs-b705a73.jpg?quality=90&webp=true&resize=440,400"/></Card.Group>
<Item.Content style={{ marginLeft:"65%", marginTop:"-11%"}}>
<h2>Shawshank Redemption<Button style={{marginTop:"0%", marginRight:"10%"}}basic floated="right">1982</Button></h2>

<Icon size="large" name="star"></Icon><Icon size="large"name="star"></Icon><Icon size="large"name="star"></Icon>
<br></br></Item.Content>
</Item><br></br><br></br><br></br>
<Divider></Divider>
<br></br>
<Item>
  <Card.Group style={{marginLeft:"2%"}}><Button inverted basic size="huge">May 29</Button><Image size="small" src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/beet-hummus-crispy-chickpeas-subs-b705a73.jpg?quality=90&webp=true&resize=440,400"/></Card.Group>
<Item.Content style={{ marginLeft:"65%", marginTop:"-11%"}}>
<h2>Shawshank Redemption<Button style={{marginTop:"0%", marginRight:"10%"}}basic floated="right">1982</Button></h2>

<Icon size="large" name="star"></Icon><Icon size="large"name="star"></Icon><Icon size="large"name="star"></Icon>
<br></br></Item.Content>
</Item><br></br><br></br><br></br>
<Divider></Divider><br></br>

 </div>
    )
  }
}

export default DiaryFilm