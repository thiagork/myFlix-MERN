/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { MainView } from '../main-view/main-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

export class MovieView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        if (!this.props.movie) return null;

        return (
            <Container className='movie-view'>
                <Row className='movie-title'>
                    <div className='label'>Title</div>
                    <div className='value'>{this.props.movie.Title}</div>
                </Row>
                <Row className='movie-description'>
                    <div className='label'>Description</div>
                    <div className='value'>{this.props.movie.Description}</div>
                </Row>
                <Row className='movie-genre'>
                    <div className='label'>Genre</div>
                    <div className='value'>{this.props.movie.Genre.Name}</div>
                </Row>
                <Row className='movie-director'>
                    <div className='label'>Director</div>
                    <div className='value'>{this.props.movie.Director.Name}</div>
                </Row>
                <Row className='return-button'>
                    <Button variant='primary' onClick={() => this.props.returnCallback()}>Return</Button>
                </Row>
            </Container>
        );
    }
}