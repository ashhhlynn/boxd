export const initialState = {
    currentUser: [],
    loading: false,
    diaryFilms: []
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            if (action.user !== null)
            console.log(action.user.diary_films)
                return {
                    ...state, 
                    currentUser: action.user, 
                    diaryFilms: action.user.diary_films,
                    loading: false,
                };
            break 

        case 'LOGOUT':
            return {
                ...state, 
                currentUser: [], 
                loading: false,
            };

        default:
            return state;
    }
}

export default rootReducer