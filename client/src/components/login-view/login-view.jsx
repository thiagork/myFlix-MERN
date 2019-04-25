/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.OnLoggedIn(username);
    };


    return (
        <Container style={{ width: '18rem' }}>
        <h1>Login</h1>
            <Form>
                <Form.Group controlId='formUsername'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control size='sm' type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='formPassword'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control size='sm' type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant='primary' onClick={handleSubmit} >Submit</Button>
                <Form.Group controlId='formNewUser'>
                    <Form.Text>New user? Click <Button style={{ padding: 0 }} variant='link' onClick={() => props.NewUser()}> here </Button> to register</Form.Text>
                </Form.Group>
            </Form>
        </Container>
    );
}
