import React, { useState, useEffect } from 'react'
import { Grid, Icon, Card } from 'semantic-ui-react'
import UserSearch from './UserSearch'
import UserFollowers from './UserFollowers'
import UserFollowing from './UserFollowing'

const UserPage = (props) => {
	
	const [userFollowing, setUserFollowing] = useState([])

	useEffect(() => {
		getFollowing()
	}, [])

	const getFollowing = () => {
		fetch("/userfollowing")
		.then(resp => resp.json())
		.then(data => {
			setUserFollowing(data)
		})
	}

	const addFollow = (data) => {
		const newUserList = [...userFollowing, data]
		setUserFollowing(newUserList)
	}

	const removeFollow = (event, id) => {
		event.preventDefault()
		fetch(`users/` + id + `/unfollow`, {
			method: 'POST',
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
			<center>
				<Card style={{backgroundColor:"#1a1f22", width:"225px"}}>
					<br></br>
					<center>
						<Icon size="massive" name="user circle"/>
					</center>
					<h2 style={{marginTop:"0%", marginBottom:"7%"}}>{props.currentUser.username}</h2>
				</Card>
				<UserSearch addFollow={addFollow}/><br></br>
				<Grid stackable columns={2}style={{width:"400px"}}>
					<Grid.Column>
						<UserFollowing userFollowing={userFollowing} removeFollow={removeFollow} />
					</Grid.Column>
					<Grid.Column>
						<UserFollowers/>
					</Grid.Column>
				</Grid>
			</center>
			<br></br>
		</div>
	)
}

export default UserPage