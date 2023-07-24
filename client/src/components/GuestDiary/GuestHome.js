import Diaries from '../GuestDiary/Diaries'
import React, { useState, useEffect } from 'react'

const GuestHome = (props) => {
const [diaries, setDiaries] = useState([])

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
}

export default GuestHome