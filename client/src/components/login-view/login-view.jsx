/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


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
                    <Form.Text>New user? Click <Button style={{ padding: 0 }}variant='link' onClick={() => props.newUser()}> here </Button> to register</Form.Text>
                </Form.Group>
            </Form>
        </Container>

        // <label>
        //     Username:
        //         <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        // </label>
        // <label>
        //     Password:
        //         <input value={password} onChange={e => setPassword(e.target.value)} />
        // </label>
        // <button type='button' onClick={handleSubmit}>Submit</button>
        // <button type='button' onClick={() => props.newUser()}>New user?</button>

    );
}


// export class LoginViewClass extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             password: ''
//         };

//         this.onUsernameChange = this.onUsernameChange.bind(this);
//         this.onPasswordChange = this.onPasswordChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     onUsernameChange(event) {
//         this.setState({
//             username: event.target.value
//         });
//     }

//     onPasswordChange(event) {
//         this.setState({
//             password: event.target.value
//         });
//     }

//     handleSubmit() {
//         console.log(this.state.username, this.state.password);
//     }

//     render() {
//         return (
//             <form>
//                 <label>
//                     Username:
//                     <input type="text" value={this.state.username} onChange={this.onUsernameChange} />
//                 </label>
//                 <label>
//                     Password:
//                     <input value={this.state.password} onChange={this.onPasswordChange} />
//                 </label>
//                 <button type='button' onClick={this.handleSubmit}>Submit</button>
//             </form>
//         );
//     }


// }