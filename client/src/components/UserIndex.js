import React, { useState, useEffect } from 'react'
import { Button, Card, Icon, Grid, Item } from 'semantic-ui-react'
import UserSearch from './UserSearch'

const UserIndex = (props) => {
	const [users, setUsers] = useState([])
    const [userFollowing, setUserFollowing] = useState([])
    const [userFollowers, setUserFollowers] = useState([])

	useEffect(() => {
		getUsers()
	}, [])

    const getUsers = () => {
        fetch("/users")
        .then(resp => resp.json())
        .then(data => {
            setUsers(data)
            console.log(data)
        })
    }

	const getFollows = () => {
		fetch("/follows")
        .then(resp => resp.json())
        .then(data => {
			setUserFollowing(data)
		})
	}

	useEffect(() => {
		getFollows()
	}, [])

	const getFollowers = () => {
		fetch("/followers")
        .then(resp => resp.json())
        .then(data => {
			setUserFollowers(data)
			console.log(data)
		})
	}

	useEffect(() => {
		getFollowers()
	}, [])

	const addFollow = (event) => {
		let u = users.find(u=> u.username === event.target.id)
		if (!userFollowing.find(f => f.id === u.id )){
			fetch("/follows", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user_id: u.id , 
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
			<UserSearch users={users} addFollow={addFollow} />
			<Grid style={{marginTop:"3%", marginLeft:"5%"}} stackable columns={3}  >
            	<Grid.Column>
					<Card style={{ backgroundColor:"#1a1f22"}}>
						<center>
							<br></br>
							<Icon size="massive" name="user circle"/>
						</center>
						<h1 style={{marginTop:"2%"}}>{props.currentUser.username}</h1>
						<p>
							{userFollowing.length} following | {userFollowers.length} followers | {props.currentUser.diary_films.length} films<br></br><br></br>
						</p>
					</Card>
				</Grid.Column>
				<Grid.Column>
					<h3 style={{marginLeft:"15%"}}>Following</h3>
					<Item>
						{userFollowing.map((user, index) => (
							<Card style={{ boxShadow:"none", backgroundColor:"#1a1f22"}}>
								<Card.Header>
									<Icon name="user"/>
									{user.username}
									<Button floated="right" size="mini" onClick={(event) => removeFollow(event, user.id)}><center><Icon size="tiny" name="close"/></center></Button>
								</Card.Header>
							</Card>
						))}	
					</Item>
				</Grid.Column>
				<Grid.Column>
					<h3>Followers</h3>
					<Item style={{marginLeft:"6%"}}>
						{userFollowers.map((user, index) => (
							<Card style={{ boxShadow:"none", backgroundColor:"#1a1f22"}}>
								<Card.Header>
									<Icon name="user"/>
									{user.username}
								</Card.Header>
							</Card>
						))}	
					</Item>
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default UserIndex