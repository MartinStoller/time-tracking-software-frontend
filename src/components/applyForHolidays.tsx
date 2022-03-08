import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../globals'
import { User } from '../interfaces/interfaces';

export interface holidayApplicationProps {
    authToken: string;
    currentUser: User;
}

const HolidayApplicationComponent: React.FunctionComponent<holidayApplicationProps> = (props) => {
    const token = 'Basic ' + props.authToken;
    const [restHolidays, setRestHolidays] = useState()
    const [dayId, setDayId] = useState(0)
    const [duration, setDuration] = useState(0)

    function sendHolidayRequest() {
        axios.post(`${BASE_URL}/api/users/apply/holiday/${props.currentUser.id}`, null, { headers: { authorization: token }, params: {dayId: dayId, duration: duration} }).then((response) => {
            setRestHolidays(response.data); //TODO: CHANGE THIS LINE to a boolean beeing switched so that a text occurs like "Request SUccessful". ALso write a catch block that displays an error message
        });
    }

    function findTimeTableDayIdFromDate(){
        console.log("")
    }

    function getRestHoliday() {
        axios.get(`${BASE_URL}/api/users/holidays/rest`, { headers: { authorization: token } }).then((response) => {
            setRestHolidays(response.data);
        });
    }

    useEffect(() => {
        getRestHoliday();
    }, []);

    return (
        <>
        <h1>Urlaub beantragen</h1>
        <br />
        <input type="date" placeholder='Startdatum'/>
        <input type="text" placeholder='Wie viele Urlaubstage?'/>
        <button className="formButtonGreen">Abschließen</button> {/* TODO: ADD ON CLICK FUNCTIONALITY */}
        </>
    );
};

export default HolidayApplicationComponent;
