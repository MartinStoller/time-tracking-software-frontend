import React, { useState } from 'react';
import axios from 'axios';
import { User } from '../interfaces/interfaces';

export interface GetUsersProps {
    authToken: string;
}

const GetUsers: React.FunctionComponent<GetUsersProps> = (props) => {
    const BASE_URL = `http://localhost:8080`;
    const token = 'Basic ' + props.authToken;
    const users2: User[] = [];
    const [userContent, setUserContent]: [User[], (users: User[]) => void] = useState(users2);

    async function getUsers() {
        await axios.get(`${BASE_URL}/api/users`, { headers: { authorization: token } }).then((response) => {
            setUserContent(response.data);
            console.log(response.data);
        });
    }

    return (
        <div>
            <h1>OLEEEEE</h1>
            OIDAAAAAAAAAAAAAAAAAAAA
        </div>
        /*         <div className="userList">
            {userContent.map((user) => (
                <li key={user.id}>
                    {user.id} {user.firstName} {user.lastName} {user.email}
                </li>
            ))}
        </div> */
    );
};

export default GetUsers;
