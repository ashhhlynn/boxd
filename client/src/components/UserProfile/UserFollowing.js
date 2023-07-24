import React from 'react'
import { Card, Icon, Item, Button, Divider} from 'semantic-ui-react'

const UserFollowing = (props) => {
	return (
		<>
	   	<h3>Following</h3>
		<Divider style={{marginTop:"-1.5%", marginBottom:"14.5%"}}></Divider>
		{props.userFollowing.length === 0 ?
			<>
			<center>You're following 0 users.</center>
			</>
		:
			<Item style={{textAlign:"left", marginLeft:"12%"}}>		
				{props.userFollowing.map((user, index) => (
					<Card key={index} style={{marginTop:"-8%", width:"150px", boxShadow:"none", backgroundColor:"#1a1f22"}}>
						<Card.Header style={{letterSpacing:"1.5px"}}>
							{user.username}
							<Button floated="right" style={{marginTop:"-2.5%", background:"none", color:"white"}} onClick={(event) => props.removeFollow(event, user.id)} size="mini">
								<Icon name="user close"/>
							</Button> 
						</Card.Header>
					</Card>
				))}
			</Item>
		}
		</>
	)
}

export default UserFollowing