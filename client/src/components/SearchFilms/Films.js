import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import Film  from './Film'

class Films extends Component {
    
    render () {
        return (
            <div className="films"><br></br><br></br>
                <Card.Group itemsPerRow={7}>
                    {this.props.films.map((movie, index) => (
                        <Film key={index} movie={movie} />
                    ))}
                </Card.Group>
            </div>
        )
    }
}

export default Films