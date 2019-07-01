/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setMovies } from '../../actions/actions.js';
import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './main-view.scss';


export class MainView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
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
                this.props.setMovies(response.data);
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

    resetUserState() {
        this.setState({
            user: ''
        });
    }


    render() {
        const { user } = this.state;
        if (!user) {
            return (
                <Router>
                    <Container className='main-view' fluid='true'>
                        <Row>
                            <Route exact path='/' render={() => { return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />; }} />
                            <Route path='/register' render={() => <RegistrationView />} />
                            <Route path='/profile' render={() => <Redirect to='/' />} />
                        </Row>
                    </Container>
                </Router>
            );
        } else {
            return (
                <Router>
                <Navbar sticky='top' bg='dark' variant='dark'>
                    <Nav className='nav-bar'>
                        <Link className='nav-link' to='/'>Home</Link>
                        <Link className='nav-link' to='/profile'>Profile</Link>
                    </Nav>
                </Navbar>
                <Container className='main-view' fluid='true'>
                    <Row>
                        <Route exact path='/' render={() => <MoviesList /> } />
                        <Route path='/profile' render={() => <ProfileView user={this.state.user} updateProfile={this.updateProfile} resetUserState={() => this.resetUserState()} onLoggedIn={this.onLoggedIn} />} />
                        <Route path='/movies/:Id' render={({ match }) => <Col><MovieView user={this.state.user} updateProfile={this.updateProfile} /></Col>} />
                        <Route path='/genre/:Genre' render={({ match }) => <GenreView genre={match.params.Genre} />} />
                        <Route path='/director/:Director' render={({ match }) => <DirectorView directorName={match.params.Director} />} />
                    </Row>
                </Container>
            </Router>
            );
        }
    }
}

export default connect(null, { setMovies } ) (MainView);