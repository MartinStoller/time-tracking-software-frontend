import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../globals'
import { User } from '../interfaces/interfaces';
import { useCookies } from '@react-smart/react-cookie-service';

export interface holidayApplicationProps {
    currentUser: User;
}

const HolidayApplicationComponent: React.FunctionComponent<holidayApplicationProps> = (props) => {
    const [startDate, setStartDate] = useState("")
    const [dayId, setDayId] = useState("")
    const [duration, setDuration] = useState("")
    const [successfulRequest, setSuccessfulRequest] = useState(false)
    const [errorRequest, setErrorRequest] = useState(false)

    const { getCookie } = useCookies(); 

    let clearInputfields = () => { 
            setStartDate("");
            setDuration("");
        } 

    function sendHolidayRequest() {
        axios.post(`${BASE_URL}/api/users/apply/holiday/${props.currentUser.id}`, null, { headers: { authorization: getCookie("basicAuthToken") }, params: {dayId: dayId, duration: duration} }).then((response) => {
            console.log("An Email requesting your Holiday has been sent to josalongmartin@gmail.com");
            setErrorRequest(false); 
            setSuccessfulRequest(true)
        }).catch(() => {console.log("something went wrong"); 
            setErrorRequest(true); 
            setSuccessfulRequest(false)});
    }

    function createHoliday(){
        axios.post(`${BASE_URL}/api/timeTableDays`,
        {
            date: startDate,
            startTime: null,
            endTime: null,
            breakLength: 0.0,
            expectedHours: 8.0,
            absenceStatus: null
        },
        { headers: { authorization: getCookie("basicAuthToken") }},
        ).then((response) => {
            setDayId(response.data.workdayId);
            setErrorRequest(false); 
            setSuccessfulRequest(true)
        })
        .catch(() => {
            setErrorRequest(true); 
            setSuccessfulRequest(false)})
    }
    // 1.) Create TTD 2.)Get Id 3.) fire applyHoliday request 4.) use successful/errorRequest booleans for responsive message and clear input fields after request

    useEffect(() => {
        if(dayId != ""){
            console.log(`${BASE_URL}/api/users/apply/holiday/${props.currentUser.id}`);
           sendHolidayRequest(); 
           clearInputfields();
        }
        }, [dayId]);


    return (
        <>
            <h1>Urlaub beantragen</h1>
            <h3>Wann soll der Urlaub Beginnen und wie viele Tage am Stück willst du fir frei nehmen?</h3>
            <p>Verbleibende Urlaubstage: {props.currentUser.urlaubstage}</p>
            <input type="date" placeholder='Startdatum' value={startDate} onChange={(event) => setStartDate(event.target.value)}/>
            <input type="text" placeholder='Wie viele Urlaubstage?' value={duration} onChange={(event) => setDuration(event.target.value)}/>
            <button className="formButtonGreen" onClick={createHoliday}>Abschließen</button>
            <h4 id={errorRequest ? 'login-error-message' : 'hidden-message'}>Der Computer sagt Nein!</h4>
            <h4 id={successfulRequest ? 'success-message' : 'hidden-message'}>Der Urlaubsantrag wurde erfolgreich versandt!</h4>
        </>
    );
};

export default HolidayApplicationComponent;
