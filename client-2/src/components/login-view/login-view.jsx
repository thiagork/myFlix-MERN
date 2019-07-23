/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/actions.js';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import './login-view.scss';


export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container className='login-view'>
            <h1>Login</h1>
            <Form >
                <Form.Group controlId='formUsername'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control size='sm' type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='formPassword'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control size='sm' type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant='primary' onClick={() => props.loginUser(username, password)}>Submit</Button>
                <Form.Group controlId='formNewUser'>
                    <Form.Text>New user? Click <Link to={`/register`}>here</Link> to register</Form.Text>
                </Form.Group>
            </Form>
        </Container>
    );
}

LoginView.propTypes = {
    loginUser: PropTypes.func.isRequired
}

export default connect(null, { loginUser })(LoginView)