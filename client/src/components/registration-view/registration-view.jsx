/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const SuccessfulRegistration = (e) => {
        e.preventDefault();
        props.UserRegistered();
        props.OnLoggedIn(username);
    };

    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Birthday:
                <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </label>
            <button type="button" onClick={SuccessfulRegistration}>Register</button>
        </form>
    );
}