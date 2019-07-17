/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setUser, getMovies } from '../../actions/actions.js';
import MoviesList from '../movies-list/movies-list';
import LoginView from '../login-view/login-view';
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
            this.props.getMovies(accessToken);
        }
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
                        <Route path='/profile' render={() => <ProfileView />} />
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


export default connect(mapStateToProps, { setUser, getMovies } ) (MainView);