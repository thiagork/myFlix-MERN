/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const registerNewUser = () => {
        axios.post('https://myflix-mern.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
        .then(() => {
            window.open('/', '_self');
        })
        .catch(err => {
            console.error('error registering the user: ', err);
        });
    }

    return (
        <Container className='registration-view'>
        <h1>Register</h1>
            <Form>
                <Form.Group controlId='formNewUsername'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control size='sm' type='text' placeholder='Your username' value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='formNewPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control size='sm' type='password' placeholder='Your password' value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='formNewEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control size='sm' type='email' placeholder='your@email.com' value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='formNewBirthday'>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control size='sm' type='date' placeholder='MM/DD/YYYY' value={birthday} onChange={e => setBirthday(e.target.value)} />
                </Form.Group>
                <Button variant='primary' onClick={registerNewUser}>Register</Button>
                <Form.Group controlId='formNewUser'>
                    <Form.Text>Already registered? Click <Link to={'/'}>here</Link> to login</Form.Text>
                </Form.Group>
            </Form>
        </Container>
    );
}

RegistrationView.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    userRegistered: PropTypes.func.isRequired
}