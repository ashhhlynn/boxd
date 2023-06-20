import React, { useState, useEffect } from 'react'
import { Button, Card, Icon, Grid, Header} from 'semantic-ui-react'

const UserIndex = (props) => {
	const [users, setUsers] = useState([])
    const [userF, setUserF] = useState([])

    const getUsers = () => {
        fetch("/users")
        .then(resp => resp.json())
        .then(data => {
            setUsers(data)
            console.log(data)
        })
    }

	useEffect(() => {
		getUsers()
	}, [])

	const getFollows = () => {
		fetch("/follows")
        .then(resp => resp.json())
        .then(data => {
			setUserF(data)
			console.log(data)
		})
	}

	useEffect(() => {
		getFollows()
	}, [])

	const addFollow = (event, id) => {
		event.preventDefault()
		if (!userF.find(f => f.id === id )){
			fetch("/follows", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user_id: id, 
					following_id: props.currentUser.id
				})
			})
			.then((response) => response.json())
			.then(data => {
				const newUserList = [...userF, data]
				setUserF(newUserList)
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
		const newUserList = userF.filter(
            (u) => u.id !== id
        )
		setUserF(newUserList)
	}

	return (
		<div>
		{props.currentUser.length === 0? 
			<p>Signup or login to begin following other users!</p>
			:
			<>	
			<Grid stackable columns={2}  >
            	<Grid.Column>
					<h3>Index</h3>
					{users.map((user, index) => (
						<Card style={{boxShadow:"none", backgroundColor:"#1a1f22"}}>
							<Card.Header><Icon name="user"/>{user.username}
								<Button floated="right" size="mini" onClick={(event) => addFollow(event, user.id)}><center><Icon size="tiny" name="plus"/></center></Button>
							</Card.Header>
						</Card>
					))}	
				</Grid.Column>
				<Grid.Column>
				<h3>Following</h3>
					{userF.map((user, index) => (
						<Card style={{ boxShadow:"none", backgroundColor:"#1a1f22"}}>
							<Card.Header><Icon name="user"/>{user.username}
								<Button floated="right" size="mini" onClick={(event) => removeFollow(event, user.id)}><center><Icon size="tiny" name="close"/></center></Button>
							</Card.Header>
						</Card>
					))}	
				</Grid.Column>
			</Grid>
			</>
		}
		</div>
	);
};

export default UserIndex