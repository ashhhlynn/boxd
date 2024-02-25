import './App.css'
import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Footer from './components/Decorative/Footer'
import SigninRegister from './components/SignUpIn/SigninRegister'
import UserDiaries from './components/UserDiary/UserDiaries'
import Home from './components/FilmsHome/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Navbar from './components/Decorative/Navbar'
import { checkUser } from "./components/actions/rootActions"
import { fetchAllDF } from "./components/actions/rootActions"
import Watchlist from './components/UserWatchlist/Watchlist'
import { fetchWatchlistFilms } from "./components/actions/rootActions"
import { fetchFeed } from "./components/actions/rootActions"
import UserShow from './components/UserDiary/UserShow'

class App extends Component {

	state = {
		userShow: null
	}

	componentDidMount = () => {
		this.getUserProfile()
		fetch("/diary_films")
		.then(resp => resp.json())
		.then(data => {
			this.props.fetchAllDF(data)
		})
	}
	
	getUserProfile = () => {
		fetch("/profile")
		.then(resp => resp.json())
		.then(data => {
			this.props.checkUser(data)
			if (data !== null) {
				this.getWatchlistFilms()
				this.getFeed()
			}
		})
	}

	getWatchlistFilms = () => {
		fetch("/watchlist_films")
        .then(resp => resp.json())
        .then(data => {
            this.props.fetchWatchlistFilms(data)
        })
	}

	getFeed = () => {
        fetch("/feed")
        .then(resp => resp.json())
        .then(data => {
            this.props.fetchFeed(data)
        })
    }
	
	changeUserShow = (id) => {
       this.setState({userShow: id})
    }

	render() {
		return (
	        <Router>
			    <div className="app">
				    <Navbar changeUserShow={this.changeUserShow} getUserProfile={this.getUserProfile}/>
				    <Container>
					    <Switch>
						    <Route exact path="/">
							    <Home currentUser={this.props.currentUser}/>
						    </Route>
						    <Route exact path="/login">
							    <SigninRegister getUserProfile={this.getUserProfile}/>
							</Route>
						    <Route exact path="/userdiary">
							    <UserDiaries/>
						    </Route>
						    <Route exact path="/watchlist">
							    <Watchlist/>
						    </Route>
							<Route exact path="/profile">
							    <UserShow userShow={this.state.userShow}/>
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
		allDF: state.allDF
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
		checkUser: (user) => { dispatch(checkUser(user)) },
		fetchAllDF: (data) => { dispatch(fetchAllDF(data)) },
		fetchWatchlistFilms: (data) => { dispatch(fetchWatchlistFilms(data)) },
		fetchFeed: (data) => { dispatch(fetchFeed(data)) }
	}
} 

export default connect(mapStateToProps, mapDispatchToProps)(App)