export const initialState = {
    currentUser: [],
    loading: false,
    diaryFilms: [],
    countFollowing: 0,
    countFollowers: 0,
    countDF: 0
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            if (action.user !== null)
                return {
                    ...state, 
                    currentUser: action.user, 
                    diaryFilms: action.user.diary_films,
                    countFollowing: action.user.followees.length,
                    countFollowers: action.user.followers.length,
                    countDF: action.user.diary_films.length,
                    loading: false,
                };
            break 

        case 'LOGOUT':
            return {
                ...state, 
                currentUser: [], 
                loading: false,
            };

        case 'ADD_DIARY_FILM':
            const newDiaryList = [action.film, ...state.diaryFilms, ]
            return {
                ...state, 
                diaryFilms: newDiaryList,
                countDF: state.countDF + 1,
                loading: false,
            };
                
        case 'REMOVE_DIARY_FILM':
            const newDiaryListTwo = state.diaryFilms.filter((diary) => diary.id !== action.film.id)
            return {
                ...state, 
                diaryFilms: newDiaryListTwo,
                countDF: state.countDF - 1,
                loading: false,
            };
    
        case 'PATCH_DIARY_FILM':
            const newDiaryListThree = state.diaryFilms.filter((diary) => diary.id !== action.film.id)
            newDiaryListThree.unshift(action.film)
            return {
                ...state, 
                diaryFilms: newDiaryListThree,
                loading: false,
            };

        default:
            return state;
    }
}

export default rootReducer