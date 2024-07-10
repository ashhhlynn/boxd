import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Image, Modal, Rating, Button } from 'semantic-ui-react';
import { addDiaryFilm, addWatchlistFilm, removeWatchlistFilm } from "../actions/rootActions";
import ModalFeed from "./ModalFeed";

const FilmModal = ({ film }) => {
    
    const [modalOpen, setModalOpen] = useState(false);
    const [score, setScore] = useState('Unrated');
    const dispatch = useDispatch();
    const allDiaryFilms = useSelector(state => state.allDF);
    const currentUser = useSelector(state => state.currentUser);
    const watchlistFilms = useSelector(state => state.watchlistFilms);
    const feed = useSelector(state => state.feed);
    
    const handleOpen = () => {
        if (allDiaryFilms.find(f => f.watch_date === film.watch_date)) {
            const f = allDiaryFilms.find(f => f.watch_date === film.watch_date);
            fetch("/diary_films/" + f.id)
            .then(resp => resp.json())
            .then(data => {
                if (data !== null) {
                    setScore(data);
                }
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
    
    const addFilmToDiary = () => {
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
                    title: film.title,
                    user_id: currentUser.id,
                    watch_date: film.watch_date,
                    year: film.year, 
                    poster: film.poster,
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
    
    const addUserWatchlistFilm = () => {
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
                    title: film.title, 
                    user_id: currentUser.id,
                    watch_date: film.watch_date,
                    year: film.year, 
                    poster: film.poster, 
                })
            })
            .then((response) => response.json())
            .then(data => {
                window.alert("Added to watchlist.");
                dispatch(addWatchlistFilm(data));
            });
        }
    };
    
    const removeFilmFromWatchlist = () => {
        const x = watchlistFilms.find(f => f.watch_date === film.watch_date);
        fetch(`/watchlist_films/` + x.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',	
            },
        });
        dispatch(removeWatchlistFilm(x));
    };
    
    let feedEntries = feed.filter(f => f.title === film.title)

    return (
        <div className="filmModal" >
            <Image src={film.poster} onClick={handleOpen} />
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
                        <Image 
                            floated="left" 
                            src={film.poster} 
                            style={{
                                width:"82px", 
                                height:"120px", 
                                marginTop:"-1%"
                            }} 
                        />
                        {film.title}
                        {watchlistFilms.find(f => f.watch_date === film.watch_date) ?
                            <>
                            <Button 
                                size="large" 
                                onClick={removeFilmFromWatchlist} 
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
                                <Button.Content visible><Icon name="eye slash" /></Button.Content>
                                <Button.Content hidden style={{fontSize:"13px"}}>Unwatch</Button.Content>
                            </Button>
                            </>
                        :
                            <>
                            <Button 
                                size="large" 
                                onClick={addUserWatchlistFilm} 
                                animated 
                                inverted 
                                style={{
                                    marginTop:"-1%", 
                                    background:"none", 
                                    color:"white"
                                }} 
                                circular 
                                floated='right'>
                                <Button.Content visible><Icon name="eye" /></Button.Content>
                                <Button.Content hidden style={{fontSize:"13px"}}>Watch</Button.Content>
                            </Button>
                            </>
                        }
                        <Button 
                            size="large" 
                            onClick={addFilmToDiary} 
                            animated 
                            inverted 
                            style={{ 
                                marginTop:"-1%", 
                                background:"none",
                                color:"white" 
                            }} 
                            circular 
                            floated='right'
                        >
                            <Button.Content visible><Icon name="calendar check" /></Button.Content>
                            <Button.Content hidden style={{fontSize:"13px"}}>Diary</Button.Content>
                        </Button>
                    </h3>
                    {film.year}
                    <br/><br/>
                    <p style={{marginTop:"-2%"}}>Average {score}</p>
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
        </div>
    );
};

export default FilmModal;