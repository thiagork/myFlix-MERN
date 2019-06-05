/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import './profile-view.scss';

export class ProfileView extends React.Component {

    removeMovie(movieId) {
        axios.delete(`https://myflix-mern.herokuapp.com/users/${this.props.user.Username}/movies/${movieId}`, {
            headers: { Authorization: `Bearer ${localStorage.token}` }
        })
            .then(response => {
                this.props.updateProfile('FavoriteMovies', response.data.FavoriteMovies);
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        if (!localStorage.user) {
            return <Redirect to='/' />;
        } else if (!this.props.user) {
            return null;
        } else {
            return (
                <Container className='profile-view'>
                    <Row>
                        <Col>
                            <h2>User profile</h2>
                            <div className='user-username'>
                                <h3 className='label'>Username</h3>
                                <p className='value'>{this.props.user.Username} <EditProfile type={'Username'} field={'Username'} user={this.props.user} updateProfile={this.props.updateProfile} /></p>
                            </div>
                            <div className='user-email'>
                                <h3 className='label'>Email</h3>
                                <p className='value'>{this.props.user.Email} <EditProfile type={'Email'} field={'Email'} user={this.props.user} updateProfile={this.props.updateProfile} /></p>
                            </div>
                            <div className='user-birthday'>
                                <h3 className='label'>Birthday</h3>
                                <p className='value'>{this.props.user.Birthday} <EditProfile type={'Date'} field={'Birthday'} user={this.props.user} updateProfile={this.props.updateProfile} /></p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3 className='label'>Favorite Movies</h3>
                            <ListGroup className='user-favorite-movies'>
                                {this.props.movies.map(mov => {
                                    if (mov._id === this.props.user.FavoriteMovies.find(favMov => favMov === mov._id)) {
                                        return <ListGroup.Item>{mov.Title}<Link to={`/movies/${mov._id}`}> <Button variant='primary' size='sm'>View</Button></Link> <Button variant='danger' size='sm' onClick={() => this.removeMovie(mov._id)}>Remove</Button></ListGroup.Item>;
                                    } else {
                                        return null;
                                    }
                                })}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}


class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: null,
            userInput: null
        };

        this.submitChange = this.submitChange.bind(this);
    }

    submitChange(field, userInput) {
        const config = {};
        config[field] = userInput;

        axios.patch(`https://myflix-mern.herokuapp.com/users/${this.props.user.Username}/${field}`, config,
            {
                headers: { Authorization: `Bearer ${localStorage.token}` }
            })
            .then(response => {
                this.props.updateProfile(field, userInput);
                this.resetUserInput();
            })
            .catch(err => {
                console.log(err);
            });
    }


    toggleCollapse() {
        const { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen
        });
    }

    resetUserInput() {
        this.setState({
            isOpen: null,
            userInput: null
        });
    }


    render() {
        return (
            <>
                <Button onClick={() => this.toggleCollapse()} variant='secondary' size='sm'>Edit</Button>
                <Collapse in={this.state.isOpen}>
                    <div>
                        <Form.Control type={this.props.type} placeholder={`Enter ${this.props.field}`} onChange={(e) => this.setState({ userInput: e.target.value })} />
                        <Button variant='primary' size='sm' onClick={() => this.submitChange(this.props.field, this.state.userInput)}>Submit</Button>
                    </div>
                </Collapse>
            </>
        );
    }
}