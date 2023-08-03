import React from 'react'
import { Card, Icon, Button } from 'semantic-ui-react'

const UserFollowers = (props) => {
	return (
		<>
		{props.userFollowers.map((user, index) => (
			<Card key={index}>
				<Card.Header>
					{user.username}
					<Button floated="right" style={{cursor:"auto"}}size="mini">
						<Icon name="user"/>
					</Button> 
				</Card.Header>
			</Card>
		))}	
		</>
	)
}

export default UserFollowers