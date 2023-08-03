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

export const fetchDiaryFilms = (films) => {
    return (dispatch) => {
        dispatch({ type: "FETCH_DIARY_FILMS", films: films })
    }
}