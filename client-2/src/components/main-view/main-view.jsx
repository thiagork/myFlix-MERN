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
            user: null
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
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
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
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
                                return movies.map(movie => <Col xl={3} sm={6} md={4} xs={12}><MovieCard key={movie._id} movie={movie} /></Col>);
                            }
                        }} />
                        <Route path='/register' render={() => <RegistrationView />} />
                        <Route path='/profile' render={() => <ProfileView movies={this.state.movies} />} />
                        <Route path='/movies/:Id' render={({ match }) => <Col><MovieView movie={movies.find(movie => movie._id === match.params.Id)} /></Col>} />
                        <Route path='/genres/:Genre' render={() => <GenreView />}/>
                        <Route path='/directors/:Director' render={() => <DirectorView />} />
                    </Row>
                </Container>
            </Router>
        );
    }
}