export const initialState = {
    loading: false,
    currentUser: [],
    diaryFilms: [],
    watchlistFilms: [],
    allDF: [],
    feed: [], 
    userFollowingCount: 0
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            if (action.user !== null)
                return {
                    ...state, 
                    currentUser: action.user, 
                    diaryFilms: action.user.diary_films,
                    userFollowingCount: action.user.followees.length,
                    loading: false,
                };
            break 
        case 'FETCH_FEED':
            return {
                ...state, 
                feed: action.films, 
                loading: false,
            };
        case 'FETCH_ALL_DF':
            return {
                ...state, 
                allDF: action.films, 
                loading: false,
            };
        case 'FETCH_WATCHLIST_FILMS':
            return {
                ...state, 
                watchlistFilms: action.films,
                loading: false,
            };
        case 'ADD_DIARY_FILM':
            const newDiaryList = [action.film, ...state.diaryFilms]
            const newAllDiaryList = [action.film, ...state.allDF ]
            return {
                ...state, 
                diaryFilms: newDiaryList,
                allDF: newAllDiaryList,
                loading: false,
            };  
        case 'REMOVE_DIARY_FILM':
            const newDiaryListTwo = state.diaryFilms.filter((diary) => diary.id !== action.film.id)
            const newAllDiaryListTwo = state.allDF.filter((diary) => diary.id !== action.film.id)
            return {
                ...state, 
                diaryFilms: newDiaryListTwo,
                allDF: newAllDiaryListTwo,
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
        case 'ADD_WATCHLIST_FILM':
            const newWatchlistList = [action.film, ...state.watchlistFilms]
            return {
                ...state, 
                watchlistFilms: newWatchlistList,
                loading: false,
            };
        case 'REMOVE_WATCHLIST_FILM':
            const newWatchlistListTwo = state.watchlistFilms.filter((film) => film.id !== action.film.id)
            return {
                ...state, 
                watchlistFilms: newWatchlistListTwo,
                loading: false,
            };
        case 'REMOVE_FOLLOW_FEED':
            const newFollowFeedTwo = state.feed.filter((film) => film.user_id != action.user.id)
            let followingCount = state.userFollowingCount - 1
            return {
                ...state, 
                feed: newFollowFeedTwo,
                userFollowingCount: followingCount,
                loading: false,
            };
        case 'LOGOUT':
            return {
                ...state, 
                currentUser: [], 
                loading: false,
            };
        case 'ADD_USER_FOLLOWING_COUNT':
            let newFollowingCount = state.userFollowingCount + 1
            return {
                ...state, 
                userFollowingCount: newFollowingCount, 
                loading: false,
            };
        default:
            return state;
    }
}

export default rootReducer