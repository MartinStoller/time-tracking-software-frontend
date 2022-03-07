import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../interfaces/interfaces';
import {BASE_URL} from "../globals"

export interface authenticationProps {
    authToken: string;
}

const GetUsersComponent: React.FunctionComponent<authenticationProps> = (props) => {
    const token = 'Basic ' + props.authToken;
    const [users, setUsers] = useState<User[]>([]);
    async function getAllUsers() {
        //Not sure if async - await is needed
        await axios.get(`${BASE_URL}/api/users`, { headers: { authorization: token } }).then((response) => {
            setUsers(response.data);
        });
    }
    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <>
        <h1>Benutzerübersicht</h1>
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
