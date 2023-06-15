export const initialState = {
    currentUser: [],
    loading: false,
    userFilms: [],
    userFollowings: [],
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            console.log(action.user.follows)
            if (action.user !== null)
                return {
                    ...state, 
                    currentUser: action.user, 
                    loading: false,
                    userFollowings: action.user.follows
                }
            else {
                return {
                    ...state
                }
            };

        case 'LOGOUT':
            return {
                ...state, 
                currentUser: [], 
          
                loading: false,
            };

            
        case 'FETCH_USER_DIARY_FILMS':
            console.log(action.user_diary_films)
            return {
                ...state, 
                userFilms: action.user_diary_films,
                loading: false
            };
            case "ADD_USER_DIARY_FILM":
                console.log(action.user_diary_film)
                return {
                    ...state,
                    userFilms: [...state.userFilms, action.user_diary_film],
                    loading: false,
                };
        
            case "REMOVE_USER_DIARY_FILM":
                console.log(action.user_diary_film)
                let newuserFilms = state.userFilms.filter(f => f.id !== action.user_diary_film.id)
                return {
                    ...state,
                    userFilms: newuserFilms,
                    loading: false,
                };
                case "FETCH_USER_FOLLOWINGS":
                    console.log(action.user_followings)
                    return {
                        ...state,
                        userFollowings: [...state.userFollowings, action.userFollowings],
                        loading: false,
                    };

        default:
            return state;
    }
}

export default rootReducer