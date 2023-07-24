import React from 'react'
import { Card, Icon, Item } from 'semantic-ui-react'

const UserFollowing = (props) => {
	return (
		<>
	   	<h3>Following</h3>
		<Item style={{textAlign:"left", marginLeft:"23%"}}>
			{props.userFollowing.map((user, index) => (
				<Card key={index} style={{ width:"130px", boxShadow:"none", backgroundColor:"#1a1f22"}}>
					<Card.Header style={{letterSpacing:"1.5px"}}>
						<Icon name="user close" style={{cursor:"pointer"}} onClick={(event) => props.removeFollow(event, user.id)}/> {user.username}
					</Card.Header>
				</Card>
			))}	
		</Item>
		</>
	)
}

export default UserFollowing