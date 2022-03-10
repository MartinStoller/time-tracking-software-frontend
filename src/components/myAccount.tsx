import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../interfaces/interfaces';
import { BASE_URL } from '../globals';
import { Modal } from './modal/Modal';
import { keyboardKey } from '@testing-library/user-event';
import { useCookies } from '@react-smart/react-cookie-service';


export interface myAccountProps {
    currentUser: User;
}

const MyAccountComponent: React.FunctionComponent<myAccountProps> = (props) => {
    const [isModalOpen, setModalState] = React.useState(false);
    const { getCookie } = useCookies(); 
    const toggleModal = () => setModalState(!isModalOpen);

    const [state, setState] = useState({
        id: props.currentUser?.id,
        firstname: props.currentUser?.firstname,
        lastname: props.currentUser?.lastname,
        password: '',
        email: props.currentUser?.email,
        role: props.currentUser?.role,
        frozen: props.currentUser?.frozen,
        urlaubstage: props.currentUser?.urlaubstage,
        pwChangedMsg: false
    });

    function changePw () {
        return axios.put(`${BASE_URL}/api/users/current-user/update`, { 
            id: props.currentUser?.id,
            firstname: props.currentUser?.firstname,
            lastname: props.currentUser?.lastname,
            password: state.password,
            email: props.currentUser?.email,
            role: props.currentUser?.role,
            frozen: props.currentUser?.frozen,
            urlaubstage: props.currentUser?.urlaubstage },
            {headers: { authorization: getCookie("basicAuthToken") }})
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
