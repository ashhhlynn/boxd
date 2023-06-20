import { Divider } from 'semantic-ui-react'
import WelcomeFilms from './/WelcomeFilms'
import Films from './Films'
import Diaries from './Diaries'
import SearchBox from './SearchBox'
import React, { useState, useEffect } from 'react'
import UserDiaries from './UserDiaries'

const Home = (props) => {
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
        <div>
            <WelcomeFilms/>
            <Divider></Divider>
            {props.currentUser.length === 0 ?
                <>
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/><br></br>
                <Films
                    films={films}
                    handleDiaryClick={addDiaryFilm}
                />
                <Divider></Divider>
                {diaries.length === 0 ?
                    <p>Your diary is empty. Search for a film to begin logging!</p> 
                :
                    <Diaries
                        films={diaries}
                        handleDiaryClick={removeDiaryFilm}
                    />
                } 
                </>   
            : 
                <>
                    <UserDiaries currentUser={props.currentUser}/>
                </>
            }
        </div>
	)
}

export default Home