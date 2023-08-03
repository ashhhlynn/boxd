import { Divider, Label, Image, Item, Rating, Header, Icon } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'

const UserShow = () => {

    const [dF, setDF] = useState([])

    const [user, setUser] = useState([])
    
    useEffect(() => {
        getDF()
    },[])

    const getDF = async () => {
        await fetch("/users/" + 16)
        .then(resp => resp.json())
        .then(data => {
            if (data !== null) {
                setDF(data.diary_films)
                setUser(data)
            }
        })
    }

	return (
		<div className="diaries">
            <br></br>
            <Icon size="massive" name="user circle"/>
			<h1>{user.username}</h1>
			<h3 style={{marginTop:"-1%"}}>
                <center>
                    {dF.length} Films 
                </center>
            </h3>
	    	<br></br>
            <Divider style={{width:"84%", marginLeft:"8%"}}></Divider>
		    {dF.map((movie, index) => (
                <Item style={{marginLeft:"7%", marginRight:"7%"}}>
                    <Header floated="left">
                        <Label style={{marginTop:"20%", backgroundColor:"#FFFEEF", color:"black"}}>
                            {movie.watch_date.slice(5)}
                            <h2><b>{movie.watch_date.slice(0,4)}</b></h2>
                        </Label>
                    </Header>
                    <Image src={movie.poster} alt='movie'/>
                    <Item style={{ marginLeft:"24.5%", marginBottom:"4%", marginTop:"-7.5%", textAlign:"left"}}>
                        <h3>
                            {movie.title}
                            <Label as="h5" style={{background:"none", marginTop:"-2%",color:"white"}}>{movie.year}</Label>
                            <div className="rating">
                                <Rating disabled rating={movie.rating} maxRating={5} />
                            </div>
                        </h3>
                    </Item>
                    <Divider></Divider>
                </Item>
            ))}
        </div>
    )
}

export default UserShow