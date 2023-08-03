import { Divider, Icon } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import UserDiaryFilm from './UserDiaryFilm'
import SearchBox from './SearchBox'

const UserDiaries = (props) => {

    const [dF, setDF] = useState([])
    
    useEffect(() => {
        getDF()
    },[])

    const getDF = () => {
        fetch("/profile")
        .then(resp => resp.json())
        .then(data => {
            if (data !== null) {
                setDF(data.diary_films)
            }
        })
    }

    const addUserDiaryFilm = (film) => {	
		fetch("/diary_films", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: film.Title, 
				user_id: props.currentUser.id, 
				watch_date: film.imdbID,
				year: film.Year, 
				poster: film.Poster, 
				rating: 0, 
			})
		})
		.then((response) => response.json())
        .then(data => {
            const newDiaryList = [...dF, data]
            setDF(newDiaryList)

		})
	}

	const removeUserDiaryFilm = (film) => {
		fetch(`/diary_films/` + film.id, {
    		method: 'DELETE',
    		headers: {
			'Content-Type': 'application/json',	
    		},
		})
        const newDiaryList = dF.filter(
            (diary) => diary.id !== film.id
        )
        setDF(newDiaryList)
	}

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
    }

	return (
		<div className="diaries">
            <br></br>
            <Icon size="massive" name="user circle"/>
			<h1>{props.currentUser.username}</h1>
			<h3 onClick={props.handleOpen} style={{cursor:"pointer", marginTop:"-1%"}}>
                <center>
                    {dF.length} Films | {props.currentUser.followees.length} Following | {props.currentUser.followers.length} Followers
                </center>
            </h3>
			<Divider style={{marginBottom:"2%", marginTop:"4%"}}></Divider>
            <center>
                <SearchBox addUserDiaryFilm={addUserDiaryFilm}/>
            </center><br></br><br></br>
            {dF.length === 0 ?
                <p><br></br>Your diary is empty. Search for a film to begin logging!</p> 
            :
                <>
                <Divider style={{width:"84%", marginLeft:"8%"}}></Divider>
		        {dF.map((movie, index) => (
                    <UserDiaryFilm key={index} movie={movie} addUserDiaryFilm={addUserDiaryFilm} removeUserDiaryFilm={removeUserDiaryFilm} patchRating={patchRating}/>
                ))}
                </>
            }
        </div>
    )
}

export default UserDiaries