export const initialState = {
    currentUser: [],
    loading: false,
    diaryFilms: []
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            if (action.user !== null)
                return {
                    ...state, 
                    currentUser: action.user, 
                    loading: false,
                };
            break 

        case 'LOGOUT':
            return {
                ...state, 
                currentUser: [], 
                loading: false,
            };

        case 'FETCH_DIARY_FILMS':
            return {
                ...state, 
                diaryFilms: action.films, 
                loading: false,
            };

        default:
            return state;
    }
}

export default rootReducer