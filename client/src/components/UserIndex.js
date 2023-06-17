import React, { useState, useEffect, useReducer } from 'react'
import { Header, Image, Button, Item, Search, Icon, Label, Divider } from 'semantic-ui-react'

const UserIndex = (props) => {
	const [users, setUsers] = useState([])

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

	const addFollow = (event, id) => {
		event.preventDefault()
		fetch("/follows", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user_id: 1, 
				following_id: id
			})
		})
		.then((response) => response.json())
	}

	const removeFollow = (event, id) => {
		event.preventDefault()

		fetch("/follows/" + 1, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}

	return (
		<><Search placeholder='Search users to follow...'>
		</Search>
		
		{users.map((user, index) => (
			<h4>
		<Icon name="user"/>{user.username} <Button style={{marginLeft:"10%"}}size="mini" onClick={(event) => addFollow(event, user.id)}><center><Icon size="tiny" name="plus"/></center></Button>
		<Button style={{marginLeft:"10%"}}size="mini" onClick={(event) => removeFollow(event, user.id)}><center><Icon size="tiny" name="close"/></center></Button>
		</h4>
		))}
		
		
		</>
	);
};

export default UserIndex