/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './director-view.scss';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

export class DirectorView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            director: { Bio: '' }
        };
    }

    componentDidMount() {
        this.getDirectorInfo();
    }

    getDirectorInfo() {
        axios.get(`https://myflix-mern.herokuapp.com/directors/${this.props.directorName}`, {
            headers: { Authorization: `Bearer ${localStorage.token}` }
        })
            .then(response => this.setState({
                director: response.data
            }))
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <Container className='director-view'>
                <Row>
                    <Col>
                        <div>
                            <h3 className='label'>Director</h3>
                            <p className='value'>{this.props.directorName}</p>
                        </div>
                        <div>
                            <h3 className='label'>Bio</h3>
                            <p className='value'>{this.state.director.Bio}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3 className='label'>Movies by {this.props.directorName}</h3>
                        <ListGroup className='movies-by-director'>
                            {this.props.movies.map(movie => {
                                if (movie.Director.Name === this.state.director.Name) {
                                    return <ListGroup.Item>{movie.Title}<Link to={`/movies/${movie._id}`}> <Button variant='primary' size='sm'>View</Button></Link></ListGroup.Item>;
                                } else {
                                    return null;
                                }
                            })
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const { movies } = state;
    return {
        movies: movies
    };
}

export default connect(mapStateToProps)(DirectorView)