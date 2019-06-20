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
        axios.post(`https://myflix-mern.herokuapp.com/users/${this.props.user.Username}/movies/${this.props.movie._id}`, {}, {
            headers: { Authorization: `Bearer ${localStorage.token}` }
        })
            .then(response => {
                this.props.updateProfile('FavoriteMovies', response.data.FavoriteMovies);
            })
            .catch(err => {
                console.error(err);
            });
    }

    removeMovieFromFavorites() {
        axios.delete(`https://myflix-mern.herokuapp.com/users/${this.props.user.Username}/movies/${this.props.movie._id}`, {
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
                    <p className='value'>{this.props.movie.Title} {
                        this.props.user.FavoriteMovies.indexOf(this.props.movie._id) > -1 ?
                            <Button variant='danger' onClick={() => this.removeMovieFromFavorites()}>Remove from favorite</Button> :
                            <Button variant='primary' onClick={() => this.addMovieToFavorites()}>Add to favorite</Button>
                    }
                    </p>
                </div>
                <div className='movie-description'>
                    <h3 className='label'>Description</h3>
                    <p className='value'>{this.props.movie.Description}</p>
                </div>
                <div className='movie-genre'>
                    <h3 className='label'>Genre</h3>
                    <p className='value'><Link to={`/genre/${this.props.movie.Genre.Name}`}>{this.props.movie.Genre.Name}</Link></p>
                </div>
                <div className='movie-director'>
                    <h3 className='label'>Director</h3>
                    <p className='value'><Link to={`/director/${this.props.movie.Director.Name}`}>{this.props.movie.Director.Name}</Link></p>
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