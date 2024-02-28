import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Button } from 'semantic-ui-react'

const UserFollowing = (props) => {
	return (
		<>
		{props.userFollowing.map((user, index) => (
			<Card key={index}>
				<Card.Header>
					<Link to='/profile' onClick={() => props.changeUserShow(user.id)} >{user.username}</Link>
					<Button floated="right" onClick={(event) => props.removeFollow(event, user)} size="mini">
						<Icon name="user close"/>
					</Button> 
				</Card.Header>
			</Card>
		))}	
		</>
	)
}

export default UserFollowing