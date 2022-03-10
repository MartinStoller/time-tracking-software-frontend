import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../interfaces/interfaces';
import { BASE_URL } from '../globals'

export interface testProps {
    authToken: string;
}

const GetUsersComponent: React.FunctionComponent<testProps> = (props) => {
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
        <div className="userDiv">
            <h1>Benutzerübersicht</h1>
            <br />
            <table className="tableVertical">
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
                            <td key={user.id}>{user.id}</td>
                            <td key={user.firstname}>{user.firstname}</td>
                            <td key={user.lastname}>{user.lastname}</td>
                            <td key={user.email}>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GetUsersComponent;
