import React, { useState, useEffect } from 'react'
import { Grid, Icon, Divider } from 'semantic-ui-react'
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
			<center>
			<br></br>
				<Icon size="massive" name="user circle"/>
				<h1 style={{ marginTop:"0%", marginBottom:".2%"}}>{props.currentUser.username}</h1>
				<p>{props.currentUser.diary_films.length} Films</p>
				<Divider  style={{marginBottom:"5%", marginTop:"4%"}}></Divider>
				<UserSearch addFollow={addFollow}/>
				<Grid stackable columns={2}style={{marginTop:"2%", width:"420px"}}>
					<Grid.Column>
						<UserFollowing userFollowing={userFollowing} removeFollow={removeFollow} />
					</Grid.Column>
					<Grid.Column>
						<UserFollowers/>
					</Grid.Column>
				</Grid>
			<br></br>
			</center>
		</div>
	)
}

export default UserPage