import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Grid } from 'semantic-ui-react';
import UserDiaryFilm from './UserDiaryFilm';
import UserInfo from './UserInfo';
import { removeDiaryFilm, patchDiaryFilm } from "../actions/rootActions";

const UserDiaries = () => {
    const dispatch = useDispatch();
    const dF = useSelector(state => state.diaryFilms);
    const currentUser = useSelector(state => state.currentUser);
    const userFollowingCount = useSelector(state => state.userFollowingCount);

    const removeUserDiaryFilm = (film) => {
        fetch(`/diary_films/` + film.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch(removeDiaryFilm(film));
    };

    const patchRating = (r, id) => {
        fetch(`/diary_films/` + id, {  
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               rating: r
            })
        })
        .then((response) => response.json())
        .then(data => {
            dispatch(patchDiaryFilm(data));
        });
    };

    return (
        <div className="diaries">
            <Grid 
                stackable 
                columns={2} 
                style={{
                    fontFamily:"Helvetica", 
                    letterSpacing:".5px"
                }}
            >
                <Grid.Column style={{width:"230px"}}>
                    <UserInfo 
                        dF={dF} 
                        currentUser={currentUser} 
                        userFollowingCount={userFollowingCount} 
                    />
                </Grid.Column>
                <Grid.Column>
                    {dF.length === 0 ?
                        <p><br/><br/>Your diary is empty. Search for a film to begin logging!</p>
                    :
                        <>
                        <br/>
                        <Divider style={{
                            width:"157%", 
                            marginLeft:"1.4%",
                        }} />
                        {dF.map((movie, index) => (
                            <UserDiaryFilm 
                                key={index} 
                                movie={movie} 
                                removeUserDiaryFilm={removeUserDiaryFilm} 
                                patchRating={patchRating} 
                            />
                        ))}
                        </>
                    }
                </Grid.Column>
            </Grid>
        </div>
    )
};

export default UserDiaries;