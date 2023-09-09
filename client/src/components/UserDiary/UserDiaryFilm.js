import React from 'react'
import { Header, Button, Item, Icon, Label, Divider } from 'semantic-ui-react'
import UserMovieRating from './UserMovieRating'
import FilmModal from '../FilmsHome/FilmModal'

const UserDiaryFilm = (props) => {
	return (
    <>
        <Item style={{marginLeft:"7%", marginRight:"7%"}}>
            <div className="remove" onClick={() => props.removeUserDiaryFilm(props.movie)}>
                <Button floated="right" size="mini">
                    <center><Icon size="large" name="delete"/></center>
                </Button>
            </div>
            <Header floated="left">
                <Label style={{marginTop:"20%", backgroundColor:"#FFFEEF", color:"black"}}>
                    {props.movie.created_at.slice(0,4)}
                    <h2><b>{props.movie.created_at.slice(6,10)}</b></h2>
                </Label>
            </Header>
            <FilmModal film={props.movie} />
            <Item style={{ marginLeft:"24.5%", marginBottom:"4%", marginTop:"-7.5%", textAlign:"left"}}>
                <h3>
                    {props.movie.title}
                    <Label as="p" style={{background:"none", fontWeight:"normal", marginTop:"-2%",color:"white"}}>{props.movie.year}</Label>
                    <UserMovieRating film={props.movie} key={props.movie.id} patchRating={props.patchRating}/>
                </h3>
            </Item>
            <Divider></Divider>
        </Item>
    </>
	)
}

export default UserDiaryFilm