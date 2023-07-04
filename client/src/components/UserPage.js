import React, { useState, useEffect } from 'react'
import { Button, Card, Icon, Grid, Item } from 'semantic-ui-react'
import UserSearch from './UserSearch'
import UserCard from './UserCard'

const UserPage = (props) => {
	
    const [userFollowing, setUserFollowing] = useState([])

	useEffect(() => {
		getUsers()
	}, [])

	const getUsers = () => {
		fetch("/follows")
        .then(resp => resp.json())
        .then(data => {
			setUserFollowing(data)
		})
    }

	const addFollow = (event) => {
		if (!userFollowing.find(f => f.username === event.target.id) && props.users.find(u => u.username === event.target.id)) {
			fetch("/follows", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user_id: (props.users.find(u => u.username === event.target.id)).id, 
					following_id: props.currentUser.id
				})
			})
			.then((response) => response.json())
			.then(data => {
				const newUserList = [...userFollowing, data]
				setUserFollowing(newUserList)
			})
		}
	}

	const removeFollow = (event, id) => {
		event.preventDefault()
		fetch("/follows/" + id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const newUserList = userFollowing.filter(
            (u) => u.id !== id
        )
		setUserFollowing(newUserList)
	}

	return (
		<div>
			<br></br>
			<UserSearch users={props.users} addFollow={addFollow}/>
			<Grid style={{marginTop:"3%", marginLeft:"8%"}} stackable columns={2}>
            	<Grid.Column>
					<UserCard currentUser={props.currentUser} userFollowing={userFollowing} userFollowers={props.followers}/>
				</Grid.Column>
				<Grid.Column>
					<Grid stackable columns={2}style={{marginLeft:"1%"}}>
						<Grid.Column>
							<h3>Following</h3>
							<Item style={{textAlign:"left", marginLeft:"31%"}}>
								{userFollowing.map((user, index) => (
								<Card key={index} style={{ width:"130px", boxShadow:"none", backgroundColor:"#1a1f22"}}>
									<Card.Header>
										<Button basic style={{marginTop:"-1.5%"}} floated="right" size="mini" onClick={(event) => removeFollow(event, user.id)}>
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
						</Grid.Column>
						<Grid.Column style={{marginLeft:"-8%"}}>
							<h3>Followers</h3>
							<Item style={{textAlign:"left", marginLeft:"31%"}}>
								{props.followers.map((user, index) => (
								<Card key={index} style={{ boxShadow:"none", backgroundColor:"#1a1f22"}}>
									<Card.Header>
										<Icon name="user circle"/>
										{user.username}
									</Card.Header>
								</Card>
								))}	
							</Item>
						</Grid.Column>
					</Grid>
				</Grid.Column>
			</Grid>
		</div>
	)
}

export default UserPage