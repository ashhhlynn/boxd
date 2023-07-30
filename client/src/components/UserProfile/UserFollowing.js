import React from 'react'
import { Card, Icon, Button } from 'semantic-ui-react'

const UserFollowing = (props) => {
	return (
		<>
		{props.userFollowing.map((user, index) => (
			<Card key={index}>
				<Card.Header>
					{user.username}
					<Button floated="right" onClick={(event) => props.removeFollow(event, user.id)} size="mini">
						<Icon name="user close"/>
					</Button> 
				</Card.Header>
			</Card>
		))}	
		</>
	)
}

export default UserFollowing