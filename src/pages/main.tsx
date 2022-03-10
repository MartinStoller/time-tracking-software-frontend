import React, { useEffect, useState } from 'react';
import './main.css';
import '../components/modal/modal.css'
import axios from 'axios';
import { Outlet, Link } from 'react-router-dom';
import { User } from '../interfaces/interfaces';
import { BASE_URL } from '../globals';
import { userInfo } from 'os';

export interface IMainPageProps {
    authToken: string;
    userEmail: string;
    Sender: Function;
    currentUserProp: User;
}

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {
    const logo = require('../assets/logo.png');
    const token = 'Basic ' + props.authToken;
    const [currentUser, setCurrentUser] = useState<User>();

    function getCurrentUser() {
        axios.get(`${BASE_URL}/api/users/current-user`, { headers: { authorization: token } }).then((response) => {
            const resp = response.data;
            setCurrentUser(resp);
        });
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    useEffect(() => {
        props.Sender(currentUser);
    }, [currentUser]);

    return (
        <div className="main-container">
            <link rel="stylesheet" href="./main.css" />
            <div className="logo-container">
                <a href="http://haeger-consulting.de" target="_blank">
                    <img id="logo" src={logo} alt="Haeger Logo" />
                </a>
            </div>
            <div className="main-box">
                <div className="menu-box">
                    {/* menu */}
                    <div className="menu">
                        <h1>Haegertime</h1>
                        <hr />
                        <li className="category" id="cat-general">
                            <a className="cat-button" href="#cat-general">
                                Allgemein
                            </a>
                            <div className="function-list">
                                <ul>
                                    <li>
                                        <Link to="users">Benutzerübersicht</Link>
                                    </li>
                                    <li>
                                        <Link to="current-user">Mein Account</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="category" id="cat-hours">
                            <a className="cat-button" href="#cat-hours">
                                Arbeitszeit
                            </a>
                            <div className="function-list">
                                <ul>
                                    <li>
                                        <Link to="/users">Stunden Anzeigen</Link>
                                    </li>
                                    <li>
                                        <a href="#">Stunden Eintragen</a>
                                    </li>
                                    <li>
                                        <a href="#">Stunden bearbeiten</a>
                                    </li>
                                    <li>
                                        <a href="#">Monat Finalisieren</a>
                                    </li>
                                    <li>
                                        <a href="#">Mein Stundenkonto</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="category" id="cat-projects">
                            <a className="cat-button" href="#cat-projects">
                                Projekte
                            </a>
                            <div className="function-list">
                                <ul>
                                    <li>
                                        <a href="#">Meine Projekte</a>
                                    </li>
                                    <li>
                                        <a href="#">Projekt anlegen</a>
                                    </li>
                                    <li>
                                        <a href="#">Projekt bearbeiten</a>
                                    </li>
                                    <li>
                                        <a href="#">Projektbesetzung</a>
                                    </li>
                                    <li>
                                        <a href="#">Rechnung erstellen</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="category" id="cat-vacation">
                            <a className="cat-button" href="#cat-vacation">
                                Urlaubstage
                            </a>
                            <div className="function-list">
                                <ul>
                                    <li>
                                        <a href="#">Meine Urlaubstage</a>
                                    </li>
                                    <li>
                                        <a href="#">Urlaubsantrag</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="category" id="cat-sickdays">
                            <a className="cat-button" href="#cat-sickdays">
                                Krankheitstage
                            </a>
                            <div className="function-list">
                                <ul>
                                    <li>
                                        <a href="#">Kranke Mitarbeiter</a>
                                    </li>
                                    <li>
                                        <a href="#">Krankheitstage</a>
                                    </li>
                                    <li>
                                        <a href="#">Krankmeldung</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="category" id="cat-usermgmt">
                            <a className="cat-button" href="#cat-usermgmt">
                                Verwaltung
                            </a>
                            <div className="function-list">
                                <ul>
                                    <li>
                                        <a href="#">Neuer Account</a>
                                    </li>
                                    <li>
                                        <a href="#">Username ändern</a>
                                    </li>
                                    <li>
                                        <a href="#">Account einfrieren</a>
                                    </li>
                                    <li>
                                        <a href="#">Account löschen</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </div>
                    {/* /menu */}
                    <button className="formButtonRed" id="logoutButton">
                        Abmelden
                    </button>
                    <p id="copyright">&copy; 2022 Team React</p>
                </div>
                {<hr />}
                <div id="content-box">
                    <div id="display">
                        <Outlet />
                        <img id="burns" src={require('../assets/burns.png')} alt="" style={{ position: 'absolute', borderRadius: '1.7vh', right: 0, bottom: 0 }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
