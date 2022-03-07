import React, { Dispatch, SetStateAction, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './login.css';

export interface ILoginPageProps {
    Sender: Function;
}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
    const logo = require('../assets/logo.png');
    const BASE_URL = `http://localhost:8080`;
    const [state, setState] = useState({
        emailInput: '',
        passwordInput: '',
        incorrectInput: false // if true, wrong user details were submitted and an error message shows up
    });

    const navigate = useNavigate();

    function executeBasicAuthenticationService(username: string, password: string) {
        return axios.get(`${BASE_URL}/login`, { headers: { authorization: createBasicAuthToken(username, password) } });
    }

    function createBasicAuthToken(username: string, password: string) {
        return 'Basic ' + window.btoa(username + ':' + password);
    }

    function authenticate() {
        executeBasicAuthenticationService(state.emailInput, state.passwordInput)
            .then(() => props.Sender({ userEmail: state.emailInput, token: window.btoa(state.emailInput + ':' + state.passwordInput), loggedIn: true }))
            .then(() => navigate('/'))
            .catch(() => setState({ ...state, incorrectInput: true }));
    }

    function enableDisableButton() {
        if (state.emailInput === '' || state.passwordInput === '') {
            (document.getElementById('loginButton') as HTMLInputElement).disabled = true;
        } else {
            (document.getElementById('loginButton') as HTMLInputElement).disabled = false;
        }
    }

    function startLoginWhenEnterKeyPressed(event: any) {
        if (event.key === 'Enter') {
            authenticate();
        }
    }

    return (
        <div className="login-container">
            <link rel="stylesheet" href="./login.css" />
            <div className="logo-container">
                <a href="http://haeger-consulting.de" target="_blank">
                    <img width="100%" src={logo} alt="Haeger Logo" />
                </a>
            </div>

            <div className="login-box">
                <h1>Willkommen zu Haegertime</h1>
                <input
                    type="email"
                    autoFocus
                    placeholder="E-Mail"
                    value={state.emailInput}
                    onChange={(event) => setState({ ...state, emailInput: event.target.value })}
                    onKeyPress={startLoginWhenEnterKeyPressed}
                    onKeyUp={enableDisableButton}
                />
                <br />
                <input
                    type="password"
                    placeholder="Passwort"
                    value={state.passwordInput}
                    onChange={(event) => setState({ ...state, passwordInput: event.target.value })}
                    onKeyPress={startLoginWhenEnterKeyPressed}
                    onKeyUp={enableDisableButton}
                />
                <br />
                <button className="loginButton" onClick={authenticate}>
                    Anmelden
                </button>
                <h5 id={state.incorrectInput ? 'login-error-message' : 'hidden-message'}>Ungültige Benutzername/Passwort-Kombination.</h5>
                <hr />
                <p>
                    <a href="#" /* TODO: link to a page that sais: "please contact an admin, since this is not a public Application" */ className="form__link">
                        Passwort vergessen oder noch nicht registriert?
                    </a>
                </p>
            </div>
            <footer>
                <div id="copyright">&copy; 2022 Team React</div>
            </footer>
        </div>
    );
};

export default LoginPage;
