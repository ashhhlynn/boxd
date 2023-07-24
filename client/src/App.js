import './App.css'
import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react'
import { Icon, Menu, Container, Modal } from 'semantic-ui-react'
import Footer from './components/Decorative/Footer'
import SigninRegister from './components/SignUpIn/SigninRegister'
import UserPage from './components/UserProfile/UserPage'
import UserDiaries from './components/UserDiary/UserDiaries'
import Home from './components/FilmsHome/Home'
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { checkUser } from "./components/actions/rootActions"
import { connect } from 'react-redux'
import { logOut } from "./components/actions/rootActions"

class App extends Component {

	state = {
		modalOpen: false,
	}

	componentDidMount = () => {
		this.getUserProfile()
	}

	getUserProfile = () => {
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

	handleOpen = () => {
		this.setState({ modalOpen: true });
	}
	
	handleClose = () => {
		this.setState({ modalOpen: false })
	}

	render() {
        return (
			<Router>
    		<div className="app" style={{backgroundColor:"#1a1f22"}}>
      			<Menu style={{backgroundColor:"#15191b", color:"white", height:"100px"}}>
					<Menu.Menu style={{marginLeft:"4%", marginTop:".5%"}} position="left"><br></br>
						<h1><Link to='/' style={{color:"white"}}>Boxd.</Link></h1>
					</Menu.Menu>
					<Menu.Menu style={{marginRight:"4%"}} position='right'>
						{this.props.currentUser.length === 0 ?
							<Menu.Item><Link to='/login' style={{color:"white"}}><Icon size="big" name="user circle"/></Link></Menu.Item>
							:
							<>
							<Menu.Item style={{marginLeft:"10%"}}><Link to='/userdiary' style={{color:"white"}}><Icon name="film" size="large" style={{marginTop:"2%"}}/></Link></Menu.Item>
							<Menu.Item><Icon name="user circle" onClick={this.handleOpen} size="large" style={{color:"white", cursor:"pointer"}}/></Menu.Item>
							<Menu.Item style={{marginLeft:"-2%"}}><Link to='/'><Icon style={{color:"white", cursor:"pointer"}} size="large" onClick={this.handleLogout} name="power off"/></Link></Menu.Item>
							</>
						}
						<Modal
						style={{width:"550px",backgroundColor:"#1a1f22"}}
						open={this.state.modalOpen}
						onClose={this.handleClose}
						closeIcon>
            				<Modal.Content style={{background:"inherit", color:"white"}}>
								<UserPage currentUser={this.props.currentUser}/>
            				</Modal.Content>
          				</Modal>
					</Menu.Menu>
				</Menu>
      			<Container style={{minHeight:"70vh", height:"100%"}}>   	
					<Switch>
						<Route exact path="/" >
                			<Home currentUser={this.props.currentUser}/>
              			</Route>
              			<Route exact path="/login">
                			<SigninRegister getUserProfile={this.getUserProfile}/>
              			</Route>
						<Route exact path="/userdiary">
                			<UserDiaries currentUser={this.props.currentUser} />
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
