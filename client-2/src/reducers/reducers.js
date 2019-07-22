import { combineReducers } from 'redux';

import { SET_MOVIES, SORT_AZ, SORT_ZA, SORT_DIRECTOR, SORT_GENRE, SORT_ID, SET_USER, SEARCH_BAR_VISIBLE, SEARCH_VALUE } from '../actions/actions.js';


function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES: // Sets the movies and sorts by id by default
                return [...action.value].sort((a, b) => {
                    if (a._id.toUpperCase() < b._id.toUpperCase()) {
                        return -1;
                    } if (a._id.toUpperCase() > b._id.toUpperCase()) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
        case SORT_AZ:
            return [...state].sort((a, b) => {
                if (a.Title.toUpperCase() < b.Title.toUpperCase()) {
                    return -1;
                } if (a.Title.toUpperCase() > b.Title.toUpperCase()) {
                    return 1;
                } else {
                    return 0;
                }
            });
        case SORT_ZA:
            return [...state].sort((a, b) => {
                if (a.Title.toUpperCase() > b.Title.toUpperCase()) {
                    return -1;
                } if (a.Title.toUpperCase() < b.Title.toUpperCase()) {
                    return 1;
                } else {
                    return 0;
                }
            });
        case SORT_DIRECTOR:
            return [...state].sort((a, b) => {
                if (a.Director.Name.toUpperCase() < b.Director.Name.toUpperCase()) {
                    return -1;
                } if (a.Director.Name.toUpperCase() > b.Director.Name.toUpperCase()) {
                    return 1;
                } else {
                    return 0;
                }
            });
        case SORT_GENRE:
            return [...state].sort((a, b) => {
                if (a.Genre.Name.toUpperCase() < b.Genre.Name.toUpperCase()) {
                    return -1;
                } if (a.Genre.Name.toUpperCase() > b.Genre.Name.toUpperCase()) {
                    return 1;
                } else {
                    return 0;
                }
            });
        case SORT_ID:
            return [...state].sort((a, b) => {
                if (a._id.toUpperCase() < b._id.toUpperCase()) {
                    return -1;
                } if (a._id.toUpperCase() > b._id.toUpperCase()) {
                    return 1;
                } else {
                    return 0;
                }
            });
        default:
            return state;
    }
}

function user(state = '', action) {
    switch (action.type) {
        case SET_USER:
            return action.newValue;
        default:
            return state;
    }
}

function searchBarVisible(state = false, action) {
    switch (action.type) {
        case SEARCH_BAR_VISIBLE:
            return action.value;
        default:
            return state;
    }
}

function searchValue(state = '', action) {
    switch (action.type) {
        case SEARCH_VALUE:
            return action.value;
        default:
            return state;
    }
}


const moviesApp = combineReducers({
    movies,
    user,
    searchBarVisible,
    searchValue
});

export default moviesApp;