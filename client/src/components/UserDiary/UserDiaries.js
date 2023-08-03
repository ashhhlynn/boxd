import { Divider } from 'semantic-ui-react'
import UserDiaryFilm from './UserDiaryFilm'
import SearchBox from './SearchBox'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addDiaryFilm } from "../actions/rootActions"
import { removeDiaryFilm } from "../actions/rootActions"
import { patchDiaryFilm } from "../actions/rootActions"
import UserHeadline from './UserHeadline'

class UserDiaries extends Component {

    addUserDiaryFilm = (film) => {	
        fetch("/diary_films", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: film.Title, 
				user_id: this.props.currentUser.id, 
				watch_date: film.imdbID,
				year: film.Year, 
				poster: film.Poster, 
				rating: 0, 
			})
		})
		.then((response) => response.json())
        .then(data => {
            this.props.addDiaryFilm(data)
        })
	}

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
                <UserHeadline/>
			    <Divider style={{marginBottom:"2%", marginTop:"4%"}}></Divider>
                <center>
                    <SearchBox addUserDiaryFilm={this.addUserDiaryFilm}/>
                </center><br></br><br></br>
                {this.props.countDF === 0 ?
                    <p><br></br>Your diary is empty. Search for a film to begin logging!</p> 
                :
                    <>
                    <Divider style={{width:"84%", marginLeft:"8%"}}></Divider>
		            {this.props.dF.map((movie, index) => (
                        <UserDiaryFilm key={index} movie={movie} removeUserDiaryFilm={this.removeUserDiaryFilm} patchRating={this.patchRating}/>
                    ))}
                    </>
                }
            </div>
	    )
    }
}
    
const mapStateToProps = (state) => {
    return { 
    	currentUser: state.currentUser,
        dF: state.diaryFilms,
        countDF: state.countDF
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
    	addDiaryFilm: (film) =>  { dispatch(addDiaryFilm(film)) },
        removeDiaryFilm: (film) =>  { dispatch(removeDiaryFilm(film)) },
    	patchDiaryFilm: (film) =>  { dispatch(patchDiaryFilm(film)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDiaries)