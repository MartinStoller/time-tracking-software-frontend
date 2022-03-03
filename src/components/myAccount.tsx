import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../interfaces/interfaces';
import { BASE_URL } from '../globals';

export interface myAccountProps {
    authToken: string;
    userFromRouter: User
}

const MyAccountComponent: React.FunctionComponent<myAccountProps> = (props) => {
/*     const token = 'Basic ' + props.authToken; */
/*     const [user, setUser] = useState<User>();
    async function currentUser() {
        await axios.get(`${BASE_URL}/api/users/current-user`, { headers: { authorization: token } }).then((response) => {
            setUser(response.data);
            console.log(props.userFromRouter);
            console.log(props.userFromRouter);
        });
    }
    useEffect(() => {
        currentUser();
    }, []); */

    return (
        <div>
            <h1>Meine Accountdaten</h1>
            <br />
            <table className="myAccountTable">
                <tbody>
                    <tr>
                        <td>User-ID</td>
                        <td>{props.userFromRouter?.id}</td>
                    </tr>
                    <tr>
                        <td>E-Mail</td>
                        <td>{props.userFromRouter?.email}</td>
                    </tr>
                    <tr>
                        <td>Vorname</td>
                        <td>{props.userFromRouter?.firstname}</td>
                    </tr>
                    <tr>
                        <td>Nachname</td>
                        <td>{props.userFromRouter?.lastname}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MyAccountComponent;
