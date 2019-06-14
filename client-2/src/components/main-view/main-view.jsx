/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';


export class MainView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            user: null,
        };

        this.updateProfile = this.updateProfile.bind(this);
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: JSON.parse(localStorage.getItem('user')) // Required so data persists after login
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://myflix-mern.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(err => {
                console.error(err);
            });
    }


    onLoggedIn(authData) {
        const config = {
            Username: authData.user.Username,
            Email: authData.user.Email,
            Birthday: authData.user.Birthday,
            FavoriteMovies: authData.user.FavoriteMovies
        }

        this.setState({
            user: config
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', JSON.stringify(config));
        this.getMovies(authData.token);
    }

    updateProfile(field, newValue) {
        // Update user state
        let config = this.state.user;
        config[field] = newValue;
        this.setState({
            user: config
        });

        // Update localstorage accordingly
        localStorage.setItem('user', JSON.stringify(this.state.user));
    }



    render() {
        const { movies, user } = this.state;

        return (
            <Router>
                <Container className='main-view' fluid='true'>
                    <Row>
                        <Route exact path='/' render={() => {
                            if (!user) {
                                return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                            } else {
                                return movies.map(movie => <Col xl={3} sm={6} md={4} xs={12}><MovieCard user={user} key={movie._id} movie={movie} /></Col>);
                            }
                        }} />
                        <Route path='/register' render={() => <RegistrationView />} />
                        <Route path='/profile' render={() => <ProfileView movies={this.state.movies} user={this.state.user} updateProfile={this.updateProfile} onLoggedIn={this.onLoggedIn} />} />
                        <Route path='/movies/:Id' render={({ match }) => <Col><MovieView user={this.state.user} movie={movies.find(movie => movie._id === match.params.Id)} updateProfile={this.updateProfile} /></Col>} />
                        <Route path='/genre/:Genre' render={({ match }) => <GenreView movies={this.state.movies} genre={match.params.Genre} />} />
                        <Route path='/director/:Director' render={({ match }) => <DirectorView movies={this.state.movies} directorName={match.params.Director} />} />
                    </Row>
                </Container>
            </Router>
        );
    }
}