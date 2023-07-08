import './App.css'
import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react'
import { Icon, Menu, Container } from 'semantic-ui-react'
import Footer from './components/Decorative/Footer'
import SigninRegister from './components/SignUpIn/SigninRegister'
import UserPage from './components/UserProfile/UserPage'
import Home from './components/FilmsHome/Home'
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { checkUser } from "./components/actions/rootActions"
import { connect } from 'react-redux'
import { logOut } from "./components/actions/rootActions"

class App extends Component {

	componentDidMount = () => {
		fetch("/profile")
    	.then(resp => resp.json())
    	.then(data => {
	  		this.props.checkUser(data)
		})
	}

	handleLogout = () => {
        fetch("/logout", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        this.props.logOut()
    }    

    render() {
        return (
			<Router>
    		<div className="app" style={{backgroundColor:"#1a1f22"}}>
      			<Menu style={{backgroundColor:"#15191b", color:"white", height:"100px"}}>
					<Menu.Menu style={{marginLeft:"5%", marginTop:".5%"}} position="left"><br></br>
						<h1>Boxd.</h1>
					</Menu.Menu>
					<Menu.Menu  style={{marginRight:"3%"}} position='right'>
						<Menu.Item><Link to='/' style={{color:"white"}}><Icon size="large" name="home"/></Link></Menu.Item>
						{this.props.currentUser.length === 0 ?
							<Menu.Item><Link to='/login' style={{color:"white"}}><Icon size="large" name="user circle"/></Link></Menu.Item>
							:
							<>
							<Menu.Item><Link to='/userpage' style={{color:"white"}}><Icon name="user circle" size="large" style={{marginTop:"-4%"}}/></Link></Menu.Item>
							<Menu.Item><Link to='/'><Icon style={{color:"white", cursor:"pointer"}} size="large" onClick={this.handleLogout} name="power off"/></Link></Menu.Item>
							</>
						}
					</Menu.Menu>
				</Menu>
      			<Container style={{minHeight:"70vh", height:"100%"}}>   	
					<Switch>
						<Route exact path="/" >
                			<Home 
							currentUser={this.props.currentUser}
							/>
              			</Route>
              			<Route exact path="/login">
                			<SigninRegister/>
              			</Route>
			  			<Route exact path="/userpage">
                			<UserPage 
							currentUser={this.props.currentUser}
							/>
              			</Route>
					</Switch>
      			</Container>
      			<Footer/>
    		</div>
			</Router>
  		)
	}
}

const mapStateToProps = (state) => {
    return { 
    	currentUser: state.currentUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
    	checkUser: (user) =>  { dispatch(checkUser(user)) },
		logOut: () =>  { dispatch(logOut()) }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(App)
