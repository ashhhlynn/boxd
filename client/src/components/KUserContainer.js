
import React, { useState, useEffect, useReducer } from 'react'
import { Icon, Menu, Divider, Container } from 'semantic-ui-react'
import Diaries from './components/Diaries'
import Feed from './Feed'
import User from './User'
import UserDiaries from './UserDiaries'
import { rootReducer } from "./reducers/rootReducer";

const UserContainer = () => {
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

	const getRequest = async () => {
		const response = await fetch("/diary_films")
		const responseJson = await response.json()
		console.log(responseJson)
		setUserDiaries(responseJson)
		dispatch({
			type: 'FETCH_USER_DIARY_FILMS',
			user_diary_films: responseJson
		})
	}


	
  useEffect(() => {
		getMovieRequest(searchValue)
		}, [searchValue])

		useEffect(() => {
			getRequest()
			}, [])
	


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
	  addUserDiaryFilm(film)
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
			<UserDiaries films={userDiaries} 
			handleUserDiaryClick={removeUserDiaryFilm}
			/>
      </Container>
      <Footer/>
    </div>
  )

  
}


export default UserContainer