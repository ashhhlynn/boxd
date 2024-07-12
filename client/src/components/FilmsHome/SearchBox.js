import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import SearchFilms from './SearchFilms';

const SearchBox = () => {
    const [searchValue, setSearchValue] = useState('');
    const [films, setFilms] = useState([]);
    
    const getMovieRequest = async (searchValue) => {
        const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
        const response = await fetch(url);
        const responseJson = await response.json();
        if (responseJson.Search) {
            setFilms(responseJson.Search);
        }
    };

    useEffect(() => {
      getMovieRequest(searchValue);
    }, [searchValue]);
    
    return (
        <>
        Search films 
        <input onChange={(event) => setSearchValue(event.target.value)} /> 
        <Icon name="search" />
        <SearchFilms films={films} />
        </>
    );
};

export default SearchBox;