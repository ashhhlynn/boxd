import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const UserCard = (props) => {

	return (
		<>
		<Card style={{ backgroundColor:"#1a1f22"}}>
			<center>
			<br></br>
				<Icon size="massive" name="user circle"/>
			</center>
			<h1 style={{marginTop:"2%"}}>{props.currentUser.username}</h1>
			<p>
				{props.userFollowing.length} following | {props.userFollowers.length} followers<br></br><br></br>
			</p>
		</Card>		
		</>
	);
};

export default UserCard