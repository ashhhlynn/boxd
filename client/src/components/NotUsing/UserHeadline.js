import { Icon } from 'semantic-ui-react'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserHeadline extends Component {

    render () {
	    return (
            <>
            <br></br>
            <Icon size="massive" name="user circle"/>
			<h1>{this.props.currentUser.username}</h1>
			<h3 style={{marginTop:"-1%"}}>
                <center>
                    {this.props.countDF} Films | {this.props.countFollowing} Following | {this.props.countFollowers}  Followers
                </center>
            </h3>		   
            </>
	    )
    }
}
    
const mapStateToProps = (state) => {
    return { 
    	currentUser: state.currentUser,
        countFollowing: state.countFollowing,
        countFollowers: state.countFollowers,
        countDF: state.countDF
    }
}

export default connect(mapStateToProps)(UserHeadline)