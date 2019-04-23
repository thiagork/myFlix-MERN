/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            movies: null,
            selectedMovie: null,
            user: null,
            newUser: null
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

    OnLoggedIn(user) {
        this.setState({
            user
        });
    }

    RegisterUser() {
        this.setState({
            newUser: true
        });
    }

    UserRegistered() {
        this.setState({
            newUser: null
        });
    }


    render() {
        const { movies, selectedMovie, user, newUser } = this.state;

        if (!user) {
            if (newUser) return <RegistrationView UserRegistered={() => this.UserRegistered()} OnLoggedIn={user => this.OnLoggedIn(user)} />;
            else return <LoginView OnLoggedIn={user => this.OnLoggedIn(user)} newUser={()=> this.RegisterUser()} />;
        }

        if (!movies) return <div className='main-view' />;

        return (
            <div className='main-view'>
                {selectedMovie 
                    ? <MovieView returnCallback={() => this.ResetMainView()} movie={selectedMovie} />
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