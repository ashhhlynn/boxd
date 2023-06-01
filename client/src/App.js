import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { Segment, Menu, Header, Container, Item } from 'semantic-ui-react'
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import MovieList from './components/MovieList';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
		const response = await fetch(url);
		const responseJson = await response.json();
		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className='app' style={{backgroundColor:"#000000"}}>
      		<Container>
				<center>
					<Menu className="headernav">
						<Menu.Menu position="left">
							<h1>Boxd</h1>
						</Menu.Menu>
						<center>
							<a>Diary</a> 
							<a>Signup</a> 
							<a>Login</a> 
						</center>
						<Menu.Menu position='right'>
							<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
						</Menu.Menu>
					</Menu>
	    			<Segment style={{color:"white", backgroundColor:"#20272B"}}>
						
  						<div className='row'>
							<MovieList
							movies={movies}
							handleFavouritesClick={addFavouriteMovie}
							favouriteComponent={AddFavourites}
							/>
						</div>
					</Segment>
					<Segment style={{color:"white", backgroundColor:"#20272B"}}>
						<h1>Diary</h1>
						<div className='row'>
      						<MovieList
							movies={favourites}
							handleFavouritesClick={removeFavouriteMovie}
							favouriteComponent={RemoveFavourites}
							/>
						</div>
					</Segment>
      			</center>
	  		</Container>
		</div>
	);
};

export default App;