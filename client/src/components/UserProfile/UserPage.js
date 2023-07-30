import React, { useState, useEffect } from 'react'
import { Grid, Item, Divider } from 'semantic-ui-react'
import UserSearch from './UserSearch'
import UserFollowers from './UserFollowers'
import UserFollowing from './UserFollowing'

const UserPage = (props) => {
	
	const [userFollowing, setUserFollowing] = useState([])

	useEffect(() => {
		getFollowing()
	}, [])

	const getFollowing = () => {
		setUserFollowing(props.currentUser.followees)
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
		<div className="userpage">
			<center>
				<br></br>
				<UserSearch addFollow={addFollow}/>
				<Grid stackable columns={2}>
					<Grid.Column>
						<h3>Following</h3>
						<Divider style={{marginTop:"-1.5%", marginBottom:"14.5%"}}></Divider>
						{userFollowing.length === 0 ?
							<center>You're following 0 users.</center>
						:
							<Item style={{textAlign:"left", marginLeft:"12%"}}>	
								<UserFollowing userFollowing={userFollowing} removeFollow={removeFollow} />
							</Item>
						}
					</Grid.Column>
					<Grid.Column>
						<h3>Followers</h3>
						<Divider style={{marginTop:"-1.5%", marginBottom:"14.5%"}}></Divider>
						<UserFollowers  currentUser={props.currentUser}/>
					</Grid.Column>
				</Grid>
				<br></br>
			</center>
		</div>
	)
}

export default UserPage