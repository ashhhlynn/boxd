import { Label  } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class MovieDate extends Component {

    state = { date: 0 }

    componentDidMount = () => {
        let x = localStorage.getItem('date'+ this.props.film.imdbID)
        this.setState({date: x})
    }

    render() {
        return (
            <div>
                <Label style={{ backgroundColor:"#FFFEEF", color:"black"}}>
                    2023
                    <h2 ><b>{this.state.date}</b></h2>
                </Label>
            </div>
        )
    }
}
