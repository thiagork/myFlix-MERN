/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {
    addMovieToFavorites() {
        let movieId = this.props.movie._id;
        console.log(movieId);
        axios.post('https://myflix-mern.herokuapp.com/users/johndoe/movies/5c97cc646728671b439bc21a', {
            headers: { Authorization: `Bearer ${localStorage.token}` }
        })
            .then(response => {
                this.props.updateProfile('FavoriteMovies', response.data.FavoriteMovies);
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {

        if (!this.props.movie) return null;

        return (
            <div className='movie-view'>
                <div className='movie-title'>
                    <h2 className='label'>Title</h2>
                    <p className='value'>{this.props.movie.Title} <Button variant='primary' onClick={()=> this.addMovieToFavorites()}>Add to favorite</Button></p>
                </div>
                <div className='movie-description'>
                    <h3 className='label'>Description</h3>
                    <p className='value'>{this.props.movie.Description}</p>
                </div>
                <div className='movie-genre'>
                    <h3 className='label'>Genre</h3>
                    <p className='value'>{this.props.movie.Genre.Name}</p>
                </div>
                <div className='movie-director'>
                    <h3 className='label'>Director</h3>
                    <p className='value'>{this.props.movie.Director.Name}</p>
                </div>
                <div className='add-to-favorite'>
                    <Button variant='primary'>Add to favorite</Button>
                </div>
                <div className='return-button'>
                    <Link to={'/'}><Button variant='primary'>Return</Button></Link>
                </div>
            </div>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        Description: PropTypes.string,
        Genre: PropTypes.shape({
            Name: PropTypes.string
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string
        })
    }).isRequired
}