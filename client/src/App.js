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
		userDiaries: [],
	}

	componentDidMount = () => {
		this.getUserProfile()
	}

	getUserProfile = () => {
		fetch("/profile")
    	.then(resp => resp.json())
    	.then(data => {
			this.props.checkUser(data)
			if (data !== null) {
				this.setState({userDiaries: data.diary_films})
			}
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

	addUserDiaryFilm = (film) => {	
		var today = new Date(),
		date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
		fetch("/diary_films", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: film.Title, 
				user_id: this.props.currentUser.id, 
				watch_date: date,
				year: film.Year, 
				poster: film.Poster, 
				rating: 0, 
			})
		})
		.then((response) => response.json())
        .then(data => {
            const newDiaryList = [...this.state.userDiaries, data]
            this.setState({userDiaries: newDiaryList})
		})
	}

	removeUserDiaryFilm = (film) => {
		fetch(`/diary_films/` + film.id, {
    		method: 'DELETE',
    		headers: {
			'Content-Type': 'application/json',	
    		},
		})
        const newDiaryList = this.state.userDiaries.filter(
            (diary) => diary.id !== film.id
        )
        this.setState({userDiaries: newDiaryList})
	}

	patchUserDiaryFilm = (film) => {
		const newDiaryList = this.state.userDiaries.filter(
            (diary) => diary.id !== film.id
        )
		newDiaryList.push(film)
		this.setState({userDiaries: newDiaryList})
	}
    
	render() {
        return (
			<Router>
    		<div className="app" style={{backgroundColor:"#1a1f22"}}>
      			<Menu style={{backgroundColor:"#15191b", color:"white", height:"100px"}}>
					<Menu.Menu style={{marginLeft:"5%", marginTop:".5%"}} position="left"><br></br>
						<h1>Boxd.</h1>
					</Menu.Menu>
					<Menu.Menu style={{marginRight:"3%"}} position='right'>
						<Menu.Item><Link to='/' style={{color:"white"}}><Icon size="large" name="home"/></Link></Menu.Item>
						{this.props.currentUser.length === 0 ?
							<Menu.Item><Link to='/login' style={{color:"white"}}><Icon size="large" name="user circle"/></Link></Menu.Item>
							:
							<>
							<Menu.Item><Link to='/userdiary' style={{color:"white"}}><Icon name="user circle" size="large" style={{marginTop:"-4%"}}/></Link></Menu.Item>
							<Menu.Item><Icon name="users" onClick={this.handleOpen} size="large" style={{color:"white", cursor:"pointer"}}/></Menu.Item>
							<Menu.Item><Link to='/'><Icon style={{color:"white", cursor:"pointer"}} size="large" onClick={this.handleLogout} name="power off"/></Link></Menu.Item>
							</>
						}
						<Modal
						style={{width:"500px"}}
						open={this.state.modalOpen}
						onClose={this.handleClose}
						closeIcon>
            				<Modal.Content style={{backgroundColor:"#1a1f22", color:"white"}}>
								<UserPage currentUser={this.props.currentUser}/>
            				</Modal.Content>
          				</Modal>
					</Menu.Menu>
				</Menu>
      			<Container style={{minHeight:"70vh", height:"100%"}}>   	
					<Switch>
						<Route exact path="/" >
                			<Home addUserDiaryFilm={this.addUserDiaryFilm} currentUser={this.props.currentUser}/>
              			</Route>
              			<Route exact path="/login">
                			<SigninRegister getUserProfile={this.getUserProfile}/>
              			</Route>
						<Route exact path="/userdiary">
                			<UserDiaries patchUserDiaryFilm={this.patchUserDiaryFilm} removeUserDiaryFilm={this.removeUserDiaryFilm} userDiaries={this.state.userDiaries}/>
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
