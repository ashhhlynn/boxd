import { Divider, Icon, Grid, Item } from 'semantic-ui-react'
import UserDiaryFilm from './UserDiaryFilm'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeDiaryFilm } from "../actions/rootActions"
import { patchDiaryFilm } from "../actions/rootActions"

class UserDiaries extends Component {
    
    removeUserDiaryFilm = (film) => {
        fetch(`/diary_films/` + film.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        this.props.removeDiaryFilm(film)
    }

    patchRating = (r, id) => {
        fetch(`/diary_films/` + id, {  
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               rating: r
            })
        })
        .then((response) => response.json())
        .then(data => {
            this.props.patchDiaryFilm(data)
        })
    }

    render () {
	    return (
            <div className="diaries">
                <Grid stackable columns={2}>
                    <Grid.Column style={{ width:"230px"}}>
                        <Item style={{marginLeft:"-20%", marginTop:"20%", fontFamily:"Helvetica", letterSpacing:".5px",}}>
                            <center>
                                <Icon name="user circle" size="huge" style={{fontSize:"600%"}} />  
                            </center>
                            <h2 style={{ marginTop:"3%"}}>{this.props.currentUser.username}</h2>
                            <p>
                                Since {this.props.currentUser.created_at.slice(0,7)}<br></br>
                                {this.props.currentUser.diary_films.length} Films Logged<br></br>
                                {this.props.currentUser.followees.length} Following | {this.props.currentUser.followers.length} Followers 
                            </p>
                        </Item>
                    </Grid.Column>
                    <Grid.Column style={{letterSpacing:".5px", fontFamily:"Helvetica"}}>
                        {this.props.dF.length === 0 ?
                            <p><br></br><br></br><br></br>Your diary is empty. Search for a film to begin logging!</p>
                        :
                            <>
                            <br></br>
                            <Divider style={{width:"157%", marginLeft:"1.4%"}}></Divider>
		                    {this.props.dF.map((movie, index) => (
                                <UserDiaryFilm key={index} movie={movie} removeUserDiaryFilm={this.removeUserDiaryFilm} patchRating={this.patchRating}/>
                            ))}
                            </>
                        }
                   </Grid.Column>
                </Grid>
            </div>
	    )
    }
}
    
const mapStateToProps = (state) => {
    return { 
        dF: state.diaryFilms,
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        removeDiaryFilm: (film) => { dispatch(removeDiaryFilm(film)) },
    	patchDiaryFilm: (film) => { dispatch(patchDiaryFilm(film)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDiaries)