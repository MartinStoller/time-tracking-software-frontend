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

const HaegertimeApplication: React.FunctionComponent<{}> = (props) => {
    const [state, setState] = useState({
        userEmail: '', //empty string if logged in is false, else email of logged-in user
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
    });

    const { getCookie } = useCookies();

    useEffect(() => {
        console.log(`reading authcookie: ${getCookie("basicAuthToken")}`);
        if (getCookie("basicAuthToken")){
            axios.get(`${BASE_URL}/api/users/current-user`, { headers: { authorization: getCookie("basicAuthToken") } })
                .then((response) => {
                    setCurrentUser(response.data)
                    setState({...state, loggedIn: true}); 
            }).catch(() => {
                    setState({...state, loggedIn: false}); 
                    console.log("AAAAAAAAAHHHHHHH !!!")});
        }
        }  
        , []);

        useEffect(() => {console.log(`loggedIn: ${state.loggedIn}`) }, [state.loggedIn])
        
    if (state.loggedIn === false) {
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage Sender={setState} SetAppCurrentUser={setCurrentUser} />} />
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
                <Route path="/" element={<MainPage userEmail={state.userEmail} Sender={setCurrentUser}/>}>
                    <Route path="/users" element={<GetUsersComponent />}></Route>
                    <Route path="/ownHolidays" element={<OwnHolidaysDisplay currentUser={currentUser}/>}></Route>
                    <Route path="/holidayApplication" element={<HolidayApplicationComponent currentUser={currentUser}/>}></Route>
                    <Route path="/sickDayRegistry" element={<SickDayRegistry/>}></Route>
                    <Route path="/current-user" element={<MyAccountComponent currentUser={currentUser}/>}></Route>
                </Route>
                <Route path="/login" element={<Navigate to="/" replace />} />
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
