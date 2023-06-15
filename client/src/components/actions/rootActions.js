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

export const fetchUserDiaryFilms = (user_diary_films) => {
    return (dispatch) => {
        dispatch({ type: "FETCH_USER_DIARY_FILMS", user_diary_films: user_diary_films })
    }
}

export const addUserDiaryFilm = (user_diary_film) => {
    return (dispatch) => {
        dispatch({ type: "ADD_USER_DIARY_FILM", user_diary_film: user_diary_film})     
    }
}

export const removeUserDiaryFilm = (user_diary_film) => {
    return (dispatch) => {
        dispatch({ type: "REMOVE_USER_DIARY_FILM", user_diary_film: user_diary_film})     
    }
}