import React, { useState, useEffect } from 'react'
import { Card, Icon, Item } from 'semantic-ui-react'

const UserFollowers = () => {

    const [followers, setFollowers] = useState([])

    useEffect(() => {
		getFollowers()
	}, [])

    const getFollowers = () => { 
        fetch("/userfollowers")
        .then(resp => resp.json())
        .then(data => {
            setFollowers(data)
        })
    }

	return (
		<>
	    <h3>Followers</h3>
		<Item style={{textAlign:"left", marginLeft:"23%"}}>
			{followers.map((user, index) => (
				<Card key={index} style={{ boxShadow:"none", backgroundColor:"#1a1f22"}}>
					<Card.Header style={{letterSpacing:"1.5px"}}>
						<Icon name="user"/> {user.username}
					</Card.Header>
				</Card>
			))}	
		</Item>
		</>
	)
}

export default UserFollowers