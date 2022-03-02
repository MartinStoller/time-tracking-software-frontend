import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import HomePage from './pages/main';
import GetUsersComponent from './components/getUsers';
import MainPage from './pages/main';

const HaegertimeApplication: React.FunctionComponent<{}> = (props) => {
    const [state, setState] = useState({
        userEmail: '', //empty string if logged in is false, else email of logged-in user
        sessionId: '', //empty string if logged in is false, else cookie, which needs to be sent in every request for authentication
        token: '', //base64 basic auth token (empty as long as loggedIn === false)
        loggedIn: false //show login page if false, else show Main.js(=Menu)
    });

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage authToken={state.token} userEmail={state.userEmail} />}>
                    <Route path="/users" element={<GetUsersComponent authToken={state.token} />}></Route>
                </Route>
                <Route path="/login" element={<LoginPage Sender={setState} />} />
                <Route
                    path="*"
                    element={
                        <main style={{ padding: '1rem' }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default HaegertimeApplication;
