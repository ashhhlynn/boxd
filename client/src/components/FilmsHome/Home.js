import React, { useState, useEffect } from 'react'
import { Divider } from 'semantic-ui-react'
import WelcomeFilms from './WelcomeFilms'
import Feed from './Feed'
import SearchBox from '../SearchFilms/SearchBox'

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
            setWelcomeMovies(data.slice(0,7))
        })  
    }

    useEffect(() => {
        getFeed()
    },[])

    const getFeed = () => {
        fetch("/feed")
        .then(resp => resp.json())
        .then(data => {
            props.getFeed(data)
            setFeed(data.slice(0,7))
        })
    }
    
	return (
        <div className="home">
            <h3 style={{marginTop:"3.8%", marginLeft:"-2%", marginBottom:"2.6%"}}>
                    <center><SearchBox/></center>
            </h3>
            <Divider></Divider>
            <h3 style={{marginTop:"3.6%", marginBottom:"-.65%"}}>New on Boxd</h3>
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
            <h3 style={{marginBottom:"-1.5%", marginTop:"3.5%"}}>New from Friends</h3>
            {props.currentUser.length === 0 ?
                <>
                <p>Register or login to view activity from friends.</p>
                </>
            :
                <>
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