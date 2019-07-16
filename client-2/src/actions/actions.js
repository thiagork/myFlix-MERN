import axios from 'axios';

export const SET_MOVIES = 'SET_MOVIES';
export const SET_USER = 'SET_USER';
export const SET_FILTER = 'SET_FILTER';
export const SET_SORT_COLUMN = 'SET_SORT_COLUMN';


// Pure actions
export const setMovies = (value) => {
    return { type: SET_MOVIES, value };
}

export const setUser = (value) => {
    return { type: SET_USER, value };
}

export const setFilter = (value) => {
    return { type: SET_FILTER, value };
}

export const setSortColumn = (value) => {
    return { type: SET_SORT_COLUMN, value };
}


// Thunked actions (async)
export const getMovies = () => dispatch => {
    axios.get('https://myflix-mern.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${localStorage.token}` }
    })
        .then(response => response.data)
        .then(movies => {
            dispatch(setMovies(movies))
        })
        .catch(err => {
            console.error(err);
        });
}

export const addMovieToFavorites = (movieId) => dispatch => {
    axios.post(`https://myflix-mern.herokuapp.com/users/${JSON.parse(localStorage.user).Username}/movies/${movieId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
    })
        .then(response => response.data)
        .then(user => {
            dispatch(setUser(user));
            localStorage.setItem('user', JSON.stringify(user));
        })
        .catch(err => {
            console.error(err);
        });
}

export const removeMovieFromFavorites = (movieId) =>  dispatch => {
    axios.delete(`https://myflix-mern.herokuapp.com/users/${JSON.parse(localStorage.user).Username}/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
    })
        .then(response =>  response.data)
        .then(user => {
            dispatch(setUser(user));
            localStorage.setItem('user', JSON.stringify(user))
        })
        .catch(err => {
            console.error(err);
        });
}

export const deleteAccount = () => dispatch => {
    axios.delete(`https://myflix-mern.herokuapp.com/users/${JSON.parse(localStorage.user).Username}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
    })
        .then(() => {
            console.log('User deleted.');
            localStorage.clear();
            dispatch(setUser(''));
        })
        .catch(err => {
            console.error(err);
        });
}

export const updateUser = (field, userInput, callback) => dispatch => {
    const config = {};
    config[field] = userInput;

    axios.patch(`https://myflix-mern.herokuapp.com/users/${JSON.parse(localStorage.user).Username}/${field}`, config,
        {
            headers: { Authorization: `Bearer ${localStorage.token}` }
        })
        .then(response => response.data)
        .then((user) => {
            dispatch(setUser(user));
            localStorage.setItem('user', JSON.stringify(user));
            callback();
        })
        .catch(err => {
            console.error(err);
        });
}
