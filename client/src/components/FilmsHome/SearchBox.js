import React, { useState, useEffect } from 'react'
import Films from './Films'

const SearchBox = (props) => {
	
    const [searchValue, setSearchValue] = useState('')
    const [films, setFilms] = useState([])
    
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

	return (
		<>
		<h3 style={{marginTop:"4%"}}>
			Search Films... 
			<input value={props.value} onChange={(event) => setSearchValue(event.target.value)} placeholder=''/>
		</h3>
		<Films films={films} handleDiaryClick={props.addDiaryFilm}/>
		<br></br><br></br>
		</>
	)
}

export default SearchBox