import { Divider } from 'semantic-ui-react'
import WelcomeFilms from './WelcomeFilms'
import Diaries from '../GuestDiary/Diaries'
import SearchBox from './SearchBox'
import React, { useState, useEffect } from 'react'
import UserDiaries from '../UserDiary/UserDiaries'
import Feed from './Feed'

const Home = (props) => {
    
    const [diaries, setDiaries] = useState([])
    const [welcomeMovies, setWelcomeMovies] = useState([])
    const [userDiaries, setUserDiaries] = useState([])
    const [feed, setFeed] = useState([])
    
    useEffect(() => {
		getFeed()
	},[])

    const getFeed = () => {
        fetch("/feed")
        .then(resp => resp.json())
        .then(data => {
            setFeed(data)
        })
    }

    useEffect(() => {
		getUserMovies()
	},[])

    const getUserMovies = () => {
        if (props.currentUser.length !== 0) {
            fetch("/profile")
    	    .then(resp => resp.json())
    	    .then(data => {
                setUserDiaries(data.diary_films)
            })
	    }
    }
    
    useEffect(() => {
        getWelcomeMovies()
    }, [])

    const getWelcomeMovies = async () => {
        await fetch("https://www.omdbapi.com/?s=hack&apikey=263d22d8")
        .then((response) => response.json())
        .then(data => {
          setWelcomeMovies(data.Search.slice(0,7))
        })  
    }

    useEffect(() => {
        const filmDiaries = JSON.parse(
        localStorage.getItem('react-movie-app-diaries')
        )	
        if (filmDiaries) {
            setDiaries(filmDiaries);
        }
    }, [])

    const addDiaryFilm = (film) => {
        if (props.currentUser.length === 0) {
            const newDiaryList = [...diaries, film]
            setDiaries(newDiaryList)
            saveToLocalStorage(newDiaryList)
            var today = new Date(),
            date = (today.getMonth() + 1) + '-' + today.getDate()
            localStorage.setItem('date'+ film.imdbID, date)
        }
        else {
            addUserDiaryFilm(film)
        }
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
				user_id: props.currentUser.id, 
				watch_date: date,
				year: film.Year, 
				poster: film.Poster, 
				rating: 0, 
			})
		})
		.then((response) => response.json())
		.then(data => {
            const newDiaryList = [...userDiaries, data]
            setUserDiaries(newDiaryList)
		})
	}

    const saveToLocalStorage = (items) => {
        localStorage.setItem('react-movie-app-diaries', JSON.stringify(items))
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

    const removeUserDiaryFilm = (film) => {
		fetch(`/diary_films/` + film.id, {
    		method: 'DELETE',
    		headers: {
			'Content-Type': 'application/json',	
    		},
		})
        const newDiaryList = userDiaries.filter(
            (diary) => diary.id !== film.id
        )
        setUserDiaries(newDiaryList)
	}

	return (
        <div>
            <SearchBox addDiaryFilm={addDiaryFilm}/>
            <Divider></Divider>
            {props.currentUser.length !== 0 && feed.length !== 0 ?
                <>
                <Feed userFeed={feed}/>
                </>
            : 
                <>
                <WelcomeFilms welcomeMovies={welcomeMovies}/>
                </>
            }
            <Divider></Divider>
            <h2>Your Diary</h2>
            <Divider style={{width:"90%", marginLeft:"5%"}}></Divider>
            {props.currentUser.length === 0 ?
                <>
                {diaries.length === 0 ?
                    <p><br></br>Your diary is empty. Search for a film to begin logging!</p>
                :
                    <>
                    <Diaries
                        films={diaries}
                        handleDiaryClick={removeDiaryFilm}
                    />
                    <br></br>
                    </>
                }
                </>
            : 
                <>
                {userDiaries.length === 0 ?
                    <p><br></br>Your diary is empty. Search for a film to begin logging!</p> 
                :
                    <>
                    <UserDiaries 
                        userDiaries={userDiaries}
                        removeUserDiaryFilm={removeUserDiaryFilm}
                    />
                    <br></br>
                    </>
                }
                </>
            }
        </div>
	)
}

export default Home