import React from 'react'
import { Header, Image, Button, Item, Icon, Label, Divider } from 'semantic-ui-react'
import UserMovieRating from './UserMovieRating'

const UserDiaryFilm = (props) => {
	return (
		<>
        <Item style={{marginLeft:"7%", marginRight:"7%"}} >
            <div className="remove" onClick={() => props.removeUserDiaryFilm(props.movie)}>
                <Button floated="right" size="mini">
                    <Icon size="large" name="delete" />
                </Button>
            </div>
            <Header floated="left">
                <Label style={{marginTop:"20%", backgroundColor:"#FFFEEF", color:"black"}}>
                    {props.movie.watch_date.slice(5)}
                    <h2><b>{props.movie.watch_date.slice(0,4)}</b></h2>
                </Label>
            </Header>
            <Image src={props.movie.poster} alt='movie'/>
            <Item style={{ marginLeft:"24.5%", marginBottom:"4%", marginTop:"-7.5%", textAlign:"left"}}>
                <h3>
                    <b>{props.movie.title}</b> 
                    <Label as="h5" style={{background:"none", marginTop:"-2%",color:"white"}}>{props.movie.year}</Label>
                    <UserMovieRating film={props.movie} key={props.movie.id} handleClickPatchRating={props.patchRating}/>
                </h3>
            </Item>
            <Divider></Divider>
        </Item>
		</>
	)
}

export default UserDiaryFilm