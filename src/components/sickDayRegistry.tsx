import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BASE_URL} from "../globals"

export interface sickDayRegistryProps {
    authToken: string;
}

const SickDayRegistry: React.FunctionComponent<sickDayRegistryProps> = (props) => {
    const token = 'Basic ' + props.authToken;

function createSickDay() {
        axios.post(`${BASE_URL}/api/timeTableDays`, 
        {
            date: "2022-01-25",
            startTime: "08:45:00",
            endTime: "17:15:00",
            breakLength: 0.0,
            expectedHours: 0.0,
            absenceStatus: null
            },
        { headers: { authorization: token }}, 
        ).then((response) => console.log(response.data))
    }

    return(
    <>
        <h1>Krankmeldung</h1>
        <h3> Um Welchen Mitarbeiter und welchen Tag handelt es sich? Bitte geben Sie die nötigen Details ein.</h3>
        <input type="text" placeholder='Mitarbeiter ID' name="employeeId"/>
        <input type="date" name="date"/>
        <br />
        <button className="submitButton" onClick={createSickDay}>Abschließen</button>
    </>);
}


export default SickDayRegistry;