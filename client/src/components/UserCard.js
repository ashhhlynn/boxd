import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const UserCard = (props) => {

	return (
		<>
		<Card style={{backgroundColor:"#1a1f22"}}>
            <center>
				<Icon style={{marginTop:"6%"}} size="massive" name="user circle"/>
			    <h1 style={{marginTop:"2%"}}>{props.currentUser.username}</h1>
			    <p>
				    {props.userFollowing.length} following | {props.userFollowers.length} followers
                    <br></br><br></br>
			    </p>
            </center>
		</Card>		
		</>
	);
};

export default UserCard