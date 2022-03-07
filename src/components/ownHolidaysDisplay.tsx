import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, TimeTableDay } from '../interfaces/interfaces';
import { BASE_URL } from '../globals';

export interface ownHolidaysDisplayProps {
    authToken: string;
    currentUser: User
}
const OwnHolidaysDisplay: React.FunctionComponent<ownHolidaysDisplayProps> = (props) => {
    const token = 'Basic ' + props.authToken;
    const [remainingHolidays, setRemainingHolidays] = useState();
    const [pastHolidays, setPastHolidays] = useState<TimeTableDay[]>([]);

    function getHolidayData() {
        axios.get(`${BASE_URL}/api/users/holidays/rest`, { headers: { authorization: token } }).then((response) => {
            setRemainingHolidays(response.data);
        });
        axios.get(`${BASE_URL}/api/users/holidays`, { headers: { authorization: token } }).then((response) => {
            setPastHolidays(response.data);
        });
    }

    useEffect(() => {
        getHolidayData()
    }, []);

/*     useEffect(() => {
        console.log(remainingHolidays)
        console.log(pastHolidays)
    }, [remainingHolidays, pastHolidays]); */

    return (
        <>
        <h1>Urlaubsübersicht</h1>
        <h3>Verbleibende Urlaubstage: {remainingHolidays}</h3>
            <table className='holidayTable'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Datum</th>
                    </tr>
                </thead>
                 <tbody>
                    {pastHolidays.map((holiday) => (
                    <tr key={holiday.workdayId}>
                        <td>{holiday.workdayId}</td>
                        <td>{holiday.date}</td>
                    </tr>
            ))}
                    
                </tbody> 
            </table>
        </>
    );
};

export default OwnHolidaysDisplay;
