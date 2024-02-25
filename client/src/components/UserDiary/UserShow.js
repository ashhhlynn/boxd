import { Divider, Icon, Grid, Item } from 'semantic-ui-react'
import UserShowFilm from './UserShowFilm'
import React, { Component } from 'react'

class UserShow extends Component {

    state = {
		user: [],
        userDiaryFilms: []
	}

    componentDidMount = () => {
        fetch("/users/" + this.props.userShow)
		.then(resp => resp.json())
		.then(data => {
            console.log(data.diary_films)
            this.setState({user: data})
            this.setState({userDiaryFilms: data.diary_films})
		})
    }

    render () {
	    return (
            <div className="diaries">
                <Grid stackable columns={2}>
                    <Grid.Column style={{ width:"230px"}}>
                        <Item style={{marginLeft:"-20%", marginTop:"20%", fontFamily:"Helvetica", letterSpacing:".5px",}}>
                            <center>
                                <Icon name="user circle" size="huge" style={{marginLeft:"2.2%", fontSize:"600%"}} />  
                            </center>
                            <h2 style={{ marginTop:"3%"}}>{this.state.user.username}</h2>
                            <p>
                                {this.state.userDiaryFilms.length} Films Logged<br></br>
                            </p>
                        </Item>
                    </Grid.Column>
                    <Grid.Column style={{letterSpacing:".5px", fontFamily:"Helvetica"}}>
                        {this.state.userDiaryFilms.length === 0 ?
                            <p><br></br><br></br><br></br>Your diary is empty. Search for a film to begin logging!</p>
                        :
                            <>
                            <br></br>
                            <Divider style={{width:"157%", marginLeft:"1.4%"}}></Divider>
		                    {this.state.userDiaryFilms.map((movie, index) => (
                                <UserShowFilm key={index} movie={movie} />
                            ))}
                            </>
                        }
                   </Grid.Column>
                </Grid>
            </div>
	    )
    }
}
    
export default UserShow