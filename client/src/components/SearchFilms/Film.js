import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Image, Icon, Button, Rating, Modal } from 'semantic-ui-react';
import { addDiaryFilm, addWatchlistFilm, removeWatchlistFilm } from "../actions/rootActions";
import ModalFeed from "./ModalFeed";

const Film = ({ movie }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [score, setScore] = useState('Unrated');
    const dispatch = useDispatch();
    const allDiaryFilms = useSelector(state => state.allDF);
    const currentUser = useSelector(state => state.currentUser);
    const watchlistFilms = useSelector(state => state.watchlistFilms);
    const feed = useSelector(state => state.feed);

    const handleOpen = (event) => {
        if (allDiaryFilms.find(f => f.watch_date === event.target.id)) {
            const f = allDiaryFilms.find(f => f.watch_date === event.target.id);
            fetch("/diary_films/" + f.id)
            .then(resp => resp.json())
            .then(data => {
                setScore(data);
            });
        }
        setModalOpen(true);
    };
    
    const handleClose = () => {
        setModalOpen(false);
    };
    
    const alertMessage = () => {
        window.alert("Register or log in to begin adding films.");
    };

    const addUserDiaryFilm = (film) => {
        if (currentUser.length === 0) {
            alertMessage();
        }
        else {
            fetch("/diary_films", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: film.Title,
                    user_id: currentUser.id,
                    watch_date: film.imdbID,
                    year: film.Year,
                    poster: film.Poster,
                    rating: 0,
                })
            })
            .then((response) => response.json())
            .then(data => {
                window.alert("Added to diary.");
                dispatch(addDiaryFilm(data));
            });
        }
    };
    
    const addUserWatchlistFilm = (film) => {
        if (currentUser.length === 0) {
            alertMessage();
        }
        else {
            fetch("/watchlist_films", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: film.Title, 
                    user_id: currentUser.id, 
                    watch_date: film.imdbID,
                    year: film.Year,
                    poster: film.Poster,
                })
            })
            .then((response) => response.json())
            .then(data => {
                window.alert("Added to watchlist.");
                dispatch(addWatchlistFilm(data));
            });
        }
    };
    
    const removeFilmFromWatchlist = (film) => {
        const x = watchlistFilms.find(f => f.watch_date === film.imdbID);
        fetch(`/watchlist_films/` + x.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch(removeWatchlistFilm(x));
    };
     
    let feedEntries = feed.filter(f => f.title === movie.Title);

    return (
        <>
        <Card>
            <Image 
                id={movie.imdbID} 
                onClick={handleOpen} 
                style={{
                    cursor:"pointer", 
                    height:"290px", 
                    width:"205px"
                }} 
                src={movie.Poster} 
                alt='movie'
            />
            <Modal
                open={modalOpen}
                onClose={handleClose}
                closeIcon
            >
                <Modal.Content style={{marginTop:"1.75%"}}>
                    <h3 style={{
                        fontFamily:"Helvetica", 
                        letterSpacing:".5px", 
                        fontSize:"17px"
                    }}>
                        {movie.Title}
                        <Image 
                            floated="left" 
                            size="tiny" 
                            src={movie.Poster} 
                            style={{
                                width:"82px", 
                                height:"120px", 
                                marginTop:"-1%"
                            }}
                        />
                        {watchlistFilms.find(f => f.watch_date === movie.imdbID) ?
                            <>
                            <Button 
                                size="large" 
                                onClick={() => removeFilmFromWatchlist(movie)} 
                                inverted 
                                animated 
                                style={{ 
                                    marginTop:"-1%", 
                                    background:"none",
                                    color:"white" 
                                }} 
                                circular 
                                floated='right'
                            >
                                <Button.Content visible>
                                    <Icon name="eye slash"/>
                                </Button.Content>
                                <Button.Content hidden style={{fontSize:"13px"}}>
                                    Unwatch
                                </Button.Content>
                            </Button>
                            </>
                            :
                            <>
                            <Button 
                                size="large" 
                                onClick={() => addUserWatchlistFilm(movie)} 
                                inverted 
                                animated 
                                style={{ 
                                    marginTop:"-1%", 
                                    background:"none",
                                    color:"white" 
                                }} 
                                circular 
                                floated='right'
                            >
                                <Button.Content visible>
                                    <Icon name="eye"/>
                                </Button.Content>
                                <Button.Content hidden style={{fontSize:"13px"}}>
                                    Watch
                                </Button.Content>
                            </Button>
                            </>
                        }
                        <Button 
                            size="large" 
                            onClick={() => addUserDiaryFilm(movie)} 
                            inverted 
                            animated 
                            style={{ 
                                marginTop:"-1%", 
                                background:"none",
                                color:"white" 
                            }}
                            circular 
                            floated='right'
                        >
                            <Button.Content visible>
                                <Icon name="calendar check"/>
                            </Button.Content>
                            <Button.Content hidden style={{fontSize:"13px"}}>
                                Diary
                            </Button.Content>
                        </Button>
                    </h3>
                    {movie.Year}
                    <br/><br/>
                    <p style={{marginTop:"-1.5%"}}>Average {score}</p>
                    <div className="filmrating" style={{marginTop:"-2%"}}>
                        <Rating 
                            className="stars" 
                            disabled 
                            rating={5} 
                            maxRating={5}
                        />
                    </div>
                    <br/><br/>
                    <ModalFeed feedEntries={feedEntries} />
                </Modal.Content>
            </Modal>
        </Card>
        </>
    );
};
    
export default Film;