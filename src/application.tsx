import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import SickDayRegistry from './components/sickDayRegistry';
import GetUsersComponent from './components/getUsers';
import MyAccountComponent from './components/myAccount';
import MainPage from './pages/main';
import OwnHolidaysDisplay from './components/ownHolidaysDisplay';
import BillingExportComponent from "./components/billingExport"
import HolidayApplicationComponent from './components/applyForHolidays';
import { useCookies } from '@react-smart/react-cookie-service';
import { BASE_URL } from './globals';
import axios from 'axios';

const HaegertimeApplication: React.FunctionComponent<{}> = (props) => {
    const [userEmail, setUserEmail] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

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
                    setLoggedIn(true); 
            }).catch(() => {
                    setLoggedIn(false); 
                    console.log("AAAAAAAAAHHHHHHH !!!")});
        }
        }  
        , []);
        
    if (loggedIn === false) {
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage loggedInSender={setLoggedIn} userEmailSender={setUserEmail} SetAppCurrentUser={setCurrentUser} />} />
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
                <Route path="/" element={<MainPage userEmail={userEmail} Sender={setCurrentUser} loggedInSender={setLoggedIn}/>}>
                    <Route path="/users" element={<GetUsersComponent />}></Route>
                    <Route path="/billingExport" element={<BillingExportComponent />}></Route>
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
                        <main style={{ padding: '1rem' }}>
                            <p style={{ color:"white", fontWeight:700 }}>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
    
};

export default HaegertimeApplication;
