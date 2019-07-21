import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { searchBarVisible } from '../../actions/actions.js';
import MovieCard from '../movie-card/movie-card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert'


function MoviesList(props) {

    useEffect(() => {
        props.searchBarVisible(true);

        return function cleanup() {
            props.searchBarVisible(false);
        }
    });

    const moviesToShow = (movies = props.movies, searchValue = props.searchValue) => {
        if (searchValue.length > 1) {
            return movies.filter(movie => (movie.Title.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1) || (movie.Genre.Name.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1) || (movie.Director.Name.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1))
        } else {
            return movies;
        }
    }

    if (!props.movies) return <div className='main-view' />;

    return <Container className='movies-list'>
        {moviesToShow()[0] ?
            <Row>{moviesToShow().map(movie => <Col xl={3} sm={6} md={4} xs={12}> <MovieCard key={movie._id} movie={movie} /></Col>)}</Row> :
            <Row><Col><Alert variant='danger'>Your search returned no results.</Alert></Col></Row>
        }
    </Container>
}


const mapStateToProps = state => {
    const { movies, searchValue } = state;

    return {
        movies: movies,
        searchValue: searchValue
    };
}


export default connect(mapStateToProps, { searchBarVisible })(MoviesList);