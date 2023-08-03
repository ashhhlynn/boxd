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
		fetch("/userfollowing")
		.then(resp => resp.json())
		.then(data => {
			setUserFollowing(data)
		})
	}

	const addFollow = (data) => {
		const newUserList = [...userFollowing, data]
		setUserFollowing(newUserList)
		props.getUserProfile()
	}

	const removeFollow = (event, id) => {
		event.preventDefault()
		fetch(`users/` + id + `/unfollow`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const newUserList = userFollowing.filter((u) => u.id !== id)
		setUserFollowing(newUserList)
		props.getUserProfile()
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
							<p style={{marginTop:"-7%"}}>You're following 0 users.</p>
						:
							<Item style={{textAlign:"left", marginLeft:"12%"}}>	
								<UserFollowing userFollowing={userFollowing} removeFollow={removeFollow} />
							</Item>
						}
					</Grid.Column>
					<Grid.Column>
						<h3>Followers</h3>
						<Divider style={{marginTop:"-1.5%", marginBottom:"14.5%"}}></Divider>
						{props.currentUser.followers.length === 0 ?
							<p style={{marginTop:"-7%"}}>0 users are following you.</p>
						:
							<Item style={{textAlign:"left", marginLeft:"12.5%"}}>
								<UserFollowers userFollowers={props.currentUser.followers}/>
							</Item>
						}
					</Grid.Column>
				</Grid>
				<br></br>
			</center>
		</div>
	)
}

export default UserPage