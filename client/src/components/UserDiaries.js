import { Header, Image, Button, Item, Icon, Label, Divider } from 'semantic-ui-react'
import UserMovieRating from './UserMovieRating'
import React, { useState, useEffect, useReducer } from 'react'
import { rootReducer } from "./reducers/rootReducer";

const UserDiaries = (props) => {

    const [userDiaries, setUserDiaries] = useState([])
	const [state, dispatch] = useReducer(rootReducer, userDiaries);
	const testD = state.userFilms

    const getUserMovies = () => {
		fetch("/users/1")
		.then((response) => response.json())
		.then(data => {
	
		console.log(data.diary_films)
		setUserDiaries(data.diary_films)
		dispatch({
			type: 'FETCH_USER_DIARY_FILMS',
			user_diary_films: data.diary_films
		})
	})
	}

    useEffect(() => {
		getUserMovies()
	}, [])

	const addUserDiaryFilm = (film) => {
		var today = new Date(),
		date = (today.getMonth() + 1) + '-' + today.getDate()
		fetch("/diary_films", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: film.Title, 
				user_id: 1, 
				watch_date: date,
				year: film.Year, 
				poster: film.Poster, 
				rating: 0, 
			})
		})
		.then((response) => response.json())
		.then(data => {
			dispatch({
				type: 'ADD_USER_DIARY_FILM',
				user_diary_film: data
			})
		})
	}

    const removeUserDiaryFilm = (film) => {
		console.log(film.id)
		fetch(`/diary_films/` + film.id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',	
		},
		})
		dispatch({
			type: 'REMOVE_USER_DIARY_FILM',
			user_diary_film: film
		})
	}

    const patchRating = (r, id) => {
        fetch(`/diary_films/` + id, {  
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
               rating: r
            })
        })
        .then(resp => resp.json())
    }

	return (
		<div>
		    {userDiaries.map((movie, index) => (
			    <Item key={index} style={{marginLeft:"5%", marginRight:"5%"}}>
                    <div onClick={() => removeUserDiaryFilm(movie)}>
                        <Button floated="right" size="mini" style={{width:"40px"}} inverted basic>
                            <Icon size="small" name="delete" />
                        </Button>
				    </div>
                    <Header floated="right" style={{color:"white", textAlign:"right"}}>
                        <h3>{movie.title} </h3>
                        <h5>{movie.year}</h5>
					    <h5><UserMovieRating film={movie} key={movie.id} handleClickPatchRating={patchRating}/></h5>
                    </Header>
                    <Header floated="left"><br></br>
                        <Label style={{ backgroundColor:"#FFFEEF", color:"black"}}>
                        2023
                        <h2 ><b>{movie.watch_date.slice(0,4)}</b></h2>
                        </Label>
                    </Header>
				    <Image style={{height:"110px", width:"75px", marginLeft:"13%", alignContent:"left"}} src={movie.poster} alt='movie'/>
                    <Divider></Divider>
                </Item>
		    ))}
        </div>
	)
}

export default UserDiaries