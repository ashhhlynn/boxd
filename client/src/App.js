import './App.css'
import 'semantic-ui-css/semantic.min.css'
import React, { useState, useEffect, useReducer } from 'react'
import { Icon, Menu, Divider, Container } from 'semantic-ui-react'
import WelcomeFilms from './components/WelcomeFilms'
import Films from './components/Films'
import Diaries from './components/Diaries'
import SearchBox from './components/SearchBox'
import Footer from './components/Footer'
import Feed from './components/Feed'
import User from './components/User'
import UserDiaries from './components/UserDiaries'
import { rootReducer } from "./components/reducers/rootReducer";

const App = () => {
	const [films, setFilms] = useState([])
  	const [diaries, setDiaries] = useState([])
  	const [searchValue, setSearchValue] = useState('')

	const [userDiaries, setUserDiaries] = useState([])
	const [state, dispatch] = useReducer(rootReducer, userDiaries);

  	const getMovieRequest = async (searchValue) => {
		const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
		const response = await fetch(url)
		const responseJson = await response.json()
		if (responseJson.Search) {
			setFilms(responseJson.Search)
		}
	}

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
		console.log(state.userFilms)
	
	})
	

	}

  	useEffect(() => {
		getMovieRequest(searchValue)
	}, [searchValue])

  	useEffect(() => {
    	const filmDiaries = JSON.parse(
        localStorage.getItem('react-movie-app-diaries')
		)	
    	if (filmDiaries) {
    		setDiaries(filmDiaries);
      	}
  	}, [])

	useEffect(() => {
		getUserMovies()
	}, [])

	const addDiaryFilm = (film) => {
    	const newDiaryList = [...diaries, film]
    	setDiaries(newDiaryList)
    	saveToLocalStorage(newDiaryList)
    	var today = new Date(),
    	date = (today.getMonth() + 1) + '-' + today.getDate()
    	localStorage.setItem('date'+ film.imdbID, date)
		addUserDiaryFilm(film)
		console.log(state.userFilms)

	}

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

  	const removeDiaryFilm = (film) => {
    	const newDiaryList = diaries.filter(
    		(diary) => diary.imdbID !== film.imdbID
      	)
      	setDiaries(newDiaryList)
      	saveToLocalStorage(newDiaryList)
      	localStorage.removeItem(film.imdbID)
      	localStorage.removeItem('date'+ film.imdbID)
	  	removeUserDiaryFilm(film)
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
  
  	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-diaries', JSON.stringify(items))
	}

	return (
    	<div className="app" style={{backgroundColor:"#1a1f22", minHeight:"100vh"}} >
      	<Menu style={{backgroundColor:"#15191b", color:"white", height:"100px"}}>
				<Menu.Menu style={{marginLeft:"5%", marginTop:".5%"}} position="left"><br></br>
					<h1>Boxd.</h1>
				</Menu.Menu>
				<Menu.Menu  style={{marginTop:"3%", marginRight:"6%"}} position='right'>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
					<Icon size="large" name="home alternate"/>
					<Icon style={{marginTop:"0%", marginRight:"-300%"}} size="large" name="user circle "/>
				</Menu.Menu>
			</Menu>
      	<Container >
        	<WelcomeFilms/>
        	<Divider></Divider>
        	<Films
				films={films}
          		handleDiaryClick={addDiaryFilm}
        	/>
        	<Divider></Divider>
        	{diaries.length === 0 ?
          		<p>Your diary is empty. Search for a film to begin logging!</p> 
        	:
          		<></>
        	}
        	<Diaries
				films={diaries}
          		handleDiaryClick={removeDiaryFilm}
        	/>
		    <Divider></Divider>
			<User />
			<Divider></Divider>
			<UserDiaries 
				films={userDiaries} 
				handleUserDiaryClick={removeUserDiaryFilm}
				/>
      	</Container>
      	<Footer/>
    	</div>
  	)
}

export default App
