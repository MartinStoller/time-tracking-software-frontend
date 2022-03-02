import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../interfaces/interfaces';

export interface testProps {
    authToken: string;
}

const GetUsersComponent: React.FunctionComponent<testProps> = (props) => {
    const token = 'Basic ' + props.authToken;
    const [users, setUsers] = useState<User[]>([]);
    async function getAllUsers() {
        //Not sure if async - await is needed
        const BASE_URL = `http://localhost:8080`;
        await axios.get(`${BASE_URL}/api/users`, { headers: { authorization: token } }).then((response) => {
            setUsers(response.data);
        });
    }
    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className="userList">
            {users.map((user) => (
                <li key={user.id}>
                    {user.id} {user.firstname} {user.lastname} {user.email}
                </li>
            ))}
        </div>
    );
};

export default GetUsersComponent;
