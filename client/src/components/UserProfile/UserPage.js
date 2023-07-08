import React, { useState, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import UserSearch from './UserSearch'
import UserCard from './UserCard'
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

	const removeFollow = async (event, id) => {
		event.preventDefault()
		await fetch(`users/` + id + `/unfollow`, {
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
			<UserSearch addFollow={addFollow}/>
			<Grid style={{marginTop:"3%", marginLeft:"8%"}} stackable columns={2}>
            	<Grid.Column>
					<UserCard currentUser={props.currentUser}/>
				</Grid.Column>
				<Grid.Column>
					<Grid stackable columns={2}style={{marginLeft:"1%"}}>
						<Grid.Column>
							<UserFollowing userFollowing={userFollowing} removeFollow={removeFollow} />
						</Grid.Column>
						<Grid.Column style={{marginLeft:"-8%"}}>
							<UserFollowers/>
						</Grid.Column>
					</Grid>
				</Grid.Column>
			</Grid>
		</div>
	)
}

export default UserPage