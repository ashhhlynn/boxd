import React, { useState, useEffect } from 'react'
import { Icon } from 'semantic-ui-react'
import Films from './Films'

const SearchBox = (props) => {
	
    const [searchValue, setSearchValue] = useState('')
    const [films, setFilms] = useState([])
    
    const getMovieRequest = async (searchValue) => {
        const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`
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
		Search films <input style={{letterSpacing:".5px", fontSize:"16px"}} value={props.value} onChange={(event) => setSearchValue(event.target.value)}/> <Icon name="search"/>
		<Films films={films}/>
		</>
	)
}

export default SearchBox