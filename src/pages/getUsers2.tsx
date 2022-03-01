import { Link, Outlet } from 'react-router-dom';
import { User } from '../interfaces/interfaces';
import React, { useState } from 'react';

export default function GetUsers(token: string) {
const users2: User[] = [];
const [userContent, setUserContent]: [User[], (users: User[]) => void] = useState(users2);
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
