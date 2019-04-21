/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            movies: null,
            selectedMovie: null
        };

        // Saves the initial state for resetting the view later
        this.resetMainView = this.resetMainView.bind(this);
    }


    componentDidMount() {
        axios.get('https://myflix-mern.herokuapp.com/movies')
        .then(response => {
            this.setState({
                movies: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
    

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }


    resetMainView() {
        this.setState({
            selectedMovie: null
        });
    }


    render() {
        const { movies, selectedMovie } = this.state;

        if (!movies) return <div className='main-view' />;

        return (
            <div className='main-view'>
                {selectedMovie 
                    ? <MovieView movie={selectedMovie} resetCallback={this.resetMainView}/>
                    : movies.map(movie => {
                        return (
                            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                        )
                    })
                }
            </div>
        );
    }
}