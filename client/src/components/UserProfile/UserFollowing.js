import React from 'react'
import { Card, Icon, Item, Button } from 'semantic-ui-react'

const UserFollowing = (props) => {

	return (
		<>
	   	<h3>Following</h3>
		<Item style={{textAlign:"left", marginLeft:"31%"}}>
			{props.userFollowing.map((user, index) => (
				<Card key={index} style={{ width:"130px", boxShadow:"none", backgroundColor:"#1a1f22"}}>
					<Card.Header>
						<Button basic style={{marginTop:"-1.5%"}} floated="right" size="mini" onClick={(event) => props.removeFollow(event, user.id)}>
							<center>
								<Icon style={{color:"white"}} name="close"/>
							</center>
						</Button>
						<Icon name="user circle"/>
						{user.username}
					</Card.Header>
				</Card>
			))}	
		</Item>
		</>
	)
}

export default UserFollowing