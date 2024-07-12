import './App.css';
import 'semantic-ui-css/semantic.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container } from 'semantic-ui-react';
import Footer from './components/Decorative/Footer';
import SigninRegister from './components/SignUpIn/SigninRegister';
import UserDiaries from './components/UserDiary/UserDiaries';
import Home from './components/FilmsHome/Home';
import Navbar from './components/Decorative/Navbar';
import Watchlist from './components/UserWatchlist/Watchlist';
import UserShow from './components/UserProfiles/UserShow';
import { checkUser, fetchAllDF, fetchWatchlistFilms, fetchFeed, removeFollowFeed, addUserFollowingCount, logOut } from "./components/actions/rootActions";

function App() {
    const [userShow, setUserShow] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        getUserProfile()
        getDiaryFilms()
    });
    
    const getUserProfile = () => {
        fetch("/profile")
        .then(resp => resp.json())
        .then(data => {
            if (data !== null) {
                dispatch(checkUser(data));
                getFeed();
                getWatchlistFilms();
            }
        });
    };

    const getDiaryFilms = () => {
        fetch("/diary_films")
        .then(resp => resp.json())
        .then(data => {
            dispatch(fetchAllDF(data));
        });
    };

    const getFeed = () => {
        fetch("/feed")
        .then(resp => resp.json())
        .then(data => {
            dispatch(fetchFeed(data));
        });
    };

    const getWatchlistFilms = () => {
        fetch("/watchlist_films")
        .then(resp => resp.json())
        .then(data => {
            dispatch(fetchWatchlistFilms(data));
        });
    };
    
    const changeUserShow = (id) => {
        setUserShow(id);
    };

    const addFollowFilms = () => {
        getFeed();
        dispatch(addUserFollowingCount());
    };

    const removeFollowFilms = (data) => {
        dispatch(removeFollowFeed(data));
    };

    const getLogOut = () => {
        dispatch(logOut());
    };

    return (
        <Router>
            <div className="app">
                <Navbar 
                    logOut={getLogOut} 
                    addFollowFilms={addFollowFilms} 
                    removeFollowFilms={removeFollowFilms} 
                    changeUserShow={changeUserShow} 
                />
                <Container>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/login">
                            <SigninRegister getUserProfile={getUserProfile} />
                        </Route>
                        <Route exact path="/userdiary">
                            <UserDiaries />
                        </Route>
                        <Route exact path="/watchlist">
                            <Watchlist />
                        </Route>
                        <Route exact path="/profile">
                            <UserShow userShow={userShow} />
                        </Route>
                    </Switch>
                </Container>
                <Footer />
            </div>
        </Router>
    );
};

export default App;