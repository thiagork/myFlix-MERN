/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setMovies, setUser } from '../../actions/actions.js';
import MoviesList from '../movies-list/movies-list';
import LoginView from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';
import ProfileView from '../profile-view/profile-view';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './main-view.scss';


export class MainView extends React.Component {
    componentDidMount() {
        console.log('component did mount...');
        const accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.props.setUser(JSON.parse(localStorage.user));
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        console.log('getting movies (mainview)');
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


    render() {
        const { user } = this.props;
        if (!user) {
            return (
                <Router>
                    <Container className='main-view' fluid='true'>
                        <Row>
                            <Route exact path='/' render={() => <LoginView /> } />
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
                        <Route path='/profile' render={() => <ProfileView updateProfile={this.updateProfile} />} />
                        <Route path='/movies/:Id' render={({ match }) => <Col><MovieView movieId={match.params.Id}/></Col>} />
                        <Route path='/genre/:Genre' render={({ match }) => <GenreView genre={match.params.Genre} />} />
                        <Route path='/director/:Director' render={({ match }) => <DirectorView directorName={match.params.Director} />} />
                    </Row>
                </Container>
            </Router>
            );
        }
    }
}


const mapStateToProps = state => {
    const { user, movies } = state;
    return {
        user: user,
        movies: movies
    };
}


export default connect(mapStateToProps, { setMovies, setUser } ) (MainView);