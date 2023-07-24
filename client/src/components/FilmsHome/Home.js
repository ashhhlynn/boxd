import { Divider, Icon } from 'semantic-ui-react'
import WelcomeFilms from './WelcomeFilms'
import Diaries from '../GuestDiary/Diaries'
import SearchBox from './SearchBox'
import React, { useState, useEffect } from 'react'
import Feed from './Feed'

const Home = (props) => {
    
    const [diaries, setDiaries] = useState([])
    const [welcomeMovies, setWelcomeMovies] = useState([])
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
            date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
            localStorage.setItem('date'+ film.imdbID, date)
        }
        else {
            props.addUserDiaryFilm(film)
        }
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

	return (
        <div>
		    <SearchBox addDiaryFilm={addDiaryFilm}/><Icon name="search" size="large" style={{marginLeft:"21%", marginTop:"-2.3%"}}/>  
            <WelcomeFilms welcomeMovies={welcomeMovies}/>
            <Divider></Divider>
            {props.currentUser.length === 0 ?
                <>
                <h2>Your Diary</h2>
                {diaries.length === 0 ?
                    <p><br></br>Your diary is empty. Search for a film to begin logging!</p>
                :
                    <>
                    <Divider style={{width:"90%", marginLeft:"5%"}}></Divider>
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
                {feed.length !== 0 ?
                    <>
                    <Feed userFeed={feed}/>
                    <Divider></Divider>
                    </>
                : 
                    <>
                    </>
                }
                </>
            }
        </div>
	)
}

export default Home