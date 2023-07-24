import { Header, Image, Button, Item, Icon, Label, Divider } from 'semantic-ui-react'
import UserMovieRating from './UserMovieRating'
import React from 'react'

const UserDiaries = (props) => {

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
        .then(resp => resp.json())
        props.getUserProfile()
    }

	return (
		<div>
            <h2 style={{marginTop:"4%"}}>Your Diary</h2>
            {props.userDiaries.length === 0 ?
                <p><br></br>Your diary is empty. Search for a film to begin logging!</p> 
            :
                <>
                <Divider style={{width:"90%", marginLeft:"5%"}}></Divider>
		        {props.userDiaries.map((movie, index) => (
			        <Item key={index} style={{marginLeft:"5%", marginRight:"5%"}}>
                        <div onClick={() => props.removeUserDiaryFilm(movie)}>
                            <Button floated="right" size="mini" style={{width:"40px"}} inverted basic>
                                <Icon size="small" name="delete" />
                            </Button>
                        </div>
                        <Header floated="right" style={{color:"white", textAlign:"right"}}>
                            <h3>{movie.title} </h3>
                            <h5>{movie.year}</h5>
                            <h5><UserMovieRating film={movie} key={movie.id} handleClickPatchRating={patchRating}/></h5>
                        </Header>
                        <Header floated="left"><br></br>
                            <Label style={{ marginTop:"3%", backgroundColor:"#FFFEEF", color:"black"}}>
                                {movie.watch_date.slice(5)}
                                <h2><b>{movie.watch_date.slice(0,4)}</b></h2>
                            </Label>
                        </Header>
                        <Image style={{height:"110px", width:"75px", marginLeft:"13%", alignContent:"left"}} src={movie.poster} alt='movie'/>
                        <Divider></Divider>
                    </Item>
                ))}
                </>
            }
        </div>
    )
}

export default UserDiaries