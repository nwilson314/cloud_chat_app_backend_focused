import './chat.scss';
import { Link, Location, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { stringToColor } from '../../utils';
import { Chatroom, ChatroomCard, NewChatroom } from '../../components';
import { models } from '../../models';

export interface ChatProps { 
    username: string,
    name: string,
    loggedIn: boolean,
    handleUserLogin(isLoggedIn: boolean, username: string, name: string): void
}

export const ChatPage: React.FunctionComponent<ChatProps> = ({ username, name, loggedIn, handleUserLogin }) => {
    const location = useLocation();

    const [currentUser, setCurrentUser] = useState<models.User>({username: username, name: name});
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(loggedIn);

    useEffect(() => {
        if (location.state) {
            setUserLoggedIn(true)
           
            const state = location.state as ChatProps;
            console.log("location use effect")
            const updateUser: models.User = {
                username: state.username,
                name: state.name
            }
            handleUserLogin(true, state.username, state.name)
            setCurrentUser(updateUser)
        }
        
    }, [location])
    // need to load user
    

    // need to load chatrooms
    const chatrooms: models.Chatroom[] = [{
        id: '1',
        name: 'Test Chatroom',
        mostRecentMessage: {
            id: '1',
            sentBy: currentUser,
            content: 'Lorem Ipsum',
            sentAt: new Date(Date.now()),
        }
    }];

    const logout = () => {
        return;
    };

    const sortChatrooms = (_1: object, _2: object) => {
        return 0;
    };

    return (
        <div id='container'>
            <div className='chatroom'>
                <aside className='chatroom__sidebar'>
                    <section className='sidebar__header'>
                        <div className='identifiers'>
                            <h1>the chat site</h1>
                            <h2>
                                chatting as <span className='name' style={{ color: stringToColor(currentUser.username) }}>{currentUser.username}</span>
                            </h2>
                        </div>
                        <div className='actions'>
                            <button onClick={() => logout()}>logout</button>
                        </div>
                    </section>
                    <ul className='sidebar__list'>
                        <div className='new-room-option'>
                            <Link to={'new'}>create new room</Link>
                        </div>
                        {chatrooms
                            ?.slice()
                            ?.sort((c1, c2) => sortChatrooms(c1, c2))
                            ?.map(c => (
                                <li key={c.id}>
                                    <NavLink
                                        className={isActive => isActive ? 'is-active' : ''}
                                        to={`${c.id}`}>
                                        <ChatroomCard mostRecentMessage={c.mostRecentMessage} name={c.name} />
                                    </NavLink>
                                </li>
                            ))}
                    </ul>
                </aside>
                <main className='chatroom__window'>
                    <Routes>
                        <Route path='' element={
                            <div className='no-chatroom'>
                                <h3>Join a chatroom...</h3>
                            </div>
                        }>
                        </Route>
                        <Route path='new' element={<NewChatroom/>}>
                        </Route>
                        <Route path=':id' element={<Chatroom/>} />
                    </Routes>
                </main>
            </div>
        </div >
    );
};
