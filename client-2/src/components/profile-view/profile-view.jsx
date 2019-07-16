/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { connect } from 'react-redux';
import { removeMovieFromFavorites, deleteAccount, setUser, updateUser } from '../../actions/actions.js';
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
                                <p className='value'>{this.props.user.Username} <EditProfile type={'Username'} field={'Username'} user={this.props.user} updateUser={this.props.updateUser} /></p>
                            </div>
                            <div className='user-password'>
                                <h3 className='label'>Password</h3>
                                <p className='value'>******** <ChangePassword type={'Password'} field={'Password'} user={this.props.user} updateUser={this.props.updateUser} /></p>
                            </div>
                            <div className='user-email'>
                                <h3 className='label'>Email</h3>
                                <p className='value'>{this.props.user.Email} <EditProfile type={'Email'} field={'Email'} user={this.props.user} updateUser={this.props.updateUser} /></p>
                            </div>
                            <div className='user-birthday'>
                                <h3 className='label'>Birthday</h3>
                                <p className='value'>{this.props.user.Birthday} <EditProfile type={'Date'} field={'Birthday'} user={this.props.user} updateUser={this.props.updateUser} /></p>
                            </div>
                            <div className='user-delete-account'>
                                <Button onClick={() => this.props.deleteAccount()} variant='danger' size='sm'>Delete account</Button>
                                <br></br>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3 className='label'>Favorite Movies</h3>
                            <ListGroup className='user-favorite-movies'>
                                {this.props.movies.map(mov => {
                                    if (mov._id === this.props.user.FavoriteMovies.find(favMov => favMov === mov._id)) {
                                        return <ListGroup.Item>{mov.Title}<Link to={`/movies/${mov._id}`}> <Button variant='primary' size='sm'>View</Button></Link> <Button variant='danger' size='sm' onClick={() => this.props.removeMovieFromFavorites(mov._id)}>Remove</Button></ListGroup.Item>;
                                    } else {
                                        return null;
                                    }
                                })}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container >
            );
        }
    }
}

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: null,
            oldPassword: '',
            newPassword: '',
            newPasswordRepeat: ''
        };
    }

    submitChange(oldPassword, newPassword) {
        axios.patch(`https://myflix-mern.herokuapp.com/users/${this.props.user.Username}/Password`, {
            OldPassword: `${oldPassword}`,
            NewPassword: `${newPassword}`
        },
            {
                headers: { Authorization: `Bearer ${localStorage.token}` }
            })
            .then(response => {
                console.log('Password change succeeded');
                this.resetUserInput();
            })
            .catch(err => {
                console.error(err);
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
            oldPassword: '',
            newPassword: '',
            newPasswordRepeat: ''
        });
    }


    render() {
        return (
            <>
                <Button onClick={() => this.toggleCollapse()} variant='secondary' size='sm'>Edit</Button>
                <Collapse in={this.state.isOpen}>
                    <div>
                        <Form.Control type={this.props.type} value={this.state.oldPassword} placeholder={`Enter current ${this.props.field}`} onChange={(e) => this.setState({ oldPassword: e.target.value })} />
                        <Form.Control type={this.props.type} value={this.state.newPassword} placeholder={`Enter new ${this.props.field}`} onChange={(e) => this.setState({ newPassword: e.target.value })} />
                        <Form.Control type={this.props.type} value={this.state.newPasswordRepeat} placeholder={`Repeat new ${this.props.field}`} onChange={(e) => this.setState({ newPasswordRepeat: e.target.value })} />
                        {
                            this.state.newPassword === this.state.newPasswordRepeat && this.state.newPassword !== '' && this.state.oldPassword !== '' ?
                                <Button variant='primary' size='sm' onClick={() => this.submitChange(this.state.oldPassword, this.state.newPassword)}>Submit</Button> :
                                <Button variant='secondary' size='sm'>Submit</Button>
                        }
                    </div>
                </Collapse>
            </>
        );

    }
}


class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: null,
            userInput: ''
        };
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
            userInput: ''
        });
    }


    render() {
        return (
            <>
                <Button onClick={() => this.toggleCollapse()} variant='secondary' size='sm'>Edit</Button>
                <Collapse in={this.state.isOpen}>
                    <div>
                        <Form.Control type={this.props.type} value={this.state.userInput} placeholder={`Enter ${this.props.field}`} onChange={(e) => this.setState({ userInput: e.target.value })} />
                        <Button variant='primary' size='sm' onClick={() => this.props.updateUser(this.props.field, this.state.userInput, () => this.resetUserInput())}>Submit</Button>
                    </div>
                </Collapse>
            </>
        );

    }
}


const mapStateToProps = state => {
    const { user, movies } = state;
    return {
        user: user,
        movies: movies
    };
}


export default connect(mapStateToProps, { removeMovieFromFavorites, deleteAccount, setUser, updateUser })(ProfileView)