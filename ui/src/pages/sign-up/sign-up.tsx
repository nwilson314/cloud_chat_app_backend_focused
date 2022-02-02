import './sign-up.scss';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APIService } from '../../services';
import { models } from '../../models'

interface SignUpProps {
}

export const SignUpPage: React.FunctionComponent<SignUpProps> = () => {

    const navigate = useNavigate();

    // need to be able to create user
    const [usernameTaken, setUsernameTaken] = useState<boolean>(false);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    const signUp = async () => {
        let newUser: models.User = {
            username: username,
            name: name
        }

        await APIService.sign_up(newUser)
            .then(() => navigate('/chat', {state: {username: newUser.username, name: newUser.name}}))
            .catch(() => {
                setUsernameTaken(true);
            });
    };

    return (
        <div id='container'>
            <div className='sign-up'>
                <div className='welcome-card'>
                    <h1>
                        welcome to <span className='app-name'>the chat site</span>
                    </h1>
                    <h2>Create your account or <Link to='/login'>back to login</Link></h2>
                    {
                        usernameTaken &&
                        <h3>*Username taken. Choose another to continue.*</h3>
                    }
                    <label>
                        Username
                        <input type='text' value={username} onChange={(e) => setUsername(e.target.value.toLowerCase())} />
                    </label>
                    <label>
                        Name
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <button onClick={() => signUp()} type='submit' >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};
