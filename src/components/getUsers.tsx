import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../interfaces/interfaces';
import {BASE_URL} from "../globals"
import { useCookies } from '@react-smart/react-cookie-service';

const GetUsersComponent: React.FunctionComponent<{}> = (props) => {
    const { getCookie } = useCookies(); 
    const [users, setUsers] = useState<User[]>([]);
    function getAllUsers() {
        axios.get(`${BASE_URL}/api/users`, { headers: { authorization: getCookie("basicAuthToken") } }).then((response) => {
            setUsers(response.data);
            console.log(response.data)
        })
    }
    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <>
        <h1>Benutzerübersicht</h1>
        <br />
            <table className='userTable'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vorname</th>
                        <th>Nachname</th>
                        <th>E-Mail</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                    </tr>
            ))}
                    
                </tbody>
            </table>
        </>
    );
};

export default GetUsersComponent;
