import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { Segment, Menu, Divider, Container } from 'semantic-ui-react'
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import MovieList from './components/MovieList';
import DiaryList from './components/DiaryList';

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
		console.log(movie)
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className='app' style={{backgroundColor:"#1a1f22"}}>
			<Menu className="headernav" style={{backgroundColor:"#15191b", height:"100px"}}>
						<Menu.Menu style={{marginLeft:"3%", marginTop:".5%"}} position="left"><br></br>
							<h1>Boxd.</h1>
						</Menu.Menu>
						<Menu.Item>
							<a>Diary</a> </Menu.Item>
							<Menu.Item>
							<a>Signup</a> </Menu.Item>
							<Menu.Item>
							<a>Signin</a> </Menu.Item>
						<Menu.Menu  style={{marginTop:"3%", marginRight:"3%"}} position='right'>
							<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
						</Menu.Menu>
					</Menu>
      		<Container>
				<center>
					
	    			<Segment style={{color:"white", backgroundColor:"#1a1f22"}}>
						
  						<div className='row'>
							<MovieList
							movies={movies}
							handleFavouritesClick={addFavouriteMovie}
							favouriteComponent={AddFavourites}
							/>
						</div>
					</Segment>
					</center>
					<Segment style={{color:"white", backgroundColor:"#1a1f22"}}>
						<h1>Diary</h1>
						<Divider></Divider>
						<div className='row'>
      						<DiaryList
							movies={favourites}
							handleFavouritesClick={removeFavouriteMovie}
							favouriteComponent={RemoveFavourites}
							/>
						</div>
					</Segment>
      			
	  		</Container>
		</div>
	);
};

export default App;