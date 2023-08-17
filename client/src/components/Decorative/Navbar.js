import React, { Component } from 'react'
import { Icon, Menu, Modal } from 'semantic-ui-react'
import UserPage from '../UserProfile/UserPage'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from "../actions/rootActions"

class Navbar extends Component {

	state = {
		modalOpen: false,
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
      		<Menu className="nav">
				<Menu.Menu icon='labeled' style={{marginLeft:"4%", marginTop:".5%"}} position="left"><br></br>
					<h1><Link to='/'>Boxd.</Link></h1>
				</Menu.Menu>
				<Menu.Menu style={{marginRight:"4%"}} position='right'>
					{this.props.currentUser.length === 0 ?
						<Menu.Item style={{color:"white"}}><Link to='/login'><Icon size="big" name="user circle"/></Link>Login | Register</Menu.Item>
						:
						<>
						<Menu.Item style={{color:"white"}}><Link to='/userdiary'><Icon name="book" size="large" style={{marginTop:"2%"}}/> </Link> Diary</Menu.Item>
						<Menu.Item style={{color:"white"}}><Link to='/watchlist'><Icon name="eye" size="large" style={{marginTop:"2%"}}/> </Link> Watchlist</Menu.Item>
						<Menu.Item style={{color:"white"}}><Icon name="address book outline" onClick={this.handleOpen} size="large" style={{color:"white", cursor:"pointer"}}/>Friends</Menu.Item>
						<Menu.Item style={{color:"white"}}><Link to='/'><Icon size="large" onClick={this.handleLogout} name="power off"/> </Link> Logout</Menu.Item>
						</>
					}
					<Modal
					open={this.state.modalOpen}
					onClose={this.handleClose}
					closeIcon>
            			<Modal.Content style={{background:"inherit"}}>
							<UserPage getUserProfile={this.props.getUserProfile} currentUser={this.props.currentUser}/>
            			</Modal.Content>
          			</Modal>
				</Menu.Menu>
			</Menu>
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
		logOut: () =>  { dispatch(logOut()) },
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
