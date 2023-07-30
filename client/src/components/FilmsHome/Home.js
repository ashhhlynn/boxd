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

    const getWelcomeMovies = () => {
        fetch("/diary_films")
        .then((response) => response.json())
        .then(data => {
            setWelcomeMovies(data.slice(-7))
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
		<div className="home">
            {props.currentUser.length === 0 ?
                <div className="bg">
                    <Item style={{marginTop:"4%"}}><br></br><br></br><br></br><br></br><br></br><br></br>
                        <h1>The social network for film.</h1>
                        <h2>Track films you've watched.</h2>
                        <h2>Tell your friends what's good.</h2>
                        <Button as={Link} to ="/login" size="big">GET STARTED</Button>  
                    </Item>
                </div>
            : 
                <>
                <h4 style={{marginTop:"3.6%", marginBottom:"-.7%"}}>New on Boxd</h4>      
                {welcomeMovies.length !== 0 ?
                    <>
                    <WelcomeFilms welcomeMovies={welcomeMovies}/>
                    <Divider></Divider>
                    </>
                : 
                    <>
                    <p>No new content on Boxd right now.</p>
                    </>
                }
                <h4 style={{marginBottom:"-1.5%", marginTop:"3.5%"}}>New from friends</h4>
                {feed.length !== 0 ?
                    <>
                    <Feed userFeed={feed}/>
                    <Divider></Divider>
                    </>
                : 
                    <>
                    <p>No new content from friends right now.</p>
                    </>
                }
                </>
            }
        </div>
	)
}

export default Home
