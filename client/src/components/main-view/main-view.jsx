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
    

    OnMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }


    ResetMainView() {
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
                    ? <MovieView returnCallback={()=> this.ResetMainView()} movie={selectedMovie} />
                    : movies.map(movie => {
                        return (
                            <MovieCard key={movie._id} movie={movie} onClick={movie => this.OnMovieClick(movie)} />
                        )
                    })
                }
            </div>
        );
    }
}