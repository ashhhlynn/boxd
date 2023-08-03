export const checkUser = (user) => {
    return (dispatch) => {  
        dispatch({ type: "SET_CURRENT_USER", user: user })
    }
}

export const logOut = () => {
    return (dispatch) => {
        dispatch({ type: "LOGOUT" })
    }
}

export const addDiaryFilm = (film) => {
    return (dispatch) => {
        dispatch({ type: "ADD_DIARY_FILM", film: film })
    }
}

export const removeDiaryFilm = (film) => {
    return (dispatch) => {
        dispatch({ type: "REMOVE_DIARY_FILM", film: film })
    }
}

export const patchDiaryFilm = (film) => {
    return (dispatch) => {
        dispatch({ type: "PATCH_DIARY_FILM", film: film })
    }
}

export const fetchAllDF = (films) => {
    return (dispatch) => {
        dispatch({ type: "FETCH_ALL_DF", films: films })
    }
}