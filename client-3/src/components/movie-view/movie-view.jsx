/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { connect } from 'react-redux';
import { addMovieToFavorites, removeMovieFromFavorites } from '../../actions/actions.js';
import './movie-view.scss';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


function MovieView(props) {

    const { movies, movieId } = props;
    if (!movies || !movies.length) return null;
    const movie = movies.find(movie => movie._id == movieId);

    return (
        <div className='movie-view'>
            <div className='movie-title'>
                <h2 className='label'>Title</h2>
                <p className='value'>{movie.Title}
                    {
                        props.user.FavoriteMovies.indexOf(movie._id) > -1 ?
                            <Button variant='danger' onClick={() => props.removeMovieFromFavorites(movieId)}>Remove from favorite</Button> :
                            <Button variant='primary' onClick={() => props.addMovieToFavorites(movieId)}>Add to favorite</Button>
                    }
                </p>
            </div>
            <div className='movie-description'>
                <h3 className='label'>Description</h3>
                <p className='value'>{movie.Description}</p>
            </div>
            <div className='movie-genre'>
                <h3 className='label'>Genre</h3>
                <p className='value'><Link to={`/genre/${movie.Genre.Name}`}>{movie.Genre.Name}</Link></p>
            </div>
            <div className='movie-director'>
                <h3 className='label'>Director</h3>
                <p className='value'><Link to={`/director/${movie.Director.Name}`}>{movie.Director.Name}</Link></p>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    const { user, movies } = state;
    return {
        user: user,
        movies: movies
    };
}

export default connect(mapStateToProps, { addMovieToFavorites, removeMovieFromFavorites })(MovieView);