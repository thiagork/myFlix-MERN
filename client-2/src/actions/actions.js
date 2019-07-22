import axios from 'axios';

export const SET_MOVIES = 'SET_MOVIES';
export const SORT_AZ = 'SORT_AZ';
export const SORT_ZA = 'SORT_ZA';
export const SORT_DIRECTOR = 'SORT_DIRECTOR';
export const SORT_GENRE = 'SORT_GENRE';
export const SORT_ID = 'SORT_ID';
export const SET_USER = 'SET_USER';
export const SET_FILTER = 'SET_FILTER';
export const SET_SORT_COLUMN = 'SET_SORT_COLUMN';
export const SEARCH_BAR_VISIBLE = 'SEARCH_BAR_VISIBLE';
export const SEARCH_VALUE = 'SEARCH_VALUE';


// Normal actions
export const setMovies = (value) => {
    return { type: SET_MOVIES, value };
}

export const sortAZ = () => {
    return { type: SORT_AZ };
}

export const sortZA = () => {
    return { type: SORT_ZA };
}

export const sortDirector = () => {
    return { type: SORT_DIRECTOR };
}

export const sortGenre = () => {
    return { type: SORT_GENRE };
}

export const sortId = () => {
    return { type: SORT_ID };
}

export const setUser = (value) => {
    let newValue = {...value};
    delete newValue.Password;
    if (value === '') {
        localStorage.clear();
    } else {
        localStorage.setItem('user', JSON.stringify(newValue));
    };
    return { type: SET_USER, newValue };
}

export const setSortColumn = (value) => {
    return { type: SET_SORT_COLUMN, value };
}

export const searchBarVisible = (value) => {
    return { type: SEARCH_BAR_VISIBLE, value };
}

export const makeSearch = (value) => {
    return { type: SEARCH_VALUE, value };
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
        })
        .catch(err => {
            console.error(err);
        });
}

export const removeMovieFromFavorites = (movieId) => dispatch => {
    axios.delete(`https://myflix-mern.herokuapp.com/users/${JSON.parse(localStorage.user).Username}/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
    })
        .then(response => response.data)
        .then(user => {
            dispatch(setUser(user));
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
            dispatch(setUser(''));
            window.open('/', '_self');
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
            callback();
        })
        .catch(err => {
            console.error(err);
        });
}

export const loginUser = (username, password) => dispatch => {
    axios.post('https://myflix-mern.herokuapp.com/login/', {
        Username: username,
        Password: password
    })
        .then(response => response.data)
        .then((response) => {
            dispatch(setUser(response.user));
            localStorage.setItem('token', response.token);
            dispatch(getMovies(response.token));
        })
        .catch(err => {
            console.error(err, 'No such user.')
        });
};