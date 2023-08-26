import { Divider } from 'semantic-ui-react'
import WelcomeFilms from './WelcomeFilms'
import React, { useState, useEffect } from 'react'
import Feed from './Feed'
import Welcome from './Welcome'
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
            setFeed(data)
        })
    }
    
	return (
        <div className="home">
            {props.currentUser.length === 0 ?
                <>
                <Welcome/>
                </>
            :
                <>
                <h4 style={{marginTop:"3.8%", marginLeft:"-2%", marginBottom:"2.6%"}}>
                    <center><SearchBox/></center>
                </h4>
                <Divider></Divider>
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