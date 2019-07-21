import { combineReducers } from 'redux';

import { SET_MOVIES, SORT_AZ, SORT_ZA, SORT_DIRECTOR, SORT_GENRE, SET_USER, SET_SORT_COLUMN, SEARCH_BAR_VISIBLE, SEARCH_VALUE } from '../actions/actions.js';


function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        case SORT_AZ:
            return [...state];
        case SORT_ZA:
                return [...state];
        case SORT_DIRECTOR:
                return [...state];
        case SORT_GENRE:
                return [...state];
        default:
            return state;
    }
}

function sortColumn(state = 'title', action) {
    switch (action.type) {
        case SET_SORT_COLUMN:
            return action.value;
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
    sortColumn,
    movies,
    user,
    searchBarVisible,
    searchValue
});

export default moviesApp;