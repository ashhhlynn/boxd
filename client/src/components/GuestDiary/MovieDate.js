import { Label  } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class MovieDate extends Component {

    state = { date: 0, year: 0 }

    componentDidMount = () => {
        let x = localStorage.getItem('date'+ this.props.film.imdbID)
        let d = x.slice(0,4)
        let y = x.slice(5)
        this.setState({date: d, year: y})
    }

    render() {
        return (
            <div>
                <Label style={{ backgroundColor:"#FFFEEF", color:"black"}}>
                    {this.state.year}
                    <h2><b>{this.state.date}</b></h2>
                </Label>
            </div>
        )
    }
}
