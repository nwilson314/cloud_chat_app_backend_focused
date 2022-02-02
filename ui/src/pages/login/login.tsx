import './login.scss';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APIService } from '../../services';

export interface LoginProps { }

export const LoginPage: React.FunctionComponent<LoginProps> = () => {
    const navigate = useNavigate();

    const [usernameInvalid, setUsernameInvalid] = useState<boolean>(false);
    const [username, setUsername] = useState('');

    // need to be able to login
    const login = async () => {
    await APIService.login(username)
        .then((name) => navigate('/chat', {state: {username:username, name:name}}))
        .catch(() => setUsernameInvalid(true));
    }

    return (
        <div id='container'>
            <div className='login'>
                <div className='welcome-card'>
                    <h1>
                        welcome to <span className='app-name'>the chat site</span>
                    </h1>
                    <h2>Please login or <Link to='/sign-up'>sign up</Link></h2>
                    {
                        usernameInvalid &&
                        <h3>*Username invalid. <Link to='/sign-up'>Sign up</Link> instead?*</h3>
                    }
                    <label>
                        Username
                        <input type='text' value={username} onChange={(e) => setUsername(e.target.value.toLowerCase())} />
                    </label>
                    <button type='submit' onClick={() => login()}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};
