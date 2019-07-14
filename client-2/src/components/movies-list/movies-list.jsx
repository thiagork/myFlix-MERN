import React from 'react';
import { connect } from 'react-redux';
import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const mapStateToProps = state => {
    const { movies, visibilityFilter, sortColumn } = state;

    let moviesToShow = movies.concat().sort((a,b) => {
        if (a[sortColumn] < b[sortColumn]) return -1;
        if (a[sortColumn] > b[sortColumn]) return 1;
        return 0;
    });

    return { movies: moviesToShow };
}

function MoviesList(props) {
    const { movies } = props;

    if (!movies) return <div className='main-view' />;

    return movies.map(movie => <Col xl={3} sm={6} md={4} xs={12}><MovieCard key={movie._id} movie={movie} /></Col>); // user={user} missing
}

export default connect(mapStateToProps) (MoviesList);