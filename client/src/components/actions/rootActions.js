export const fetchFeed = (films) => {
    return (dispatch) => {
        dispatch({ type: "FETCH_FEED", films: films })
    }
};

export const fetchAllDF = (films) => {
    return (dispatch) => {
        dispatch({ type: "FETCH_ALL_DF", films: films })
    }
};

export const checkUser = (user) => {
    return (dispatch) => {  
        dispatch({ type: "SET_CURRENT_USER", user: user })
    }
};

export const fetchWatchlistFilms = (films) => {
    return (dispatch) => {
        dispatch({ type: "FETCH_WATCHLIST_FILMS", films: films })
    }
};

export const logOut = () => {
    return (dispatch) => {
        dispatch({ type: "LOGOUT" })
    }
};

export const addDiaryFilm = (film) => {
    return (dispatch) => {
        dispatch({ type: "ADD_DIARY_FILM", film: film })
    }
};

export const removeDiaryFilm = (film) => {
    return (dispatch) => {
        dispatch({ type: "REMOVE_DIARY_FILM", film: film })
    }
};

export const patchDiaryFilm = (film) => {
    return (dispatch) => {
        dispatch({ type: "PATCH_DIARY_FILM", film: film })
    }
};

export const addWatchlistFilm = (film) => {
    return (dispatch) => {
        dispatch({ type: "ADD_WATCHLIST_FILM", film: film })
    }
};

export const removeWatchlistFilm = (film) => {
    return (dispatch) => {
        dispatch({ type: "REMOVE_WATCHLIST_FILM", film: film })
    }
};

export const removeFollowFeed = (user) => {
    return (dispatch) => {
        dispatch({ type: "REMOVE_FOLLOW_FEED", user: user})
    }
};

export const addUserFollowingCount = () => {
    return (dispatch) => {
        dispatch({ type: "ADD_USER_FOLLOWING_COUNT"})
    }
};