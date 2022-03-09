import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './login.css';
import { BASE_URL } from '../globals';
import { useCookies } from '@react-smart/react-cookie-service';


export interface ILoginPageProps {
    Sender: Function;
    SetAppCurrentUser: Function;
}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
    const logo = require('../assets/logo.png');
    const [state, setState] = useState({
        emailInput: '',
        passwordInput: '',
        incorrectInput: false, // if true, wrong user details were submitted and an error message shows up
        successfulAuth: false // true when auth was succesful so we knwo we want to set cookies now
    });
    const { setCookie, getCookie} = useCookies(); 

    useEffect(() => {
        enableDisableButton()
    }, [state])

    function executeBasicAuthenticationService(username: string, password: string) {
        return axios.get(`${BASE_URL}/login`, { headers: { authorization: createBasicAuthToken(username, password) } });
    }

    function createBasicAuthToken(username: string, password: string) {
        return 'Basic ' + window.btoa(username + ':' + password);
    }

    function authenticate() {
        executeBasicAuthenticationService(state.emailInput, state.passwordInput)
            .then(() => setState({...state, successfulAuth: true}))
            .then(() => props.Sender({ userEmail: state.emailInput, loggedIn: true }))
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

    useEffect(() => {
        if (state.successfulAuth === true){
            setCookie('basicAuthToken', createBasicAuthToken(state.emailInput, state.passwordInput), {expires: 1});
            console.log(`BasicAuthCookie was set to ${getCookie('basicAuthToken')}`);
            props.Sender({ userEmail: state.emailInput, token: createBasicAuthToken(state.emailInput, state.passwordInput), loggedIn: true })
            axios.get(`${BASE_URL}/api/users/current-user`, { headers: { authorization: getCookie("basicAuthToken") } })
                .then((response) => {props.SetAppCurrentUser(response.data)})
                .catch(() => setState({ ...state, incorrectInput: true }));

        }
        }  
    , [state.successfulAuth]);

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
                />
                <br />
                <input
                    type="password"
                    placeholder="Passwort"
                    value={state.passwordInput}
                    onChange={(event) => setState({ ...state, passwordInput: event.target.value })}
                    onKeyPress={startLoginWhenEnterKeyPressed}
                />
                <br />
                <button id="loginButton" onClick={authenticate}>
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
