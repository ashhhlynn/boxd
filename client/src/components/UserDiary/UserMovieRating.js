import { Rating } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class UserMovieRating extends Component {

    state = { rating: this.props.film.rating }

    handleRating = (e, { rating, maxRating }) => {
        this.setState({ rating, maxRating })
        let x = this.props.film.id
        this.props.handleClickPatchRating(rating, x)
    }

    render() {
        return (
            <div className="stars">
            Rating: <Rating icon='star' rating={this.state.rating} maxRating={5} onRate={this.handleRating} />
            </div>
        )
    }
}
