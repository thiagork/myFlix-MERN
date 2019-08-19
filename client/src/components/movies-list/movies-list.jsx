import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { searchBarVisible } from '../../actions/actions.js';
import MovieCard from '../movie-card/movie-card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { MainView } from '../main-view/main-view.jsx';


function MoviesList(props) {
    const { searchValue, movies } = props;

    useEffect(() => {
        props.searchBarVisible(true);

        return function cleanup() {
            props.searchBarVisible(false);
        }
    });

    const moviesToShow = () => {
        if (searchValue.length > 0) {
            return movies.filter(movie => (movie.Title.toLowerCase().includes(searchValue.toLocaleLowerCase())) || (movie.Genre.Name.toLowerCase().includes(searchValue.toLocaleLowerCase())) || (movie.Director.Name.toLowerCase().includes(searchValue.toLocaleLowerCase())))
        } else {
            return movies;
        }
    }

    if (!movies) {
        return <MainView />
        // return <div className='main-view' />
    } else {
        return <Container className='movies-list'>
            {moviesToShow()[0] || !searchValue ?
                <Row>{moviesToShow().map(movie => <Col key={movie._id} xl={3} sm={6} md={4} xs={12}> <MovieCard movie={movie} /></Col>)}</Row> :
                <Row><Col><Alert variant='danger'>Your search returned no results.</Alert></Col></Row>
            }
        </Container>
    }

}


const mapStateToProps = state => {
    const { movies, searchValue } = state;

    return {
        movies: movies,
        searchValue: searchValue
    };
}


export default connect(mapStateToProps, { searchBarVisible })(MoviesList);