import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import SickDayRegistry from './components/sickDayRegistry';
import GetUsersComponent from './components/getUsers';
import MainPage from './pages/main';
import OwnHolidaysDisplay from './components/ownHolidaysDisplay';
import HolidayApplicationComponent from './components/applyForHolidays';
import MyAccountComponent from './components/myAccount';
import { useCookies } from '@react-smart/react-cookie-service';
import { BASE_URL } from './globals';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HaegertimeApplication: React.FunctionComponent<{}> = (props) => {
    const [state, setState] = useState({
        userEmail: '', //empty string if logged in is false, else email of logged-in user
        token: '', //base64 basic auth token (empty as long as loggedIn === false)
        loggedIn: false, //show login page if false, else show Main.js(=Menu)
    });

    const [currentUser, setCurrentUser] = useState({
            id: "",
            firstname: "",
            lastname: "",
            password: "",
            email: "",
            role: "",
            frozen: true,
            urlaubstage: ""
})

    const { setCookie, getCookie} = useCookies();

/*     useEffect(() => {
        console.log(`reading authcookie: ${getCookie("basicAuthToken")}`);
        axios.get(`${BASE_URL}/login`, { headers: { authorization: getCookie("basicAuthToken") } })
        .then(() => setState({userEmail: getCookie("currentUserEmail"), token: getCookie("basicAuthToken"), loggedIn: true}))
        .then(() => console.log(state))

        .catch(() => {setState({...state, loggedIn: false}); console.log("sdadsadasdsa")});
        }  
    , []); */

/*     useEffect(() => {}, [state.loggedIn]) */
    if (state.loggedIn === false) {
        console.log(`im false router ${state.loggedIn}`)
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
    console.log(`Im Router zwischen den beiden returns ${state.loggedIn}`)
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage authToken={state.token} userEmail={state.userEmail} Sender={setCurrentUser}/>}>
                    <Route path="/users" element={<GetUsersComponent authToken={state.token} />}></Route>
                    <Route path="/ownHolidays" element={<OwnHolidaysDisplay authToken={state.token} currentUser={currentUser}/>}></Route>
                    <Route path="/holidayApplication" element={<HolidayApplicationComponent authToken={state.token} currentUser={currentUser}/>}></Route>
                    <Route path="/sickDayRegistry" element={<SickDayRegistry authToken={state.token}/>}></Route>
                    <Route path="/current-user" element={<MyAccountComponent authToken={state.token} currentUser={currentUser}/>}></Route>
                </Route>
                <Route path="/login" element={<Navigate to="/login" replace />} />
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
