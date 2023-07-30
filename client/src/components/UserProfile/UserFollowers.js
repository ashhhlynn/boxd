import React from 'react'
import { Card, Icon, Item, Button } from 'semantic-ui-react'

const UserFollowers = (props) => {

	return (
		<>
		{props.currentUser.followers.length === 0 ?
			<>
			<center>0 users are following you.</center>
			</>
		:
			<Item style={{textAlign:"left", marginLeft:"12.5%"}}>
				{props.currentUser.followers.map((user, index) => (
					<Card key={index}>
						<Card.Header>
							{user.username}
							<Button floated="right" style={{cursor:"auto"}}size="mini">
								<Icon name="user"/>
							</Button> 
						</Card.Header>
					</Card>
				))}	
			</Item>
		}
		</>
	)
}

export default UserFollowers