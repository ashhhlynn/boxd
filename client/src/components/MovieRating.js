import { Rating } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class MovieRating extends Component {

    state = { rating: 0 }

    componentDidMount = () => {
        let x = localStorage.getItem(this.props.film.imdbID)
        this.setState({rating: x})
    }

    handleRating = (e, { rating, maxRating }) =>{
        this.setState({ rating, maxRating })
        localStorage.setItem(this.props.film.imdbID, rating);
    }

    render() {
        return (
            <div className="stars" >
                Rating: <Rating icon='star' color='pink' rating={this.state.rating}  
                maxRating={5}  onRate={this.handleRating} />
            </div>
        )
    }
}
