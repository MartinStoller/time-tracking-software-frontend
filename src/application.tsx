import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import SickDayRegistry from './components/sickDayRegistry';
import GetUsersComponent from './components/getUsers';
import MainPage from './pages/main';

const HaegertimeApplication: React.FunctionComponent<{}> = (props) => {
    const [state, setState] = useState({
        userEmail: '', //empty string if logged in is false, else email of logged-in user
        sessionId: '', //empty string if logged in is false, else cookie, which needs to be sent in every request for authentication
        token: '', //base64 basic auth token (empty as long as loggedIn === false)
        loggedIn: false //show login page if false, else show Main.js(=Menu)
    });
    if (state.loggedIn === false) {
        return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage Sender={setState} />} />
                <Route
                    path="*"
                    element={
                        <Navigate to="/login" replace />
                    }
                />
            </Routes>
        </BrowserRouter>
        );
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage authToken={state.token} userEmail={state.userEmail} />}>
                    <Route path="/users" element={<GetUsersComponent authToken={state.token} />}></Route>
                    <Route path="/sickDayRegistry" element={<SickDayRegistry authToken={state.token} />}></Route>
                </Route>
                <Route path="/login" element={<LoginPage Sender={setState} />} />
               {/*  Handle non existing URLs: */}
                <Route
                    path="*"
                    element={
                        <main>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default HaegertimeApplication;
