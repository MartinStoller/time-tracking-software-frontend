import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../interfaces/interfaces';
import { BASE_URL } from '../globals';
import { Modal } from './modal/Modal';
import { keyboardKey } from '@testing-library/user-event';

export interface myAccountProps {
    authToken: string;
    userFromRouter: User;
}

const MyAccountComponent: React.FunctionComponent<myAccountProps> = (props) => {
    const token = 'Basic ' + props.authToken;
    const [isModalOpen, setModalState] = React.useState(false);
    const toggleModal = () => setModalState(!isModalOpen);

    const [state, setState] = useState({
        id: props.userFromRouter?.id,
        firstname: props.userFromRouter?.firstname,
        lastname: props.userFromRouter?.lastname,
        password: '',
        email: props.userFromRouter?.email,
        role: props.userFromRouter?.role,
        frozen: props.userFromRouter?.frozen,
        urlaubstage: props.userFromRouter?.urlaubstage,
        pwChangedMsg: false
    });

    function changePw () {
        return axios.put(`${BASE_URL}/api/users/current-user/update`, { 
            id: props.userFromRouter?.id,
            firstname: props.userFromRouter?.firstname,
            lastname: props.userFromRouter?.lastname,
            password: state.password,
            email: props.userFromRouter?.email,
            role: props.userFromRouter?.role,
            frozen: props.userFromRouter?.frozen,
            urlaubstage: props.userFromRouter?.urlaubstage },
            {headers: { authorization: token }})
            .then(toggleModal)
            .then(() => setState({ ...state, pwChangedMsg: true }));
    }

    function changePwOnEnter (event:keyboardKey) {
        if (isModalOpen === true && event.key === 'Enter') {
            changePw ();
        }
    }

    return (
        <div>
            <div className="contentCenter">
                <h1>Meine Accountdaten</h1>
                <br />
                <table className="tableHorizontal">
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
                <button className="formButtonYellow" onClick={toggleModal}>
                    Passwort ändern
                </button>
                <Modal isOpen={isModalOpen} onClose={toggleModal}>
                    <h1>Neues Passwort</h1>
                    <input type="password" name="password" value={state.password} onChange={(event) => setState({ ...state, password: event.target.value })} onKeyPress={changePwOnEnter} />
                    <br />
                    <button type="submit" className="formButtonGreen" style={{ float: 'left' }} onClick={changePw}>
                        Speichern
                    </button>
                    <button className="formButtonRed" onClick={toggleModal} style={{ float: 'right' }}>
                        Abbrechen
                    </button>
                    <br />
                </Modal>
                <h3 id={state.pwChangedMsg ? 'success-message' : 'hidden-message'}>Dein Passwort wurde geändert.</h3>
            </div>
        </div>
    );
};

export default MyAccountComponent;
