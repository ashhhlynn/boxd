import React, { Component } from 'react';
import { Divider, Icon, Grid, Item } from 'semantic-ui-react';
import UserShowFilm from './UserShowFilm';

class UserShow extends Component {
    
    state = {
        user: [],
        userDiaryFilms: [],
        date: '',
        follows: 0,
        followers: 0
    };
    
    componentDidMount = () => {
        fetch("/users/" + this.props.userShow)
        .then(resp => resp.json())
        .then(data => {
            this.setState({user: data})
            let year = data.created_at.slice(0,4)
            let date = data.created_at.slice(5,10) + '-' + year
            this.setState({date})
            this.setState({userDiaryFilms: data.diary_films})
            this.setState({follows: data.followees.length})
            this.setState({followers: data.followers.length})
        })
    }
    
    render () {
        return (
            <div className="diaries">
                <Grid stackable columns={2} style={{letterSpacing:".5px", fontFamily:"Helvetica"}}>
                    <Grid.Column style={{width:"230px"}}>
                        <Item style={{marginLeft:"-20%", marginTop:"20%"}}>
                            <center>
                                <Icon name="user circle" size="huge" style={{marginLeft:"2.2%", fontSize:"600%"}} />  
                            </center>
                            <h2 style={{ marginTop:"3%"}}>{this.state.user.username}</h2>
                            <p>
                                Since {this.state.date}<br/>
                                {this.state.follows} Following | {this.state.followers} Followers<br/>                            
                                {this.state.userDiaryFilms.length} Films Logged
                            </p>
                        </Item>
                    </Grid.Column>
                    <Grid.Column>
                        {this.state.userDiaryFilms.length === 0 ?
                            <p><br/><br/><br/>This user's diary is empty.</p>
                        :
                            <>
                            <br/>
                            <Divider style={{width:"157%", marginLeft:"1.4%"}} />
                            {this.state.userDiaryFilms.map((movie, index) => (
                                <UserShowFilm key={index} movie={movie} />
                            ))}
                            </>
                        }
                    </Grid.Column>
                </Grid>
            </div>
        )
    };
};

export default UserShow;