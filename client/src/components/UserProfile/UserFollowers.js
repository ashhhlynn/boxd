import React, { useState, useEffect } from 'react'
import { Card, Icon, Item, Button, Divider } from 'semantic-ui-react'

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
		<Divider style={{marginTop:"-1.5%", marginBottom:"14.5%"}}></Divider>
		{followers.length === 0 ?
			<>
			<center>0 users are following you.</center>
			</>
		:
			<Item style={{textAlign:"left", marginLeft:"12.5%"}}>
				{followers.map((user, index) => (
					<Card key={index}>
						<Card.Header>
							{user.username}
							<Button floated="right" style={{cursor:"auto"}}size="mini">
								<Icon name="user"/>
							</Button> 
						</Card.Header>
					</Card>
				))}	
			</Item>
		}
		</>
	)
}

export default UserFollowers