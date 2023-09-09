import { Divider } from 'semantic-ui-react'
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
                {this.props.dF.length === 0 ?
                    <p><br></br>Your diary is empty. Search for a film to begin logging!</p> 
                :
                    <>
                    <br></br>
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
        dF: state.diaryFilms,
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        removeDiaryFilm: (film) => { dispatch(removeDiaryFilm(film)) },
    	patchDiaryFilm: (film) => { dispatch(patchDiaryFilm(film)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDiaries)