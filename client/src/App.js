import './App.css'
import 'semantic-ui-css/semantic.min.css'
import React, { useState, useEffect, useReducer } from 'react'
import { Icon, Menu, Container} from 'semantic-ui-react'
import SearchBox from './components/SearchBox'
import Footer from './components/Footer'
import Feed from './components/Feed'
import User from './components/User'
import UserIndex from './components/UserIndex'
import UserDiaries from './components/UserDiaries'
import Home from './components/Home'
import { rootReducer } from "./components/reducers/rootReducer";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'

const App = () => {


	return (
		<Router>
    		<div className="app" style={{backgroundColor:"#1a1f22", minHeight:"100vh"}} >
      			<Menu style={{backgroundColor:"#15191b", color:"white", height:"100px"}}>
					<Menu.Menu style={{marginLeft:"5%", marginTop:".5%"}} position="left"><br></br>
						<h1>Boxd.</h1>
					</Menu.Menu>
					<Menu.Menu  style={{marginTop:"3%", marginRight:"6%"}} position='right'>
          				
						<Link to='/'><Icon size="large" name="home alternate"/></Link>
						<Link to='/feed'><Icon name="users" size="big" style={{marginTop:"-4%"}}/></Link>
						<Link to='/userdiaries'><Icon style={{marginTop:"0%", marginRight:"-300%"}} size="large" name="user circle "/></Link>
					
					</Menu.Menu>
				</Menu>
      			<Container >   	
				<Switch>
					<Route exact path="/">
                		<Home/>
              		</Route>
              		<Route exact path="/user">
                		<User/>
              		</Route>
			  		<Route exact path="/userdiaries">
                		<UserDiaries/>
              		</Route>
			  		<Route exact path="/userindex">
                		<UserIndex/>
              		</Route>
			  		<Route exact path="/feed">
			  			<Feed  />
              		</Route>
				</Switch>
      			</Container>
      			<Footer/>
    		</div>
		</Router>
  	)
}

export default App
