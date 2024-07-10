import React, { useState } from 'react';
import { Rating } from 'semantic-ui-react';

const UserMovieRating = ({ film, patchRating }) => {
    const [state, setState] = useState({rating: film.rating});

    const handleRating = ( e, { rating, maxRating }) => {
        setState({ rating, maxRating });
        patchRating(rating, film.id);
    };

    return (
        <div className="filmrating">
            <Rating 
                className="stars" 
                rating={state.rating} 
                maxRating={5} 
                onRate={handleRating} 
            />
        </div>
    );
};

export default UserMovieRating;