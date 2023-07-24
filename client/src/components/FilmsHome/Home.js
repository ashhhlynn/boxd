import { Divider, Button, Item  } from 'semantic-ui-react'
import WelcomeFilms from './WelcomeFilms'
import React, { useState, useEffect } from 'react'
import Feed from './Feed'
import { Link} from 'react-router-dom'

const Home = (props) => {
    
    const [welcomeMovies, setWelcomeMovies] = useState([])
    const [feed, setFeed] = useState([])
    
    useEffect(() => {
        getWelcomeMovies()
    }, [])

    const getWelcomeMovies = async () => {
        await fetch("https://www.omdbapi.com/?s=hack&apikey=263d22d8")
        .then((response) => response.json())
        .then(data => {
            setWelcomeMovies(data.Search.slice(0,7))
        })  
    }

    useEffect(() => {
        getFeed()
    },[])

    const getFeed = () => {
        fetch("/feed")
        .then(resp => resp.json())
        .then(data => {
            setFeed(data)
        })
    }
    
	return (
        
		<div>
			<SearchBox addDiaryFilm={addDiaryFilm}/><Icon name="search" size="large" style={{marginLeft:"21%", marginTop:"-2.3%"}}/>  
            <WelcomeFilms welcomeMovies={welcomeMovies}/>
            <Divider></Divider>
            {props.currentUser.length === 0 ?
                <div className="bg">
                    <Item style={{marginTop:"4%"}}><br></br><br></br><br></br><br></br><br></br><br></br>
                        <h1>The social network for film.</h1>
                        <h2>Track films you've watched.</h2>
                        <h2>Tell your friends what's good.</h2>
                        <Button as={Link} to ="/login" size="big" color="white" style={{color:"black", letterSpacing:"1px", fontWeight:"normal"}}>GET STARTED</Button>  
                    </Item>
                </div>
            : 
                <>
                <h4 style={{marginTop:"3.6%", marginBottom:"-2%", textAlign:"left"}}><b>Welcome, {props.currentUser.username}</b></h4>      
                <WelcomeFilms welcomeMovies={welcomeMovies}/>
                <Divider></Divider>
                <h4 style={{marginBottom:"-3%", marginTop:"3.5%", textAlign:"left"}}><b>New from friends</b></h4>
                {feed.length !== 0 ?
                    <>
                    <Feed userFeed={feed}/>
                    <Divider></Divider>
                    </>
                : 
                    <>
                    <p style={{marginTop:"4.5%", marginBottom:"3.5%", textAlign:"left"}}>No new content from friends right now.</p>
                    </>
                }
                </>
            }
        </div>
	)
}

export default Home
