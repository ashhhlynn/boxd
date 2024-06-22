import React, { useState, useEffect } from 'react';
import { Grid, Item, Divider } from 'semantic-ui-react';
import UserFollowers from './UserFollowers';
import UserFollowing from './UserFollowing';
import UserSearch from './UserSearch';

const UserPage = (props) => {
    
    const [userFollowing, setUserFollowing] = useState([]);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        getFollowing()
    }, []);
    
    const getFollowing = () => {
        fetch("/userfollowing")
        .then(resp => resp.json())
        .then(data => {
            setUserFollowing(data)
        })
    };
    
    useEffect(() => {
        getUsers()
    }, []);
    
    const getUsers = () => {
        fetch("/users")
        .then(resp => resp.json())
        .then(data => {
            setUsers(data)
        })
    };
    
    const addFollow = (data) => {
        props.addFollowFilms()
        const newUserFollowing = [...userFollowing, data]
        setUserFollowing(newUserFollowing)
        let newUsersList = users.filter(u => u.id !== data.id)
        setUsers(newUsersList)
    };
    
    const removeFollow = (event, user) => {
        event.preventDefault()
        fetch(`users/` + user.id + `/unfollow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const newUserList = userFollowing.filter((u) => u.id !== user.id)
        setUserFollowing(newUserList)
        let newUsersList = [...users, user]
        setUsers(newUsersList)
        props.removeFollowFilms(user)
    };
    
    return (
        <div className="userpage">
            <center>
                <br></br>
                <UserSearch users={users} addFollow={addFollow}/>
                <Grid stackable columns={2}>
                    <Grid.Column>
                        <h3>Following</h3>
                        <Divider style={{marginTop:"-1.5%", marginBottom:"14.5%"}}></Divider>
                        {userFollowing.length === 0 ?
                        <p style={{marginTop:"-7%"}}>You're following 0 users</p>
                        :
                            <Item style={{textAlign:"left", marginLeft:"12%"}}>	
                                <UserFollowing changeUserShow={props.changeUserShow} userFollowing={userFollowing} removeFollow={removeFollow}/>
                            </Item>
                        }
                    </Grid.Column>
                    <Grid.Column>
                        <h3>Followers</h3>
                        <Divider style={{marginTop:"-1.5%", marginBottom:"14.5%"}}></Divider>
                        {props.currentUser.followers.length === 0 ?
                            <p style={{marginTop:"-7%"}}>0 users are following you</p>
                        :
                            <Item style={{textAlign:"left", marginLeft:"12.5%"}}>
                                <UserFollowers changeUserShow={props.changeUserShow} userFollowers={props.currentUser.followers}/>
                            </Item>
                        }
                    </Grid.Column>
                </Grid>
            <br></br>
            </center>
        </div>
    )
};

export default UserPage;