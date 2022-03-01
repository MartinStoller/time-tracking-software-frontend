import React, { useState } from 'react';
import axios from 'axios';
import { User } from '../interfaces/interfaces';

export interface testProps {
    authToken: string;
}

export default async function GetUsers99() {
    const token = 
    const users2: User[] = [];
    const [userContent, setUserContent]: [User[], (users: User[]) => void] = useState(users2);
    const BASE_URL = `http://localhost:8080`;
    await axios.get(`${BASE_URL}/api/users`, { headers: { authorization: token } }).then((response) => {
        setUserContent(response.data);
    });
    return (
        <div className="userList">
            {userContent.map((user) => (
                <li key={user.id}>
                    {user.id} {user.firstName} {user.lastName} {user.email}
                </li>
            ))}
        </div>
    );
}
