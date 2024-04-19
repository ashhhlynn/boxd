import React, { Component } from 'react'
import { Card, Rating, Icon, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import FilmModal from './FilmModal'

class Feed extends Component {
    render() {
        let homeFeed = this.props.feed.slice(0,7)
        return (
            <>
            {homeFeed.length !== 0 ?
                <>      
                <Card.Group itemsPerRow={7} style={{marginTop:"3.5%", marginBottom:"1.5%"}}>
                    {homeFeed.map((movie, index) => (  
                        <Card key={index} style={{marginLeft:".5%"}}>
                            <FilmModal film={movie}/>
                            <Card.Content style={{marginTop:"-10%"}}>
                                <Icon name="user circle"/>{movie.user.username}<br></br>
                                <Rating 
                                disabled 
                                size="mini" 
                                rating={movie.rating}  
                                maxRating={5}  
                                />
                            </Card.Content>
                        </Card>
                    ))} 
                </Card.Group>
                <Divider></Divider>
                </>
            :
                <>
                <p>No new content from friends right now.</p>
                </>
            }
            </>
        )	
    }
}

const mapStateToProps = (state) => {
    return {
        feed: state.feed
    }
}

export default connect(mapStateToProps)(Feed)