import React from 'react';
import { connect } from 'react-redux';
import { Card, Rating, Icon, Divider } from 'semantic-ui-react';
import FilmModal from './FilmModal';

const Feed = (props) => {

    return (
        <>
        {props.feed.length !== 0 ?
            <>      
            <Card.Group itemsPerRow={7} style={{marginTop:"3.5%", marginBottom:"1.5%"}}>
                {props.feed.slice(0,7).map((movie, index) => (  
                    <Card key={index} style={{marginLeft:".5%"}}>
                        <FilmModal film={movie} />
                        <Card.Content style={{marginTop:"-10%"}}>
                            <Icon name="user circle" />{movie.user.username}<br />
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
            <Divider /> 
            </>
        :
            <>
            <p>No new content from friends right now.</p>
            </>
        }
        </>
    );	
};

const mapStateToProps = (state) => {
    return {
        feed: state.feed
    }
};

export default connect(mapStateToProps)(Feed);