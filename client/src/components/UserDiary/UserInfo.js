import React from 'react';
import { Item, Icon } from 'semantic-ui-react';

const UserInfo = (props) => {
    return (
        <Item style={{
            marginLeft:"-20%", 
            marginTop:"20%", 
            textAlign:"center"
        }}>
            <Icon 
                name="user circle" 
                size="huge" 
                style={{
                    marginLeft:"2.2%", 
                    fontSize:"600%"
                }}
            />  
            <h2 style={{ marginTop:"3%"}}>{props.currentUser.username}</h2>
            <p>
                Since {props.currentUser.created_at.slice(5, 10)}-  
                {props.currentUser.created_at.slice(0,4)}<br/>
                {props.userFollowingCount} Following | {props.currentUser.followers.length} Followers<br/>
                {props.dF.length} Films Logged<br/>
            </p>
        </Item>
    );
};

export default UserInfo;