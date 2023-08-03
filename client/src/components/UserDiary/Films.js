import React, { Component } from 'react'
import { Card  } from 'semantic-ui-react'
import Film  from './Film'

class Films extends Component {

    render () {
	    return (
		    <div>
                <Card.Group itemsPerRow={4}>
                    {this.props.films.map((movie) => (
                        <Film addUserDiaryFilm={this.props.addUserDiaryFilm} movie={movie} />                      
                    ))}
                </Card.Group>
            </div>
	    )
    }
}
    
export default Films