import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BASE_URL} from "../globals"
import {User} from "../interfaces/interfaces"

export interface sickDayRegistryProps {
    authToken: string;
}

const SickDayRegistry: React.FunctionComponent<sickDayRegistryProps> = (props) => {
    const token = 'Basic ' + props.authToken;
    const [state, setState] = useState(
        {
            email: "", //Whatever is typed in Inputfield "email"
            date: "", //date picked in datepicker
            employeeId: "", // Once a correct email was entered, an API request will look for the corresponding User-Id.
            dayId: "", // Id of created TimeTableDay (needed to link Employee to that day)
            successfulEmployeeAssignment: false, 
            errorOccured: false, 
            users: [] as User[], //list of all Users (needed for autocompletion of typed in E-Mail).  
            userEmails: [] as string[] //List of all UserEmails(needed for autocompletion of typed in E-Mail)
        }
    );

    function getAllUsers() {
            //Not sure if async - await is needed
            axios.get(`${BASE_URL}/api/users`, { headers: { authorization: token } })
            .then((response) => {
                console.log(response.data);
                setState({...state, users: response.data})
            })
        }
    
    function getEmailList(){
        let emails: string[] = [];
        state.users.map((user) => emails=[...emails, user.email]);
        setState({...state, userEmails: emails});
    }

    function createSickDay() {
        axios.post(`${BASE_URL}/api/timeTableDays`,
        {
            date: state.date,
            startTime: null,
            endTime: null,
            breakLength: 0.0,
            expectedHours: 8.0,
            absenceStatus: "SICK"
            },
        { headers: { authorization: token }},
        ).then((response) => {
            setState({...state, dayId: response.data.workdayId});
        })
        .catch(() => setState({...state, errorOccured: true}))
    };

    function getEmployeeId(email: string){
        let id: string = state.users.find(user => user.email === email)?.id || ""
        setState({...state, employeeId: id})
        }

    function assignEmployeeToDay(){
        console.log(state.dayId)
        axios.put(`${BASE_URL}/api/timeTableDays/assignEmployee/${state.employeeId}/toDay/${state.dayId}`, null, 
        { headers: { authorization: token }},
        ).then(() => setState({...state, successfulEmployeeAssignment: true, errorOccured: false}))
        .catch(() => setState({...state, errorOccured: true, successfulEmployeeAssignment: false}))
    }

    useEffect(() => {
            getAllUsers();
        }, []);

    useEffect(() => {
        if(state.userEmails.includes(state.email)){
            getEmployeeId(state.email);
        }  
    }, [state.email]);

    useEffect(() => {
        if (state.users != [])
        getEmailList();
        }  
    , [state.users]);

    useEffect(() => {
    if(state.dayId != "" && state.employeeId != ""){
        assignEmployeeToDay();
        setState({...state, email:""})
    }
    }, [state.dayId]);

    return(
    <div>
        <h1>Krankmeldung</h1>
        <h3> Um Welchen Mitarbeiter und welchen Tag handelt es sich? Bitte geben Sie die nötigen Details ein.</h3>
        <form>
            <input type="text" name="email" list = "emails" placeholder="Benutzer E-Mail" value = {state.email} onChange={(event) => setState({ ...state, email: event.target.value })} />
                <datalist id="emails">
                    {state.users.map((user) => (
                    <option key={user.email} value={user.email}></option>  
                    ))}
                    
                </datalist>
            <input disabled type="text" name="id" placeholder='Benutzer ID' value={state.employeeId}/>
            <input type="date" name="date" value={state.date} onChange={(event) => setState({ ...state, date: event.target.value })}/>
            <br />
            <button className="formButtonGreen" onClick={createSickDay}>Abschließen</button>
        </form>

        <br /><br />
        <h4 id={state.errorOccured ? 'login-error-message' : 'hidden-message'}>"Der Computer sagt Nein! Da hat etwas nicht funktioniert."</h4>
        <h4 id={state.successfulEmployeeAssignment ? 'success-message' : 'hidden-message'}>"Krankheitstag erfolgreich eingetragen!"</h4>
    </div>);
};
export default SickDayRegistry;