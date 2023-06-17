import './App.css'
import 'semantic-ui-css/semantic.min.css'
import React, { useState, useEffect, useReducer } from 'react'
import { Icon, Menu, Divider, Container, Search} from 'semantic-ui-react'
import WelcomeFilms from './components/WelcomeFilms'
import Films from './components/Films'
import Diaries from './components/Diaries'
import SearchBox from './components/SearchBox'
import Footer from './components/Footer'
import Feed from './components/Feed'
import User from './components/User'
import UserIndex from './components/UserIndex'
import UserDiaries from './components/UserDiaries'
import { rootReducer } from "./components/reducers/rootReducer";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
	const [films, setFilms] = useState([])
  	const [diaries, setDiaries] = useState([])
  	const [searchValue, setSearchValue] = useState('')

  	const getMovieRequest = async (searchValue) => {
		const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
		const response = await fetch(url)
		const responseJson = await response.json()
		if (responseJson.Search) {
			setFilms(responseJson.Search)
		}
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

	const addDiaryFilm = (film) => {
    	const newDiaryList = [...diaries, film]
    	setDiaries(newDiaryList)
    	saveToLocalStorage(newDiaryList)
    	var today = new Date(),
    	date = (today.getMonth() + 1) + '-' + today.getDate()
    	localStorage.setItem('date'+ film.imdbID, date)
	}

  	const removeDiaryFilm = (film) => {
    	const newDiaryList = diaries.filter(
    		(diary) => diary.imdbID !== film.imdbID
      	)
      	setDiaries(newDiaryList)
      	saveToLocalStorage(newDiaryList)
      	localStorage.removeItem(film.imdbID)
      	localStorage.removeItem('date'+ film.imdbID)
  	}	
  
  	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-diaries', JSON.stringify(items))
	}

	return (
		<Router>
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
				<Switch>
              		<Route exact path="/user">
                		<User/>
              		</Route>
			  		<Route exact path="/userdiaries">
                		<UserDiaries/>
              		</Route>
			  		<Route exact path="/userindex">
                		<UserIndex/>
              		</Route>
			  		<Route exact path="/feed">
			  			<Feed  />
              		</Route>
				</Switch>
      		</Container>
      		<Footer/>
    	</div>
		</Router>
  	)
}

export default App
