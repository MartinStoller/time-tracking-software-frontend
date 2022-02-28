import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import HomePage from './pages/main';

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
                <Route path="/main" element={<HomePage authToken={state.token} userEmail={state.userEmail} />} />
                <Route path="/login" element={<LoginPage Sender={setState} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default HaegertimeApplication;
