import React, { useState, useEffect } from 'react';
import { Divider, Icon, Grid, Item } from 'semantic-ui-react';
import UserShowFilm from './UserShowFilm';

const UserShow = ({ userShow }) => {
    
    const [state, setState] = useState({
        user: [],
        userDiaryFilms: [],
        date: '',
        follows: 0,
        followers: 0
    });
    
    useEffect(() => {
        fetch("/users/" + userShow)
        .then(resp => resp.json())
        .then(data => {
            let year = data.created_at.slice(0,4)
            let d = data.created_at.slice(5,10) + '-' + year
            setState({
                user: data,
                date: d,
                userDiaryFilms: data.diary_films,
                follows: data.followees.length,
                followers: data.followers.length
            })          
        })  
    }, [userShow]);

    return (
        <div className="diaries">
            <Grid stackable 
                columns={2} 
                style={{
                    letterSpacing:".5px", 
                    fontFamily:"Helvetica"
                }}>
                <Grid.Column style={{width:"230px"}}>
                    <Item style={{
                        marginLeft:"-20%", 
                        marginTop:"20%"
                    }}>
                        <center>
                            <Icon 
                                name="user circle" 
                                size="huge" 
                                style={{
                                    marginLeft:"2.2%", 
                                    fontSize:"600%"
                                }}
                            />  
                        </center>
                        <h2 style={{ marginTop:"3%"}}>{state.user.username}</h2>
                        <p>
                            Since {state.date}<br/>
                            {state.follows} Following | {state.followers} Followers<br/>                            
                            {state.userDiaryFilms.length} Films Logged
                        </p>
                    </Item>
                </Grid.Column>
                <Grid.Column>
                    {state.userDiaryFilms.length === 0 ?
                        <p><br/><br/><br/>This user's diary is empty.</p>
                    :
                        <>
                        <br/>
                        <Divider style={{
                            width:"157%", 
                            marginLeft:"1.4%"
                        }} />
                        {state.userDiaryFilms.map((movie, index) => (
                            <UserShowFilm key={index} movie={movie} />
                        ))}
                        </>
                    }
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default UserShow;