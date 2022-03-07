import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../interfaces/interfaces';
import { BASE_URL } from '../globals';
export interface myAccountProps {
    authToken: string;
    currentUser: User
}
const MyAccountComponent: React.FunctionComponent<myAccountProps> = (props) => {

    return (
        <div>
            <h1>Meine Accountdaten</h1>
            <br />
            <table className="tableHorizontal">
                <tbody>
                    <tr>
                        <td>User-ID</td>
                        <td>{props.currentUser?.id}</td>
                    </tr>
                    <tr>
                        <td>E-Mail</td>
                        <td>{props.currentUser?.email}</td>
                    </tr>
                    <tr>
                        <td>Vorname</td>
                        <td>{props.currentUser?.firstname}</td>
                    </tr>
                    <tr>
                        <td>Nachname</td>
                        <td>{props.currentUser?.lastname}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
export default MyAccountComponent;