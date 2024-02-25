import React from 'react'
import { Card, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const UserFollowers = (props) => {
	return (
		<>
		{props.userFollowers.map((user, index) => (
			<Card key={index}>
				<Card.Header>
					<Link to='/profile' onClick={() => props.changeUserShow(user.id)}>{user.username}</Link>
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